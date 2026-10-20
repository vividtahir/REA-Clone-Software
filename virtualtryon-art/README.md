# VirtualTryOn.art — Full-Stack Reconstruction

> **Reverse Engineered & Reconstructed using the REA Skill**  
> Complete high-fidelity clone of [virtualtryon.art](https://virtualtryon.art/) featuring a luxury gold/dark UI, multi-item AI virtual try-on studio, asynchronous task state machine, and RESTful API backend.

---

## 🌟 Key Features

1. **AI Clothes Changer & Try-on Studio (`#studio-section`)**:
   - **Multi-slot Garment Loading**: Character model slot + up to 16 reference garments and accessories.
   - **4 Flexible Source Tabs**:
     - *Upload*: Drag & drop or browse local files.
     - *Product Links*: Input links from Amazon, UNIQLO, Shopify, and M&S with automatic image extraction.
     - *Generate*: Text-to-image reference creation using AI prompt conditioning.
     - *Preset Library*: 1-click access to curated models, dresses, suits, hats, and jackets.
   - **Precision Control**:
     - Aspect ratios: `Auto`, `3:4`, `1:1`, `9:16`, `4:3`, `16:9`.
     - Output resolution: `1K`, `2K`, `4K` with credit consumption indicator.
     - Privacy toggle: Public vs Private try-on mode.
   - **Live Before / After Comparison Slider**:
     - Interactive split comparison slider allowing users to inspect the garment drape and fitting against the original model.
   - **Export & Lightbox**:
     - Fullscreen lightbox modal with 1-click high-res download.

2. **Luxury Cyber-Gold Aesthetic**:
   - Palette: Obsidian black (`#0E0E0E`) with gold gradients (`#B8860B`, `#C6A664`, `#FFD700`).
   - Glassmorphism: `backdrop-filter: blur(16px)` with subtle gold ambient glows.
   - Micro-animations: Sliding metallic gold progress bar during active generation tasks (`generation-progress-slide`).
   - Partner ticker: Infinite animated scrolling brand marquee (`Microsoft`, `Nike`, `P&G`, `Lancôme`, `Zoom`, `Sony`, `Mercedes-Benz`, `Coca-Cola`).

3. **Backend & Architecture**:
   - `POST /api/generate/image`: Asynchronous job creation with unique task UID.
   - `GET /api/generate/batch/status`: Real-time status polling (`preparing` -> `submitted` -> `generating` -> `completed`).
   - `POST /api/import/product-images`: E-commerce product scraper service.
   - `GET /api/works/reference-images`: Paginated user creation gallery.
   - `POST /api/user/first-visit`: Visitor onboarding & credit ledger.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js >= 18 (Tested on v24.19.0)
- npm >= 9

### Quick Start
```bash
# 1. Navigate to the project directory
cd virtualtryon-art

# 2. Start both the Express API server (port 3001) and Vite frontend (port 3000)
node run_app.js
```

Or run them individually in separate terminals:
```bash
# Terminal 1: Backend API Server (Port 3001)
npm run server

# Terminal 2: Vite Dev Frontend (Port 3000)
npm run dev
```

Open your browser at: **`http://localhost:3000`**
