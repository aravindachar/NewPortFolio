<div align="center">

# ✦ Aravinda K Kambar — Personal Portfolio & Headless CMS ✦

<p align="center">
  <strong>A high-performance, dynamic portfolio engineered with React 19, TypeScript, Tailwind CSS v4, WebGL, and Supabase.</strong>
</p>

<p align="center">
  <a href="https://github.com/aravindachar/NewPortFolio">
    <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  </a>
  <a href="https://github.com/aravindachar/NewPortFolio">
    <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://github.com/aravindachar/NewPortFolio">
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  </a>
  <a href="https://github.com/aravindachar/NewPortFolio">
    <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" />
  </a>
  <a href="https://github.com/aravindachar/NewPortFolio">
    <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  </a>
  <a href="https://github.com/aravindachar/NewPortFolio">
    <img src="https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/aravindachar/NewPortFolio">Live Website</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-architecture--tech-stack">Tech Stack</a> •
  <a href="#-admin-control-center">Admin Dashboard</a> •
  <a href="#-local-development">Getting Started</a> •
  <a href="#-connect">Connect</a>
</p>

---

</div>

## 💡 About The Project

Welcome to my personal portfolio codebase! Rather than building a static, hardcoded portfolio or relying on standard templates, I engineered a **production-grade, 100% dynamic web application** from scratch.

It combines an **Apple-inspired aesthetic** (with custom SF Pro typography, frosted glassmorphic styling, and fluid theme transitions) with a **full-featured private `/admin` headless CMS dashboard** powered by **Supabase PostgreSQL** — allowing real-time customization of every section without touching code or redeploying.

---

## ✨ Key Features

### 🍎 1. Apple-Grade Design System & Circular Ripple Theme Engine
- **Apple Light & Dark Modes**: Seamlessly adapts between Apple's deep charcoal (`#1d1d1f`) typography on a clean white canvas and a minimalist jet black (`#000000`) theme.
- **Circular Ripple View Transitions**: Implements the modern `document.startViewTransition` API to create an expanding circular clip-path wave originating directly from the theme toggle coordinates (`480ms cubic-bezier(0.25, 1, 0.5, 1)`).
- **Glassmorphism**: Apple-style translucent blur cards with dynamic CSS variable border illumination.

### 🎮 2. Interactive WebGL & Vector Visual Effects
- **`LetterGlitch`**: High-performance canvas letter-glitch matrix background that adapts dynamically to dark and light modes.
- **`PixelCard`**: Custom canvas grid with pixel-proximity physics and illumination on hover.
- **`VariableProximity`**: Real-time font variation weight scaling (`'wght' 350` to `'wght' 800`) tracking cursor distance across narrative paragraphs.
- **`LogoLoop`**: Smooth 60FPS marquee showcasing 22+ curated tech icons.
- **`WorldMap`**: Interactive vector dotted map projection built with `dotted-map` displaying animated trajectory arcs from **Bengaluru, IN** to major global tech capitals (Silicon Valley, New York, London, Berlin, Tokyo, Singapore).

### 🎛️ 3. Built-in Private Headless CMS (`/admin`)
- Secure passcode-protected dashboard (`/admin/login`).
- **9 Granular Control Panels**:
  1. **Identity & Hero**: Display name, title, gradient colors, speed, and resume actions.
  2. **Bio & Narrative**: Live editor for summary and variable font weighting.
  3. **Contacts & Socials**: Dynamic CRUD management for social links and action pills.
  4. **Tech Ticker**: Marquee speed slider and toggle for 30+ technology logos.
  5. **Experience**: Reorderable internship/job cards with dynamic bullet points.
  6. **Projects**: Add/edit demo links, repository URLs, tech stack badges, and impact bullets.
  7. **Technical Skills**: Category management with color themes (Pink, Blue, Monochrome).
  8. **Education & Certifications**: University details and toggleable certifications showcase.
  9. **Visuals & Settings**: Canvas glitch toggles, opacity sliders, availability badge customizer, Supabase keys manager, and **1-Click JSON Backup & Restore**.

### 🗄️ 4. Zero-Cost Resilient Storage Architecture
- **Supabase Cloud Sync**: Real-time cloud synchronization backed by PostgreSQL with Row Level Security (RLS).
- **Zero-Latency Offline Fallback**: Synchronizes with browser `localStorage` for instant offline usability and zero UI stutter.
- **Static Assets**: Bundled resume PDF served directly at `/resume.pdf`.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Core Framework** | **React 19** | Concurrent rendering, modern hooks, and component lifecycle |
| **Language** | **TypeScript 6.0** | Full end-to-end type safety across schemas and components |
| **Styling & CSS** | **Tailwind CSS v4.0** | Next-gen CSS-first utility styling with `@custom-variant dark` |
| **Build & Bundler** | **Vite 8.2** | Lightning-fast HMR and optimized production bundling |
| **Routing** | **React Router DOM v7** | Client-side SPA routing with protected `/admin` route guards |
| **Animations** | **Motion (Framer)** | Vector path tracing, radar pulse animations, and staggered entrances |
| **Graphics & Canvas** | **HTML5 Canvas 2D / WebGL** | `LetterGlitch` matrix effect and `PixelCard` physics grid |
| **Map Projections** | **dotted-map** | High-resolution dotted vector SVG world projections |
| **Database & Cloud** | **Supabase (PostgreSQL)** | Free cloud persistence with Row Level Security (RLS) |
| **Icons** | **React Icons & Lucide** | Comprehensive developer & brand icon set |
| **Hosting & CDN** | **Vercel** | Global edge CDN, automatic SSL, and zero-config SPA rewrites |

---

## 📁 Directory Structure

```text
portfolio2026/
├── public/
│   ├── resume.pdf              # Bundled static resume PDF
│   └── favicon.svg             # Application favicon
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   └── ProtectedRoute.tsx  # Auth guard for /admin
│   │   └── ui/
│   │       ├── dot-pattern.tsx      # SVG background dot grid
│   │       ├── GradientText.tsx     # Animated gradient typography
│   │       ├── LetterGlitch.tsx     # Canvas letter matrix background
│   │       ├── LogoLoop.tsx         # Infinite tech stack marquee
│   │       ├── PixelCard.tsx        # Interactive pixel hover card
│   │       ├── ThemeToggle.tsx      # Apple-style Sun/Moon pill toggle
│   │       ├── VariableProximity.tsx# Cursor-distance variable font scaler
│   │       ├── world-map.tsx        # Vector dotted global map
│   │       └── world-map-demo.tsx   # Global connectivity section
│   ├── context/
│   │   ├── AuthContext.tsx          # Passcode session & auth provider
│   │   ├── PortfolioContext.tsx     # Central reactive portfolio data state
│   │   └── ThemeContext.tsx         # Apple Light/Dark theme & view transitions
│   ├── data/
│   │   └── defaultPortfolioData.ts  # Fallback default resume schema
│   ├── lib/
│   │   ├── iconsMap.tsx             # 30+ tech icon registry
│   │   ├── supabase.ts              # Supabase client & sync engine
│   │   └── utils.ts                 # ClassName merger (clsx + twMerge)
│   ├── pages/
│   │   ├── AdminDashboardPage.tsx   # Master 9-tab CMS dashboard
│   │   ├── AdminLoginPage.tsx       # Minimalist glassmorphic login
│   │   └── PortfolioPage.tsx        # Dynamic public portfolio view
│   ├── types/
│   │   └── portfolio.ts             # TypeScript data contract schemas
│   ├── App.tsx                      # Root router & providers
│   ├── index.css                    # Tailwind v4 & View Transitions styles
│   └── main.tsx                     # React root entry point
├── scripts/
│   └── seedSupabase.mjs             # Node script to seed PostgreSQL database
├── vercel.json                      # Vercel SPA rewrite configuration
└── package.json
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm** / **yarn**

### 1. Clone the repository
```bash
git clone https://github.com/aravindachar/NewPortFolio.git
cd NewPortFolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables (Optional for Cloud Sync)
Create a `.env` file in the root directory (refer to `.env.example`):
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
*(Note: The portfolio works completely offline with `localStorage` even without Supabase keys!)*

### 4. Start the development server
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 5. Build for production
```bash
npm run build
```

---

## 🗄️ Supabase PostgreSQL Setup (Optional Cloud Storage)

If you wish to sync your portfolio data to a personal Supabase database:

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** and run:
```sql
create table portfolio_data (
  id text primary key,
  content jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable public read & write access
alter table portfolio_data enable row level security;
create policy "Allow public read" on portfolio_data for select using (true);
create policy "Allow public insert and update" on portfolio_data for all using (true);
```
3. Run the seed script:
```bash
node scripts/seedSupabase.mjs
```

---

## 🌐 Deploy to Vercel (100% Free)

This repository includes a pre-configured [`vercel.json`](./vercel.json) for single-page application routing.

1. Push your repository to GitHub.
2. Sign in to **[vercel.com](https://vercel.com)** and click **"Add New Project"** → select `NewPortFolio`.
3. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Environment Variables**.
4. Click **"Deploy"** — your live site will be ready in under 45 seconds with free SSL and edge CDN caching!

---

## 📬 Connect

- **Portfolio**: [https://github.com/aravindachar/NewPortFolio](https://github.com/aravindachar/NewPortFolio)
- **LinkedIn**: [linkedin.com/in/aravindachar](https://linkedin.com/in/aravindachar)
- **GitHub**: [@aravindachar](https://github.com/aravindachar)
- **Email**: [aravindachar2004@gmail.com](mailto:aravindachar2004@gmail.com)
- **Location**: Bengaluru, Karnataka, India

---

<div align="center">
  <sub>Designed & engineered with precision by <strong>Aravinda K Kambar</strong> • © 2026</sub>
</div>
