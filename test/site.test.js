const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const pages = ["index.html", "commands.html", "compare.html"];
const legalPages = [
  "privacy.html", "terms.html", "legal-notice.html",
  "confidentialite.html", "cgu.html", "mentions-legales.html",
  "privacy-es.html", "privacy-de.html", "privacy-pt.html",
  "terms-es.html", "terms-de.html", "terms-pt.html",
  "legal-notice-es.html", "legal-notice-de.html", "legal-notice-pt.html",
];

function translationRows() {
  const source = read("i18n.js");
  const base = source.match(/const rows = (\[[\s\S]*?\n  \]);/);
  const extra = source.match(/rows\.push\(\.\.\.(\[[\s\S]*?\n  \])\);/);
  assert.ok(base && extra, "translation arrays must remain readable by the coverage test");
  return [...vm.runInNewContext(base[1]), ...vm.runInNewContext(extra[1])];
}

function textNodes(html) {
  const withoutScripts = html.replace(/<head[\s\S]*?<\/head>/g, "").replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
  return [...withoutScripts.matchAll(/>([^<>]+)</g)]
    .map((match) => match[1]
      .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
      .replace(/&middot;/g, "·").replace(/&rarr;/g, "→")
      .replace(/&lt;/g, "<").trim().replace(/\s+/g, " "))
    .filter(Boolean);
}

function isTechnicalText(value) {
  return /^\/lotus(?:\b|$)/.test(value)
    || /^[@#]/.test(value)
    || /^(?:Lotus|Lotus Security|Lotus Security System|LOTUS SECURITY|Premium|Wick|Beemo|Security Bot|🪷 Lotus|6\/6 free)$/.test(value)
    || /^(?:channelDelete ×7|60 min|live-log\.gg \/ #lotus-alerts)$/.test(value);
}

test("five-language copy covers all marketing and command text", () => {
  const rows = translationRows();
  const keys = new Set();
  for (const row of rows) {
    assert.equal(row.length, 5, `missing locale for ${row[0]}`);
    assert.ok(row.every((value) => typeof value === "string" && value.trim()), `empty translation for ${row[0]}`);
    assert.ok(!keys.has(row[0]), `duplicate translation key: ${row[0]}`);
    keys.add(row[0]);
  }
  for (const page of pages) {
    const missing = [...new Set(textNodes(read(page)))]
      .filter((value) => /[A-Za-z]/.test(value) && !keys.has(value) && !isTechnicalText(value));
    assert.deepEqual(missing, [], `untranslated visible copy in ${page}`);
  }
});

test("public pages retain language controls, mobile navigation, and working local links", () => {
  for (const locale of ["en", "fr", "es", "de", "pt"]) {
    assert.match(read(`assets/flags/${locale}.svg`), /<svg[^>]+viewBox="0 0 24 16"/);
  }
  assert.match(read("i18n.js"), /class="lotus-flag lotus-current-flag"/);
  assert.doesNotMatch(read("i18n.js"), /<select aria-label="Language"/);
  for (const page of pages) {
    const html = read(page);
    assert.match(html, /<script src="\/i18n\.js" defer><\/script>/);
    assert.match(html, /class="nav-actions"/);
    assert.match(html, /class="nav-mobile-dashboard"/);
    assert.match(html, /class="nav-mobile-invite"/);
  }
  for (const page of [...pages, ...legalPages]) {
    const html = read(page);
    for (const [, href] of html.matchAll(/\bhref="(\/[^"]*)"/g)) {
      const pathname = href.split(/[?#]/)[0];
      const filename = pathname === "/" ? "index.html" : path.extname(pathname) ? pathname.slice(1) : `${pathname.slice(1)}.html`;
      assert.ok(fs.existsSync(path.join(root, filename)), `${page} links to missing ${href}`);
    }
  }
});

test("comparison focuses on documented capabilities and Lotus differentiators", () => {
  const html = read("compare.html");
  assert.equal((html.match(/<tr(?: class="lotus-difference")?>/g) || []).length - 1, 13);
  assert.equal((html.match(/class="lotus-difference"/g) || []).length, 4);
  assert.match(html, /Automatically removes dangerous role permissions/);
  assert.match(html, /Keeps a member quarantined after they leave and return/);
  assert.match(html, /Detects disguised forbidden words/);
  assert.match(html, /Shares sanctions across a community's servers/);
  assert.match(html, /“Not documented” means we did not find that capability/);
  for (const host of ["docs.wickbot.com", "docs.beemo.gg", "docs.securitybot.gg"]) assert.match(html, new RegExp(host.replaceAll(".", "\\.")));
  assert.doesNotMatch(html, /Free plan includes|6\/6 free|only one of the four checked/);
});

test("legal language options stay readable in light and dark browser menus", () => {
  const source = read("legal-i18n.js");
  assert.match(source, /<select aria-label="Language"[^>]*color-scheme:light dark/);
  assert.match(source, /background:var\(--surface,#fff\)/);
  assert.match(source, /color:var\(--text,#222\)/);
});

test("all inline page scripts parse", () => {
  for (const page of [...pages, ...legalPages]) {
    for (const [, script] of read(page).matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
      if (script.trim()) assert.doesNotThrow(() => new vm.Script(script, { filename: page }), `${page} has invalid inline JavaScript`);
    }
  }
});

test("marketing pages hide untranslated copy only until localization runs", () => {
  for (const page of pages) {
    const source = read(page);
    const bootstrap = source.match(/<script>([\s\S]*?)<\/script>/)?.[1];
    assert.ok(bootstrap, `${page} needs an early locale bootstrap`);
    assert.match(source, /html\[data-lotus-locale-pending\] body \{ visibility: hidden; \}/);
    const attributes = new Map();
    let release;
    const document = { documentElement: {
      lang: "en",
      setAttribute: (key, value) => attributes.set(key, value),
      removeAttribute: (key) => attributes.delete(key),
    } };
    vm.runInNewContext(bootstrap, {
      document, location: { search: "?lang=es" }, URLSearchParams,
      localStorage: { getItem: () => "fr" },
      setTimeout: (callback, ms) => { assert.equal(ms, 8000); release = callback; },
    });
    assert.equal(document.documentElement.lang, "es");
    assert.ok(attributes.has("data-lotus-locale-pending"));
    release();
    assert.ok(!attributes.has("data-lotus-locale-pending"));
    vm.runInNewContext(bootstrap, {
      document, location: { search: "?lang=en" }, URLSearchParams,
      localStorage: { getItem: () => "fr" }, setTimeout: () => assert.fail("English must not be gated"),
    });
    assert.equal(document.documentElement.lang, "en");
    assert.ok(!attributes.has("data-lotus-locale-pending"));
  }
  assert.match(read("i18n.js"), /removeAttribute\?\.\("data-lotus-locale-pending"\)/);
  assert.match(read("index.html"), /card\.setAttribute\('data-lotus-locale-pending', ''\)/);
  assert.match(read("i18n.js"), /getElementById\("embed-card"\)\?\.removeAttribute\("data-lotus-locale-pending"\)/);
});

test("legal pages disclose the real deletion behavior in every supported language", () => {
  for (const page of legalPages) assert.match(read(page), /<script src="\/legal-i18n\.js" defer><\/script>/);
  assert.match(read("privacy.html"), /automatically deleted when Discord reports/);
  assert.match(read("confidentialite.html"), /supprimés automatiquement lorsque Discord signale/);
  assert.doesNotMatch(read("confidentialite.html"), /pas<\/strong> supprimées|délai raisonnable/);
  assert.doesNotMatch(read("index.html"), /isn't automated yet/);
  for (const locale of ["es", "de", "pt"]) assert.match(read("legal-i18n.js"), new RegExp(`\\b${locale}:`));
  assert.doesNotMatch(read("i18n.js"), /legalFallback|legal-language-note|available in English and French/i);
});

test("privacy policies disclose the Premium shared-case network guarantees in both languages", () => {
  const en = read("privacy.html");
  assert.match(en, /Last updated: October 23, 2026/);
  for (const re of [
    /Premium shared-case network/,
    /Discord IDs are stored only as keyed hashes/,
    /only the category, the sanction type, whether it was automatic or manual, and the month/,
    /Reasons, usernames, messages, evidence, roles, moderators, warnings, timeouts and the identity of the source server are never shared/,
    /server owner separately opts in to contribute and to consult/,
    /Each case is shared manually/,
    /information-only<\/strong>: it never applies any sanction automatically/,
    /at least 3 distinct qualifying Premium servers/,
    /New contributors wait 7 days/,
    /expire after 12 months/,
    /audit logs are kept for 90 days/,
    /hidden immediately and deleted within 30 days/,
    /server owner can trigger an immediate purge from the dashboard/,
    /currently present in it or who are joining it/,
  ]) assert.match(en, re);

  const fr = read("confidentialite.html");
  assert.match(fr, /Dernière mise à jour : 23 octobre 2026/);
  for (const re of [
    /Réseau Premium de cas partagés/,
    /ID Discord des membres ne sont stockés que sous forme de hachages à clé/,
    /uniquement la catégorie, le type de sanction, l'origine automatique ou manuelle et le mois/,
    /raisons, pseudos, messages, preuves, rôles, modérateurs, avertissements, exclusions temporaires et l'identité du serveur d'origine ne sont jamais partagés/,
    /propriétaire du serveur choisit séparément de contribuer et de consulter/,
    /Chaque cas est partagé manuellement/,
    /purement informatif<\/strong> : il n'applique jamais aucune sanction automatiquement/,
    /au moins 3 serveurs Premium distincts et éligibles/,
    /nouveaux contributeurs attendent 7 jours/,
    /expirent après 12 mois/,
    /journaux d'audit de consultation et de partage sont conservés 90 jours/,
    /masqués immédiatement et supprimés sous 30 jours/,
    /propriétaire du serveur peut déclencher une purge immédiate depuis le tableau de bord/,
    /actuellement présents ou qui le rejoignent/,
  ]) assert.match(fr, re);
});

test("localized privacy pages keep titles, contacts and every Premium shared-case guarantee", () => {
  const expected = {
    "privacy-es.html": { lang: "es", title: "Política de privacidad", updated: "23 de octubre de 2026", checks: [
      /Red Premium de casos compartidos/, /solo informativa<\/strong>: nunca aplica ninguna sanción automáticamente/,
      /únicamente como hashes con clave/, /únicamente la categoría, el tipo de sanción, si fue automática o manual, y el mes/,
      /nunca se comparten/, /decide por separado si contribuye y si consulta/, /Cada caso se comparte manualmente/,
      /al menos 3 servidores Premium distintos/, /esperan 7 días/, /caducan a los 12 meses/, /se conservan 90 días/,
      /se ocultan de inmediato y se eliminan en un plazo de 30 días/, /purga inmediata desde el panel/, /presentes en él en ese momento o que se estén uniendo a él/,
    ] },
    "privacy-de.html": { lang: "de", title: "Datenschutzerklärung", updated: "23. Oktober 2026", checks: [
      /Premium-Netzwerk für geteilte Fälle/, /ausschließlich der Information<\/strong>: Es verhängt niemals automatisch eine Sanktion/,
      /nur als Hashes mit Schlüssel/, /nur die Kategorie, die Art der Sanktion, ob sie automatisch oder manuell erfolgte, und der Monat/,
      /werden niemals geteilt/, /entscheidet getrennt, ob er Fälle beisteuert und ob er das Netzwerk abfragt/, /Jeder Fall wird manuell geteilt/,
      /mindestens 3 verschiedene qualifizierte Premium-Server/, /warten 7 Tage/, /verfallen nach 12 Monaten/, /90 Tage lang aufbewahrt/,
      /sofort ausgeblendet und innerhalb von 30 Tagen gelöscht/, /sofortige Löschung auslösen/, /derzeit auf ihm anwesend sind oder ihm gerade beitreten/,
    ] },
    "privacy-pt.html": { lang: "pt", title: "Política de privacidade", updated: "23 de outubro de 2026", checks: [
      /Rede Premium de casos partilhados/, /apenas informativa<\/strong>: nunca aplica qualquer sanção automaticamente/,
      /apenas sob a forma de hashes com chave/, /apenas a categoria, o tipo de sanção, se foi automática ou manual, e o mês/,
      /nunca são partilhados/, /decide separadamente se contribui e se consulta/, /Cada caso é partilhado manualmente/,
      /pelo menos 3 servidores Premium distintos/, /aguardam 7 dias/, /expiram ao fim de 12 meses/, /conservados durante 90 dias/,
      /imediatamente ocultos e são eliminados no prazo de 30 dias/, /eliminação imediata a partir do painel/, /atualmente presentes nele ou que estejam a aderir a ele/,
    ] },
  };
  const english = read("privacy.html");
  const facts = [
    "lotus.security.bot@gmail.com", "https://discord.gg/qPQRCC9mQF", "https://www.cnil.fr", "MongoDB Atlas", "Oracle Cloud Infrastructure",
    "Discord Inc.", "/lotus case", "/lotus config activitylogs", "/lotus backup", "/lotus mod warn", "micro-entreprise",
  ];
  for (const [page, { lang, title, updated, checks }] of Object.entries(expected)) {
    const html = read(page);
    const slug = page.replace(/\.html$/, "");
    assert.match(html, new RegExp(`<html lang="${lang}">`));
    assert.match(html, new RegExp(`<title>${title} — Lotus Security</title>`));
    assert.match(html, new RegExp(`<h1>${title}</h1>`));
    assert.match(html, new RegExp(`rel="canonical" href="https://lotus-security-tau\\.vercel\\.app/${slug}"`));
    assert.ok(html.includes(updated), `${page} needs the 2026-10-23 date`);
    for (const fact of facts) assert.ok(html.includes(fact), `${page} is missing ${fact}`);
    for (const re of checks) assert.match(html, re, `${page} is missing ${re}`);
    assert.equal(
      [...html.matchAll(/<h2>/g)].length, [...english.matchAll(/<h2>/g)].length,
      `${page} must keep every privacy section`,
    );
    assert.equal([...html.matchAll(/<tr>/g)].length, [...english.matchAll(/<tr>/g)].length);
    assert.equal([...html.matchAll(/<li>/g)].length, [...english.matchAll(/<li>/g)].length);
  }
});

test("privacy routes resolve to the selected language and never show the untranslated warning", () => {
  const source = read("legal-i18n.js");
  const privacy = { en: "/privacy", fr: "/confidentialite", es: "/privacy-es", de: "/privacy-de", pt: "/privacy-pt" };
  function run(pathname, search, saved = "en") {
    const calls = { replaced: null, notes: [], lang: "en", select: null, storage: saved };
    const link = { value: "/privacy", getAttribute() { return this.value; }, setAttribute(name, value) { this.value = value; }, textContent: "Privacy" };
    const select = { add() {}, addEventListener(name, handler) { calls.select = handler; }, value: "" };
    const control = { style: {}, set innerHTML(value) {}, querySelector: () => select };
    const document = {
      body: { append() {} },
      documentElement: { get lang() { return calls.lang; }, set lang(value) { calls.lang = value; } },
      createTreeWalker: () => ({ nextNode: () => false }),
      createElement: (tag) => tag === "label" ? control : { set textContent(value) { calls.notes.push(value); }, style: {} },
      querySelector: () => ({ after() {} }),
      querySelectorAll: () => [link],
    };
    const location = { pathname, search, origin: "https://lotus-security-tau.vercel.app", replace: (url) => { calls.replaced = url; }, href: "" };
    vm.runInNewContext(source, {
      document, location, URL, URLSearchParams, NodeFilter: { SHOW_TEXT: 4 }, Option: class {},
      localStorage: { getItem: () => calls.storage, setItem: (key, value) => { calls.storage = value; } },
    });
    return { calls, link, location, select };
  }
  for (const [locale, target] of Object.entries(privacy)) {
    for (const from of Object.values(privacy)) {
      const result = run(from, `?lang=${locale}`);
      if (from === target) {
        assert.equal(result.calls.replaced, null, `${from}?lang=${locale} must stay put`);
        assert.equal(result.calls.lang, locale);
        assert.deepEqual(result.calls.notes, [], `${locale} privacy must not show the untranslated warning`);
        assert.equal(result.link.value, `/privacy?lang=${locale}`);
      } else {
        assert.equal(result.calls.replaced, `${target}?lang=${locale}`);
      }
    }
  }
  const german = run("/privacy-de", "", "fr");
  assert.equal(german.calls.replaced, null, "a localized privacy page keeps its own language without ?lang");
  assert.equal(german.calls.lang, "de");
  assert.equal(run("/privacy", "", "pt").calls.replaced, "/privacy-pt?lang=pt");
  const switcher = run("/privacy-es", "?lang=es");
  switcher.select.value = "de";
  switcher.calls.select();
  assert.equal(switcher.location.href, "/privacy-de?lang=de");
});

test("terms routes resolve to the selected language and never show the untranslated warning", () => {
  const source = read("legal-i18n.js");
  const terms = { en: "/terms", fr: "/cgu", es: "/terms-es", de: "/terms-de", pt: "/terms-pt" };
  function run(pathname, search, saved = "en") {
    const calls = { replaced: null, notes: [], lang: "en", select: null };
    const link = { value: "/terms", getAttribute() { return this.value; }, setAttribute(name, value) { this.value = value; }, textContent: "Terms" };
    const privacyLink = { value: "/privacy", getAttribute() { return this.value; }, setAttribute(name, value) { this.value = value; }, textContent: "Privacy" };
    const select = { add() {}, addEventListener(name, handler) { calls.select = handler; }, value: "" };
    const control = { style: {}, set innerHTML(value) {}, querySelector: () => select };
    const document = {
      body: { append() {} },
      documentElement: { get lang() { return calls.lang; }, set lang(value) { calls.lang = value; } },
      createTreeWalker: () => ({ nextNode: () => false }),
      createElement: (tag) => tag === "label" ? control : { set textContent(value) { calls.notes.push(value); }, style: {} },
      querySelector: () => ({ after() {} }),
      querySelectorAll: () => [link, privacyLink],
    };
    const location = { pathname, search, origin: "https://lotus-security-tau.vercel.app", replace: (url) => { calls.replaced = url; }, href: "" };
    vm.runInNewContext(source, {
      document, location, URL, URLSearchParams, NodeFilter: { SHOW_TEXT: 4 }, Option: class {},
      localStorage: { getItem: () => saved, setItem() {} },
    });
    return { calls, link, privacyLink, location, select };
  }
  for (const [locale, target] of Object.entries(terms)) {
    for (const from of [...Object.values(terms), "/terms.html", "/cgu.html"]) {
      const result = run(from, `?lang=${locale}`);
      if (from.replace(/\.html$/, "") === target) {
        assert.equal(result.calls.replaced, null, `${from}?lang=${locale} must stay put`);
        assert.equal(result.calls.lang, locale, `${from} must declare lang ${locale}`);
        assert.deepEqual(result.calls.notes, [], `${locale} terms must not show the untranslated warning`);
        assert.equal(result.link.value, `/terms?lang=${locale}`);
        assert.equal(result.privacyLink.value, `/privacy?lang=${locale}`);
      } else {
        assert.equal(result.calls.replaced, `${target}?lang=${locale}`);
      }
    }
  }
  for (const [locale, page] of [["es", "/terms-es"], ["de", "/terms-de"], ["pt", "/terms-pt"], ["fr", "/cgu"]]) {
    const own = run(page, "", "en");
    assert.equal(own.calls.replaced, null, `${page} keeps its own language without ?lang`);
    assert.equal(own.calls.lang, locale);
    assert.deepEqual(own.calls.notes, []);
  }
  assert.equal(run("/terms", "", "pt").calls.replaced, "/terms-pt?lang=pt");
  const switcher = run("/terms-es", "?lang=es");
  switcher.select.value = "de";
  switcher.calls.select();
  assert.equal(switcher.location.href, "/terms-de?lang=de");
});

test("localized terms pages keep every section, legal fact, link and liability guarantee", () => {
  const english = read("terms.html");
  const expected = {
    "terms-es.html": { lang: "es", title: "Condiciones de uso", updated: "16 de septiembre de 2026", checks: [
      /publicado por Tacos/, /no garantiza una detección infalible<\/strong>/, /falso negativo/, /falso positivo/,
      /No se debe ninguna compensación por una interrupción del servicio, tampoco a los servidores Premium/,
      /Condiciones de venta aplicables al plan Premium/, /no podrá ser considerado responsable de los daños directos o indirectos/,
      /legislación francesa/, /tribunales franceses/, /es responsable de su configuración/, /sin autorización escrita del Editor/,
      /Cualquier administrador puede retirar Lotus de su servidor en cualquier momento/,
    ] },
    "terms-de.html": { lang: "de", title: "Nutzungsbedingungen", updated: "16. September 2026", checks: [
      /Herausgeber ist Tacos/, /garantiert diese Automatisierung keine fehlerfreie Erkennung<\/strong>/, /falsch negativ/, /falsch positiv/,
      /Für eine Unterbrechung des Dienstes wird keine Entschädigung geschuldet, auch nicht für Premium-Server/,
      /Verkaufsbedingungen/, /haftet der Herausgeber nicht für direkte oder indirekte Schäden/,
      /französischem Recht/, /französischen Gerichte/, /ist für dessen Konfiguration .* verantwortlich/, /ohne schriftliche Genehmigung des Herausgebers/,
      /Jeder Administrator kann Lotus jederzeit von seinem Server entfernen/,
    ] },
    "terms-pt.html": { lang: "pt", title: "Termos de utilização", updated: "16 de setembro de 2026", checks: [
      /publicado por Tacos/, /não garante uma deteção infalível<\/strong>/, /falso negativo/, /falso positivo/,
      /Não é devida qualquer compensação por uma interrupção do serviço, incluindo para servidores Premium/,
      /Condições de Venda aplicáveis ao plano Premium/, /não pode ser responsabilizado por danos diretos ou indiretos/,
      /lei francesa/, /tribunais franceses/, /é responsável pela respetiva configuração/, /sem autorização escrita do Editor/,
      /Qualquer administrador pode remover o Lotus do seu servidor a qualquer momento/,
    ] },
  };
  const facts = [
    "lotus.security.bot@gmail.com", "https://discord.gg/qPQRCC9mQF", "https://discord.com/terms", 'href="/privacy"',
    "/lotus config", "/lotus thresholds", "/lotus whitelist", "Tacos",
  ];
  assert.ok(english.includes("September 16, 2026"));
  for (const [page, { lang, title, updated, checks }] of Object.entries(expected)) {
    const html = read(page);
    const slug = page.replace(/\.html$/, "");
    assert.ok(fs.existsSync(path.join(root, page)));
    assert.match(html, new RegExp(`<html lang="${lang}">`));
    assert.match(html, new RegExp(`<title>${title} — Lotus Security</title>`));
    assert.match(html, new RegExp(`<h1>${title}</h1>`));
    assert.match(html, new RegExp(`rel="canonical" href="https://lotus-security-tau\\.vercel\\.app/${slug}"`));
    assert.ok(html.includes(updated), `${page} needs the September 16, 2026 date`);
    for (const fact of facts) assert.ok(html.includes(fact), `${page} is missing ${fact}`);
    for (const re of checks) assert.match(html, re, `${page} is missing ${re}`);
    assert.equal([...html.matchAll(/<h2>/g)].length, 14);
    assert.equal([...html.matchAll(/<h2>/g)].length, [...english.matchAll(/<h2>/g)].length, `${page} must keep every terms section`);
    assert.equal([...html.matchAll(/<li>/g)].length, [...english.matchAll(/<li>/g)].length);
    assert.equal([...html.matchAll(/<a /g)].length, [...english.matchAll(/<a /g)].length);
    assert.equal([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).filter((h) => !h.startsWith("data:")).length,
      [...english.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).filter((h) => !h.startsWith("data:")).length);
    assert.match(html, /<script src="\/legal-i18n\.js" defer><\/script>/);
    assert.doesNotMatch(html, /Terms of Use|Last updated/);
  }
  for (const page of ["terms.html", "cgu.html", ...Object.keys(expected)]) {
    for (const [, script] of read(page).matchAll(/<script>([\s\S]*?)<\/script>/g)) assert.doesNotThrow(() => new vm.Script(script));
  }
});

test("legal notice routes resolve to the selected language and never show the untranslated warning", () => {
  const source = read("legal-i18n.js");
  const notice = { en: "/legal-notice", fr: "/mentions-legales", es: "/legal-notice-es", de: "/legal-notice-de", pt: "/legal-notice-pt" };
  function run(pathname, search, saved = "en") {
    const calls = { replaced: null, notes: [], lang: "en", select: null };
    const link = { value: "/legal-notice", getAttribute() { return this.value; }, setAttribute(name, value) { this.value = value; }, textContent: "Legal notice" };
    const termsLink = { value: "/terms", getAttribute() { return this.value; }, setAttribute(name, value) { this.value = value; }, textContent: "Terms" };
    const select = { add() {}, addEventListener(name, handler) { calls.select = handler; }, value: "" };
    const control = { style: {}, set innerHTML(value) {}, querySelector: () => select };
    const document = {
      body: { append() {} },
      documentElement: { get lang() { return calls.lang; }, set lang(value) { calls.lang = value; } },
      createTreeWalker: () => ({ nextNode: () => false }),
      createElement: (tag) => tag === "label" ? control : { set textContent(value) { calls.notes.push(value); }, style: {} },
      querySelector: () => ({ after() {} }),
      querySelectorAll: () => [link, termsLink],
    };
    const location = { pathname, search, origin: "https://lotus-security-tau.vercel.app", replace: (url) => { calls.replaced = url; }, href: "" };
    vm.runInNewContext(source, {
      document, location, URL, URLSearchParams, NodeFilter: { SHOW_TEXT: 4 }, Option: class {},
      localStorage: { getItem: () => saved, setItem() {} },
    });
    return { calls, link, termsLink, location, select };
  }
  for (const [locale, target] of Object.entries(notice)) {
    for (const from of [...Object.values(notice), "/legal-notice.html", "/mentions-legales.html"]) {
      const result = run(from, `?lang=${locale}`);
      if (from.replace(/\.html$/, "") === target) {
        assert.equal(result.calls.replaced, null, `${from}?lang=${locale} must stay put`);
        assert.equal(result.calls.lang, locale, `${from} must declare lang ${locale}`);
        assert.deepEqual(result.calls.notes, [], `${locale} legal notice must not show the untranslated warning`);
        assert.equal(result.link.value, `/legal-notice?lang=${locale}`);
        assert.equal(result.termsLink.value, `/terms?lang=${locale}`);
      } else {
        assert.equal(result.calls.replaced, `${target}?lang=${locale}`);
      }
    }
  }
  for (const [locale, page] of [["en", "/legal-notice"], ["fr", "/mentions-legales"], ["es", "/legal-notice-es"], ["de", "/legal-notice-de"], ["pt", "/legal-notice-pt"]]) {
    const own = run(page, "", locale === "en" ? "pt" : "en");
    if (locale === "en") {
      assert.equal(own.calls.replaced, "/legal-notice-pt?lang=pt", "saved language wins on the English page");
    } else {
      assert.equal(own.calls.replaced, null, `${page} keeps its own language without ?lang`);
      assert.equal(own.calls.lang, locale);
    }
    assert.deepEqual(own.calls.notes, []);
  }
  const switcher = run("/legal-notice-es", "?lang=es");
  switcher.select.value = "de";
  switcher.calls.select();
  assert.equal(switcher.location.href, "/legal-notice-de?lang=de");
  // Every legal document family is fully translated, so the fallback-note feature must stay removed.
  assert.doesNotMatch(source, /const notes\b|translated|todavía no está traducido|noch nicht auf Deutsch|ainda não está traduzido/);
  for (const page of ["legal-i18n.js", ...legalPages]) {
    assert.doesNotMatch(read(page), /todavía no está traducido|noch nicht auf Deutsch verfügbar|ainda não está traduzido|not yet translated/i, `${page} still carries untranslated-warning copy`);
  }
});

test("localized legal notice pages keep every section, legal fact, link and statement", () => {
  const english = read("legal-notice.html");
  const date = english.match(/legal-updated">Last updated: ([^<]+)</)[1];
  assert.equal(date, "September 17, 2026");
  const expected = {
    "legal-notice-es.html": { lang: "es", title: "Aviso legal", updated: "17 de septiembre de 2026", checks: [
      /<strong>no profesional<\/strong> \(persona física, actividad no registrada\)/, /<strong>Editor:<\/strong> Tacos, persona física/,
      /legislación francesa, la dirección postal del editor no tiene que publicarse/, /<h2>Director de la publicación<\/h2>/,
      /<strong>Alojador:<\/strong> Vercel Inc\./, /Oracle Cloud Infrastructure \(Oracle Corporation\)/, /MongoDB Atlas \(MongoDB, Inc\.\)/,
      /Discord Inc\. — usar Lotus implica aceptar los/, /son propiedad de Tacos, salvo indicación en contrario/,
      /Queda prohibida cualquier reproducción, representación o utilización, total o parcial, sin autorización previa/,
      /Lotus no está afiliado a Discord Inc\. ni cuenta con su aval/, /LCEN, art\. 6-III/, /auto-entrepreneur/,
    ] },
    "legal-notice-de.html": { lang: "de", title: "Impressum", updated: "17. September 2026", checks: [
      /<strong>nicht berufsmäßig<\/strong> betrieben \(Privatperson, nicht eingetragene Tätigkeit\)/, /<strong>Herausgeber:<\/strong> Tacos, Privatperson/,
      /Nach französischem Recht muss die Postanschrift des Herausgebers nicht auf der Website veröffentlicht werden/, /<h2>Verantwortlicher für die Veröffentlichung<\/h2>/,
      /<strong>Hosting-Anbieter:<\/strong> Vercel Inc\./, /Oracle Cloud Infrastructure \(Oracle Corporation\)/, /MongoDB Atlas \(MongoDB, Inc\.\)/,
      /Discord Inc\. — die Nutzung von Lotus setzt die Annahme/, /sind Eigentum von Tacos, sofern nicht anders angegeben/,
      /ohne vorherige Genehmigung ist untersagt/, /weder mit Discord Inc\. verbunden noch von ihr unterstützt/, /LCEN, Art\. 6-III/, /auto-entrepreneur/,
    ] },
    "legal-notice-pt.html": { lang: "pt", title: "Aviso legal", updated: "17 de setembro de 2026", checks: [
      /<strong>não profissional<\/strong> \(pessoa singular, atividade não registada\)/, /<strong>Editor:<\/strong> Tacos, pessoa singular/,
      /lei francesa, a morada postal do editor não tem de ser publicada/, /<h2>Diretor da publicação<\/h2>/,
      /<strong>Alojador:<\/strong> Vercel Inc\./, /Oracle Cloud Infrastructure \(Oracle Corporation\)/, /MongoDB Atlas \(MongoDB, Inc\.\)/,
      /Discord Inc\. — a utilização do Lotus implica a aceitação/, /são propriedade de Tacos, salvo indicação em contrário/,
      /É proibida qualquer reprodução, representação ou utilização, total ou parcial, sem autorização prévia/,
      /o Lotus não é afiliado nem aprovado pela Discord Inc\./, /LCEN, art\. 6-III/, /auto-entrepreneur/,
    ] },
  };
  const hrefs = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1])
    .filter((h) => !h.startsWith("data:") && !h.startsWith("https://lotus-security-tau.vercel.app/legal-notice"));
  const facts = [
    "lotus.security.bot@gmail.com", "mailto:lotus.security.bot@gmail.com", "https://vercel.com", "https://discord.com/terms", "https://discord.gg/qPQRCC9mQF",
    "340 S Lemon Ave #4133, Walnut, CA 91789", "Tacos", "Discord Inc.", 'href="/terms"', 'href="/privacy"', 'href="/legal-notice"',
  ];
  for (const page of ["legal-notice.html", "mentions-legales.html", ...Object.keys(expected)]) {
    assert.ok(fs.existsSync(path.join(root, page)), `${page} must exist`);
    assert.equal([...read(page).matchAll(/<h2>/g)].length, 6, `${page} must keep all six sections`);
  }
  for (const [page, { lang, title, updated, checks }] of Object.entries(expected)) {
    const html = read(page);
    const slug = page.replace(/\.html$/, "");
    assert.match(html, new RegExp(`<html lang="${lang}">`));
    assert.match(html, new RegExp(`<title>${title} — Lotus Security</title>`));
    assert.match(html, new RegExp(`<h1>${title}</h1>`));
    assert.match(html, new RegExp(`rel="canonical" href="https://lotus-security-tau\\.vercel\\.app/${slug}"`));
    assert.match(html, new RegExp(`og:url" content="https://lotus-security-tau\\.vercel\\.app/${slug}"`));
    assert.ok(html.includes(updated), `${page} needs the ${date} date`);
    for (const fact of facts) assert.ok(html.includes(fact), `${page} is missing ${fact}`);
    for (const re of checks) assert.match(html, re, `${page} is missing ${re}`);
    assert.equal([...html.matchAll(/<h2>/g)].length, [...english.matchAll(/<h2>/g)].length, `${page} must keep every section`);
    assert.equal([...html.matchAll(/<li>/g)].length, [...english.matchAll(/<li>/g)].length);
    assert.equal([...html.matchAll(/<p[ >]/g)].length, [...english.matchAll(/<p[ >]/g)].length);
    assert.equal([...html.matchAll(/<a /g)].length, [...english.matchAll(/<a /g)].length);
    assert.deepEqual(hrefs(html), hrefs(english), `${page} must keep every URL`);
    assert.match(html, /<script src="\/legal-i18n\.js" defer><\/script>/);
    assert.doesNotMatch(html, /Legal Notice|Last updated|Site publisher|Intellectual property/);
    for (const [, script] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) assert.doesNotThrow(() => new vm.Script(script));
  }
});

test("language switch translates content and preserves locale across site and dashboard links", () => {
  const origin = "https://lotus-security-tau.vercel.app";
  const makeLink = (initial) => {
    const attributes = { href: initial };
    return {
      dataset: {},
      getAttribute: (name) => attributes[name],
      setAttribute: (name, value) => { attributes[name] = value; },
      get href() { return new URL(attributes.href, origin).href; },
      set href(value) { attributes.href = value; },
    };
  };
  const legal = makeLink("/privacy");
  const dashboard = makeLink("https://lotus-dashboard-tau.vercel.app/");
  const node = { nodeValue: "Features", parentElement: { closest: () => false } };
  const summary = { setAttribute(name, value) { this[name] = value; }, focus() {} };
  const languageName = { textContent: "" };
  const currentFlag = { src: "" };
  const options = ["en", "fr", "es", "de", "pt"].map((locale) => ({
    dataset: { locale }, setAttribute(name, value) { this[name] = value; },
  }));
  const label = {
    open: false,
    querySelector(selector) { return ({ summary, ".lotus-language-name": languageName, ".lotus-current-flag": currentFlag })[selector]; },
    querySelectorAll: () => options,
    addEventListener(name, handler) { this[name] = handler; },
  };
  const navActions = { prepend: () => {} };
  const premiumPlan = { dataset: { badge: "MOST PROTECTION" } };
  const infoDot = { setAttribute(name, value) { this[name] = value; } };
  const brand = { setAttribute(name, value) { this[name] = value; } };
  const storage = new Map();
  const document = {
    readyState: "complete", body: {}, documentElement: { lang: "en" },
    createElement: () => label,
    addEventListener() {},
    createTreeWalker: () => ({ currentNode: null, index: 0, nextNode() { if (this.index++) return false; this.currentNode = node; return true; } }),
    querySelector(selector) {
      if (selector === ".nav-actions") return navActions;
      if (selector === ".plan.pro") return premiumPlan;
      if (selector === ".stat-info .info-dot") return infoDot;
      if (selector === "nav .brand") return brand;
      if (selector === 'meta[name="description"]') return { content: "" };
      return null;
    },
    getElementById: () => null,
    querySelectorAll(selector) {
      return selector.includes("lotus-dashboard-tau") ? [dashboard] : selector.startsWith("a[") ? [legal] : [];
    },
  };
  const location = { origin, pathname: "/", search: "?lang=fr", href: `${origin}/?lang=fr` };
  const context = {
    document, location, URL, URLSearchParams,
    NodeFilter: { SHOW_TEXT: 4 },
    MutationObserver: class { observe() {} },
    Option: class { constructor(label, value) { this.label = label; this.value = value; } },
    requestAnimationFrame: (callback) => callback(),
    localStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) },
    history: { replaceState() {} },
  };
  vm.runInNewContext(read("i18n.js"), context);
  assert.equal(node.nodeValue, "Fonctionnalités");
  assert.equal(document.documentElement.lang, "fr");
  assert.equal(currentFlag.src, "/assets/flags/fr.svg");
  assert.equal(premiumPlan.dataset.badge, "PROTECTION MAXIMALE");
  assert.match(infoDot["aria-label"], /rapidité/);
  assert.match(brand["aria-label"], /retour en haut/);
  assert.match(dashboard.href, /[?&]lang=fr/);
  assert.equal(legal.getAttribute("href"), "/confidentialite?lang=fr");

  label.click({ target: { closest: () => options[2] } });
  assert.equal(node.nodeValue, "Funciones");
  assert.equal(document.documentElement.lang, "es");
  assert.equal(currentFlag.src, "/assets/flags/es.svg");
  assert.equal(premiumPlan.dataset.badge, "MÁXIMA PROTECCIÓN");
  assert.match(dashboard.href, /[?&]lang=es/);
  assert.match(brand["aria-label"], /volver arriba/);
  assert.equal(legal.getAttribute("href"), "/privacy?lang=es");
});

test("the Lotus guide is local-only, translated and available on every page family", () => {
  const source = read("assistant.js");
  const styles = read("assets/assistant.css");
  const motionStyles = read("assets/assistant-motion.css");
  assert.doesNotThrow(() => new vm.Script(source));
  assert.doesNotMatch(source, /\bfetch\s*\(|XMLHttpRequest|WebSocket|EventSource|OPENAI|ANTHROPIC/i);
  for (const locale of ["en", "fr", "es", "de", "pt"]) assert.match(source, new RegExp(`\\b${locale}: \\[`));
  assert.match(read("i18n.js"), /\/assistant\.js/);
  assert.match(read("legal-i18n.js"), /\/assistant\.js/);
  assert.match(source, /label\[for='lotus-help-input'\][\s\S]*textContent = ui\[2\]/);
  assert.match(source, /function resetAnswer\(\)[\s\S]*answer\.hidden = true/);
  assert.match(read("assets/style.css"), /\.lotus-help-panel\s*\{\s*padding-block:\s*0/);
  assert.match(source, /panel\.style\.paddingBlock = "0"/);
  assert.match(source, /GUIDE LOCAL · PAS UNE IA/);
  assert.match(source, /j ai une question/);
  assert.match(source, /probleme problème souci bug panne marche fonctionne/);
  assert.match(source, /function closeEnough/);
  assert.match(source, /show\(findTopic\(input\.value\)\)/);
  assert.match(source, /classList\.add\("is-reacting"\)/);
  for (const animation of ["lotusHelpBreatheNatural", "lotusHelpAvatarBreathe", "lotusHelpReactionNatural", "lotusHelpAuraNatural"]) assert.match(motionStyles, new RegExp(animation));
  assert.match(styles, /prefers-reduced-motion:reduce/);
  assert.match(motionStyles, /prefers-reduced-motion: reduce/);
  assert.match(source, /pointermove[\s\S]*--look-x[\s\S]*pointerleave/);
  assert.match(source, /lotus-help-avatar/);
  assert.doesNotMatch(source, /lotus-help-blink/);
  assert.doesNotMatch(motionStyles, /lotusHelpBlinkNatural/);
  assert.match(read("i18n.js"), /assistant-motion\.css/);
  assert.ok(fs.statSync(path.join(root, "assets", "lotus-guardian.webp")).size < 100_000);
});

test("the hero demonstration never blanks or enters a Chromium-unsafe 3D layer", () => {
  const page = read("index.html");
  const styles = read("assets/style.css");
  assert.doesNotMatch(page, /card\.style\.opacity\s*=\s*0/);
  assert.doesNotMatch(page, /rotateY\(|rotateX\(/);
  assert.doesNotMatch(styles, /transform-style:\s*preserve-3d/);
  assert.match(page, /classList\.add\('is-switching'\)/);
  assert.match(styles, /\.embed-card\.is-switching\s*>\s*\*/);
});

test("the visual identity fonts are self-hosted and do not block on Google", () => {
  const styles = read("assets/style.css");
  assert.doesNotMatch(styles, /fonts\.(?:googleapis|gstatic)\.com/);
  for (const file of ["familjen-grotesk-latin.woff2", "jetbrains-mono-latin.woff2", "unbounded-latin.woff2"]) {
    assert.ok(fs.statSync(path.join(root, "assets", "fonts", file)).size > 1_000);
    assert.match(styles, new RegExp(file.replace(".", "\\.")));
  }
});
