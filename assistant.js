(() => {
  "use strict";
  const supported = ["en", "fr", "es", "de", "pt"];
  let locale = supported.includes(document.documentElement.lang) ? document.documentElement.lang : "en";
  const allUi = {
    en: ["Need a hand?", "I recognise common Lotus questions locally. Choose a topic or describe what is giving you trouble.", "Describe the topic: setup, error, permissions…", "Find", "Suggested questions", "Local guide · no AI · nothing is sent", "Close help", "Open Lotus help", "I did not recognise that topic. I am a local guide, not a general AI: try setup, protection, permissions, Premium, privacy or support.", "LOCAL GUIDE · NOT AI", "Luma, local Lotus guide"],
    fr: ["Besoin d’un coup de main ?", "Je reconnais localement les questions courantes sur Lotus. Choisis un thème ou décris ce qui te pose problème.", "Décris le sujet : setup, erreur, permissions…", "Trouver", "Questions suggérées", "Guide local · sans IA · rien n’est envoyé", "Fermer l’aide", "Ouvrir l’aide Lotus", "Je n’ai pas reconnu ce sujet. Je suis un guide local, pas une IA généraliste : essaie installation, protection, permissions, Premium, confidentialité ou support.", "GUIDE LOCAL · PAS UNE IA", "Luma, guide local Lotus"],
    es: ["¿Necesitas ayuda?", "Reconozco localmente preguntas habituales sobre Lotus. Elige un tema o describe qué falla.", "Describe el tema: setup, error, permisos…", "Buscar", "Preguntas sugeridas", "Guía local · sin IA · no se envía nada", "Cerrar ayuda", "Abrir la ayuda de Lotus", "No he reconocido ese tema. Soy una guía local, no una IA general: prueba instalación, protección, permisos, Premium, privacidad o soporte.", "GUÍA LOCAL · NO ES IA", "Luma, guía local de Lotus"],
    de: ["Brauchst du Hilfe?", "Ich erkenne häufige Lotus-Fragen lokal. Wähle ein Thema oder beschreibe das Problem.", "Thema beschreiben: Setup, Fehler, Rechte…", "Suchen", "Vorgeschlagene Fragen", "Lokaler Guide · keine KI · nichts wird gesendet", "Hilfe schließen", "Lotus-Hilfe öffnen", "Dieses Thema habe ich nicht erkannt. Ich bin ein lokaler Guide, keine allgemeine KI: versuche Setup, Schutz, Rechte, Premium, Datenschutz oder Support.", "LOKALER GUIDE · KEINE KI", "Luma, lokaler Lotus-Guide"],
    pt: ["Precisas de ajuda?", "Reconheço localmente perguntas comuns sobre o Lotus. Escolhe um tema ou descreve o problema.", "Descreve o tema: setup, erro, permissões…", "Procurar", "Perguntas sugeridas", "Guia local · sem IA · nada é enviado", "Fechar ajuda", "Abrir a ajuda Lotus", "Não reconheci esse tema. Sou um guia local, não uma IA geral: tenta instalação, proteção, permissões, Premium, privacidade ou suporte.", "GUIA LOCAL · NÃO É IA", "Luma, guia local Lotus"],
  };
  let ui = allUi[locale];
  const topics = [
    {
      id: "guide", keys: "aide help question bonjour salut hello luma guide ia intelligence artificielle capacités capacites",
      title: ["What can Luma help with?", "Avec quoi Luma peut aider ?", "¿Con qué puede ayudar Luma?", "Wobei kann Luma helfen?", "Em que pode a Luma ajudar?"],
      answer: [
        "Luma is a local help guide, not a conversational AI. It recognises setup, protections, permissions, errors, Premium, privacy and support. Your text stays in this browser and no API is called.",
        "Luma est un guide d’aide local, pas une IA de conversation. Elle reconnaît l’installation, les protections, les permissions, les erreurs, Premium, la confidentialité et le support. Ton texte reste dans ce navigateur et aucune API n’est appelée.",
        "Luma es una guía local, no una IA conversacional. Reconoce instalación, protecciones, permisos, errores, Premium, privacidad y soporte. Tu texto permanece en este navegador.",
        "Luma ist ein lokaler Hilfe-Guide und keine Dialog-KI. Sie erkennt Einrichtung, Schutz, Rechte, Fehler, Premium, Datenschutz und Support. Dein Text bleibt im Browser.",
        "A Luma é um guia local, não uma IA de conversa. Reconhece instalação, proteções, permissões, erros, Premium, privacidade e suporte. O texto fica no navegador.",
      ],
    },
    {
      keys: "install setup invite add ajouter installer configurar einrichten adicionar convidar",
      title: ["How do I install Lotus?", "Comment installer Lotus ?", "¿Cómo instalo Lotus?", "Wie installiere ich Lotus?", "Como instalo o Lotus?"],
      answer: [
        "Open the dashboard, choose a server you manage, add Lotus, then run /lotus setup in Discord.",
        "Ouvre le dashboard, choisis un serveur que tu gères, ajoute Lotus, puis lance /lotus setup dans Discord.",
        "Abre el panel, elige un servidor que administres, añade Lotus y ejecuta /lotus setup en Discord.",
        "Öffne das Dashboard, wähle einen verwalteten Server, füge Lotus hinzu und führe /lotus setup in Discord aus.",
        "Abre o painel, escolhe um servidor que giras, adiciona o Lotus e executa /lotus setup no Discord.",
      ], href: "https://lotus-dashboard-tau.vercel.app/login",
    },
    {
      keys: "protect protection security sécurité antinuke raid spam phishing schutz sicherheit proteger",
      title: ["What does Lotus protect?", "Que protège Lotus ?", "¿Qué protege Lotus?", "Was schützt Lotus?", "O que protege o Lotus?"],
      answer: [
        "Lotus watches destructive actions, raids, spam, phishing, suspicious new accounts and dangerous permission changes.",
        "Lotus surveille les actions destructrices, raids, spam, phishing, nouveaux comptes suspects et permissions dangereuses.",
        "Lotus vigila acciones destructivas, raids, spam, phishing, cuentas sospechosas y permisos peligrosos.",
        "Lotus überwacht zerstörerische Aktionen, Raids, Spam, Phishing, verdächtige Konten und gefährliche Berechtigungen.",
        "O Lotus vigia ações destrutivas, raids, spam, phishing, contas suspeitas e permissões perigosas.",
      ], href: "/index.html#features",
    },
    {
      keys: "unavailable indisponible erreur error offline status probleme problème souci bug panne marche fonctionne disconnected hors ligne funktioniert indisponível erro problema",
      title: ["Lotus is not working", "Lotus ne fonctionne pas", "Lotus no funciona", "Lotus funktioniert nicht", "O Lotus não funciona"],
      answer: ["Check the live status, then the bot role and permissions. Run /lotus repair if a permission or security channel is missing.", "Vérifie le statut en direct, puis le rôle et les permissions du bot. Lance /lotus repair s’il manque une permission ou un salon de sécurité.", "Comprueba el estado, el rol y los permisos del bot. Ejecuta /lotus repair si falta algo.", "Prüfe Live-Status, Bot-Rolle und Rechte. Führe bei Bedarf /lotus repair aus.", "Verifica o estado, o cargo e as permissões do bot. Executa /lotus repair se faltar algo."],
      href: "/status.html",
    },
    {
      keys: "permission permissions autorisation droit droits role rôle admin administrateur accès acces forbidden denied manque missing berechtigung rechte rolle permisos permiso administrador permissões permissão cargo",
      title: ["Why does Lotus need permissions?", "Pourquoi Lotus demande des permissions ?", "¿Por qué necesita permisos Lotus?", "Warum braucht Lotus Berechtigungen?", "Porque precisa o Lotus de permissões?"],
      answer: ["Lotus only needs the permissions required for enabled protections. Place its role high enough, then run /lotus repair if something is missing.", "Lotus n’a besoin que des permissions des protections activées. Place son rôle assez haut, puis lance /lotus repair s’il manque quelque chose.", "Lotus solo necesita los permisos necesarios. Coloca su rol suficientemente alto y ejecuta /lotus repair si falta algo.", "Lotus benötigt nur die nötigen Rechte. Ordne seine Rolle hoch genug ein und führe bei Bedarf /lotus repair aus.", "O Lotus só precisa das permissões necessárias. Coloca o cargo suficientemente alto e executa /lotus repair se faltar algo."],
      href: "/commands.html",
    },
    {
      keys: "free gratuit price prix premium paid abonnement subscription precio kostenlos preis pagamento preço",
      title: ["Is Lotus free?", "Lotus est-il gratuit ?", "¿Lotus es gratuito?", "Ist Lotus kostenlos?", "O Lotus é gratuito?"],
      answer: [
        "Core anti-nuke, anti-raid and anti-spam protection is free. Premium adds advanced protections and operations for one server; billing is not open yet.",
        "Les protections principales anti-nuke, anti-raid et anti-spam sont gratuites. Premium ajoute des protections et opérations avancées pour un serveur ; la facturation n’est pas encore ouverte.",
        "Las protecciones principales son gratuitas. Premium añade protecciones y operaciones avanzadas para un servidor; la facturación aún no está abierta.",
        "Die wichtigsten Schutzfunktionen sind kostenlos. Premium ergänzt erweiterte Funktionen für einen Server; die Abrechnung ist noch nicht geöffnet.",
        "As proteções principais são gratuitas. O Premium acrescenta funções avançadas para um servidor; a faturação ainda não está aberta.",
      ], href: "/index.html#pricing",
    },
    {
      keys: "command commands commande commandes slash befehl befehle comando comandos",
      title: ["Where are the commands?", "Où trouver les commandes ?", "¿Dónde están los comandos?", "Wo finde ich die Befehle?", "Onde estão os comandos?"],
      answer: [
        "The command guide lists every public Lotus command, required permission and dashboard equivalent.",
        "Le guide réunit toutes les commandes publiques Lotus, la permission nécessaire et leur équivalent dans le dashboard.",
        "La guía reúne todos los comandos públicos, el permiso necesario y su equivalente en el panel.",
        "Die Übersicht zeigt alle öffentlichen Befehle, nötigen Berechtigungen und Dashboard-Entsprechungen.",
        "O guia reúne todos os comandos públicos, a permissão necessária e o equivalente no painel.",
      ], href: "/commands.html",
    },
    {
      keys: "privacy privé prive confidentialite confidentialité data données donnees rgpd collecte stocke stockage tracking datenschutz daten privacidad datos privacidade dados",
      title: ["Are my questions or data sent?", "Mes questions ou données sont-elles envoyées ?", "¿Se envían mis preguntas o datos?", "Werden meine Fragen oder Daten gesendet?", "As minhas perguntas ou dados são enviados?"],
      answer: ["Luma analyses this request only in your browser and sends nothing to a server or AI service. Read the privacy policy for Lotus data.", "Luma analyse cette demande uniquement dans ton navigateur et n’envoie rien à un serveur ou à une IA. Consulte la politique de confidentialité pour les données Lotus.", "Luma analiza esta solicitud solo en tu navegador y no envía nada a servidores ni a IA.", "Luma analysiert diese Anfrage nur im Browser und sendet nichts an Server oder KI.", "A Luma analisa este pedido apenas no navegador e não envia nada para servidores ou IA."],
      href: "/privacy.html",
    },
    {
      keys: "support contact humain human personne équipe equipe discord assistance contacter contacto humano ajuda pessoa apoio",
      title: ["I still need help", "J’ai encore besoin d’aide", "Todavía necesito ayuda", "Ich brauche weitere Hilfe", "Ainda preciso de ajuda"],
      answer: ["Join the Lotus support server and describe the feature and visible error. Never post a password, token or authentication code.", "Rejoins le serveur de support Lotus et indique la fonction et l’erreur visible. Ne publie jamais de mot de passe, token ou code d’authentification.", "Únete al servidor de soporte y describe la función y el error visible. Nunca publiques contraseñas, tokens ni códigos.", "Tritt dem Supportserver bei und nenne Funktion und Fehler. Teile niemals Passwort, Token oder Authentifizierungscode.", "Entra no servidor de suporte e indica a função e o erro. Nunca publiques palavras-passe, tokens ou códigos."],
      href: "https://discord.gg/qPQRCC9mQF",
    },
  ];
  let li = supported.indexOf(locale);
  const root = document.createElement("aside");
  root.className = "lotus-help";
  root.setAttribute("data-lotus-locale-managed", "");
  const lumaFace = `<img src="/assets/lotus-guardian.webp" alt="" draggable="false">`;
  root.innerHTML = `<section class="lotus-help-panel" role="dialog" aria-label="${ui[10]}" hidden><header><span class="lotus-help-avatar" aria-hidden="true">${lumaFace}</span><div><i></i><span><strong>${ui[10]}</strong><small class="lotus-help-mode">${ui[9]}</small></span></div><button type="button" aria-label="${ui[6]}">×</button></header><div class="lotus-help-body"><h2>${ui[0]}</h2><p class="lotus-help-intro">${ui[1]}</p><div class="lotus-help-answer" aria-live="polite" hidden><strong></strong><p></p><a></a></div><form><label class="assistive" for="lotus-help-input">${ui[2]}</label><input id="lotus-help-input" maxlength="160" placeholder="${ui[2]}"><button>${ui[3]}</button></form><small>${ui[4]}</small><div class="lotus-help-topics"></div></div><footer>${ui[5]}</footer></section><button class="lotus-help-orb" type="button" aria-label="${ui[7]}" aria-expanded="false">${lumaFace}<span class="lotus-help-badge">?</span></button>`;
  const panel = root.querySelector(".lotus-help-panel");
  // Marketing pages give every <section> large vertical spacing. This dialog
  // is also a section, so reset it inline to stay correct even with cached CSS.
  panel.style.paddingBlock = "0";
  const orb = root.querySelector(".lotus-help-orb");
  const answer = root.querySelector(".lotus-help-answer");
  const intro = root.querySelector(".lotus-help-intro");
  const topicBox = root.querySelector(".lotus-help-topics");
  const input = root.querySelector("input");
  const stopWords = new Set(["avec", "comment", "dans", "does", "eine", "esta", "faire", "for", "have", "lotus", "mein", "para", "pour", "que", "quel", "quelle", "the", "une", "what", "with"]);
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/['’]/g, " ").replace(/[^a-z0-9 -]/g, " ").replace(/\s+/g, " ").trim();
  function closeEnough(a, b) {
    if (a === b) return true;
    if (a.length < 5 || b.length < 5 || Math.abs(a.length - b.length) > 1) return false;
    let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let i = 1; i <= a.length; i += 1) {
      const current = [i];
      for (let j = 1; j <= b.length; j += 1) current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + Number(a[i - 1] !== b[j - 1]));
      previous = current;
    }
    return previous[b.length] <= 1;
  }
  function findTopic(value) {
    const normalized = normalize(value);
    if (!normalized) return null;
    if (/^(aide|aidez moi|bonjour|hello|help|hey|ia|intelligence artificielle|j ai une question|question|salut|tu es qui|qui es tu)$/.test(normalized)) return topics.find((topic) => topic.id === "guide");
    const tokens = normalized.split(" ").filter((token) => (token.length > 2 || token === "ia") && !stopWords.has(token));
    let best = null;
    for (const topic of topics) {
      const terms = new Set(normalize(`${topic.keys} ${topic.title[li]}`).split(" ").filter(Boolean));
      let score = normalized.includes(normalize(topic.title[li])) ? 12 : 0;
      for (const token of tokens) {
        if (terms.has(token)) score += 4;
        else if ([...terms].some((term) => term.length >= 4 && (term.startsWith(token) || token.startsWith(term)))) score += 2;
        else if ([...terms].some((term) => closeEnough(token, term))) score += 2;
      }
      if (!best || score > best.score) best = { topic, score };
    }
    return best?.score >= 2 ? best.topic : null;
  }
  function show(topic) {
    intro.textContent = topic ? ui[1] : ui[8];
    answer.hidden = !topic;
    root.classList.toggle("has-answer", Boolean(topic));
    root.classList.remove("is-reacting");
    if (!topic) return;
    void root.offsetWidth;
    root.classList.add("is-reacting");
    answer.querySelector("strong").textContent = topic.title[li];
    answer.querySelector("p").textContent = topic.answer[li];
    const link = answer.querySelector("a");
    link.hidden = !topic.href;
    if (topic.href) { link.href = topic.href; link.textContent = `${topic.title[li]} →`; }
  }
  function resetAnswer() {
    intro.textContent = ui[1];
    answer.hidden = true;
    root.classList.remove("has-answer");
  }
  function renderTopics() {
    topicBox.replaceChildren();
    for (const topic of topics.slice(0, 5)) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = topic.title[li];
      button.addEventListener("click", () => show(topic));
      topicBox.append(button);
    }
  }
  renderTopics();
  function toggle(force) {
    const open = typeof force === "boolean" ? force : panel.hidden;
    panel.hidden = !open;
    root.classList.toggle("is-open", open);
    orb.setAttribute("aria-expanded", String(open));
    orb.setAttribute("aria-label", open ? ui[6] : ui[7]);
    if (open) input.focus();
  }
  orb.addEventListener("click", () => toggle());
  orb.addEventListener("pointermove", (event) => {
    const bounds = orb.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
    orb.style.setProperty("--look-x", `${(x * 3.5).toFixed(2)}px`);
    orb.style.setProperty("--look-y", `${(y * 2.5).toFixed(2)}px`);
    orb.style.setProperty("--look-r", `${(x * 2.2).toFixed(2)}deg`);
  });
  orb.addEventListener("pointerleave", () => {
    orb.style.removeProperty("--look-x");
    orb.style.removeProperty("--look-y");
    orb.style.removeProperty("--look-r");
  });
  root.querySelector(".lotus-help-avatar img").addEventListener("animationend", (event) => {
    if (["lotusHelpReactionNatural", "lotusHelpReactionReduced"].includes(event.animationName)) root.classList.remove("is-reacting");
  });
  root.querySelector("header button").addEventListener("click", () => toggle(false));
  root.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    show(findTopic(input.value));
  });
  window.addEventListener("lotus:locale", (event) => {
    const next = supported.includes(event.detail) ? event.detail : "en";
    if (next === locale) return;
    locale = next;
    li = supported.indexOf(locale);
    ui = allUi[locale];
    panel.setAttribute("aria-label", ui[10]);
    root.querySelector("header strong").textContent = ui[10];
    root.querySelector(".lotus-help-mode").textContent = ui[9];
    root.querySelector(".lotus-help-body h2").textContent = ui[0];
    root.querySelector("label[for='lotus-help-input']").textContent = ui[2];
    input.placeholder = ui[2];
    root.querySelector("form button").textContent = ui[3];
    root.querySelector(".lotus-help-body > small").textContent = ui[4];
    root.querySelector("footer").textContent = ui[5];
    root.querySelector("header button").setAttribute("aria-label", ui[6]);
    orb.setAttribute("aria-label", panel.hidden ? ui[7] : ui[6]);
    renderTopics();
    resetAnswer();
  });
  window.addEventListener("keydown", (event) => { if (event.key === "Escape") toggle(false); });
  document.body.append(root);
})();
