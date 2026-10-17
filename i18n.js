// Lotus public site: human-reviewed copy, English source plus four locales.
// No external translation service receives page contents or visitor data.
(() => {
  const locales = ["en", "fr", "es", "de", "pt"];
  const names = { en: "English", fr: "Français", es: "Español", de: "Deutsch", pt: "Português" };
  const descriptions = {
    en: "Lotus watches destructive actions and reacts in seconds. Free anti-nuke, anti-raid and anti-spam protection for your Discord server.",
    fr: "Lotus détecte les actions destructrices et réagit en quelques secondes. Protection gratuite anti-nuke, anti-raid et anti-spam pour votre serveur Discord.",
    es: "Lotus detecta acciones destructivas y responde en segundos. Protección gratuita antinuke, antirraid y antispam para tu servidor Discord.",
    de: "Lotus erkennt zerstörerische Aktionen und reagiert in Sekunden. Kostenloser Anti-Nuke-, Anti-Raid- und Anti-Spam-Schutz für deinen Discord-Server.",
    pt: "O Lotus deteta ações destrutivas e reage em segundos. Proteção gratuita anti-nuke, anti-raid e anti-spam para o teu servidor Discord.",
  };
  const legalFallback = {
    es: "Los documentos legales están disponibles en inglés y francés; se mostrará la versión inglesa.",
    de: "Rechtliche Dokumente sind derzeit auf Englisch und Französisch verfügbar; die englische Fassung wird angezeigt.",
    pt: "Os documentos legais estão disponíveis em inglês e francês; será mostrada a versão inglesa.",
  };
  const rows = [
    ["Features", "Fonctionnalités", "Funciones", "Funktionen", "Funcionalidades"],
    ["Dashboard", "Dashboard", "Panel", "Dashboard", "Painel"],
    ["Setup", "Installation", "Configuración", "Einrichtung", "Configuração"],
    ["Pricing", "Tarifs", "Precios", "Preise", "Preços"],
    ["Add to Discord", "Ajouter à Discord", "Añadir a Discord", "Zu Discord hinzufügen", "Adicionar ao Discord"],
    ["Automated Discord Security", "Sécurité Discord automatisée", "Seguridad automatizada para Discord", "Automatisierte Discord-Sicherheit", "Segurança automatizada para Discord"],
    ["Your server,", "Ton serveur,", "Tu servidor,", "Dein Server,", "O teu servidor,"],
    ["defended", "protégé", "protegido", "geschützt", "protegido"],
    ["before", "avant", "antes de que", "bevor", "antes de"],
    ["the damage happens.", "qu'il ne soit trop tard.", "ocurra el daño.", "der Schaden entsteht.", "o dano acontecer."],
    ["🪷 Add Lotus to Discord", "🪷 Ajouter Lotus à Discord", "🪷 Añadir Lotus a Discord", "🪷 Lotus zu Discord hinzufügen", "🪷 Adicionar Lotus ao Discord"],
    ["See what it does", "Découvrir ses protections", "Ver qué hace", "Schutzfunktionen ansehen", "Ver o que faz"],
    ["Free to start · No credit card · 2-minute setup with", "Gratuit pour commencer · Sans carte bancaire · Installation en 2 minutes avec", "Gratis para empezar · Sin tarjeta · Configuración en 2 minutos con", "Kostenlos starten · Keine Kreditkarte · Einrichtung in 2 Minuten mit", "Grátis para começar · Sem cartão · Configuração em 2 minutos com"],
    ["automated protection & moderation modules", "modules de protection et de modération automatisés", "módulos de protección y moderación automatizados", "automatisierte Schutz- und Moderationsmodule", "módulos de proteção e moderação automatizados"],
    ["known phishing domains tracked live", "domaines de phishing connus suivis en temps réel", "dominios de phishing conocidos vigilados en tiempo real", "bekannte Phishing-Domains live überwacht", "domínios de phishing conhecidos monitorizados em tempo real"],
    ["unattended detection & response", "détection et réaction sans surveillance", "detección y respuesta automáticas", "automatische Erkennung und Reaktion", "deteção e resposta automáticas"],
    ["Protection", "Protection", "Protección", "Schutz", "Proteção"],
    ["Anti-Nuke Protection", "Protection anti-nuke", "Protección antinuke", "Anti-Nuke-Schutz", "Proteção anti-nuke"],
    ["Anti-Raid Lockdown", "Verrouillage anti-raid", "Bloqueo antirraid", "Anti-Raid-Sperre", "Bloqueio anti-raid"],
    ["Anti-Spam Shield", "Bouclier anti-spam", "Escudo antispam", "Anti-Spam-Schutz", "Escudo anti-spam"],
    ["Alt & New Account Detection", "Détection des comptes alternatifs et récents", "Detección de cuentas alternativas y nuevas", "Erkennung neuer und Zweitkonten", "Deteção de contas alternativas e novas"],
    ["Phishing Link Detection", "Détection des liens de phishing", "Detección de enlaces de phishing", "Erkennung von Phishing-Links", "Deteção de links de phishing"],
    ["Verification Gate", "Sas de vérification", "Acceso con verificación", "Verifizierungsschranke", "Porta de verificação"],
    ["Dangerous Permission Watch", "Surveillance des permissions dangereuses", "Vigilancia de permisos peligrosos", "Überwachung gefährlicher Berechtigungen", "Monitorização de permissões perigosas"],
    ["Manual Moderation Suite", "Outils de modération manuelle", "Herramientas de moderación manual", "Werkzeuge für manuelle Moderation", "Ferramentas de moderação manual"],
    ["Activity Logs & Case History", "Journal d'activité et historique des sanctions", "Registro de actividad e historial de casos", "Aktivitätsprotokoll und Fallverlauf", "Registo de atividade e histórico de casos"],
    ["One command. Fully protected.", "Une commande. Un serveur protégé.", "Un comando. Protección completa.", "Ein Befehl. Umfassender Schutz.", "Um comando. Proteção completa."],
    ["Add Lotus with Administrator", "Ajouter Lotus avec la permission Administrateur", "Añadir Lotus con permiso de Administrador", "Lotus mit Administratorrechten hinzufügen", "Adicionar Lotus com permissão de Administrador"],
    ["Run /lotus setup", "Lancer /lotus setup", "Ejecutar /lotus setup", "/lotus setup ausführen", "Executar /lotus setup"],
    ["Tune it to your server", "L'adapter à ton serveur", "Adaptarlo a tu servidor", "An deinen Server anpassen", "Adaptá-lo ao teu servidor"],
    ["Popular /lotus commands", "Commandes /lotus populaires", "Comandos /lotus populares", "Beliebte /lotus-Befehle", "Comandos /lotus populares"],
    ["Bans a member", "Bannit un membre", "Bloquea a un miembro", "Bannt ein Mitglied", "Bane um membro"],
    ["Times out a member", "Exclut temporairement un membre", "Silencia temporalmente a un miembro", "Versetzt ein Mitglied in einen Timeout", "Coloca um membro em timeout"],
    ["Displays Lotus's current configuration", "Affiche la configuration actuelle de Lotus", "Muestra la configuración actual de Lotus", "Zeigt die aktuelle Lotus-Konfiguration", "Mostra a configuração atual do Lotus"],
    ["Enables or disables panic mode (full server lockdown)", "Active ou désactive le mode panique (verrouillage complet du serveur)", "Activa o desactiva el modo pánico (bloqueo total del servidor)", "Aktiviert oder deaktiviert den Panikmodus (vollständige Serversperre)", "Ativa ou desativa o modo de pânico (bloqueio total do servidor)"],
    ["Backs up the current structure", "Sauvegarde la structure actuelle", "Hace una copia de la estructura actual", "Sichert die aktuelle Struktur", "Faz uma cópia da estrutura atual"],
    ["Displays details of a Lotus sanction via its case number", "Affiche les détails d'une sanction Lotus à partir de son numéro de dossier", "Muestra los detalles de una sanción Lotus mediante su número de caso", "Zeigt Details einer Lotus-Sanktion anhand der Fallnummer", "Mostra os detalhes de uma sanção Lotus pelo número do caso"],
    ["Compare every feature side by side", "Comparer toutes les fonctionnalités", "Comparar todas las funciones", "Alle Funktionen vergleichen", "Comparar todas as funcionalidades"],
    ["Free", "Gratuit", "Gratis", "Kostenlos", "Grátis"],
    ["/forever", "/pour toujours", "/para siempre", "/dauerhaft", "/para sempre"],
    ["Coming soon", "Bientôt disponible", "Próximamente", "Demnächst", "Em breve"],
    ["Add for free", "Ajouter gratuitement", "Añadir gratis", "Kostenlos hinzufügen", "Adicionar grátis"],
    ["Everything in Free", "Tout le forfait Gratuit", "Todo lo del plan Gratis", "Alles aus dem Gratis-Tarif", "Tudo do plano Grátis"],
    ["Automated backups & 1-click restore", "Sauvegardes automatiques et restauration en un clic", "Copias automáticas y restauración con un clic", "Automatische Backups und Wiederherstellung mit einem Klick", "Cópias automáticas e restauro com um clique"],
    ["Custom threshold tuning", "Réglage personnalisé des seuils", "Ajuste personalizado de umbrales", "Individuelle Schwellenwerte", "Ajuste personalizado de limites"],
    ["Priority support", "Assistance prioritaire", "Soporte prioritario", "Bevorzugter Support", "Suporte prioritário"],
    ["🪷 In development", "🪷 En développement", "🪷 En desarrollo", "🪷 In Entwicklung", "🪷 Em desenvolvimento"],
    ["🪷 Premium in development", "🪷 Premium en développement", "🪷 Premium en desarrollo", "🪷 Premium in Entwicklung", "🪷 Premium em desenvolvimento"],
    ["Free vs Premium, feature by feature", "Gratuit ou Premium : le détail des fonctionnalités", "Gratis frente a Premium: función por función", "Kostenlos vs. Premium: alle Funktionen", "Grátis vs. Premium: funcionalidade a funcionalidade"],
    ["Feature", "Fonctionnalité", "Función", "Funktion", "Funcionalidade"],
    ["Good to know", "Bon à savoir", "Conviene saber", "Gut zu wissen", "Convém saber"],
    ["How it works", "Comment ça marche", "Cómo funciona", "So funktioniert es", "Como funciona"],
    ["Commands", "Commandes", "Comandos", "Befehle", "Comandos"],
    ["Support", "Assistance", "Ayuda", "Support", "Suporte"],
    ["Legal notice", "Mentions légales", "Aviso legal", "Impressum", "Aviso legal"],
    ["Terms of use", "Conditions d'utilisation", "Condiciones de uso", "Nutzungsbedingungen", "Termos de utilização"],
    ["Privacy policy", "Politique de confidentialité", "Política de privacidad", "Datenschutzerklärung", "Política de privacidade"],
    ["Privacy Policy", "Politique de confidentialité", "Política de privacidad", "Datenschutzerklärung", "Política de privacidade"],
    ["Lotus watches every channel deletion, role edit, and mass ban as it happens — and reacts in seconds, not after your server's already gone.", "Lotus surveille chaque suppression de salon, modification de rôle et bannissement massif en temps réel, puis réagit en quelques secondes, avant que votre serveur ne soit détruit.", "Lotus vigila cada eliminación de canal, cambio de rol y bloqueo masivo en tiempo real, y reacciona en segundos, antes de que tu servidor quede destruido.", "Lotus überwacht jede Kanallöschung, Rollenänderung und Massenbannung in Echtzeit und reagiert in Sekunden, bevor dein Server zerstört wird.", "O Lotus monitoriza cada eliminação de canal, alteração de cargo e banimento em massa em tempo real e reage em segundos, antes que o servidor seja destruído."],
    ["Everything a compromised admin, a raid, or a bad link can throw at you.", "Une protection contre les comptes admin compromis, les raids et les liens malveillants.", "Protección frente a administradores comprometidos, raids y enlaces maliciosos.", "Schutz vor kompromittierten Admins, Raids und schädlichen Links.", "Proteção contra administradores comprometidos, raids e links maliciosos."],
    ["Lotus runs a layered detection stack in the background so your staff don't have to watch logs all day — and gives them a real moderation toolkit for everything else.", "Lotus surveille les menaces en arrière-plan pour que ton équipe n'ait pas à lire les journaux toute la journée. Elle dispose aussi de vrais outils de modération.", "Lotus detecta amenazas en segundo plano para que tu equipo no tenga que revisar registros todo el día y le ofrece herramientas de moderación completas.", "Lotus erkennt Bedrohungen im Hintergrund, damit dein Team nicht den ganzen Tag Protokolle lesen muss, und bietet umfassende Moderationswerkzeuge.", "O Lotus deteta ameaças em segundo plano para que a tua equipa não tenha de ler registos o dia inteiro, e oferece ferramentas de moderação completas."],
    ["Catches mass channel/role deletion, both fast bursts and slow, \"patient\" attacks — scaled to your server's actual size, not a fixed count.", "Détecte les suppressions massives de salons ou de rôles, qu'elles soient rapides ou progressives, avec des seuils adaptés à la taille du serveur.", "Detecta eliminaciones masivas de canales o roles, tanto rápidas como graduales, con umbrales adaptados al tamaño del servidor.", "Erkennt massenhaftes Löschen von Kanälen oder Rollen, ob schnell oder schleichend, mit an die Servergröße angepassten Schwellenwerten.", "Deteta eliminações em massa de canais ou cargos, rápidas ou graduais, com limites adaptados ao tamanho do servidor."],
    ["Detects a sudden wave of new joins and automatically locks the server down before it turns into a mass-ping or spam raid.", "Détecte une vague soudaine d'arrivées et verrouille automatiquement le serveur avant qu'elle ne dégénère en spam ou mentions massives.", "Detecta una oleada repentina de nuevos miembros y bloquea el servidor antes de que se convierta en un raid de spam o menciones masivas.", "Erkennt plötzliche Beitrittswellen und sperrt den Server, bevor daraus ein Spam- oder Massen-Ping-Raid wird.", "Deteta uma vaga repentina de entradas e bloqueia o servidor antes de se transformar num raid de spam ou menções em massa."],
    ["Flood, wall-of-caps, duplicate messages, mass mentions and invite links — filtered with different tolerance for members, staff and trusted roles.", "Flood, majuscules abusives, messages répétés, mentions massives et liens d'invitation : chaque catégorie est filtrée selon le rôle du membre.", "Flood, exceso de mayúsculas, mensajes repetidos, menciones masivas y enlaces de invitación: filtros ajustados según el rol del miembro.", "Nachrichtenflut, übermäßige Großschreibung, Duplikate, Massen-Erwähnungen und Einladungslinks: angepasst an Mitglieder, Team und vertrauenswürdige Rollen.", "Flood, maiúsculas excessivas, mensagens repetidas, menções em massa e convites: filtros ajustados ao cargo de cada membro."],
    ["Flags brand-new or suspicious accounts joining your server so ban-evaders and throwaway alts get caught before they cause trouble.", "Signale les comptes récents ou suspects qui rejoignent le serveur pour repérer les comptes jetables et les contournements de bannissement.", "Señala cuentas nuevas o sospechosas que se unen al servidor para detectar cuentas desechables y evasiones de bloqueo.", "Markiert neue oder verdächtige Konten beim Beitritt, damit Wegwerfkonten und Bannumgehungen früh erkannt werden.", "Assinala contas novas ou suspeitas que entram no servidor para detetar contas descartáveis e fugas a banimentos."],
    ["Cross-checks every posted link against a live, constantly-updated database of known scam and phishing domains.", "Compare les liens publiés à une base de domaines frauduleux et de phishing régulièrement mise à jour.", "Compara los enlaces publicados con una base actualizada de dominios fraudulentos y de phishing.", "Prüft veröffentlichte Links gegen eine laufend aktualisierte Datenbank bekannter Betrugs- und Phishing-Domains.", "Compara os links publicados com uma base atualizada de domínios fraudulentos e de phishing."],
    ["New members land in a quarantined role until they verify — nothing they do counts against your server until they're confirmed real.", "Les nouveaux membres reçoivent un rôle restreint jusqu'à leur vérification, afin de protéger le serveur pendant ce délai.", "Los nuevos miembros reciben un rol restringido hasta verificarse para proteger al servidor durante ese período.", "Neue Mitglieder erhalten bis zur Verifizierung eine eingeschränkte Rolle, damit der Server in dieser Zeit geschützt bleibt.", "Os novos membros recebem um cargo restrito até se verificarem, protegendo o servidor durante esse período."],
    ["The gap most bots miss: catches a role edit that quietly grants Administrator or ban/kick powers, and reverts it instantly — even from an already-trusted account.", "Repère une modification de rôle qui accorde discrètement des permissions dangereuses et l'annule immédiatement, même si elle vient d'un compte de confiance.", "Detecta cambios de rol que conceden permisos peligrosos de forma discreta y los revierte al instante, incluso si proceden de una cuenta de confianza.", "Erkennt Rollenänderungen, die heimlich gefährliche Rechte verleihen, und macht sie sofort rückgängig, selbst bei vertrauenswürdigen Konten.", "Deteta alterações de cargos que concedem permissões perigosas discretamente e reverte-as de imediato, mesmo vindas de contas de confiança."],
    ["Ban, kick, timeout, warn (with auto-escalation), bulk clear and slowmode — the everyday toolkit, built in, no second bot required.", "Bannissement, expulsion, timeout, avertissement avec escalade, purge et mode lent : les outils de modération du quotidien sont intégrés.", "Bloqueo, expulsión, timeout, advertencias con escalado, limpieza masiva y modo lento: herramientas de moderación integradas.", "Bann, Kick, Timeout, Verwarnung mit Eskalation, Massenlöschung und Slowmode: Moderationswerkzeuge direkt integriert.", "Banimento, expulsão, timeout, avisos com escalada, limpeza em massa e modo lento: ferramentas de moderação integradas."],
    ["Every edit, delete, join and leave, plus a searchable case ID for every sanction Lotus has ever issued on your server.", "Retrouve les modifications, suppressions, arrivées et départs, ainsi qu'un numéro de dossier consultable pour chaque sanction Lotus.", "Consulta cambios, eliminaciones, entradas y salidas, además de un número de caso para cada sanción de Lotus.", "Verfolge Änderungen, Löschungen, Beitritte und Austritte sowie eine auffindbare Fallnummer für jede Lotus-Sanktion.", "Consulta alterações, eliminações, entradas e saídas, além de um número de caso para cada sanção do Lotus."],
    ["Every Lotus command lives under a single, organized", "Toutes les commandes Lotus sont regroupées sous", "Todos los comandos de Lotus se agrupan bajo", "Alle Lotus-Befehle sind unter", "Todos os comandos do Lotus estão reunidos em"],
    ["— no hunting through ten different slash commands to find the one you need.", "— plus besoin de chercher parmi des dizaines de commandes.", "— ya no tendrás que buscar entre decenas de comandos.", "organisiert — du musst nicht Dutzende Befehle durchsuchen.", "— já não precisas de procurar entre dezenas de comandos."],
    ["Required so it can actually act on threats — quarantine, revert, lock down.", "Nécessaire pour intervenir contre les menaces : quarantaine, annulation d'actions et verrouillage.", "Necesario para actuar frente a amenazas: cuarentena, reversión y bloqueo.", "Erforderlich, um gegen Bedrohungen vorzugehen: Quarantäne, Rücknahme und Sperrung.", "Necessário para agir contra ameaças: quarentena, reversão e bloqueio."],
    ["Creates your logs, alerts and quarantine channels, and turns on core protection.", "Crée les salons de journaux, d'alertes et de quarantaine, puis active les protections essentielles.", "Crea canales de registros, alertas y cuarentena y activa la protección básica.", "Erstellt Protokoll-, Alarm- und Quarantänekanäle und aktiviert den Basisschutz.", "Cria canais de registos, alertas e quarentena e ativa a proteção essencial."],
    ["Adjust thresholds, whitelist trusted roles, and pick your punishment of choice — or just leave the defaults.", "Ajuste les seuils, autorise les rôles de confiance et choisis les sanctions, ou conserve les valeurs par défaut.", "Ajusta los umbrales, autoriza roles de confianza y elige sanciones, o conserva los valores predeterminados.", "Passe Schwellenwerte, vertrauenswürdige Rollen und Sanktionen an oder behalte die Standardwerte.", "Ajusta limites, autoriza cargos de confiança e escolhe sanções, ou mantém os valores predefinidos."],
    ["Solid protection for free. The full detection stack for servers that want it all.", "Une protection solide et gratuite. Une détection complète pour les serveurs qui veulent aller plus loin.", "Protección sólida y gratuita. Detección completa para los servidores que quieren más.", "Solider Schutz kostenlos. Vollständige Erkennung für Server mit höheren Ansprüchen.", "Proteção sólida e gratuita. Deteção completa para servidores que querem mais."],
    ["Free covers real, always-on protection — not a crippled trial. Premium adds the deeper detection and forensic layers.", "Le forfait Gratuit offre une véritable protection permanente, pas un essai limité. Premium ajoute des détections et des outils d'analyse avancés.", "El plan Gratis ofrece protección real y permanente, no una prueba limitada. Premium añade detección y análisis avanzados.", "Der kostenlose Tarif bietet echten dauerhaften Schutz, keine eingeschränkte Testversion. Premium ergänzt erweiterte Erkennung und Analyse.", "O plano Grátis oferece proteção real e permanente, não uma versão experimental limitada. Premium acrescenta deteção e análise avançadas."],
    ["Core automated defense and a full manual moderation toolkit. No feature timers, no watered-down detection.", "Défense automatisée essentielle et outils complets de modération manuelle. Sans limite de durée ni détection réduite.", "Defensa automatizada esencial y herramientas completas de moderación manual. Sin límites de tiempo ni detección reducida.", "Automatisierter Basisschutz und vollständige manuelle Moderation. Ohne Zeitlimit oder abgeschwächte Erkennung.", "Defesa automatizada essencial e ferramentas completas de moderação manual. Sem limites de tempo nem deteção reduzida."],
    ["Everything in Free, plus the full detection stack — for servers that want every layer active.", "Tout le forfait Gratuit, avec des couches de détection supplémentaires pour les serveurs qui veulent une couverture complète.", "Todo lo del plan Gratis, más capas de detección adicionales para servidores que buscan cobertura completa.", "Alles aus dem Gratis-Tarif plus zusätzliche Erkennungsebenen für umfassenden Schutz.", "Tudo do plano Grátis, com camadas de deteção adicionais para servidores que querem cobertura completa."],
    ["Anti-Nuke protection", "Protection anti-nuke", "Protección antinuke", "Anti-Nuke-Schutz", "Proteção anti-nuke"],
    ["Anti-Raid lockdown", "Verrouillage anti-raid", "Bloqueo antirraid", "Anti-Raid-Sperre", "Bloqueio anti-raid"],
    ["Anti-Spam shield", "Bouclier anti-spam", "Escudo antispam", "Anti-Spam-Schutz", "Escudo anti-spam"],
    ["Verification gate", "Sas de vérification", "Acceso con verificación", "Verifizierungsschranke", "Porta de verificação"],
    ["Manual moderation suite", "Outils de modération manuelle", "Herramientas de moderación manual", "Manuelle Moderation", "Ferramentas de moderação manual"],
    ["Logs & alerts channel", "Salon de journaux et d'alertes", "Canal de registros y alertas", "Protokoll- und Alarmkanal", "Canal de registos e alertas"],
    ["Alt & new account detection", "Détection des comptes alternatifs et récents", "Detección de cuentas alternativas y nuevas", "Erkennung neuer und Zweitkonten", "Deteção de contas alternativas e novas"],
    ["Phishing link detection", "Détection des liens de phishing", "Detección de enlaces de phishing", "Phishing-Link-Erkennung", "Deteção de links de phishing"],
    ["Dangerous permission watch", "Surveillance des permissions dangereuses", "Vigilancia de permisos peligrosos", "Überwachung gefährlicher Berechtigungen", "Monitorização de permissões perigosas"],
    ["Activity logs & case history", "Journal d'activité et historique des sanctions", "Registro de actividad e historial de casos", "Aktivitätsprotokoll und Fallverlauf", "Registo de atividade e histórico de casos"],
    ["Before you add it, the honest answers.", "Avant de l'ajouter, des réponses claires.", "Antes de añadirlo, respuestas claras.", "Vor der Installation: klare Antworten.", "Antes de o adicionares, respostas claras."],
    ["No marketing fluff — just what Lotus actually needs and does with your server's data.", "Pas de discours marketing : voici ce dont Lotus a besoin et ce qu'il fait réellement avec les données du serveur.", "Sin discurso de marketing: esto es lo que Lotus necesita y hace realmente con los datos del servidor.", "Keine Werbeversprechen: Das braucht Lotus wirklich und so verwendet es deine Serverdaten.", "Sem conversa de marketing: eis o que o Lotus precisa e faz realmente com os dados do servidor."],
    ["Why does Lotus need Administrator permission?", "Pourquoi Lotus a-t-il besoin de la permission Administrateur ?", "¿Por qué Lotus necesita permiso de Administrador?", "Warum benötigt Lotus Administratorrechte?", "Porque é que o Lotus precisa da permissão de Administrador?"],
    ["Is the Free plan actually free, or a trial?", "Le forfait Gratuit est-il vraiment gratuit ou s'agit-il d'un essai ?", "¿El plan Gratis es realmente gratis o es una prueba?", "Ist der kostenlose Tarif wirklich gratis oder nur eine Testversion?", "O plano Grátis é realmente grátis ou é um teste?"],
    ["What data does Lotus store about my server?", "Quelles données Lotus conserve-t-il sur mon serveur ?", "¿Qué datos guarda Lotus sobre mi servidor?", "Welche Daten speichert Lotus über meinen Server?", "Que dados guarda o Lotus sobre o meu servidor?"],
    ["Can I remove Lotus at any time?", "Puis-je retirer Lotus à tout moment ?", "¿Puedo quitar Lotus en cualquier momento?", "Kann ich Lotus jederzeit entfernen?", "Posso remover o Lotus a qualquer momento?"],
    ["Stop reacting to nukes.", "Ne subis plus les attaques.", "Deja de reaccionar a los ataques.", "Reagiere nicht erst nach einem Angriff.", "Deixa de reagir aos ataques."],
    ["Start preventing them.", "Commence à les prévenir.", "Empieza a prevenirlos.", "Verhindere sie von Anfang an.", "Começa a preveni-los."],
    ["Two minutes to set up. Free to start. Your server deserves better than finding out in the aftermath.", "Deux minutes pour l'installer. Gratuit pour commencer. Ton serveur mérite mieux qu'une réaction après les dégâts.", "Dos minutos para configurarlo. Gratis para empezar. Tu servidor merece algo mejor que reaccionar después del daño.", "In zwei Minuten eingerichtet. Kostenlos starten. Dein Server verdient Schutz, bevor der Schaden entsteht.", "Configuração em dois minutos. Grátis para começar. O teu servidor merece proteção antes de haver danos."],
    ["Built for communities that take security seriously.", "Conçu pour les communautés qui prennent la sécurité au sérieux.", "Creado para comunidades que se toman la seguridad en serio.", "Für Communities, die Sicherheit ernst nehmen.", "Criado para comunidades que levam a segurança a sério."],
    ["LOTUS SECURITY SYSTEM", "SYSTÈME DE SÉCURITÉ LOTUS", "SISTEMA DE SEGURIDAD LOTUS", "LOTUS-SICHERHEITSSYSTEM", "SISTEMA DE SEGURANÇA LOTUS"],
    ["just now", "à l'instant", "ahora mismo", "gerade eben", "agora mesmo"],
    ["🛡️ AntiNuke Pro — Mass Channel Deletion", "🛡️ AntiNuke Pro — Suppression massive de salons", "🛡️ AntiNuke Pro — Eliminación masiva de canales", "🛡️ AntiNuke Pro — Massenhafte Kanallöschung", "🛡️ AntiNuke Pro — Eliminação em massa de canais"],
    ["⚠️ Dangerous Permission Watch", "⚠️ Surveillance des permissions dangereuses", "⚠️ Vigilancia de permisos peligrosos", "⚠️ Überwachung gefährlicher Berechtigungen", "⚠️ Monitorização de permissões perigosas"],
    ["🎣 Phishing Link Blocked", "🎣 Lien de phishing bloqué", "🎣 Enlace de phishing bloqueado", "🎣 Phishing-Link blockiert", "🎣 Link de phishing bloqueado"],
    ["🚪 Anti-Raid Lockdown Triggered", "🚪 Verrouillage anti-raid déclenché", "🚪 Bloqueo antirraid activado", "🚪 Anti-Raid-Sperre ausgelöst", "🚪 Bloqueio anti-raid ativado"],
    ["Executor", "Auteur", "Autor", "Ausführende Person", "Autor"],
    ["Action", "Action", "Acción", "Aktion", "Ação"],
    ["Punishment", "Sanction", "Sanción", "Sanktion", "Sanção"],
    ["Case", "Dossier", "Caso", "Fall", "Caso"],
    ["Role edited", "Rôle modifié", "Rol modificado", "Rolle geändert", "Cargo alterado"],
    ["Permission added", "Permission ajoutée", "Permiso añadido", "Berechtigung hinzugefügt", "Permissão adicionada"],
    ["Response", "Réponse", "Respuesta", "Reaktion", "Resposta"],
    ["Reverted instantly", "Annulée immédiatement", "Revertido al instante", "Sofort rückgängig gemacht", "Revertido de imediato"],
    ["Channel", "Salon", "Canal", "Kanal", "Canal"],
    ["Domain", "Domaine", "Dominio", "Domain", "Domínio"],
    ["Match", "Correspondance", "Coincidencia", "Treffer", "Correspondência"],
    ["36,748 known domains", "36 748 domaines connus", "36.748 dominios conocidos", "36.748 bekannte Domains", "36 748 domínios conhecidos"],
    ["Message deleted", "Message supprimé", "Mensaje eliminado", "Nachricht gelöscht", "Mensagem eliminada"],
    ["New joins", "Nouvelles arrivées", "Nuevas incorporaciones", "Neue Beitritte", "Novas entradas"],
    ["Avg. account age", "Âge moyen des comptes", "Antigüedad media de las cuentas", "Durchschn. Kontoalter", "Idade média das contas"],
    ["Server locked", "Serveur verrouillé", "Servidor bloqueado", "Server gesperrt", "Servidor bloqueado"],
    ["Auto-unlock", "Déverrouillage auto", "Desbloqueo automático", "Automatische Entsperrung", "Desbloqueio automático"],
    ["in 60 min", "dans 60 min", "en 60 min", "in 60 Min.", "em 60 min"],
    ["14 in 12s", "14 en 12 s", "14 en 12 s", "14 in 12 Sek.", "14 em 12 s"],
    ["< 1 day", "< 1 jour", "< 1 día", "< 1 Tag", "< 1 dia"],
    ["quarantine", "quarantaine", "cuarentena", "Quarantäne", "quarentena"],
    ["Reverting a malicious role edit, quarantining a compromised account, or locking down channels during a raid all require elevated Discord permissions — a bot without Administrator simply can't act fast enough to stop a nuke in progress. You can review and audit everything Lotus does through", "Annuler une modification malveillante de rôle, placer un compte compromis en quarantaine ou verrouiller les salons pendant un raid exige des permissions élevées. Sans la permission Administrateur, le bot ne peut pas intervenir assez vite. Tu peux consulter les actions de Lotus avec", "Revertir un cambio malicioso de rol, aislar una cuenta comprometida o bloquear canales durante un raid requiere permisos elevados. Sin Administrador, el bot no puede actuar lo bastante rápido. Puedes revisar las acciones de Lotus con", "Um bösartige Rollenänderungen rückgängig zu machen, kompromittierte Konten zu isolieren oder Kanäle bei einem Raid zu sperren, sind erhöhte Rechte nötig. Ohne Administrator kann der Bot nicht schnell genug handeln. Lotus-Aktionen kannst du mit", "Reverter alterações maliciosas de cargos, isolar contas comprometidas ou bloquear canais durante um raid exige permissões elevadas. Sem Administrador, o bot não consegue agir suficientemente depressa. Podes consultar as ações do Lotus com"],
    ["and the activity logs channel.", "et le salon du journal d'activité.", "y el canal de registro de actividad.", "und im Aktivitätsprotokoll prüfen.", "e no canal de registo de atividade."],
    ["Free is free forever — no feature timer, no watered-down detection window. Anti-Nuke, Anti-Raid, Anti-Spam, the verification gate and the full manual moderation suite are all included at no cost. Premium adds extra detection layers (alt accounts, phishing links, permission watch) and forensic tools on top, it doesn't gate the core protection.", "Le forfait Gratuit reste gratuit, sans limite de durée ni détection réduite. Il comprend l'anti-nuke, l'anti-raid, l'anti-spam, la vérification et la modération manuelle. Premium ajoute des détections (comptes alternatifs, phishing, permissions) et des outils d'analyse, sans retirer la protection essentielle du forfait Gratuit.", "El plan Gratis es gratuito para siempre, sin límite de tiempo ni detección reducida. Incluye antinuke, antirraid, antispam, verificación y moderación manual. Premium añade detección de cuentas alternativas, phishing y permisos, además de análisis, sin restringir la protección básica.", "Der Gratis-Tarif bleibt dauerhaft kostenlos, ohne Zeitlimit oder eingeschränkte Erkennung. Anti-Nuke, Anti-Raid, Anti-Spam, Verifizierung und manuelle Moderation sind enthalten. Premium ergänzt Erkennung für Zweitkonten, Phishing und Berechtigungen sowie Analysefunktionen, ohne den Basisschutz einzuschränken.", "O plano Grátis mantém-se gratuito, sem limite de tempo nem deteção reduzida. Inclui anti-nuke, anti-raid, anti-spam, verificação e moderação manual. Premium acrescenta deteção de contas alternativas, phishing e permissões e ferramentas de análise, sem limitar a proteção essencial."],
    ["Server config (thresholds, channels, punishments), security case logs, and — only if you turn it on — activity logs. Lotus does not read or store the content of every message; content is only scanned in-memory for spam/phishing patterns. Full detail in the", "La configuration du serveur (seuils, salons, sanctions), les dossiers de sécurité et, seulement si tu l'actives, les journaux d'activité. Lotus ne conserve pas le contenu de chaque message : il l'analyse temporairement en mémoire pour détecter le spam et le phishing. Tous les détails figurent dans la", "La configuración del servidor (umbrales, canales, sanciones), los casos de seguridad y, solo si lo activas, los registros de actividad. Lotus no guarda el contenido de todos los mensajes: lo analiza temporalmente en memoria para detectar spam y phishing. Encontrarás los detalles en la", "Serverkonfiguration (Schwellenwerte, Kanäle, Sanktionen), Sicherheitsfälle und – nur wenn aktiviert – Aktivitätsprotokolle. Lotus speichert nicht den Inhalt jeder Nachricht: Er wird zur Spam- und Phishing-Erkennung nur kurz im Arbeitsspeicher geprüft. Details stehen in der", "A configuração do servidor (limites, canais, sanções), os casos de segurança e, apenas se ativares, os registos de atividade. O Lotus não guarda o conteúdo de todas as mensagens: analisa-o temporariamente em memória para detetar spam e phishing. Os detalhes estão na"],
    ["Yes, at any time, with no lock-in. Removing Lotus from your server stops all monitoring immediately, and its stored data for your server is deleted within a reasonable delay afterward.", "Oui, à tout moment. Retirer Lotus arrête immédiatement la surveillance. Les données du serveur conservées par Lotus sont ensuite supprimées dans un délai raisonnable.", "Sí, en cualquier momento. Al quitar Lotus, la vigilancia se detiene de inmediato. Los datos guardados del servidor se eliminan después en un plazo razonable.", "Ja, jederzeit. Wird Lotus entfernt, endet die Überwachung sofort. Gespeicherte Serverdaten werden anschließend innerhalb einer angemessenen Frist gelöscht.", "Sim, a qualquer momento. Ao removeres o Lotus, a monitorização para imediatamente. Os dados guardados do servidor são depois eliminados num prazo razoável."],
  ];

  rows.push(...[
    ["Compare", "Comparer", "Comparar", "Vergleich", "Comparar"],
    ["FAQ", "Questions fréquentes", "Preguntas frecuentes", "FAQ", "Perguntas frequentes"],
    ["Lotus Security System · Active protection", "Système de sécurité Lotus · Protection active", "Sistema de seguridad Lotus · Protección activa", "Lotus-Sicherheitssystem · Aktiver Schutz", "Sistema de segurança Lotus · Proteção ativa"],
    ["Lotus watches destructive actions as they happen and automatically responds the moment a threat is detected — so your staff doesn't discover the damage after it's already done.", "Lotus surveille les actions destructrices en temps réel et réagit dès qu'une menace est détectée. Votre équipe n'attend pas de constater les dégâts pour agir.", "Lotus vigila las acciones destructivas en tiempo real y responde en cuanto detecta una amenaza. Tu equipo no tiene que descubrir los daños demasiado tarde.", "Lotus überwacht zerstörerische Aktionen in Echtzeit und reagiert, sobald eine Bedrohung erkannt wird. Dein Team muss den Schaden nicht erst im Nachhinein entdecken.", "O Lotus vigia ações destrutivas em tempo real e reage assim que deteta uma ameaça. A tua equipa não precisa de descobrir os danos tarde demais."],
    ["Already using Lotus?", "Tu utilises déjà Lotus ?", "¿Ya usas Lotus?", "Du nutzt Lotus bereits?", "Já usas o Lotus?"],
    ["Open the dashboard →", "Ouvrir le dashboard →", "Abrir el panel →", "Dashboard öffnen →", "Abrir o painel →"],
    ["security & moderation systems", "systèmes de sécurité et de modération", "sistemas de seguridad y moderación", "Sicherheits- und Moderationssysteme", "sistemas de segurança e moderação"],
    ["Real-time", "Temps réel", "Tiempo real", "Echtzeit", "Tempo real"],
    ["event-driven detection & response", "détection et réaction aux événements", "detección y respuesta basadas en eventos", "ereignisgesteuerte Erkennung und Reaktion", "deteção e resposta a eventos"],
    ["Lotus continuously watches server events. Protective actions are triggered as soon as a dangerous event is detected, subject to Discord API availability and rate limits.", "Lotus surveille en continu les événements du serveur. Les protections se déclenchent dès qu'un événement dangereux est détecté, sous réserve de la disponibilité et des limites de l'API Discord.", "Lotus vigila continuamente los eventos del servidor. Las medidas de protección se activan al detectar un evento peligroso, según la disponibilidad y los límites de la API de Discord.", "Lotus überwacht Serverereignisse laufend. Schutzmaßnahmen werden bei gefährlichen Ereignissen ausgelöst, abhängig von der Verfügbarkeit und den Limits der Discord-API.", "O Lotus monitoriza continuamente os eventos do servidor. As medidas de proteção são ativadas ao detetar um evento perigoso, sujeitas à disponibilidade e aos limites da API do Discord."],
    ["1 command", "1 commande", "1 comando", "1 Befehl", "1 comando"],
    ["sets up & repairs your protection stack", "installe et répare tes protections", "configura y repara tus protecciones", "richtet deinen Schutz ein und repariert ihn", "configura e repara as tuas proteções"],
    ["New members only see the verification flow until they're verified, keeping the rest of your server out of reach.", "Les nouveaux membres n'accèdent qu'à la vérification tant qu'ils ne l'ont pas terminée ; le reste du serveur leur est inaccessible.", "Los nuevos miembros solo ven la verificación hasta completarla; el resto del servidor permanece inaccesible.", "Neue Mitglieder sehen bis zur erfolgreichen Verifizierung nur den Prüfbereich; der restliche Server bleibt gesperrt.", "Os novos membros só veem a verificação até a concluírem; o resto do servidor fica inacessível."],
    ["The gap most bots miss: catches a role edit that quietly grants Administrator or ban/kick powers, and reverts it automatically — even from an already-trusted account.", "Lotus repère une modification de rôle qui accorde discrètement des permissions d'administration, de bannissement ou d'expulsion, puis l'annule automatiquement, même si elle vient d'un compte de confiance.", "Lotus detecta un cambio de rol que concede discretamente permisos de administrador, expulsión o bloqueo y lo revierte automáticamente, incluso si procede de una cuenta de confianza.", "Lotus erkennt Rollenänderungen, die unbemerkt Administrator-, Bann- oder Kick-Rechte vergeben, und macht sie automatisch rückgängig – auch bei vertrauenswürdigen Konten.", "O Lotus deteta alterações de cargos que concedem discretamente permissões de administrador, banimento ou expulsão e reverte-as automaticamente, mesmo vindas de uma conta de confiança."],
    ["See it work", "Voir Lotus en action", "Verlo en acción", "So funktioniert es", "Ver em ação"],
    ["See what happens when a threat hits.", "Ce qui se passe lorsqu'une menace survient.", "Qué ocurre cuando aparece una amenaza.", "Was bei einer Bedrohung geschieht.", "O que acontece quando surge uma ameaça."],
    ["Follow four example incidents from detection to response. The alerts below illustrate Lotus's format; they are not captures of real incidents.", "Découvre quatre exemples d'incidents, de la détection à la réponse. Les alertes ci-dessous illustrent le format de Lotus ; ce ne sont pas des captures d'incidents réels.", "Descubre cuatro incidentes de ejemplo, desde la detección hasta la respuesta. Las alertas ilustran el formato de Lotus; no son capturas de incidentes reales.", "Sieh dir vier Beispielvorfälle von der Erkennung bis zur Reaktion an. Die Meldungen zeigen das Format von Lotus; sie sind keine Aufnahmen echter Vorfälle.", "Descobre quatro incidentes de exemplo, da deteção à resposta. Os alertas mostram o formato do Lotus; não são capturas de incidentes reais."],
    ["Free · Anti-Nuke", "Gratuit · Anti-nuke", "Gratis · Antinuke", "Kostenlos · Anti-Nuke", "Grátis · Anti-nuke"],
    ["Free · Anti-Raid", "Gratuit · Anti-raid", "Gratis · Antirraid", "Kostenlos · Anti-Raid", "Grátis · Anti-raid"],
    ["Free · Panic Mode", "Gratuit · Mode panique", "Gratis · Modo pánico", "Kostenlos · Panikmodus", "Grátis · Modo de pânico"],
    ["Premium · Dangerous Permission Watch", "Premium · Surveillance des permissions dangereuses", "Premium · Vigilancia de permisos peligrosos", "Premium · Überwachung gefährlicher Rechte", "Premium · Monitorização de permissões perigosas"],
    ["Attacker deletes channels in a fast burst", "Un attaquant supprime plusieurs salons rapidement", "Un atacante elimina varios canales rápidamente", "Ein Angreifer löscht mehrere Kanäle kurz hintereinander", "Um atacante elimina vários canais rapidamente"],
    ["Lotus identifies the executor from the audit log", "Lotus identifie l'auteur dans le journal d'audit", "Lotus identifica al responsable en el registro de auditoría", "Lotus identifiziert die Person im Audit-Log", "O Lotus identifica o autor no registo de auditoria"],
    ["Default punishment (quarantine) applied automatically", "La sanction par défaut (quarantaine) est appliquée", "Se aplica automáticamente la sanción predeterminada (cuarentena)", "Die Standardsanktion (Quarantäne) wird automatisch angewendet", "A sanção predefinida (quarentena) é aplicada automaticamente"],
    ["Alert posted to #lotus-alerts with a case ID", "Une alerte avec numéro de dossier est publiée dans #lotus-alerts", "Se publica una alerta con número de caso en #lotus-alerts", "Eine Meldung mit Fallnummer erscheint in #lotus-alerts", "É publicado um alerta com número de caso em #lotus-alerts"],
    ["Illustration — Lotus alert style", "Illustration — style d'alerte Lotus", "Ilustración — estilo de alerta de Lotus", "Illustration — Lotus-Meldungsstil", "Ilustração — estilo de alerta do Lotus"],
    ["illustration", "illustration", "ilustración", "Illustration", "ilustração"],
    ["Illustration of a real Lotus alert format, not an actual incident capture.", "Illustration du format d'alerte Lotus, pas une capture d'incident réel.", "Ilustración del formato de alerta de Lotus, no una captura de un incidente real.", "Darstellung des Lotus-Meldungsformats, keine Aufnahme eines echten Vorfalls.", "Ilustração do formato de alerta do Lotus, não uma captura de um incidente real."],
    ["Administrator permission added to a role", "La permission Administrateur est ajoutée à un rôle", "Se añade el permiso de administrador a un rol", "Einer Rolle wird das Administratorrecht gegeben", "A permissão Administrador é adicionada a um cargo"],
    ["Lotus catches the role edit as it happens", "Lotus détecte la modification du rôle en direct", "Lotus detecta el cambio de rol al momento", "Lotus erkennt die Rollenänderung sofort", "O Lotus deteta a alteração do cargo no momento"],
    ["The dangerous permission is automatically reverted", "La permission dangereuse est automatiquement retirée", "El permiso peligroso se revierte automáticamente", "Das gefährliche Recht wird automatisch zurückgenommen", "A permissão perigosa é revertida automaticamente"],
    ["Security staff alerted with who made the change", "L'équipe de sécurité est prévenue avec l'identité de l'auteur", "El equipo de seguridad recibe una alerta con el responsable", "Das Sicherheitsteam wird über die verantwortliche Person informiert", "A equipa de segurança é alertada com a identidade do autor"],
    ["Sudden wave of new joins in a short window", "De nombreux membres arrivent en peu de temps", "Muchos miembros entran en poco tiempo", "Viele neue Mitglieder treten in kurzer Zeit bei", "Muitos membros entram num curto espaço de tempo"],
    ["Lotus recognizes raid-like join behavior", "Lotus reconnaît un comportement de raid", "Lotus reconoce un patrón de entradas propio de un raid", "Lotus erkennt ein raidtypisches Beitrittsmuster", "O Lotus reconhece um padrão de entradas típico de um raid"],
    ["Server protection activates automatically", "La protection du serveur s'active automatiquement", "La protección del servidor se activa automáticamente", "Der Serverschutz wird automatisch aktiviert", "A proteção do servidor é ativada automaticamente"],
    ["Staff notified in #lotus-alerts", "L'équipe est avertie dans #lotus-alerts", "El equipo recibe un aviso en #lotus-alerts", "Das Team wird in #lotus-alerts informiert", "A equipa é avisada em #lotus-alerts"],
    ["Panic Mode", "Mode panique", "Modo pánico", "Panikmodus", "Modo de pânico"],
    ["Admin runs", "Un administrateur lance", "Un administrador ejecuta", "Ein Administrator startet", "Um administrador executa"],
    ["Verification level raised, @everyone messaging blocked", "Le niveau de vérification augmente et @everyone ne peut plus écrire", "Aumenta el nivel de verificación y @everyone no puede escribir", "Die Verifizierungsstufe steigt und @everyone kann nicht mehr schreiben", "O nível de verificação aumenta e @everyone deixa de poder escrever"],
    ["Server-wide restrictions applied in seconds", "Les restrictions sont appliquées au serveur en quelques secondes", "Las restricciones se aplican al servidor en segundos", "Die Einschränkungen gelten nach wenigen Sekunden serverweit", "As restrições são aplicadas ao servidor em segundos"],
    ["Auto-unlock after the configured duration, or manual /lotus panic off", "Déverrouillage automatique après la durée prévue, ou manuel avec /lotus panic off", "Desbloqueo automático tras el plazo configurado o manual con /lotus panic off", "Automatische Entsperrung nach Ablauf der Dauer oder manuell mit /lotus panic off", "Desbloqueio automático após o prazo definido ou manual com /lotus panic off"],
    ["🔒 Panic Mode — Lockdown Enabled", "🔒 Mode panique — verrouillage activé", "🔒 Modo pánico — bloqueo activado", "🔒 Panikmodus — Sperre aktiviert", "🔒 Modo de pânico — bloqueio ativado"],
    ["Triggered by", "Déclenché par", "Activado por", "Ausgelöst von", "Ativado por"],
    ["Scope", "Portée", "Alcance", "Umfang", "Âmbito"],
    ["All text channels", "Tous les salons textuels", "Todos los canales de texto", "Alle Textkanäle", "Todos os canais de texto"],
    ["Verification level", "Niveau de vérification", "Nivel de verificación", "Verifizierungsstufe", "Nível de verificação"],
    ["Very High", "Très élevé", "Muy alto", "Sehr hoch", "Muito elevado"],
    ["One command. Your security stack, ready.", "Une commande. Tes protections sont prêtes.", "Un comando. Tus protecciones listas.", "Ein Befehl. Dein Schutz ist bereit.", "Um comando. As tuas proteções ficam prontas."],
    ["Lotus is designed to run with Administrator so its protections can act server-wide — quarantine, revert, lock down — without hitting a permission wall mid-response. Every Lotus command still checks its own, stricter permission on top — see", "Lotus est conçu pour fonctionner avec la permission Administrateur afin d'agir sur tout le serveur — quarantaine, annulation, verrouillage — sans être bloqué pendant une intervention. Chaque commande vérifie aussi ses propres permissions, plus strictes ; consulte", "Lotus está diseñado para funcionar con permiso de Administrador y actuar en todo el servidor — cuarentena, reversión y bloqueo — sin quedar limitado durante una intervención. Cada comando comprueba además permisos propios más estrictos; consulta", "Lotus benötigt Administratorrechte, um serverweit handeln zu können – Quarantäne, Rücknahme und Sperre – ohne bei einer Reaktion an Berechtigungen zu scheitern. Jeder Befehl prüft zusätzlich strengere eigene Rechte; siehe", "O Lotus foi concebido para funcionar com a permissão Administrador, para poder agir em todo o servidor — quarentena, reversão e bloqueio — sem falhar por falta de permissões. Cada comando verifica também permissões próprias mais rigorosas; consulta"],
    ["the full command list", "la liste complète des commandes", "la lista completa de comandos", "die vollständige Befehlsliste", "a lista completa de comandos"],
    ["Creates or repairs the", "Crée ou répare la catégorie", "Crea o repara la categoría", "Erstellt oder repariert die Kategorie", "Cria ou repara a categoria"],
    ["category with your logs, alerts and quarantine channels, plus a join-gate role and verification channel. Existing Lotus roles and channels are found and reused instead of duplicated, so it's safe to run again any time — to repair a broken setup or after manual changes. Already have your own join gate? Run", "avec les salons de journaux, d'alertes et de quarantaine, ainsi qu'un rôle d'accueil et un salon de vérification. Les éléments Lotus existants sont réutilisés, sans doublon : tu peux relancer la commande pour réparer une installation ou après des changements manuels. Tu as déjà ton propre système de vérification ? Lance", "con canales de registros, alertas y cuarentena, además de un rol de acceso y un canal de verificación. Se reutilizan los elementos de Lotus existentes sin duplicarlos; puedes ejecutar el comando de nuevo para reparar la instalación o tras cambios manuales. ¿Ya tienes tu propio sistema de verificación? Ejecuta", "mit Protokoll-, Alarm- und Quarantänekanälen sowie einer Rolle und einem Kanal zur Verifizierung. Vorhandene Lotus-Elemente werden wiederverwendet, nicht dupliziert: Du kannst den Befehl zur Reparatur oder nach manuellen Änderungen erneut ausführen. Du hast bereits eine eigene Verifizierung? Nutze", "com canais de registos, alertas e quarentena, além de um cargo de entrada e um canal de verificação. Os elementos Lotus existentes são reutilizados, sem duplicações: podes executar novamente o comando para reparar a instalação ou após alterações manuais. Já tens a tua própria verificação? Executa"],
    ["to skip that part.", "pour ignorer cette étape.", "para omitir esa parte.", "um diesen Teil zu überspringen.", "para saltar essa parte."],
    ["Set your default punishment with", "Définis la sanction par défaut avec", "Define la sanción predeterminada con", "Lege die Standardsanktion fest mit", "Define a sanção predefinida com"],
    [", exempt trusted members or roles with", ", autorise les membres ou rôles de confiance avec", ", permite miembros o roles de confianza con", ", nimm vertrauenswürdige Mitglieder oder Rollen aus mit", ", autoriza membros ou cargos de confiança com"],
    [", and check everything at a glance with", ", puis vérifie la configuration avec", ", y comprueba la configuración con", ", und prüfe die Einstellungen mit", ", e verifica a configuração com"],
    ["— or just leave the defaults.", "— ou garde simplement les valeurs par défaut.", "— o mantén los valores predeterminados.", "– oder behalte einfach die Standardwerte.", "— ou mantém os valores predefinidos."],
    ["Configures or repairs Lotus's whole security infrastructure", "Configure ou répare toute l'infrastructure de sécurité Lotus", "Configura o repara toda la infraestructura de seguridad de Lotus", "Richtet die gesamte Lotus-Sicherheitsstruktur ein oder repariert sie", "Configura ou repara toda a infraestrutura de segurança do Lotus"],
    ["Shows what Lotus can do and how commands are organized", "Présente les fonctions de Lotus et l'organisation des commandes", "Muestra las funciones de Lotus y cómo se organizan los comandos", "Zeigt die Funktionen von Lotus und den Aufbau der Befehle", "Mostra as funções do Lotus e a organização dos comandos"],
    ["See every command", "Voir toutes les commandes", "Ver todos los comandos", "Alle Befehle ansehen", "Ver todos os comandos"],
    ["Why Lotus", "Pourquoi Lotus", "Por qué Lotus", "Warum Lotus", "Porquê o Lotus"],
    ["Built to act, not just alert.", "Conçu pour agir, pas seulement alerter.", "Creado para actuar, no solo avisar.", "Entwickelt, um zu handeln – nicht nur zu warnen.", "Criado para agir, não apenas alertar."],
    ["Automated Protection", "Protection automatique", "Protección automática", "Automatischer Schutz", "Proteção automática"],
    ["Lotus reacts before moderators have to — detection and response run on their own, in seconds.", "Lotus réagit avant qu'un modérateur ait besoin d'intervenir : détection et réponse fonctionnent automatiquement, en quelques secondes.", "Lotus responde antes de que intervenga un moderador: la detección y la respuesta son automáticas y tardan segundos.", "Lotus reagiert, bevor Moderatoren eingreifen müssen: Erkennung und Reaktion laufen automatisch in Sekunden.", "O Lotus reage antes de um moderador precisar de intervir: a deteção e a resposta são automáticas e demoram segundos."],
    ["Security First", "La sécurité avant tout", "La seguridad primero", "Sicherheit zuerst", "Segurança em primeiro lugar"],
    ["Designed around preventing destructive actions, not just logging them after the fact.", "Conçu pour empêcher les actions destructrices, pas seulement les consigner après coup.", "Diseñado para impedir acciones destructivas, no solo registrarlas después.", "Entwickelt, um zerstörerische Aktionen zu verhindern, statt sie nur nachträglich zu protokollieren.", "Concebido para impedir ações destrutivas, não apenas registá-las depois."],
    ["Simple Setup", "Installation simple", "Configuración sencilla", "Einfache Einrichtung", "Configuração simples"],
    ["One command configures the core security infrastructure — no manual channel or role wiring.", "Une commande configure les protections essentielles, sans créer manuellement les salons ou les rôles.", "Un comando configura las protecciones básicas, sin crear canales o roles manualmente.", "Ein Befehl richtet die grundlegende Sicherheitsstruktur ein – ohne Kanäle und Rollen manuell zu verbinden.", "Um comando configura as proteções essenciais, sem criar manualmente canais ou cargos."],
    ["Transparent", "Transparent", "Transparente", "Transparent", "Transparente"],
    ["Security logs, alerts and a searchable case ID for every sanction Lotus has ever issued.", "Des journaux, des alertes et un numéro de dossier consultable pour chaque sanction émise par Lotus.", "Registros, alertas y un número de caso consultable para cada sanción de Lotus.", "Protokolle, Meldungen und eine auffindbare Fallnummer für jede von Lotus verhängte Sanktion.", "Registos, alertas e um número de caso pesquisável para cada sanção aplicada pelo Lotus."],
    ["Comparison", "Comparaison", "Comparación", "Vergleich", "Comparação"],
    ["How Lotus's free plan compares", "Comment se situe l'offre gratuite de Lotus", "Cómo se compara el plan gratuito de Lotus", "So schneidet der kostenlose Lotus-Tarif ab", "Como se compara o plano gratuito do Lotus"],
    ["Based on publicly documented features. We checked Lotus's free plan against a few other Discord security bots people compare it to — see the full breakdown, row by row.", "Comparaison fondée sur les fonctionnalités publiquement documentées de quelques bots de sécurité Discord. Consulte le détail, ligne par ligne.", "Comparación basada en funciones documentadas públicamente de varios bots de seguridad para Discord. Consulta el detalle fila por fila.", "Vergleich anhand öffentlich dokumentierter Funktionen mehrerer Discord-Sicherheitsbots. Die vollständige Übersicht zeigt jede Funktion einzeln.", "Comparação baseada em funcionalidades documentadas publicamente de vários bots de segurança Discord. Consulta os detalhes linha a linha."],
    ["core protections included free, based on each bot's own public feature and pricing pages as of September 2026.", "protections essentielles gratuites, selon les pages de fonctionnalités et de tarifs publiées par chaque bot en septembre 2026.", "protecciones básicas gratuitas, según las páginas de funciones y precios publicadas por cada bot en septiembre de 2026.", "kostenlose Kernfunktionen laut den im September 2026 veröffentlichten Funktions- und Preisseiten der Bots.", "proteções essenciais gratuitas, segundo as páginas de funcionalidades e preços publicadas por cada bot em setembro de 2026."],
    ["View full comparison →", "Voir la comparaison complète →", "Ver la comparación completa →", "Vollständigen Vergleich ansehen →", "Ver a comparação completa →"],
    ["Yes, at any time, with no lock-in. Removing Lotus from your server stops all monitoring immediately. Data deletion on removal isn't automated yet, so your server's configuration and logs stay stored until you contact us to request deletion — see the", "Oui, à tout moment. Retirer Lotus arrête immédiatement la surveillance. La suppression des données n'est pas encore automatique : la configuration et les journaux restent enregistrés jusqu'à ce que tu demandes leur suppression. Consulte la", "Sí, en cualquier momento. Al quitar Lotus se detiene de inmediato la vigilancia. La eliminación de datos aún no es automática: la configuración y los registros permanecen guardados hasta que solicites su eliminación. Consulta la", "Ja, jederzeit. Wenn du Lotus entfernst, endet die Überwachung sofort. Die Daten werden noch nicht automatisch gelöscht: Konfiguration und Protokolle bleiben gespeichert, bis du ihre Löschung beantragst. Weitere Informationen stehen in der", "Sim, a qualquer momento. Remover o Lotus interrompe imediatamente a monitorização. A eliminação dos dados ainda não é automática: a configuração e os registos permanecem guardados até pedires a sua eliminação. Consulta a"],
    ["for details.", "pour plus de détails.", "para más información.", "für weitere Einzelheiten.", "para mais detalhes."],
    ["Behind Lotus", "À l'origine de Lotus", "Detrás de Lotus", "Hinter Lotus", "Por detrás do Lotus"],
    ["Why we built Lotus", "Pourquoi nous avons créé Lotus", "Por qué creamos Lotus", "Warum wir Lotus entwickelt haben", "Porque criámos o Lotus"],
    ["We've seen what a raid or nuke can do to a Discord community — channels gone, roles destroyed, months or even years of work wiped out in minutes.", "Nous avons vu les dégâts qu'un raid ou un nuke peut causer à une communauté Discord : salons supprimés, rôles détruits et des mois, voire des années de travail effacés en quelques minutes.", "Hemos visto el daño que un raid o un nuke puede causar a una comunidad de Discord: canales eliminados, roles destruidos y meses o años de trabajo perdidos en minutos.", "Wir haben gesehen, was ein Raid oder Nuke einer Discord-Community antun kann: gelöschte Kanäle, zerstörte Rollen und Monate oder Jahre Arbeit in wenigen Minuten verloren.", "Vimos o que um raid ou nuke pode fazer a uma comunidade Discord: canais apagados, cargos destruídos e meses ou anos de trabalho perdidos em minutos."],
    ["Lotus started from a simple idea: security shouldn't just tell you what went wrong after the fact. It should be watching while it happens, and ready to act.", "Lotus est né d'une idée simple : la sécurité ne doit pas seulement expliquer ce qui s'est passé après coup. Elle doit surveiller les événements et pouvoir intervenir aussitôt.", "Lotus nació de una idea sencilla: la seguridad no debe limitarse a explicar los daños después. Debe vigilar lo que ocurre y estar lista para actuar.", "Lotus entstand aus einer einfachen Idee: Sicherheit sollte nicht nur im Nachhinein erklären, was schiefging. Sie sollte das Geschehen beobachten und sofort handeln können.", "O Lotus nasceu de uma ideia simples: a segurança não deve limitar-se a explicar os danos depois. Deve acompanhar o que acontece e estar pronta para agir."],
    ["So we built the bot we wished more communities had when things went wrong.", "Nous avons donc créé le bot que nous aurions aimé voir protéger davantage de communautés.", "Así creamos el bot que nos habría gustado que protegiera a más comunidades.", "Deshalb haben wir den Bot entwickelt, den wir uns für mehr Communities gewünscht hätten.", "Por isso criámos o bot que gostaríamos que protegesse mais comunidades."],
    ["Documentation", "Documentation", "Documentación", "Dokumentation", "Documentação"],
    ["Every /lotus command.", "Toutes les commandes /lotus.", "Todos los comandos /lotus.", "Alle /lotus-Befehle.", "Todos os comandos /lotus."],
    ["Pulled straight from Lotus's own command definitions, not a curated highlight reel. Discord only shows", "Cette liste vient directement des définitions de commandes de Lotus, pas d'une sélection marketing. Discord n'affiche", "Esta lista procede directamente de los comandos de Lotus, no de una selección publicitaria. Discord solo muestra", "Diese Liste stammt direkt aus den Lotus-Befehlsdefinitionen und ist keine Marketingauswahl. Discord zeigt", "Esta lista vem diretamente das definições de comandos do Lotus, não de uma seleção publicitária. O Discord só mostra"],
    ["to members who already have at least", "qu'aux membres qui disposent au minimum de la permission", "a quienes ya tienen al menos el permiso", "nur Mitgliedern, die mindestens das Recht", "a membros que já têm pelo menos a permissão"],
    ["Moderate Members", "Modérer les membres", "Moderar miembros", "Mitglieder moderieren", "Moderar membros"],
    ["— the badge on each row is the extra permission that specific action needs on top of that.", "— le badge de chaque ligne indique la permission supplémentaire requise pour cette action.", "— la etiqueta de cada fila indica el permiso adicional necesario para esa acción.", "– das Label in jeder Zeile zeigt das zusätzliche Recht für die jeweilige Aktion.", "— a etiqueta de cada linha indica a permissão adicional necessária para essa ação."],
    ["All", "Toutes", "Todos", "Alle", "Todos"],
    ["Security", "Sécurité", "Seguridad", "Sicherheit", "Segurança"],
    ["Moderation", "Modération", "Moderación", "Moderation", "Moderação"],
    ["Configuration", "Configuration", "Configuración", "Konfiguration", "Configuração"],
    ["Utility", "Utilitaires", "Utilidades", "Werkzeuge", "Utilitários"],
    ["No command matches your search.", "Aucune commande ne correspond à ta recherche.", "Ningún comando coincide con tu búsqueda.", "Kein Befehl entspricht deiner Suche.", "Nenhum comando corresponde à tua pesquisa."],
    ["🚀 Getting started", "🚀 Pour commencer", "🚀 Primeros pasos", "🚀 Erste Schritte", "🚀 Primeiros passos"],
    ["Analyzes and automatically configures/repairs Lotus's security infrastructure — category, logs/alerts/quarantine channels, and the verification gate.", "Analyse, configure ou répare automatiquement l'infrastructure de sécurité Lotus : catégorie, salons de journaux, d'alertes et de quarantaine, et vérification.", "Analiza, configura o repara automáticamente la infraestructura de seguridad de Lotus: categoría, canales de registros, alertas y cuarentena, y verificación.", "Analysiert, richtet die Lotus-Sicherheitsstruktur ein oder repariert sie: Kategorie, Protokoll-, Alarm- und Quarantänekanäle sowie Verifizierung.", "Analisa, configura ou repara automaticamente a infraestrutura de segurança do Lotus: categoria, canais de registos, alertas e quarentena e verificação."],
    ["Administrator", "Administrateur", "Administrador", "Administrator", "Administrador"],
    ["⚙️ Server config", "⚙️ Configuration du serveur", "⚙️ Configuración del servidor", "⚙️ Servereinstellungen", "⚙️ Configuração do servidor"],
    ["Sets the security logs channel", "Définit le salon des journaux de sécurité", "Define el canal de registros de seguridad", "Legt den Kanal für Sicherheitsprotokolle fest", "Define o canal de registos de segurança"],
    ["Sets the critical alerts channel (nuke/raid detected)", "Définit le salon des alertes critiques (nuke ou raid détecté)", "Define el canal de alertas críticas (nuke o raid detectado)", "Legt den Kanal für kritische Meldungen fest (Nuke oder Raid erkannt)", "Define o canal de alertas críticos (nuke ou raid detetado)"],
    ["Sets the punishment applied upon detection", "Définit la sanction appliquée lorsqu'une menace est détectée", "Define la sanción aplicada al detectar una amenaza", "Legt die Sanktion bei erkannter Bedrohung fest", "Define a sanção aplicada quando é detetada uma ameaça"],
    ["Enable/disable message edit/delete + join/leave logging to the logs channel", "Active ou désactive la journalisation des modifications et suppressions de messages et des arrivées et départs", "Activa o desactiva el registro de cambios y eliminaciones de mensajes y de entradas y salidas", "Aktiviert oder deaktiviert Protokolle für Nachrichtenänderungen und -löschungen sowie Beitritte und Austritte", "Ativa ou desativa o registo de edições e eliminações de mensagens e de entradas e saídas"],
    ["Sets the channel where Lotus posts its own update announcements", "Définit le salon où Lotus annonce ses mises à jour", "Define el canal donde Lotus anuncia sus actualizaciones", "Legt den Kanal für Lotus-Updatehinweise fest", "Define o canal onde o Lotus anuncia as suas atualizações"],
    ["🎯 Thresholds", "🎯 Seuils", "🎯 Umbrales", "🎯 Schwellenwerte", "🎯 Limites"],
    ["Displays all current thresholds (default or custom)", "Affiche tous les seuils actuels, par défaut ou personnalisés", "Muestra todos los umbrales actuales, predeterminados o personalizados", "Zeigt alle aktuellen Standard- und benutzerdefinierten Schwellenwerte", "Mostra todos os limites atuais, predefinidos ou personalizados"],
    ["Sets a custom threshold for this server", "Définit un seuil personnalisé pour ce serveur", "Define un umbral personalizado para este servidor", "Legt einen eigenen Schwellenwert für diesen Server fest", "Define um limite personalizado para este servidor"],
    ["Removes the custom threshold and reverts to the default value", "Supprime le seuil personnalisé et revient à la valeur par défaut", "Elimina el umbral personalizado y vuelve al valor predeterminado", "Entfernt den eigenen Schwellenwert und stellt den Standard wieder her", "Remove o limite personalizado e repõe o valor predefinido"],
    ["Fully enables/disables one specific security check for this server", "Active ou désactive entièrement une protection précise pour ce serveur", "Activa o desactiva por completo una protección concreta de este servidor", "Aktiviert oder deaktiviert eine bestimmte Sicherheitsprüfung für diesen Server vollständig", "Ativa ou desativa completamente uma proteção específica neste servidor"],
    ["✅ Whitelist", "✅ Liste blanche", "✅ Lista de confianza", "✅ Vertrauensliste", "✅ Lista de confiança"],
    ["Adds a member or role to the whitelist", "Ajoute un membre ou un rôle à la liste blanche", "Añade un miembro o rol a la lista de confianza", "Fügt ein Mitglied oder eine Rolle zur Vertrauensliste hinzu", "Adiciona um membro ou cargo à lista de confiança"],
    ["Removes a member or role from the whitelist", "Retire un membre ou un rôle de la liste blanche", "Quita un miembro o rol de la lista de confianza", "Entfernt ein Mitglied oder eine Rolle aus der Vertrauensliste", "Remove um membro ou cargo da lista de confiança"],
    ["Displays the current whitelist", "Affiche la liste blanche actuelle", "Muestra la lista de confianza actual", "Zeigt die aktuelle Vertrauensliste", "Mostra a lista de confiança atual"],
    ["📯 Ping security", "📯 Protection des mentions", "📯 Protección de menciones", "📯 Erwähnungsschutz", "📯 Proteção de menções"],
    ["Shows the current ping security configuration", "Affiche la configuration de la protection des mentions", "Muestra la configuración de la protección de menciones", "Zeigt die Einstellungen des Erwähnungsschutzes", "Mostra a configuração da proteção de menções"],
    ["Enables or disables mass-mention protection entirely", "Active ou désactive complètement la protection contre les mentions massives", "Activa o desactiva la protección contra menciones masivas", "Aktiviert oder deaktiviert den Schutz vor massenhaften Erwähnungen", "Ativa ou desativa a proteção contra menções em massa"],
    ["Adds a role or a person: mentioning it is treated as a mass mention", "Ajoute un rôle ou une personne dont la mention sera traitée comme une mention massive", "Añade un rol o usuario cuya mención se tratará como masiva", "Fügt eine Rolle oder Person hinzu, deren Erwähnung als Massen-Erwähnung gilt", "Adiciona um cargo ou pessoa cuja menção será tratada como menção em massa"],
    ["Removes a role or a person from the protected mentions list", "Retire un rôle ou une personne de la liste des mentions protégées", "Quita un rol o usuario de la lista de menciones protegidas", "Entfernt eine Rolle oder Person aus der Liste geschützter Erwähnungen", "Remove um cargo ou pessoa da lista de menções protegidas"],
    ["💾 Backups", "💾 Sauvegardes", "💾 Copias de seguridad", "💾 Backups", "💾 Cópias de segurança"],
    ["Back up the current structure (roles, positions, channels)", "Sauvegarde la structure actuelle (rôles, positions et salons)", "Guarda la estructura actual (roles, posiciones y canales)", "Sichert die aktuelle Struktur (Rollen, Positionen und Kanäle)", "Guarda a estrutura atual (cargos, posições e canais)"],
    ["Restores the hierarchy and missing elements", "Restaure la hiérarchie et les éléments manquants", "Restaura la jerarquía y los elementos que faltan", "Stellt die Hierarchie und fehlende Elemente wieder her", "Restaura a hierarquia e os elementos em falta"],
    ["Displays details of the last saved backup", "Affiche les détails de la dernière sauvegarde", "Muestra los detalles de la última copia guardada", "Zeigt Details des letzten Backups", "Mostra os detalhes da última cópia guardada"],
    ["🚨 Incident response", "🚨 Réponse aux incidents", "🚨 Respuesta a incidentes", "🚨 Vorfallreaktion", "🚨 Resposta a incidentes"],
    ["Releases a member from quarantine and restores their previous roles", "Libère un membre de quarantaine et restaure ses anciens rôles", "Libera a un miembro de la cuarentena y restaura sus roles anteriores", "Entlässt ein Mitglied aus der Quarantäne und stellt seine früheren Rollen wieder her", "Liberta um membro da quarentena e restaura os seus cargos anteriores"],
    ["🔨 Manual moderation", "🔨 Modération manuelle", "🔨 Moderación manual", "🔨 Manuelle Moderation", "🔨 Moderação manual"],
    ["Ban Members", "Bannir des membres", "Bloquear miembros", "Mitglieder bannen", "Banir membros"],
    ["Kicks a member", "Expulse un membre", "Expulsa a un miembro", "Kickt ein Mitglied", "Expulsa um membro"],
    ["Kick Members", "Expulser des membres", "Expulsar miembros", "Mitglieder kicken", "Expulsar membros"],
    ["Issues a warning to a member", "Avertit un membre", "Advierte a un miembro", "Verwarnt ein Mitglied", "Avisa um membro"],
    ["Lists a member's active warnings", "Liste les avertissements actifs d'un membre", "Lista las advertencias activas de un miembro", "Zeigt aktive Verwarnungen eines Mitglieds", "Lista os avisos ativos de um membro"],
    ["Revokes a member's most recent active warning", "Retire le dernier avertissement actif d'un membre", "Retira la advertencia activa más reciente de un miembro", "Widerruft die letzte aktive Verwarnung eines Mitglieds", "Remove o aviso ativo mais recente de um membro"],
    ["Bulk-deletes recent messages in this channel", "Supprime plusieurs messages récents dans ce salon", "Elimina varios mensajes recientes de este canal", "Löscht mehrere neue Nachrichten in diesem Kanal", "Elimina várias mensagens recentes neste canal"],
    ["Manage Messages", "Gérer les messages", "Gestionar mensajes", "Nachrichten verwalten", "Gerir mensagens"],
    ["Sets this channel's slowmode", "Définit le mode lent de ce salon", "Define el modo lento de este canal", "Legt den Slowmode dieses Kanals fest", "Define o modo lento deste canal"],
    ["Manage Channels", "Gérer les salons", "Gestionar canales", "Kanäle verwalten", "Gerir canais"],
    ["📊 Overview & updates", "📊 Vue d'ensemble et mises à jour", "📊 Resumen y actualizaciones", "📊 Übersicht und Updates", "📊 Visão geral e atualizações"],
    ["Displays a summary of Lotus's recent activity on this server", "Affiche un résumé de l'activité récente de Lotus sur ce serveur", "Muestra un resumen de la actividad reciente de Lotus en este servidor", "Zeigt eine Zusammenfassung der letzten Lotus-Aktivitäten auf diesem Server", "Mostra um resumo da atividade recente do Lotus neste servidor"],
    ["Shows what Lotus can do and how its commands are organized", "Présente les fonctions de Lotus et l'organisation de ses commandes", "Muestra las funciones de Lotus y cómo se organizan sus comandos", "Zeigt die Funktionen von Lotus und den Aufbau seiner Befehle", "Mostra as funções do Lotus e a organização dos seus comandos"],
    ["Shows the latest Lotus update", "Affiche la dernière mise à jour de Lotus", "Muestra la última actualización de Lotus", "Zeigt das neueste Lotus-Update", "Mostra a última atualização do Lotus"],
    ["Shows whether this server has Lotus Premium", "Indique si ce serveur dispose de Lotus Premium", "Indica si este servidor tiene Lotus Premium", "Zeigt, ob dieser Server Lotus Premium hat", "Indica se este servidor tem Lotus Premium"],
    ["A few commands reserved for the Lotus team (granting Premium, broadcasting changelogs) aren't listed here — they're not something you'd ever need to run on your own server.", "Quelques commandes réservées à l'équipe Lotus (attribution de Premium, annonces de mises à jour) ne figurent pas ici : tu n'en as pas besoin pour gérer ton serveur.", "No se muestran algunos comandos reservados al equipo de Lotus (conceder Premium y anunciar cambios): no los necesitas para gestionar tu servidor.", "Einige Befehle für das Lotus-Team (Premium freischalten, Updates ankündigen) stehen hier nicht, da du sie für deinen Server nicht brauchst.", "Alguns comandos reservados à equipa Lotus (atribuir Premium, anunciar atualizações) não aparecem aqui: não precisas deles para gerir o teu servidor."],
    ["A free tier that isn't just a taste of the real thing.", "Une offre gratuite qui protège vraiment.", "Un plan gratuito que protege de verdad.", "Ein kostenloser Tarif, der wirklich schützt.", "Um plano gratuito que protege a sério."],
    ["Based on publicly documented features. A lot of Discord security bots put moderation, logging, or half their anti-nuke coverage behind a paywall and call what's left \"free.\" Here's how Lotus's free plan holds up against a few other bots people compare it to.", "Comparaison fondée sur les fonctionnalités publiquement documentées. Certains bots Discord réservent une partie de la modération, des journaux ou de l'anti-nuke aux offres payantes. Voici comment l'offre gratuite de Lotus se situe face à d'autres bots souvent comparés.", "Comparación basada en funciones documentadas públicamente. Algunos bots de seguridad para Discord reservan parte de la moderación, los registros o la protección antinuke para planes de pago. Así se compara el plan gratuito de Lotus con otros bots similares.", "Vergleich anhand öffentlich dokumentierter Funktionen. Manche Discord-Sicherheitsbots bieten Moderation, Protokolle oder Teile des Anti-Nuke-Schutzes nur gegen Bezahlung. So schneidet der kostenlose Lotus-Tarif im Vergleich ab.", "Comparação baseada em funcionalidades documentadas publicamente. Alguns bots de segurança Discord reservam parte da moderação, dos registos ou da proteção anti-nuke para planos pagos. Assim se compara o plano gratuito do Lotus com outros bots semelhantes."],
    ["Swipe sideways to see Lotus, Wick, Beemo and Security Bot side by side →", "Fais défiler horizontalement pour comparer Lotus, Wick, Beemo et Security Bot →", "Desliza para comparar Lotus, Wick, Beemo y Security Bot →", "Wische zur Seite, um Lotus, Wick, Beemo und Security Bot zu vergleichen →", "Desliza para comparar Lotus, Wick, Beemo e Security Bot →"],
    ["Anti-Nuke", "Anti-nuke", "Antinuke", "Anti-Nuke", "Anti-nuke"],
    ["🛡️ AntiNuke — Mass Channel Deletion", "🛡️ Anti-nuke — suppression massive de salons", "🛡️ Antinuke — eliminación masiva de canales", "🛡️ Anti-Nuke — massenhafte Kanallöschung", "🛡️ Anti-nuke — eliminação em massa de canais"],
    ["Reverted automatically", "Annulé automatiquement", "Revertido automáticamente", "Automatisch rückgängig gemacht", "Revertido automaticamente"],
    ["Free plan includes", "Inclus dans l'offre gratuite", "Incluido en el plan gratuito", "Im Gratis-Tarif enthalten", "Incluído no plano gratuito"],
    ["6/6 free", "6/6 gratuits", "6/6 gratis", "6/6 kostenlos", "6/6 grátis"],
    ["Unknown", "Non précisé", "No indicado", "Unbekannt", "Não indicado"],
    ["Full manual moderation suite", "Outils complets de modération manuelle", "Herramientas completas de moderación manual", "Vollständige manuelle Moderation", "Ferramentas completas de moderação manual"],
    ["No feature timer — real protection, not a trial", "Sans limite de durée : une vraie protection, pas un essai", "Sin límite de tiempo: protección real, no una prueba", "Ohne Zeitlimit: echter Schutz statt Testversion", "Sem limite de tempo: proteção real, não um teste"],
    ["Partial", "Partiel", "Parcial", "Teilweise", "Parcial"],
    ["Raid-only", "Raid uniquement", "Solo raids", "Nur Raids", "Apenas raids"],
    ["Based on publicly documented features, Lotus is the only one of the four checked on", "Selon les fonctionnalités publiquement documentées, Lotus est le seul des quatre bots comparés à couvrir", "Según las funciones documentadas públicamente, Lotus es el único de los cuatro bots comparados que cubre", "Laut öffentlich dokumentierten Funktionen ist Lotus der einzige der vier verglichenen Bots mit Schutz in", "Segundo as funcionalidades documentadas publicamente, o Lotus é o único dos quatro bots comparados a cobrir"],
    ["every row", "tous les critères", "todos los criterios", "allen Zeilen", "todos os critérios"],
    ["above.", "ci-dessus.", "anteriores.", "oben.", "acima."],
    ["Feature information based on publicly available documentation and may change over time. Checked directly against each bot's own website and docs in September 2026 — always worth double-checking before you decide. Where a bot's own pages didn't clearly state whether a feature is free or paid, that cell is marked \"Unknown\" rather than guessed at.", "Les informations proviennent de documents publics et peuvent évoluer. Vérification effectuée sur les sites et documentations des bots en septembre 2026 : revérifie avant de choisir. Quand une source ne précisait pas si une fonction était gratuite ou payante, nous avons indiqué « Non précisé ».", "La información procede de documentos públicos y puede cambiar. Se revisaron los sitios y la documentación de cada bot en septiembre de 2026: compruébala antes de decidir. Si una fuente no indicaba si una función era gratuita o de pago, se marca « No indicado ».", "Die Angaben stammen aus öffentlichen Dokumentationen und können sich ändern. Geprüft wurden die Websites und Unterlagen der Bots im September 2026; überprüfe sie vor deiner Entscheidung erneut. War kostenlos oder kostenpflichtig nicht klar angegeben, steht dort „Unbekannt“.", "As informações vêm de documentação pública e podem mudar. Os sites e documentos de cada bot foram consultados em setembro de 2026; verifica novamente antes de decidires. Quando não era claro se uma função era gratuita ou paga, assinalámos « Não indicado »."],
    ["Something we didn't find in their public docs", "Un point absent de leur documentation publique", "Algo que no encontramos en su documentación pública", "Was wir in ihren öffentlichen Unterlagen nicht fanden", "Algo que não encontrámos na documentação pública"],
    ["We couldn't find a mention, in Wick, Beemo or Security Bot's own public feature pages, of catching a quiet permission escalation (a role edit that silently grants Administrator or ban/kick power) and reverting it automatically — it may exist and simply not be documented publicly. Lotus does document this — it's the", "Les pages publiques de Wick, Beemo et Security Bot ne mentionnaient pas la détection et l'annulation automatiques d'une élévation discrète de permissions (par exemple, un rôle qui obtient Administrateur). Cette fonction peut exister sans être documentée. Lotus la décrit sous le nom de", "En las páginas públicas de Wick, Beemo y Security Bot no encontramos mención a la detección y reversión automática de una escalada discreta de permisos (por ejemplo, un rol que obtiene Administrador). Puede existir sin estar documentada. Lotus la describe como", "Auf den öffentlichen Funktionsseiten von Wick, Beemo und Security Bot fanden wir keinen Hinweis auf das Erkennen und automatische Rückgängigmachen unauffälliger Rechteausweitungen (etwa Administratorrechte für eine Rolle). Die Funktion könnte existieren, ohne dort dokumentiert zu sein. Lotus beschreibt sie als", "Nas páginas públicas de Wick, Beemo e Security Bot não encontrámos referência à deteção e reversão automática de uma elevação discreta de permissões (por exemplo, um cargo que ganha Administrador). A função pode existir sem estar documentada. O Lotus descreve-a como"],
    ["module, included in Premium.", "un module inclus dans Premium.", "un módulo incluido en Premium.", "ein Modul im Premium-Tarif.", "um módulo incluído no Premium."],
  ]);

  const dictionaries = Object.fromEntries(locales.slice(1).map((locale, index) => [
    locale, Object.fromEntries(rows.map((row) => [row[0], row[index + 1]])),
  ]));
  const originals = new WeakMap();
  let current = "en";
  let scheduled = false;

  function translate() {
    scheduled = false;
    document.documentElement.lang = current;
    const dictionary = dictionaries[current] || {};
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement?.closest("script, style, code, pre, .lotus-language")) continue;
      const source = originals.get(node) ?? node.nodeValue;
      const key = source.trim().replace(/\s+/g, " ");
      if (!key || (!Object.hasOwn(dictionary, key) && !originals.has(node))) continue;
      originals.set(node, source);
      const next = source.match(/^\s*/)[0] + (dictionary[key] || key) + source.match(/\s*$/)[0];
      if (node.nodeValue !== next) node.nodeValue = next;
    }
    const legalPaths = current === "fr"
      ? { "/privacy": "/confidentialite", "/terms": "/cgu", "/legal-notice": "/mentions-legales" }
      : { "/privacy": "/privacy", "/terms": "/terms", "/legal-notice": "/legal-notice" };
    for (const link of document.querySelectorAll('a[data-original-legal-path],a[href^="/"]')) {
      const original = link.dataset.originalLegalPath || link.getAttribute("href");
      if (!Object.hasOwn(legalPaths, original)) continue;
      link.dataset.originalLegalPath = original;
      link.setAttribute("href", legalPaths[original]);
    }
    const legalFooter = document.querySelector(".foot-legal") || document.querySelector("footer .foot-links:last-of-type");
    if (legalFooter) {
      let note = legalFooter.querySelector(".legal-language-note");
      if (!note) {
        note = document.createElement("span");
        note.className = "legal-language-note";
        note.style.cssText = "display:block;width:100%;font-size:12px;color:var(--text-dim);margin-top:8px";
        legalFooter.append(note);
      }
      const message = legalFallback[current] || "";
      if (note.textContent !== message) note.textContent = message;
      note.hidden = !legalFallback[current];
    }
    const page = location.pathname.includes("commands") ? "commands" : location.pathname.includes("compare") ? "compare" : "home";
    const titles = {
      home: { en: "Lotus Security", fr: "Lotus Security · Sécurité Discord", es: "Lotus Security · Seguridad Discord", de: "Lotus Security · Discord-Sicherheit", pt: "Lotus Security · Segurança Discord" },
      commands: { en: "Commands — Lotus Security", fr: "Commandes — Lotus Security", es: "Comandos — Lotus Security", de: "Befehle — Lotus Security", pt: "Comandos — Lotus Security" },
      compare: { en: "Compare — Lotus Security", fr: "Comparer — Lotus Security", es: "Comparar — Lotus Security", de: "Vergleich — Lotus Security", pt: "Comparar — Lotus Security" },
    };
    document.title = titles[page][current];
    const description = document.querySelector('meta[name="description"]');
    const pageDescriptions = {
      home: descriptions,
      commands: {
        en: "Every /lotus command, grouped by category, with the Discord permission each one needs.",
        fr: "Toutes les commandes /lotus, classées par catégorie, avec les permissions Discord nécessaires.",
        es: "Todos los comandos /lotus, agrupados por categoría, con los permisos de Discord necesarios.",
        de: "Alle /lotus-Befehle nach Kategorie, mit den jeweils benötigten Discord-Rechten.",
        pt: "Todos os comandos /lotus, agrupados por categoria, com as permissões Discord necessárias.",
      },
      compare: {
        en: "Compare Lotus's free plan with other Discord security bots using publicly documented features.",
        fr: "Compare l'offre gratuite de Lotus à d'autres bots de sécurité Discord à partir de leurs fonctions documentées.",
        es: "Compara el plan gratuito de Lotus con otros bots de seguridad para Discord según sus funciones documentadas.",
        de: "Vergleiche den kostenlosen Lotus-Tarif mit anderen Discord-Sicherheitsbots anhand dokumentierter Funktionen.",
        pt: "Compara o plano gratuito do Lotus com outros bots de segurança Discord segundo as funções documentadas.",
      },
    };
    if (description) description.content = pageDescriptions[page][current];
    const search = document.getElementById("cmd-search");
    if (search) {
      const labels = { en: "Search commands...", fr: "Rechercher une commande...", es: "Buscar comandos...", de: "Befehle suchen...", pt: "Pesquisar comandos..." };
      search.placeholder = labels[current];
      search.setAttribute("aria-label", labels[current]);
    }
    const burger = document.getElementById("navBurger");
    if (burger) burger.setAttribute("aria-label", { en: "Toggle navigation menu", fr: "Ouvrir ou fermer le menu", es: "Abrir o cerrar el menú", de: "Navigationsmenü öffnen oder schließen", pt: "Abrir ou fechar o menu" }[current]);
    const brand = document.querySelector("nav .brand");
    if (brand) brand.setAttribute("aria-label", { en: "Lotus Security — back to top", fr: "Lotus Security — retour en haut", es: "Lotus Security — volver arriba", de: "Lotus Security — zurück nach oben", pt: "Lotus Security — voltar ao topo" }[current]);
    const responseInfo = document.querySelector(".stat-info .info-dot");
    if (responseInfo) responseInfo.setAttribute("aria-label", { en: "How Lotus's detection and response speed is measured", fr: "Comment est mesurée la rapidité de détection et de réaction de Lotus", es: "Cómo se mide la velocidad de detección y respuesta de Lotus", de: "Wie die Erkennungs- und Reaktionsgeschwindigkeit von Lotus gemessen wird", pt: "Como é medida a rapidez de deteção e resposta do Lotus" }[current]);
    const premiumPlan = document.querySelector(".plan.pro");
    if (premiumPlan) premiumPlan.dataset.badge = { en: "MOST PROTECTION", fr: "PROTECTION MAXIMALE", es: "MÁXIMA PROTECCIÓN", de: "MAXIMALER SCHUTZ", pt: "PROTEÇÃO MÁXIMA" }[current];
    const compareClose = document.getElementById("compare-close");
    if (compareClose) compareClose.setAttribute("aria-label", { en: "Close", fr: "Fermer", es: "Cerrar", de: "Schließen", pt: "Fechar" }[current]);
    for (const link of document.querySelectorAll('a[href^="https://lotus-dashboard-tau.vercel.app/"]')) {
      const url = new URL(link.href);
      url.searchParams.set("lang", current);
      link.href = url.toString();
    }
    for (const link of document.querySelectorAll('a[data-original-internal],a[data-original-legal-path],a[href^="/"]')) {
      if (link.dataset.originalLegalPath) {
        const url = new URL(link.getAttribute("href"), location.origin);
        url.searchParams.set("lang", current);
        link.setAttribute("href", url.pathname + url.search + url.hash);
        continue;
      }
      const original = link.dataset.originalInternal || link.getAttribute("href");
      if (!original || original.startsWith("//") || original.includes("?lang=")) continue;
      link.dataset.originalInternal = original;
      const url = new URL(original, location.origin);
      url.searchParams.set("lang", current);
      link.setAttribute("href", url.pathname + url.search + url.hash);
    }
    document.getElementById("embed-card")?.removeAttribute("data-lotus-locale-pending");
    document.documentElement.removeAttribute?.("data-lotus-locale-pending");
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(translate);
  }

  function start() {
    const params = new URLSearchParams(location.search);
    let saved = "en";
    try { saved = localStorage.getItem("lotus-language") || "en"; } catch {}
    current = locales.includes(params.get("lang")) ? params.get("lang") : locales.includes(saved) ? saved : "en";
    try { localStorage.setItem("lotus-language", current); } catch {}
    const label = document.createElement("details");
    label.className = "lotus-language";
    label.innerHTML = `<summary><img class="lotus-flag lotus-current-flag" src="/assets/flags/${current}.svg" alt="" aria-hidden="true"><span class="lotus-language-name"></span></summary><div class="lotus-language-menu">${locales.map((locale) => `<button class="lotus-language-option" type="button" data-locale="${locale}" aria-label="${names[locale]}"><img class="lotus-flag" src="/assets/flags/${locale}.svg" alt="" aria-hidden="true">${names[locale]}</button>`).join("")}</div>`;
    const summary = label.querySelector("summary");
    const languageLabels = { en: "Language", fr: "Langue", es: "Idioma", de: "Sprache", pt: "Idioma" };
    const updateLanguageLabel = () => {
      label.querySelector(".lotus-language-name").textContent = names[current];
      label.querySelector(".lotus-current-flag").src = `/assets/flags/${current}.svg`;
      summary.setAttribute("aria-label", `${languageLabels[current]} : ${names[current]}`);
      for (const option of label.querySelectorAll(".lotus-language-option")) {
        option.setAttribute("aria-current", option.dataset.locale === current ? "true" : "false");
      }
    };
    updateLanguageLabel();
    label.addEventListener("click", (event) => {
      const option = event.target.closest(".lotus-language-option");
      if (!option) return;
      current = option.dataset.locale;
      label.open = false;
      updateLanguageLabel();
      try { localStorage.setItem("lotus-language", current); } catch {}
      const url = new URL(location.href);
      url.searchParams.set("lang", current);
      history.replaceState(null, "", url);
      schedule();
    });
    label.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && label.open) { label.open = false; summary.focus(); }
    });
    document.addEventListener("click", (event) => {
      if (label.open && !label.contains(event.target)) label.open = false;
    });
    (document.querySelector(".nav-actions") || document.body).prepend(label);
    new MutationObserver(schedule).observe(document.body, { childList: true, characterData: true, subtree: true });
    schedule();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
