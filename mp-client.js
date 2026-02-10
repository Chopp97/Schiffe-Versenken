// mp-client.js
// WebSocket-Client mit automatischer URL-Erkennung (lokal oder online)

(function (global) {
  const handlers = {};
  const MP = {
    state: {
      ws: null,
      url: null, // wird automatisch gesetzt
      room: null,
      name: null,
      myId: null,
      turn: null,
      joinMode: "join", // join | create | spectate
      _joined: false,
    },

    on(evt, fn) {
      (handlers[evt] ||= []).push(fn);
    },

    emit(evt, data) {
      (handlers[evt] || []).forEach((f) => f(data));
    },

    connect(url, { room, name, joinMode }) {
      let finalUrl;

      // 🧠 Replit-/Prod-/Lokal-taugliche URL-Wahl (ohne festes localhost)
      // -> nutzt immer aktuellen Host + Protokoll
      const host = window.location.host;
      const proto = window.location.protocol === "https:" ? "wss" : "ws";
      if (url) finalUrl = url;
      else finalUrl = `${proto}://${host}`;

      this.state.url = finalUrl;
      this.state.room = room.toUpperCase();
      this.state.name = name || "Spieler";
      this.state.joinMode = joinMode || "join";
      this.state._joined = false;

      console.log("🌐 Verbinde zu:", this.state.url);

      const ws = new WebSocket(this.state.url);
      this.state.ws = ws;

      ws.onopen = () => {
        // Unterschiedlich senden, je nach joinMode
        const msg = {
          type: this.state.joinMode === "create" ? "create" : this.state.joinMode === "spectate" ? "spectate" : "join",
          room: this.state.room,
          name: this.state.name,
        };
        ws.send(JSON.stringify(msg));
      };

      ws.onerror = () => {
        this.emit("connectError", {
          reason: "NETWORK",
          message: "Server nicht erreichbar.",
        });
      };

      ws.onclose = () => {
        if (!this.state._joined) {
          this.emit("connectError", {
            reason: "CLOSED",
            message: "Verbindung geschlossen.",
          });
        } else {
          this.emit("closed", {});
        }
      };

      ws.onmessage = (ev) => {
        let msg;
        try {
          msg = JSON.parse(ev.data);
        } catch {
          return;
        }

        if (msg.type === "joined") {
          this.state._joined = true;
          this.state.myId = msg.playerId;
          this.emit("joined", msg);
        } else if (msg.type === "roomUpdate") {
          this.emit("roomUpdate", msg);
        } else if (msg.type === "start") {
          // Spieler: Server sendet youStart, spectators: spectator=true + first
          if (this.state.myId === 0) {
            this.state.turn = msg.first || 1;
            this.emit("start", { spectator: true, first: this.state.turn });
          } else {
            // Der Server sagt, wer beginnt
            this.state.turn = msg.youStart
              ? this.state.myId
              : this.state.myId === 1
                ? 2
                : 1;
            this.emit("start", { youStart: msg.youStart, first: msg.first || this.state.turn });
          }
        } else if (msg.type === "moveResult") {
          if (this.state.myId === 0) {
            // Zuschauer: einfach weiterreichen inkl. shooter/target
            this.emit("shotResult", {
              spectator: true,
              shooter: msg.shooter,
              target: msg.target,
              cell: msg.cell,
              hit: msg.hit,
              sunk: msg.sunk || null,
            });
          } else {
            const byMe = msg.shooter === this.state.myId;
            const nextIsMe = msg.target === this.state.myId;
            this.state.turn = nextIsMe ? this.state.myId : msg.target;
            this.emit("shotResult", {
              byMe,
              cell: msg.cell,
              hit: msg.hit,
              nextIsMe,
              sunk: msg.sunk || null,
            });
          }
        } else if (msg.type === "turnUpdate") {
          // 🔧 Korrektur: sende 'current', nicht 'amZug'
          this.state.turn = msg.current;
          this.emit("turnUpdate", { current: msg.current });
        } else if (msg.type === "gameOver") {
          if (this.state.myId === 0) {
            this.emit("gameOver", { spectator: true, winner: msg.winner });
          } else {
            const youWin = msg.winner === this.state.myId;
            this.emit("gameOver", { youWin, winner: msg.winner, reveal: msg.reveal });
          }
        } else if (msg.type === "opponentLeft") {
          this.emit("opponentLeft", {});
        } else if (msg.type === "error") {
          this.emit("serverError", msg);
        }
      };
    },

    // ready = true/false (toggle im UI)
    ready(boardCells, ready = true) {
      this.state.ws?.send(
        JSON.stringify({ type: "ready", ready: !!ready, board: boardCells }),
      );
    },

    startGame() {
      this.state.ws?.send(JSON.stringify({ type: "startGame" }));
    },

    fire(x, y) {
      if (!this.state.ws || this.state.ws.readyState !== WebSocket.OPEN) return;
      this.state.ws.send(JSON.stringify({ type: "move", cell: `${x},${y}` }));
    },
  };

  global.MP = MP;
})(window);
