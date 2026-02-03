# Schiffeversenken Deluxe (Self-Host)

Dieses Repo enthält das Spiel (Static Frontend) **+** einen kleinen **Node.js HTTP/WebSocket Server** für den Multiplayer.

## Projektstruktur

```
.
├─ public/                # Frontend (wird statisch ausgeliefert)
│  ├─ index.html
│  ├─ impressum.html
│  ├─ styles.css
│  ├─ app.js
│  ├─ mp-client.js
│  └─ generated-icon.png
├─ server.js              # HTTP + WebSocket Server
├─ package.json
└─ package-lock.json
```

## Lokal starten

Voraussetzung: Node.js (>= 18 empfohlen)

```bash
npm ci
npm start
# öffne dann:
# http://localhost:8080
```

Optionaler Port:

```bash
PORT=3000 npm start
```

## Deployment auf Ubuntu 22.04 (ohne Replit)

### 1) Server vorbereiten

```bash
sudo apt update
sudo apt install -y git
# Node.js installieren (empfohlen: Node 18/20 LTS)
# Variante A (Ubuntu Repo):
sudo apt install -y nodejs npm
# Variante B (LTS via NodeSource) – falls du lieber neuere Versionen willst.
```

Repo holen:

```bash
git clone <dein-github-repo-url> battleship-deluxe
cd battleship-deluxe
npm ci --omit=dev
```

Test-Start:

```bash
PORT=8080 npm start
# im Browser: http://SERVER-IP:8080
```

### 2) Systemd Service (empfohlen)

Erstelle `/etc/systemd/system/battleship-deluxe.service`:

```ini
[Unit]
Description=Battleship Deluxe (Node Web + WebSocket)
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/battleship-deluxe
Environment=NODE_ENV=production
Environment=PORT=8080
ExecStart=/usr/bin/node /opt/battleship-deluxe/server.js
Restart=always
RestartSec=2
User=www-data
Group=www-data

[Install]
WantedBy=multi-user.target
```

Dann:

```bash
# Repo nach /opt legen:
sudo mkdir -p /opt/battleship-deluxe
sudo rsync -a --delete ./ /opt/battleship-deluxe/
sudo chown -R www-data:www-data /opt/battleship-deluxe

sudo systemctl daemon-reload
sudo systemctl enable --now battleship-deluxe
sudo systemctl status battleship-deluxe
```

Logs ansehen:

```bash
journalctl -u battleship-deluxe -f
```

### 3) Nginx Reverse Proxy (Port 80/443) + WebSocket

```bash
sudo apt install -y nginx
```

Beispiel vHost `/etc/nginx/sites-available/battleship-deluxe`:

```nginx
server {
  listen 80;
  server_name DEIN-DOMAINNAME;

  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;

    # WebSocket Support
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Aktivieren:

```bash
sudo ln -s /etc/nginx/sites-available/battleship-deluxe /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**HTTPS (Let’s Encrypt)**: Mit `certbot` kannst du danach TLS aktivieren.

### 4) Firewall (optional)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## Hinweise

- `mp-client.js` verbindet sich automatisch zum aktuellen Host (ws/wss), d.h. **kein Hardcoding** von Replit nötig.
- `server.js` liefert alles aus `public/` aus und blockiert simple Path-Traversal Requests.

Viel Spaß! ⚓
