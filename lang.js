// lang.js – simple DE/EN toggle for Battleship Deluxe
(function () {
  "use strict";

  const STORE_KEY = "bs_lang";
  const supported = ["de", "en"];

  const dict = {
    de: {
      gameTitle: "Schiffe versenken Deluxe",
      soundToggle: "Sound an/aus",
      backToMenu: "Zurück zum Menü",
      language: "Sprache",
      menu_start: "🚀 Start",
      menu_local_btn: "Lokales Spiel",
      menu_mp_btn: "Multiplayer",
      menu_spectate_btn: "Zuschauen (Multiplayer)",
      local_choice_title: "Lokales Spiel",
      local_vs_ai: "Gegen Computer",
      local_2p: "2 Spieler (lokal)",
      local_setup_title: "Lokales Spiel – Setup",
      p1_name: "Spieler 1 Name",
      p2_name: "Spieler 2 Name",
      p1_ph: "Admiral Blau",
      p2_ph: "Admiral Rot",
      ai_easy: "Einfach",
      ai_smart: "Smart",
      start_game: "Spiel starten",
      mp_choice_title: "Multiplayer",
      mp_create: "Lobby erstellen",
      mp_join: "Lobby beitreten",
      mp_setup_title: "Multiplayer – Setup",
      mp_your_name: "Dein Name",
      mp_name_ph: "Admiral Online",
      mp_room: "Lobby-Code",
      mp_room_ph: "ABCD12",
      mp_hint_create: "Bei „Lobby erstellen“ wird automatisch ein Code generiert, falls leer.",
      create: "Erstellen",
      join: "Beitreten",
      spectate_title: "Multiplayer – Zuschauen",
      spectate: "Zuschauen",
      own_board: "Dein Board",
      enemy_board: "Gegnerisches Board",
      dock_title: "⚓ Werft – Schiffe zum Platzieren",
      bar_title: "⚓ Schiffeversenken Deluxe",
      bar_mode_local: "🎮 Lokal",
      bar_phase_place: "🛠️ Platzieren",
      bar_help_aria: "Kurzanleitung",
      help_rotate_label: "Drehen",
      help_rotate_title: "Dreht das aktuell ausgewählte Schiff (im Platzieren-Modus).",
      help_remove_label: "Doppelklick: Entfernen",
      help_remove_title: "Entfernt ein platziertes Schiff vom eigenen Board.",
      help_random_label: "Zufall: Autoplatzierung",
      help_random_title: "Platziert alle Schiffe automatisch auf deinem Board.",
      help_attack_label: "Angriff: Klick aufs Feld",
      help_attack_title: "Greife an: Klicke auf ein Feld auf dem gegnerischen Board.",

      random: "Zufallsplatzierung",
      restart: "Neu starten",
      place_ships: "Platziere deine Schiffe …",
      hint_place: "Ziehe Schiffe aus der Werft aufs Board. Drehen mit <kbd>R</kbd>. Doppelklick entfernt ein platziertes Schiff.",
      lobby_code: "Lobby-Code",
      ready: "Bereit",
      play_again: "Nochmal spielen",
      congrats: "Herzlichen Glückwunsch!",
      next_player_press: "Nächster Spieler – bitte eine beliebige Taste drücken …",
      your_turn: "{name} ist am Zug",
      your_board_named: "{name}: dein Board",
      enemy_board_named: "{name}: Gegnerisches Board",
      placing_next: "{name} – bitte Taste drücken, um deine Schiffe zu platzieren",
      turn_next: "{name} – bitte Taste drücken, du bist am Zug",
      spectator_role: "Zuschauer",
      impressum_back: "Zurück zur Startseite",
            spectator_connected: "Zuschauer verbunden. Warte auf Spielstart / Züge …",
      connected_place_ready: "Verbunden. Platziere deine Schiffe und klicke „Bereit“.",
      you_start_shoot: "Du beginnst! Schieße auf das gegnerische Feld.",
      wait_opponent_turn: "Warte auf den Gegner …",
      opponent_left: "Der Gegner hat das Spiel verlassen.",
      game_over_winner: "🏁 Spiel beendet. Gewinner: Spieler {winner}",
      you_won: "🏆 Du hast gewonnen!",
      you_lost: "❌ Du hast verloren.",
      end_win_text: "Herzlichen Glückwunsch – Sieg!",
      end_lose_text: "Leider verloren – nächstes Mal klappt’s!",
      press_to_start: "{name} – bitte Taste drücken, um das Spiel zu starten",
      impressum_body_html: `
        <h2 style="margin-top:0;">Impressum</h2>

        <p><strong>Angaben gemäß § 5 TMG</strong></p>
        <p>
          <strong>Dein Name / Firma</strong><br/>
          Musterstraße 1<br/>
          12345 Musterstadt<br/>
          Deutschland
        </p>

        <p><strong>Kontakt</strong></p>
        <p>
          E-Mail: kontakt@example.de<br/>
          Telefon: +49 000 000000
        </p>

        <p><strong>Vertreten durch</strong></p>
        <p>Dein Name</p>

        <p><strong>Umsatzsteuer-ID</strong></p>
        <p>USt-IdNr.: DE000000000</p>

        <p><strong>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</strong></p>
        <p>
          Dein Name<br/>
          Musterstraße 1<br/>
          12345 Musterstadt
        </p>

        <hr style="border:0;border-top:1px solid rgba(255,255,255,0.12);margin:18px 0;">

        <p style="opacity:.85; font-size: 13px; line-height: 1.55;">
          <strong>Haftung für Inhalte</strong><br/>
          Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
          Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
        </p>

        <p style="opacity:.85; font-size: 13px; line-height: 1.55;">
          <strong>Haftung für Links</strong><br/>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
          Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
        </p>

        <p style="opacity:.85; font-size: 13px; line-height: 1.55;">
          <strong>Urheberrecht</strong><br/>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
        </p>

        <p style="opacity:.7; font-size: 12px; margin-bottom:0;">
          Hinweis: Bitte ersetze die Platzhalter (Name, Adresse, USt-IdNr. usw.) durch deine echten Angaben.
        </p>
      `,
      hud_metal: "Schiffe versenken",
      hud_deluxe: "Deluxe",
      placement_own_label: "{name} – dein Spielfeld",
      placement_status_named: "{name}: Platziere deine Schiffe",
      ship_C: "Flugzeugträger",
      ship_B: "Schlachtschiff",
      ship_D: "Zerstörer",
      ship_S: "U‑Boot",
      ship_P: "Patrouillenboot",
      footer_legal_label: "Impressum:",
      footer_full_legal: "Vollständiges Impressum",
      footer_full_legal_aria: "Zum vollständigen Impressum",
      back: "Zurück",
      home: "Startseite",
      copy: "Kopieren",
      lobby_code_copied: "Lobby-Code kopiert!",
      players: "Spieler",
      ready_yes: "Bereit",
      ready_no: "Nicht bereit",
      ready_wait: "Warten...",
      ready_done: "Bereit!",
      wait_both_ready: "Warte, bis beide bereit sind…",
      both_ready_title: "Beide bereit",
      both_ready_hint: "Sobald beide bereit sind, startet das Spiel automatisch.",
      auto_start: "Automatischer Start",
      place_all_ships: "Platziere alle Schiffe.",
      starting_game: "Spiel startet…",
      not_your_turn: "Du bist nicht dran.",
      already_shot: "Hier hast du schon geschossen.",
      hit: "Treffer!",
      sunk: "Versenkt!",
      ai_won: "Der Computer hat gewonnen!",
      spectator_mode: "Zuschauer-Modus",
      only_host: "Nur der Host kann das tun.",
      legal_title: "Impressum",
      legal_back_home: "Zurück zur Startseite",
      legal_full: "Vollständiges Impressum",
      legal_aria_full: "Zum vollständigen Impressum",
      footer_copy: "© 2026 Dein Name",
      footer_line: "Impressum: Musterstraße 1, 12345 Musterstadt",
      mp_spectate_title: "Multiplayer – Zuschauen",
      mp_spectate_btn: "Zuschauen",
      your_name: "Dein Name",
      ai_label_easy: "Einfach",
      ai_label_smart: "Smart",
      online_ph: "Admiral Online",
      room_ph: "ABCD12",
      room_code_label: "Lobby-Code",
      next_player_prompt: "Nächster Spieler — bitte eine beliebige Taste drücken …",
      mp_lobby_code_prefix: "Lobby-Code:",
      game_running_turn: "Spiel läuft — {name} ist am Zug",
      win_player: "{name} gewinnt!",
},
    en: {
      gameTitle: "Battleship Deluxe",
      soundToggle: "Sound on/off",
      backToMenu: "Back to menu",
      language: "Language",
      menu_start: "🚀 Start",
      menu_local_btn: "Local game",
      menu_mp_btn: "Multiplayer",
      menu_spectate_btn: "Spectate (Multiplayer)",
      local_choice_title: "Local game",
      local_vs_ai: "Play vs computer",
      local_2p: "2 players (local)",
      local_setup_title: "Local game – setup",
      p1_name: "Player 1 name",
      p2_name: "Player 2 name",
      p1_ph: "Admiral Blue",
      p2_ph: "Admiral Red",
      ai_easy: "Easy",
      ai_smart: "Smart",
      start_game: "Start game",
      mp_choice_title: "Multiplayer",
      mp_create: "Create lobby",
      mp_join: "Join lobby",
      mp_setup_title: "Multiplayer – setup",
      mp_your_name: "Your name",
      mp_name_ph: "Online Admiral",
      mp_room: "Lobby code",
      mp_room_ph: "ABCD12",
      mp_hint_create: "When creating a lobby, a code will be generated automatically if left empty.",
      create: "Create",
      join: "Join",
      spectate_title: "Multiplayer – spectate",
      spectate: "Spectate",
      own_board: "Your board",
      enemy_board: "Enemy board",
      dock_title: "⚓ Dockyard – ships to place",
      bar_title: "⚓ Battleship Deluxe",
      bar_mode_local: "🎮 Local",
      bar_phase_place: "🛠️ Place",
      bar_help_aria: "Quick guide",
      help_rotate_label: "Rotate",
      help_rotate_title: "Rotates the currently selected ship (in placement mode).",
      help_remove_label: "Double-click: Remove",
      help_remove_title: "Removes a placed ship from your board.",
      help_random_label: "Random: Auto-place",
      help_random_title: "Automatically places all ships on your board.",
      help_attack_label: "Attack: Click a tile",
      help_attack_title: "Attack: Click a tile on the opponent’s board.",

      random: "Random placement",
      restart: "Restart",
      place_ships: "Place your ships …",
      hint_place: "Drag ships from the dockyard onto your board. Rotate with <kbd>R</kbd>. Double-click removes a placed ship.",
      lobby_code: "Lobby code",
      ready: "Ready",
      play_again: "Play again",
      congrats: "Congratulations!",
      next_player_press: "Next player – press any key …",
      your_turn: "{name}'s turn",
      your_board_named: "{name}: your board",
      enemy_board_named: "{name}: enemy board",
      placing_next: "{name} – press any key to place your ships",
      turn_next: "{name} – press any key, it's your turn",
      spectator_role: "Spectator",
      impressum_back: "Back to start",
            spectator_connected: "Spectator connected. Waiting for game start / turns …",
      connected_place_ready: "Connected. Place your ships and click “Ready”.",
      you_start_shoot: "You start! Fire at the enemy grid.",
      wait_opponent_turn: "Waiting for opponent …",
      opponent_left: "Opponent left the game.",
      game_over_winner: "🏁 Game over. Winner: Player {winner}",
      you_won: "🏆 You won!",
      you_lost: "❌ You lost.",
      end_win_text: "Congratulations — victory!",
      end_lose_text: "Defeat — better luck next time!",
      press_to_start: "{name} – press any key to start the game",
impressum_body_html: `
        <h2 style="margin-top:0;">Legal notice</h2>

        <p><strong>Information according to § 5 TMG</strong></p>
        <p>
          <strong>Your name / company</strong><br/>
          Sample Street 1<br/>
          12345 Sample City<br/>
          Germany
        </p>

        <p><strong>Contact</strong></p>
        <p>
          Email: contact@example.com<br/>
          Phone: +49 000 000000
        </p>

        <p><strong>Represented by</strong></p>
        <p>Your name</p>

        <p><strong>VAT ID</strong></p>
        <p>VAT ID: DE000000000</p>

        <p><strong>Responsible for content (§ 18(2) MStV)</strong></p>
        <p>
          Your name<br/>
          Sample Street 1<br/>
          12345 Sample City
        </p>

        <hr style="border:0;border-top:1px solid rgba(255,255,255,0.12);margin:18px 0;">

        <p style="opacity:.85; font-size: 13px; line-height: 1.55;">
          <strong>Liability for content</strong><br/>
          We created the content of these pages with great care. However, we cannot guarantee correctness, completeness,
          or timeliness.
        </p>

        <p style="opacity:.85; font-size: 13px; line-height: 1.55;">
          <strong>Liability for links</strong><br/>
          Our offer contains links to external third-party websites. We have no influence on their content and therefore
          cannot assume any liability for it.
        </p>

        <p style="opacity:.85; font-size: 13px; line-height: 1.55;">
          <strong>Copyright</strong><br/>
          Content and works created by the site operator are subject to German copyright law.
        </p>

        <p style="opacity:.7; font-size: 12px; margin-bottom:0;">
          Note: Replace placeholders (name, address, VAT ID, etc.) with your real details.
        </p>
      `,
      hud_metal: "Battleship",
      hud_deluxe: "Deluxe",
      placement_own_label: "{name} — your board",
      placement_status_named: "{name}: place your ships",
      ship_C: "Carrier",
      ship_B: "Battleship",
      ship_D: "Destroyer",
      ship_S: "Submarine",
      ship_P: "Patrol Boat",
      footer_legal_label: "Legal notice:",
      footer_full_legal: "Full legal notice",
      footer_full_legal_aria: "Open full legal notice",
      back: "Back",
      home: "Home",
      copy: "Copy",
      lobby_code_copied: "Lobby code copied!",
      players: "Players",
      ready_yes: "Ready",
      ready_no: "Not ready",
      ready_wait: "Waiting...",
      ready_done: "Ready!",
      wait_both_ready: "Waiting for both players to be ready…",
      both_ready_title: "Both ready",
      both_ready_hint: "As soon as both are ready, the game starts automatically.",
      auto_start: "Auto start",
      place_all_ships: "Place all ships.",
      starting_game: "Starting game…",
      not_your_turn: "It’s not your turn.",
      already_shot: "You already fired here.",
      hit: "Hit!",
      sunk: "Sunk!",
      ai_won: "The computer won!",
      spectator_mode: "Spectator mode",
      only_host: "Only the host can do this.",
      legal_title: "Legal notice",
      legal_back_home: "Back to home",
      legal_full: "Full legal notice",
      legal_aria_full: "Open full legal notice",
      footer_copy: "© 2026 Your Name",
      footer_line: "Legal notice: Sample Street 1, 12345 Sample City",
      mp_spectate_title: "Multiplayer – Spectate",
      mp_spectate_btn: "Spectate",
      your_name: "Your name",
      ai_label_easy: "Easy",
      ai_label_smart: "Smart",
      online_ph: "Online Admiral",
      room_ph: "ABCD12",
      room_code_label: "Lobby code",
      next_player_prompt: "Next player — press any key …",
      mp_lobby_code_prefix: "Lobby code:",
      game_running_turn: "Game running — {name}'s turn",
      win_player: "{name} wins!",
},
  };

  function getLang() {
    const saved = (localStorage.getItem(STORE_KEY) || "").toLowerCase();
    if (supported.includes(saved)) return saved;
    const htmlLang = (document.documentElement.lang || "de").slice(0, 2).toLowerCase();
    return htmlLang === "en" ? "en" : "de";
  }

  function setLang(lang) {
    const next = supported.includes(lang) ? lang : "de";
    localStorage.setItem(STORE_KEY, next);
    document.documentElement.lang = next;
    applyStatic(next);
    window.dispatchEvent(new CustomEvent("langchange", { detail: { lang: next } }));
    return next;
  }

  function t(key, vars) {
    const lang = getLang();
    const table = dict[lang] || dict.de;

    // Apply generic i18n bindings
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key && table[key] != null) el.textContent = table[key];
    });

    // Apply attribute bindings: data-i18n-attr="title:key,placeholder:key,aria-label:key"
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr') || '';
      spec.split(',').map(s=>s.trim()).filter(Boolean).forEach((pair) => {
        const [attr, key] = pair.split(':').map(s=>s.trim());
        if (!attr || !key) return;
        if (table[key] == null) return;
        el.setAttribute(attr, table[key]);
      });
    });

    // Update document title
    if (table.gameTitle) document.title = table.gameTitle;

    let s = table[key] ?? dict.de[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
    }
    return s;
  }

  function applyStatic(lang) {
    const table = dict[lang] || dict.de;

    // Apply generic i18n bindings
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key && table[key] != null) el.textContent = table[key];
    });

    // Apply attribute bindings: data-i18n-attr="title:key,placeholder:key,aria-label:key"
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr') || '';
      spec.split(',').map(s=>s.trim()).filter(Boolean).forEach((pair) => {
        const [attr, key] = pair.split(':').map(s=>s.trim());
        if (!attr || !key) return;
        if (table[key] == null) return;
        el.setAttribute(attr, table[key]);
      });
    });

    // Update document title
    if (table.gameTitle) document.title = table.gameTitle;


    const btnLang = document.getElementById("btnLang");
    if (btnLang) btnLang.title = table.language;

    const btnSound = document.getElementById("btnSound");
    if (btnSound) btnSound.title = table.soundToggle;

    const btnMenu = document.getElementById("btnMenu");
    if (btnMenu) { btnMenu.title = table.backToMenu; btnMenu.setAttribute('aria-label', table.backToMenu); }

    // HUD title (top left)
    const hudMetal = document.getElementById("hudMetal");
    if (hudMetal) hudMetal.textContent = table.hud_metal || table.gameTitle;
    const hudDeluxe = document.getElementById("hudDeluxe");
    if (hudDeluxe) hudDeluxe.textContent = table.hud_deluxe || "Deluxe";

    // Impressum / legal notice icon (index.html)
    const legalIcon = document.querySelector('a.icon-btn[href="impressum.html"]');
    if (legalIcon) legalIcon.title = table.legal_notice || table.impressum || "Legal";

    // Generic back buttons in menu
    ["btnBackFromLocalChoice","btnBackFromLocal","btnBackFromMP","btnBackFromMpChoice","btnBackFromSpectate"].forEach((id)=>{
      const b = document.getElementById(id);
      if (b) b.textContent = table.back;
    });

    // Boards aria labels
    const ownBoard = document.getElementById("ownBoard");
    if (ownBoard) ownBoard.setAttribute("aria-label", table.own_board);
    const enemyBoard = document.getElementById("enemyBoard");
    if (enemyBoard) enemyBoard.setAttribute("aria-label", table.enemy_board);

    // Impressum back tooltip
    const homeLink = document.querySelector('a.icon-btn[href="index.html"]');
    if (homeLink) homeLink.title = table.impressum_back;

    // Menu titles/buttons (index.html)
    const menuTitle = document.querySelector(".menu-title");
    if (menuTitle) menuTitle.textContent = table.gameTitle;

    const mainMenuH3 = document.querySelector("#mainMenu h3");
    if (mainMenuH3) mainMenuH3.textContent = table.menu_start;

    const el = (id, prop, val) => {
      const n = document.getElementById(id);
      if (n && val != null) n[prop] = val;
    };

    el("btnChooseLocal", "textContent", table.menu_local_btn);
    el("btnChooseMP", "textContent", table.menu_mp_btn);
    el("btnChooseSpectate", "textContent", table.menu_spectate_btn);

    const localChoiceH3 = document.querySelector("#localChoice h3");
    if (localChoiceH3) localChoiceH3.textContent = table.local_choice_title;
    el("btnLocalChooseAI", "textContent", table.local_vs_ai);
    el("btnLocalChoose2P", "textContent", table.local_2p);

    const localSetupTitle = document.getElementById("localSetupTitle");
    if (localSetupTitle) localSetupTitle.textContent = table.local_setup_title;

    const nameP1 = document.getElementById("nameP1");
    if (nameP1) nameP1.placeholder = table.p1_ph;
    const nameP2 = document.getElementById("nameP2");
    if (nameP2) nameP2.placeholder = table.p2_ph;

    const localSetup = document.getElementById("localSetup");
    if (localSetup) {
      const spans = localSetup.querySelectorAll("label.field span");
      if (spans[0]) spans[0].textContent = table.p1_name;
      if (spans[1]) spans[1].textContent = table.p2_name;
    }
    el("btnLocalStart", "textContent", table.start_game);

    const aiRow = document.getElementById("aiDifficulty");
    if (aiRow) {
      const labels = aiRow.querySelectorAll("label");
      if (labels[0]) labels[0].lastChild.textContent = " " + table.ai_easy;
      if (labels[1]) labels[1].lastChild.textContent = " " + table.ai_smart;
    }

    const mpChoiceH3 = document.querySelector("#mpChoice h3");
    if (mpChoiceH3) mpChoiceH3.textContent = table.mp_choice_title;
    el("btnMpChooseCreate", "textContent", table.mp_create);
    el("btnMpChooseJoin", "textContent", table.mp_join);

    const mpSetupTitle = document.getElementById("mpSetupTitle");
    if (mpSetupTitle) mpSetupTitle.textContent = table.mp_setup_title;

    const mpSetup = document.getElementById("mpSetup");
    if (mpSetup) {
      const spans = mpSetup.querySelectorAll("label.field span");
      if (spans[0]) spans[0].textContent = table.mp_your_name;
      if (spans[1]) spans[1].textContent = table.mp_room;
    }
    const nameOnline = document.getElementById("nameOnline");
    if (nameOnline) nameOnline.placeholder = table.mp_name_ph;
    const roomCode = document.getElementById("roomCode");
    if (roomCode) roomCode.placeholder = table.mp_room_ph;
    const mpHintCreate = document.getElementById("mpHintCreate");
    if (mpHintCreate) mpHintCreate.textContent = table.mp_hint_create;
    el("btnCreateRoom", "textContent", table.create);
    el("btnJoinRoom", "textContent", table.join);

    const spectateH3 = document.querySelector("#spectateSetup h3");
    if (spectateH3) spectateH3.textContent = table.spectate_title;
    const spectateSetup = document.getElementById("spectateSetup");
    if (spectateSetup) {
      const span = spectateSetup.querySelector("label.field span");
      if (span) span.textContent = table.mp_room;
    }
    const roomSpect = document.getElementById("roomCodeSpectate");
    if (roomSpect) roomSpect.placeholder = table.mp_room_ph;
    el("btnSpectateRoom", "textContent", table.spectate);

    // game screen labels/buttons/hints
    el("labelOwn", "textContent", table.own_board);
    el("labelEnemy", "textContent", table.enemy_board);

    const dockTitle = document.querySelector(".dock-title");
    if (dockTitle) dockTitle.textContent = table.dock_title;

    const lobbyCodeEl = document.querySelector(".mp-lobby-code");
    if (lobbyCodeEl && lobbyCodeEl.firstChild) {
      // Keep the <span> with the code, translate only the prefix
      lobbyCodeEl.firstChild.textContent = table.lobby_code + ": ";
    }


    el("btnRandom", "textContent", table.random);
    el("btnStart", "textContent", table.start_game);
    el("btnRestart", "textContent", table.restart);
    el("btnMpReady", "textContent", table.ready);
    el("btnMpStart", "textContent", table.start_game);

    const hint = document.querySelector(".side .hint");
    if (hint) hint.innerHTML = table.hint_place;

    const status = document.getElementById("status");
    if (status && (status.textContent.trim() === dict.de.place_ships || status.textContent.trim() === dict.en.place_ships)) {
      status.textContent = table.place_ships;
    }

    const endText = document.getElementById("endText");
    if (endText && (endText.textContent.trim() === dict.de.congrats || endText.textContent.trim() === dict.en.congrats)) {
      endText.textContent = table.congrats;
    }
    el("btnPlayAgain", "textContent", table.play_again);


    // Footer legal bar
    const footerLegalLine = document.getElementById("footerLegalLine");
    if (footerLegalLine) footerLegalLine.textContent = table.footer_legal_line || footerLegalLine.textContent;
    const footerLegalLink = document.getElementById("footerLegalLink");
    if (footerLegalLink) {
      footerLegalLink.textContent = table.full_legal || footerLegalLink.textContent;
      footerLegalLink.setAttribute("aria-label", table.full_legal || footerLegalLink.getAttribute("aria-label") || "");
    }

    // Impressum page body
    const impr = document.getElementById("impressumBody");
    if (impr && table.impressum_body_html) {
      impr.innerHTML = table.impressum_body_html;
      if (document.title === "Impressum" || document.title === "Legal notice") {
        document.title = table.legal_notice || table.impressum || "Legal notice";
      }
    }


    if (document.title === dict.de.gameTitle || document.title === dict.en.gameTitle) {
      document.title = table.gameTitle;
    }
  }

  function init() {
    const lang = getLang();
    document.documentElement.lang = lang;
    applyStatic(lang);

    const btnLang = document.getElementById("btnLang");
    if (btnLang) {
      btnLang.addEventListener("click", () => {
        const cur = getLang();
        setLang(cur === "de" ? "en" : "de");
      });
    }
  }

  window.I18N = { getLang, setLang, t, applyStatic, dict };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
