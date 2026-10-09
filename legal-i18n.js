(() => {
  const names = { en: "🇬🇧 English", fr: "🇫🇷 Français", es: "🇪🇸 Español", de: "🇩🇪 Deutsch", pt: "🇵🇹 Português" };
  const pairs = {
    "/privacy": { en: "/privacy", fr: "/confidentialite" },
    "/confidentialite": { en: "/privacy", fr: "/confidentialite" },
    "/terms": { en: "/terms", fr: "/cgu" },
    "/cgu": { en: "/terms", fr: "/cgu" },
    "/legal-notice": { en: "/legal-notice", fr: "/mentions-legales" },
    "/mentions-legales": { en: "/legal-notice", fr: "/mentions-legales" },
  };
  const notes = {
    es: "Este documento legal todavía no está traducido al español. Se muestra la versión inglesa; también existe una versión francesa.",
    de: "Dieses Rechtsdokument ist noch nicht auf Deutsch verfügbar. Die englische Fassung wird angezeigt; eine französische Fassung ist ebenfalls vorhanden.",
    pt: "Este documento legal ainda não está traduzido para português. É mostrada a versão inglesa; também existe uma versão francesa.",
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
  const frenchPage = ["/confidentialite", "/cgu", "/mentions-legales"].includes(path);
  const locale = Object.hasOwn(names, requested) ? requested : frenchPage ? "fr" : Object.hasOwn(names, saved) ? saved : "en";
  try { localStorage.setItem("lotus-language", locale); } catch {}
  const target = locale === "fr" ? currentPair.fr : currentPair.en;
  if (path !== target) {
    location.replace(`${target}?lang=${locale}`);
    return;
  }
  document.documentElement.lang = locale === "fr" ? "fr" : "en";
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement?.closest("script,style,.legal-doc")) continue;
    const key = node.nodeValue.trim();
    if (common[key]?.[locale]) node.nodeValue = node.nodeValue.replace(key, common[key][locale]);
  }
  const control = document.createElement("label");
  control.style.cssText = "position:fixed;z-index:100;top:72px;right:16px;background:var(--surface,#fff);border:1px solid var(--border,#ddd);border-radius:12px;padding:8px;color:var(--text,#222);box-shadow:0 8px 28px #0002";
  control.innerHTML = '<span style="position:absolute;clip:rect(0,0,0,0)">Language</span><select aria-label="Language" style="border:0;background:transparent;color:inherit;font:inherit;cursor:pointer"></select>';
  const select = control.querySelector("select");
  for (const [code, name] of Object.entries(names)) select.add(new Option(name, code));
  select.value = locale;
  select.addEventListener("change", () => {
    const next = select.value;
    try { localStorage.setItem("lotus-language", next); } catch {}
    location.href = (next === "fr" ? currentPair.fr : currentPair.en) + `?lang=${next}`;
  });
  document.body.append(control);
  if (notes[locale]) {
    const note = document.createElement("p");
    note.textContent = notes[locale];
    note.style.cssText = "max-width:900px;margin:18px auto 0;padding:12px 16px;border:1px solid var(--border,#ddd);border-radius:12px;color:var(--text,#222);background:var(--surface,#fff);font-size:14px";
    document.querySelector("nav")?.after(note);
  }
  for (const link of document.querySelectorAll('a[href^="/"]')) {
    const original = link.getAttribute("href");
    const url = new URL(original === "/#setup" && link.textContent.trim() === (common.Commands[locale] || "Commands") ? "/commands.html" : original, location.origin);
    url.searchParams.set("lang", locale);
    link.setAttribute("href", url.pathname + url.search + url.hash);
  }
})();
