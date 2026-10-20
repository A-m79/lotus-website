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

test("legal pages disclose the real deletion behavior and keep language fallback", () => {
  for (const page of legalPages) assert.match(read(page), /<script src="\/legal-i18n\.js" defer><\/script>/);
  assert.match(read("privacy.html"), /automatically deleted when Discord reports/);
  assert.match(read("confidentialite.html"), /supprimés automatiquement lorsque Discord signale/);
  assert.doesNotMatch(read("confidentialite.html"), /pas<\/strong> supprimées|délai raisonnable/);
  assert.doesNotMatch(read("index.html"), /isn't automated yet/);
  for (const locale of ["es", "de", "pt"]) assert.match(read("legal-i18n.js"), new RegExp(`\\b${locale}:`));
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
