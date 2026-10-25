(() => {
  const names = { en: "🇬🇧 English", fr: "🇫🇷 Français", es: "🇪🇸 Español", de: "🇩🇪 Deutsch", pt: "🇵🇹 Português" };
  const privacy = { en: "/privacy", fr: "/confidentialite", es: "/privacy-es", de: "/privacy-de", pt: "/privacy-pt" };
  const terms = { en: "/terms", fr: "/cgu", es: "/terms-es", de: "/terms-de", pt: "/terms-pt" };
  const legalNotice = { en: "/legal-notice", fr: "/mentions-legales", es: "/legal-notice-es", de: "/legal-notice-de", pt: "/legal-notice-pt" };
  const pairs = {
    "/privacy": privacy,
    "/confidentialite": privacy,
    "/privacy-es": privacy,
    "/privacy-de": privacy,
    "/privacy-pt": privacy,
    "/terms": terms,
    "/cgu": terms,
    "/terms-es": terms,
    "/terms-de": terms,
    "/terms-pt": terms,
    "/legal-notice": legalNotice,
    "/mentions-legales": legalNotice,
    "/legal-notice-es": legalNotice,
    "/legal-notice-de": legalNotice,
    "/legal-notice-pt": legalNotice,
  };
  const common = {
    Features: { fr: "Fonctionnalités", es: "Funciones", de: "Funktionen", pt: "Funcionalidades" },
    Setup: { fr: "Installation", es: "Configuración", de: "Einrichtung", pt: "Configuração" },
    Pricing: { fr: "Tarifs", es: "Precios", de: "Preise", pt: "Preços" },
    Commands: { fr: "Commandes", es: "Comandos", de: "Befehle", pt: "Comandos" },
    Support: { fr: "Assistance", es: "Ayuda", de: "Support", pt: "Suporte" },
    Legal: { fr: "Juridique", es: "Legal", de: "Rechtliches", pt: "Informações legais" },
    "Add to Discord": { fr: "Ajouter à Discord", es: "Añadir a Discord", de: "Zu Discord hinzufügen", pt: "Adicionar ao Discord" },
    "Legal notice": { fr: "Mentions légales", es: "Aviso legal", de: "Impressum", pt: "Aviso legal" },
    "Terms of use": { fr: "Conditions d'utilisation", es: "Condiciones de uso", de: "Nutzungsbedingungen", pt: "Termos de utilização" },
    "Privacy policy": { fr: "Politique de confidentialité", es: "Política de privacidad", de: "Datenschutzerklärung", pt: "Política de privacidade" },
    "Built for communities that take security seriously.": { fr: "Conçu pour les communautés qui prennent la sécurité au sérieux.", es: "Creado para comunidades que se toman la seguridad en serio.", de: "Für Communities, die Sicherheit ernst nehmen.", pt: "Criado para comunidades que levam a segurança a sério." },
  };
  const path = location.pathname.replace(/\.html$/, "");
  const currentPair = pairs[path];
  if (!currentPair) return;
  const params = new URLSearchParams(location.search);
  let saved = "en";
  try { saved = localStorage.getItem("lotus-language") || "en"; } catch {}
  const requested = params.get("lang");
  const pageLocale = ["/confidentialite", "/cgu", "/mentions-legales"].includes(path) ? "fr" : Object.keys(currentPair).find((code) => code !== "en" && currentPair[code] === path);
  const locale = Object.hasOwn(names, requested) ? requested : pageLocale || (Object.hasOwn(names, saved) ? saved : "en");
  try { localStorage.setItem("lotus-language", locale); } catch {}
  const target = currentPair[locale];
  if (path !== target) {
    location.replace(`${target}?lang=${locale}`);
    return;
  }
  document.documentElement.lang = locale;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement?.closest("script,style,.legal-doc")) continue;
    const key = node.nodeValue.trim();
    if (common[key]?.[locale]) node.nodeValue = node.nodeValue.replace(key, common[key][locale]);
  }
  const control = document.createElement("label");
  control.style.cssText = "position:fixed;z-index:100;top:72px;right:16px;background:var(--surface,#fff);border:1px solid var(--border,#ddd);border-radius:12px;padding:8px;color:var(--text,#222);box-shadow:0 8px 28px #0002";
  // Tell the browser that this native control supports both colour schemes.
  // Without it, Chromium on Windows can open a white option list while the
  // options keep the page's light-on-dark text colour, making them unreadable.
  control.innerHTML = '<span style="position:absolute;clip:rect(0,0,0,0)">Language</span><select aria-label="Language" style="border:0;background:var(--surface,#fff);color:var(--text,#222);color-scheme:light dark;font:inherit;cursor:pointer"></select>';
  const select = control.querySelector("select");
  for (const [code, name] of Object.entries(names)) select.add(new Option(name, code));
  select.value = locale;
  select.addEventListener("change", () => {
    const next = select.value;
    try { localStorage.setItem("lotus-language", next); } catch {}
    location.href = currentPair[next] + `?lang=${next}`;
  });
  document.body.append(control);
  for (const link of document.querySelectorAll('a[href^="/"]')) {
    const original = link.getAttribute("href");
    const url = new URL(original === "/#setup" && link.textContent.trim() === (common.Commands[locale] || "Commands") ? "/commands.html" : original, location.origin);
    url.searchParams.set("lang", locale);
    link.setAttribute("href", url.pathname + url.search + url.hash);
  }
})();

// The legal pages share the same local, zero-network help companion.
(() => {
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "/assets/assistant.css?v=20261025-2";
  const host = document.head || document.body;
  const append = host?.appendChild || host?.append;
  if (typeof append !== "function") return;
  append.call(host, style);
  const motionStyle = document.createElement("link");
  motionStyle.rel = "stylesheet";
  motionStyle.href = "/assets/assistant-motion.css?v=20261025-2";
  append.call(host, motionStyle);
  const script = document.createElement("script");
  script.src = "/assistant.js?v=20261025-4";
  script.defer = true;
  append.call(host, script);
})();
