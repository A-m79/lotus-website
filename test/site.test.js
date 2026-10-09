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
    || /^(?:channelDelete ×7|14 in 12s|< 1 day|60 min|live-log\.gg \/ #lotus-alerts)$/.test(value);
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

test("legal pages disclose the real deletion behavior and keep language fallback", () => {
  for (const page of legalPages) assert.match(read(page), /<script src="\/legal-i18n\.js" defer><\/script>/);
  assert.match(read("privacy.html"), /not<\/strong> automatically deleted/);
  assert.match(read("confidentialite.html"), /pas<\/strong> supprimées/);
  assert.doesNotMatch(read("confidentialite.html"), /supprimés dans un délai raisonnable après son retrait/);
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
  const select = {
    value: "en", add: () => {}, setAttribute: () => {},
    addEventListener(name, handler) { if (name === "change") this.change = handler; },
  };
  const screenReaderLabel = { textContent: "" };
  const label = { querySelector: (selector) => selector === "select" ? select : screenReaderLabel };
  const navActions = { prepend: () => {} };
  const storage = new Map();
  const document = {
    readyState: "complete", body: {}, documentElement: { lang: "en" },
    createElement: () => label,
    createTreeWalker: () => ({ currentNode: null, index: 0, nextNode() { if (this.index++) return false; this.currentNode = node; return true; } }),
    querySelector(selector) {
      if (selector === ".nav-actions") return navActions;
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
  assert.match(dashboard.href, /[?&]lang=fr/);
  assert.equal(legal.getAttribute("href"), "/confidentialite?lang=fr");

  select.value = "es";
  select.change();
  assert.equal(node.nodeValue, "Funciones");
  assert.equal(document.documentElement.lang, "es");
  assert.match(dashboard.href, /[?&]lang=es/);
  assert.equal(legal.getAttribute("href"), "/privacy?lang=es");
});
