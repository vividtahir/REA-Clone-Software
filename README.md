# REA Clone Software: VirtualTryOn.art Reconstructed Suite

A complete reverse-engineered clone and modern reconstruction of [virtualtryon.art](https://virtualtryon.art/), built with **REA (Reverse Engineering Anything)** methodology and tooling.

---

## 🌟 Overview & Highlights

- **Luxury Gold & Obsidian Dark UI**: Faithfully reconstructed visual design with high-end typography, glassmorphism panels, and smooth micro-interactions.
- **Interactive Try-On Studio**:
  - Drag-and-drop or click to upload Human / Model photo.
  - Multi-tab Garment input: **Presets** (Upper Body, Lower Body, Dresses, Suits), **File Upload**, **URL Image Fetch**, or **Prompt-based AI Generation**.
  - Advanced Generation Controls: Multi-resolution selection (1K, 2K, 4K), Aspect Ratios (1:1, 3:4, 4:5, 9:16), Quality toggles, and Generation seed options.
  - Interactive Before & After comparison slider with drag handler.
  - High-res Lightbox modal with one-click image download and instant preset loading.
- **Live AI Diffusion Engine**:
  - Powered by live Pollinations Flux diffusion pipeline with custom high-detail fashion synthesis and robust fallbacks.
  - Multi-stage background task polling simulation matching the target site's exact batch queue architecture (`/api/generate/image` -> `/api/generate/batch/status`).
- **Permanent Unlimited Free Credits**:
  - Full credit-gate bypass (`∞ Unlimited Credits`) across both frontend state and backend APIs.
- **In-Depth REA Reverse-Engineering Dossier**:
  - See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete AST breakdown (101,184 nodes), API call graph, state machine, and reconstruction obligations.

---

## 🏗️ Architecture

```
d:\vivid\REA\
├── ARCHITECTURE.md            # REA Reverse-Engineering Dossier & AST Analysis
├── virtualtryon-art/          # Reconstructed Web Application
│   ├── index.html             # HTML entry point with luxury styling
│   ├── package.json           # Frontend dependencies & scripts
│   ├── tailwind.config.js     # Luxury gold/dark theme configuration
│   ├── vite.config.js         # Vite configuration with proxy to port 3001
│   ├── server/                # Express API Backend
│   │   ├── index.js           # API endpoints, image generation & file uploads
│   │   ├── package.json       # Backend dependencies
│   │   └── uploads/           # Stored uploaded reference images
│   ├── src/                   # React Frontend Source
│   │   ├── App.jsx            # Main application layout
│   │   ├── components/        # UI components
│   │   │   ├── Navbar.jsx           # Luxury navigation with unlimited credit badge
│   │   │   ├── HeroSection.jsx      # Hero banner with CTA and dynamic counters
│   │   │   ├── TryOnStudio.jsx      # Core interactive clothes changer studio
│   │   │   ├── BeforeAfterSlider.jsx# Interactive split-screen comparison slider
│   │   │   ├── ShowcaseDemo.jsx     # Preset gallery & interactive showcases
│   │   │   ├── FeaturesGrid.jsx     # Highlighting core AI features
│   │   │   ├── PricingSection.jsx   # Pricing plans & lifetime credit details
│   │   │   ├── FaqSection.jsx       # FAQ accordion
│   │   │   └── Footer.jsx           # Footer with links and branding
│   │   └── services/
│   │       └── api.js         # Frontend HTTP client & polling manager
│   └── public/assets/         # Reconstructed webp fashion assets
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### 1. Install Dependencies

```bash
cd virtualtryon-art
npm install
```

### 2. Start the Backend API Server

```bash
cd virtualtryon-art
node server/index.js
```
The backend server starts on `http://localhost:3001`.

### 3. Start the Frontend Dev Server

In a second terminal:
```bash
cd virtualtryon-art
npm run dev
```
The client app runs on `http://localhost:3000`.

---

## 🛠️ API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/generate/image` | `POST` | Submits a try-on generation task (person + garment + settings) |
| `/api/generate/batch/status` | `POST` | Polls the progress status of a running generation task |
| `/api/upload` | `POST` | Handles multipart form file uploads for model and garment images |
| `/api/user/first-visit` | `GET` | Initializes user session with unlimited credits (`isUnlimited: true`) |
| `/api/import/product-images` | `POST` | Downloads external product images via URL |
| `/api/works/reference-images` | `GET` | Fetches reference gallery presets |

---

## 📄 License

MIT License. Designed and reverse-engineered with REA.
