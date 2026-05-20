<h1>  
  <img src="src/img/icon-512.svg" width="48" height="48" alt="ROSTINHO" title="ROSTINHO" align="top" />ROSTINHO&nbsp;
</h1>

Web app for generating and printing **Toyota do Brasil** pallet labels on the shop floor. Operators enter their ID, scan or type part numbers, and print an A4 label with QR codes, quantity, and a reservation history block.

Built as a **Progressive Web App (PWA)** so it can be installed on mobile or industrial terminals and used **offline** after the first load.

## Features

- **Two-step workflow** — operator identification, then part-number / quantity entry
- **AUTO mode** — scan the same part number repeatedly; quantity increments on each scan (barcode scanner friendly)
- **MANUAL mode** — enter part number and quantity by hand
- **Print-ready labels** — A4 layout with company header, operator/sector, split part number, quantity, and two QR codes (PN and `QTY: …`)
- **Keyboard shortcuts** — function keys for terminals without a mouse
- **Offline support** — service worker caches assets for use without network

## Screens

| View | Purpose |
|------|---------|
| **View 1** | Operator info input |
| **View 2** | Part-number input, quantity, print / clear / mode |

## Operator format (View 1)

Enter the operator in the **OPERADOR** field. Optional fields are comma-separated:

```text
NOME,SETOR,TURNO
```

Examples:

- `JOAO SILVA` — name only; sector shows as N/D
- `MARIA,EXPEDICAO,2` — name, sector, and `2º TURNO`

## AUTO vs MANUAL mode

| Mode | Behavior |
|------|----------|
| **AUTO** (default) | Quantity field is read-only. Each scan of the same PN increments the counter. A different PN triggers an error until you clear or print. |
| **MANUAL** | Both part number and quantity are editable. Use **MODE** to switch. |

Toggle with the **MODE** button or **F3**.

## Keyboard shortcuts (View 2)

| Key | Action |
|-----|--------|
| **F1** | Print |
| **F2** | Clear |
| **F3** | Toggle AUTO / MANUAL |
| **F9** | Back to operator screen |
| **Enter** / **Tab** / **F4** | AUTO: register scan; MANUAL: move to next field |
| **↑** / **↓** | Move between PN and quantity (MANUAL) |

Several browser keys (F5–F12, Alt, Ctrl, etc.) are blocked to reduce accidental navigation on industrial devices.

## Project structure

```text
pallet-label/
├── index.html              # App shell and label template
├── manifest.json           # PWA manifest
├── service-worker.js       # Offline cache
└── src/
    ├── css/
    │   ├── style.css       # UI screens
    │   └── label.css       # Print layout (A4)
    ├── img/                # Icons and branding
    └── JS/
        ├── main.js
        ├── lib/qrcode-lib.js
        └── modules/
            ├── state.js
            ├── view1.js
            ├── view2.js
            ├── keyboard.js
            ├── printData.js
            └── utils.js
```

## Requirements

- A modern browser (Chrome, Edge, or Firefox recommended)
- A printer configured for **A4 portrait**
- For scanning in AUTO mode, a USB/Bluetooth barcode scanner that sends **Enter** after each read

No Node.js or build step is required.

## Running locally

The service worker only works over **HTTP(S)**. Opening `index.html` directly from the file system may block registration.

**Option A — Python**

```bash
cd pallet-label
python -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080).

**Option B — VS Code / Cursor**

Use a “Live Server” or similar extension and serve the project root.

**Option C — Production**

Deploy the folder as static files on any web server (IIS, nginx, GitHub Pages, etc.). Ensure `manifest.json` and `service-worker.js` are served from the app root.

## Printing

1. Complete operator and part-number steps, then press **PRINT** (or **F1**).
2. The browser print dialog opens; only the label template is printed (UI is hidden via `@media print`).
3. Label size is **A4 portrait** with a 10 mm margin (`label.css`).

Adjust the printer’s scale/margins in the print dialog if the label does not align with your stock.

## Install as PWA

1. Serve the app over HTTPS (or `localhost`).
2. In Chrome/Edge: **Install app** / **Add to Home screen** from the browser menu.
3. Icons and theme colors are defined in `manifest.json`.

After install, the app runs in standalone mode with portrait orientation locked in the manifest.

## Offline behavior

`service-worker.js` uses a **cache-first** strategy (`Rostinho-v6`). On update, bump `CACHE_NAME` in the service worker so clients drop old caches on the next visit.

## Tech stack

<img src="src/img/stack-html.svg" width="40" height="40" alt="HTML5" title="HTML5" align="top" />
  <img src="src/img/stack-css.svg" width="40" height="40" alt="CSS3" title="CSS3" align="top" />
  <img src="src/img/stack-js.svg" width="40" height="40" alt="JavaScript" title="JavaScript" align="top" />
  

- HTML5, CSS3, vanilla JavaScript (ES modules)
- [qrcodejs](https://github.com/davidshimjs/qrcodejs) (bundled as `src/JS/lib/qrcode-lib.js`)
- Service Worker API + Web App Manifest

## License

No license file is included. Add one if you plan to publish or share the repository.

## Author

**Marcos Matusalem** — 2026
