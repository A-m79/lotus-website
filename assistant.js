(() => {
  "use strict";
  const supported = ["en", "fr", "es", "de", "pt"];
  let locale = supported.includes(document.documentElement.lang) ? document.documentElement.lang : "en";
  const allUi = {
    en: ["Need a hand?", "Ask about Lotus without sending anything anywhere.", "Ask about setup, protections, Premium…", "Ask", "Suggested questions", "No question leaves your browser.", "Close help", "Open Lotus help", "I do not have a reliable answer for that yet. Try a topic below."],
    fr: ["Besoin d’un coup de main ?", "Pose tes questions sur Lotus sans rien envoyer ailleurs.", "Question sur l’installation, les protections, Premium…", "Demander", "Questions suggérées", "Aucune question ne quitte ton navigateur.", "Fermer l’aide", "Ouvrir l’aide Lotus", "Je n’ai pas encore de réponse fiable. Essaie un thème ci-dessous."],
    es: ["¿Necesitas ayuda?", "Pregunta sobre Lotus sin enviar nada a ningún sitio.", "Pregunta sobre instalación, protecciones, Premium…", "Preguntar", "Preguntas sugeridas", "Ninguna pregunta sale de tu navegador.", "Cerrar ayuda", "Abrir la ayuda de Lotus", "Todavía no tengo una respuesta fiable. Prueba un tema."],
    de: ["Brauchst du Hilfe?", "Frage nach Lotus, ohne etwas irgendwohin zu senden.", "Frage zu Einrichtung, Schutz, Premium…", "Fragen", "Vorgeschlagene Fragen", "Keine Frage verlässt deinen Browser.", "Hilfe schließen", "Lotus-Hilfe öffnen", "Darauf habe ich noch keine verlässliche Antwort. Wähle ein Thema."],
    pt: ["Precisas de ajuda?", "Pergunta sobre o Lotus sem enviar nada para lado nenhum.", "Pergunta sobre instalação, proteções, Premium…", "Perguntar", "Perguntas sugeridas", "Nenhuma pergunta sai do teu navegador.", "Fechar ajuda", "Abrir a ajuda Lotus", "Ainda não tenho uma resposta fiável. Experimenta um tema."],
  };
  let ui = allUi[locale];
  const topics = [
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
  ];
  let li = supported.indexOf(locale);
  const root = document.createElement("aside");
  root.className = "lotus-help";
  root.setAttribute("data-lotus-locale-managed", "");
  root.innerHTML = `<section class="lotus-help-panel" role="dialog" aria-label="Lotus help" hidden><header><div><i></i><strong>Luma · Lotus</strong></div><button type="button" aria-label="${ui[6]}">×</button></header><div class="lotus-help-body"><h2>${ui[0]}</h2><p class="lotus-help-intro">${ui[1]}</p><div class="lotus-help-answer" hidden><strong></strong><p></p><a></a></div><form><label class="assistive" for="lotus-help-input">${ui[2]}</label><input id="lotus-help-input" maxlength="160" placeholder="${ui[2]}"><button>${ui[3]}</button></form><small>${ui[4]}</small><div class="lotus-help-topics"></div></div><footer>${ui[5]}</footer></section><button class="lotus-help-orb" type="button" aria-label="${ui[7]}" aria-expanded="false"><img src="/assets/lotus-guardian.webp" alt="" draggable="false"><span>?</span></button>`;
  const panel = root.querySelector(".lotus-help-panel");
  const orb = root.querySelector(".lotus-help-orb");
  const answer = root.querySelector(".lotus-help-answer");
  const intro = root.querySelector(".lotus-help-intro");
  const topicBox = root.querySelector(".lotus-help-topics");
  const input = root.querySelector("input");
  const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9 -]/g, " ");
  function show(topic) {
    intro.textContent = topic ? ui[1] : ui[8];
    answer.hidden = !topic;
    if (!topic) return;
    answer.querySelector("strong").textContent = topic.title[li];
    answer.querySelector("p").textContent = topic.answer[li];
    const link = answer.querySelector("a");
    link.href = topic.href;
    link.textContent = `${topic.title[li]} →`;
  }
  function resetAnswer() {
    intro.textContent = ui[1];
    answer.hidden = true;
  }
  function renderTopics() {
    topicBox.replaceChildren();
    for (const topic of topics) {
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
    orb.setAttribute("aria-expanded", String(open));
    orb.setAttribute("aria-label", open ? ui[6] : ui[7]);
    if (open) input.focus();
  }
  orb.addEventListener("click", () => toggle());
  root.querySelector("header button").addEventListener("click", () => toggle(false));
  root.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const words = normalize(input.value).split(/\s+/).filter((word) => word.length > 2);
    const ranked = topics.map((topic) => ({ topic, score: words.filter((word) => normalize(`${topic.keys} ${topic.title[li]}`).includes(word)).length })).sort((a, b) => b.score - a.score);
    show(ranked[0]?.score ? ranked[0].topic : null);
  });
  window.addEventListener("lotus:locale", (event) => {
    const next = supported.includes(event.detail) ? event.detail : "en";
    if (next === locale) return;
    locale = next;
    li = supported.indexOf(locale);
    ui = allUi[locale];
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
