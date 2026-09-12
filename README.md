# 🌿 Negi Smart Garden

A digital garden project that brings a real garden to your fingertips. Every plant in the garden has a beautifully designed web page with its full profile — and a printable QR code so visitors can scan a sign and instantly learn everything about the plant growing right in front of them.

**Live site:** [https://negirahul1729.github.io/Negi-Smart-Garden](https://negirahul1729.github.io/Negi-Smart-Garden)

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Plants in the Garden](#-plants-in-the-garden)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Generating QR Codes](#-generating-qr-codes)
- [Adding a New Plant](#-adding-a-new-plant)
- [Deployment](#-deployment)
- [Tech Stack](#-tech-stack)
- [Contact](#-contact)

---

## 🌱 About the Project

**Negi Smart Garden** is a static, no-build-tools website that documents every plant growing in the garden. Instead of relying on paper labels that fade, get lost, or carry only a name, each plant gets:

1. A **QR code** attached to its sign in the garden.
2. A **dedicated details page** that opens when the code is scanned with any phone camera.

Visitors — whether garden guests, students, or family members — get instant access to the plant's scientific name, family, origin, growing conditions, benefits, health status, and care instructions. The site also works as a standalone digital catalog that can be browsed from anywhere.

## ✨ Features

| Feature | Description |
|---|---|
| 🏡 **Home Page** | Hero section, about section, and a responsive grid of plant cards |
| 🃏 **Plant Cards** | Photo, name, and common name for each plant, linking to its details page |
| 🔽 **Explore More** | The first 3 plants are shown by default; one button reveals all plants |
| 📄 **Plant Details Pages** | Served via `plant.html?id=<plant-id>` — full profile rendered from JSON |
| 🏷️ **Scientific Data** | Scientific name, family, type, origin, sunlight, water, soil, temperature |
| 💚 **Health Status Badge** | Each plant shows whether it is currently healthy or needs attention |
| 📱 **QR Code Integration** | Every plant has a QR code linking directly to its details page |
| 📞 **Contact Section** | Email link for questions about the garden |
| 📶 **Offline-Friendly** | Falls back to an embedded JS dataset when `fetch` is unavailable (e.g. opening via `file://`) |

## 🔍 How It Works

1. **Homepage** — `index.html` lists plant cards. Each card links to `plant.html?id=<plant-id>`.
2. **Details page** — `plant.html` reads the `id` query parameter and uses `script.js` to fetch `data/plants.json`, find the matching plant, and render its complete profile.
3. **QR codes** — `generate_qr.py` reads the same `plants.json`, builds the URL `https://negirahul1729.github.io/Negi-Smart-Garden/plant.html?id=<plant-id>` for each plant, and saves a high error-correction QR image to `images/qr_codes/<id>_qr.png`. The QR image is also displayed on each plant's details page under *"Scan to Share"*.
4. **Fallback** — if `fetch` is blocked (opening the file directly from disk), the script falls back to the bundled `data/plants.js` global so the page still renders.

## 🌳 Plants in the Garden

20 plants are currently catalogued — fruit trees, vegetables, medicinal herbs, and ornamentals:

| Plant | Scientific Name | Type |
|---|---|---|
| Mango | *Mangifera indica* | Fruit Tree |
| Tulsi (Holy Basil) | *Ocimum tenuiflorum* | Medicinal Herb |
| Guava | *Psidium guajava* | Fruit Tree |
| Amla (Indian Gooseberry) | *Phyllanthus emblica* | Medicinal Fruit Tree |
| Lemon | *Citrus limon* | Fruit Tree |
| Okra (Lady's Finger) | *Abelmoschus esculentus* | Vegetable Plant |
| Papaya | *Carica papaya* | Fruit Tree |
| Pilea Microphylla (Artillery Plant) | *Pilea microphylla* | Ornamental Herb |
| Purple Heart | *Tradescantia pallida* | Ornamental Plant |
| Croton | *Codiaeum variegatum* | Ornamental Plant |
| Paan (Betel Leaf) | *Piper betle* | Climbing Vine |
| Sago Palm | *Cycas revoluta* | Ornamental Cycad |
| Snake Plant | *Dracaena trifasciata* | Succulent Ornamental |
| Grapes | *Vitis vinifera* | Fruit-bearing Vine |
| Hariman-99 Apple | *Malus domestica* | Low-Chilling Fruit Tree |
| Jackfruit | *Artocarpus heterophyllus* | Fruit Tree |
| Malta (Sweet Orange) | *Citrus sinensis* | Fruit Tree |
| Pineapple | *Ananas comosus* | Tropical Fruit Plant |
| Eggplant (Brinjal) | *Solanum melongena* | Vegetable Plant |
| Arrowhead Plant | *Syngonium podophyllum* | Ornamental Vine |

## 📁 Project Structure

```
smart_garden/
├── index.html              # Home page (hero, about, plant grid, features, contact)
├── plant.html              # Plant details page (renders data based on ?id= param)
├── style.css               # All styling — responsive, mobile-friendly
├── script.js               # Explore More toggle + plant details rendering logic
├── generate_qr.py          # Python script to generate QR codes for every plant
├── data/
│   ├── plants.json         # Single source of truth for all plant data
│   └── plants.js           # Same data as a JS global (file:// fallback)
├── images/
│   ├── *.jpeg              # Photos of each plant
│   └── qr_codes/
│       └── <plant_id>_qr.png  # Scannable QR code per plant
└── README.md
```

## 🚀 Getting Started

No build step and no dependencies for the website itself — it's plain HTML, CSS, and JavaScript.

### Run Locally

Clone the repository and serve it with any static server (a server is recommended so `fetch` works properly):

```bash
git clone https://github.com/negirahul1729/Negi-Smart-Garden.git
cd Negi-Smart-Garden

# Python
python -m http.server 8000
# then open http://localhost:8000

# or Node
npx serve .
```

Opening `index.html` directly from disk also works — the details page will fall back to the bundled `plants.js` data.

### Prerequisites for QR Generation

- Python 3
- The `qrcode` library:

```bash
pip install qrcode[pil]
```

## 📱 Generating QR Codes

After adding or editing plants, regenerate all QR codes with:

```bash
python generate_qr.py
```

The script:

- Reads every plant from `data/plants.json`.
- Builds the full GitHub Pages URL for each plant's details page.
- Generates a QR code with **high error correction (level H)**, so it still scans when partially damaged or worn by weather — ideal for outdoor signs.
- Saves each image to `images/qr_codes/<plant_id>_qr.png`.

Update `BASE_URL` at the top of `generate_qr.py` if the site moves to a different domain.

## ➕ Adding a New Plant

1. **Add the plant data** to `data/plants.json` (and mirror it in `data/plants.js`):

```json
{
  "id": "basil",
  "name": "Basil",
  "commonName": "Sweet Basil",
  "scientificName": "Ocimum basilicum",
  "family": "Lamiaceae",
  "type": "Culinary Herb",
  "origin": "India",
  "image": "images/basil.jpeg",
  "description": "A fragrant culinary herb...",
  "sunlight": "6 hours of sunlight daily",
  "water": "Moderate watering",
  "soil": "Well-drained fertile soil",
  "temperature": "18°C-30°C",
  "healthStatus": "Healthy",
  "benefits": ["Culinary uses", "Aromatic leaves", "Attracts pollinators"],
  "care": "Pinch off flower buds to keep leaves flavorful."
}
```

2. **Add a plant card** to `index.html` (use `class="plant-card extra-plant"` if it should stay hidden behind *Explore More*):

```html
<div class="plant-card extra-plant">
    <img src="images/basil.jpeg" alt="Basil Plant">
    <div class="plant-info">
        <h3>Basil</h3>
        <p>Sweet Basil</p>
        <a href="plant.html?id=basil" class="details-btn">View Details</a>
    </div>
</div>
```

3. **Add the photo** to `images/` and commit it.
4. **Regenerate QR codes**: `python generate_qr.py`.
5. Push to deploy — that's it.

### Plant Data Fields

| Field | Purpose |
|---|---|
| `id` | URL-safe unique identifier used in `plant.html?id=...` and QR filenames |
| `name`, `commonName` | Display name and everyday name |
| `scientificName`, `family`, `type`, `origin` | Botanical classification |
| `image` | Path to the plant photo |
| `description` | Short paragraph about the plant |
| `sunlight`, `water`, `soil`, `temperature` | Growing conditions |
| `healthStatus` | Current condition, shown as a colored badge |
| `benefits` | Bullet list of benefits |
| `care` | Care instructions paragraph |

## 🌐 Deployment

The site is deployed with **GitHub Pages** from the repository's root directory — no build pipeline needed. Any push to the main branch is automatically live at:

> https://negirahul1729.github.io/Negi-Smart-Garden

When printing garden signs, use the PNG files from `images/qr_codes/` — level-H error correction keeps them scannable even outdoors.

## 🛠 Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript** — no frameworks, no build tools
- **Python + `qrcode`** — QR code generation
- **JSON** as the plant database, with a JS fallback
- **GitHub Pages** for hosting

## 📞 Contact

**Negi Smart Garden** — Digital Garden Project

📧 Email: [rahulnegi.ext@gmail.com](mailto:rahulnegi.ext@gmail.com)

---

© 2026 Negi Smart Garden
