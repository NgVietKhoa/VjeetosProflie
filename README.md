# 🌌 Nguyễn Việt Khoa — Fullstack Developer Portfolio

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.6-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.0.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.40.0-black?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.2.0-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

---

Welcome to the official repository of my personal developer portfolio. This is a **dark luxury editorial portfolio** combining custom 3D web layouts, smooth-scroll kinematics, and interactive storytelling hooks—crafted without heavy 3D assets to maintain lightweight performance.

## ✨ Core Features

### 📦 Interactive 3D Vault (Holographic Directory)
- A custom 3D Chest model built purely with CSS 3D transforms (`transform-style: preserve-3d`) and Framer Motion spring physics.
- Opens **upward and backward** automatically on scroll, emitting an internal neon leaf-green glow.
- Emits four 3D glassmorphic directory banners (**About**, **Skills**, **Projects**, **Contact**) that scatter symmetrically around the chest, acting as clickable anchor links.

### 📂 Swipe-Away Stacking Projects
- Projects stack vertically on top of each other. As you scroll, the top card swiping away upward and fading out to reveal the next card.
- Synchronized translation vectors bind the left-side swiping cards to the right-side text descriptions.
- Built-in overflow masks to crop swiped cards cleanly.

### ⚡ Horizontal Tech Inventory Track
- A full-screen horizontal scrolling showcase track of core skills.
- Implements dynamic client-side `scrollWidth` and viewport measurements to align the track perfectly flush on start and finish without leaving gaps.

### 🔮 Premium Editorial Design
- Luxury dark palette harmonizing charcoal gray `#141416`, zinc accents, and a vibrant `#7ec850` leaf-green signature indicator.
- Seamless grid dot pattern flowing through all sections.
- Customized pixel-art cursor and retro-inspired monospace typography.
- Smoothed using **Lenis smooth scroll** wrappers.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.2.6 (App Router)](https://nextjs.org/)
- **Core Library**: [React 19](https://react.dev/)
- **Animation Engine**: [Framer Motion 12](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS 4.2.0](https://tailwindcss.com/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```bash
├── app/
│   ├── globals.css      # Core theme tokens, pixel utilities, and ambient gradients
│   ├── layout.tsx       # Root document structure
│   └── page.tsx         # Section order assembly
├── components/
│   ├── sections/
│   │   ├── hero.tsx            # Landing viewport & typing cursor
│   │   ├── minecraft-chest.tsx # 3D chest scene & scattered hologram plates
│   │   ├── about.tsx           # Sticky split-scroll biography & stats grid
│   │   ├── skills.tsx          # Dynamic horizontal inventory scroll
│   │   ├── projects.tsx        # Swipe-stacking projects list
│   │   └── contact.tsx         # Terminal emulator connect deck
│   ├── lenis-provider.tsx      # Smooth scrolling hooks
│   ├── pixel-cursor.tsx        # Custom responsive trailing cursor
│   └── section-label.tsx       # Vertical sticky section indexing bars
└── public/
    └── logos/                  # Flat technology SVGs
```

---

## 🚀 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NgVietKhoa/minecraft-luxury-landing-page.git
   cd minecraft-luxury-landing-page
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## ✉️ Connect with Me

- **Email**: [khoa2006nguyen811@gmail.com](mailto:khoa2006nguyen811@gmail.com)
- **GitHub**: [github.com/NgVietKhoa](https://github.com/NgVietKhoa)
- **LinkedIn**: [linkedin.com/in/khoa-nguyen-6a34b7360](https://www.linkedin.com/in/khoa-nguyen-6a34b7360/)
- **Facebook**: [facebook.com/vjeet.kho06](https://www.facebook.com/vjeet.kho06)

---
<div align="center">
  <sub>Developed with dedication by Nguyễn Việt Khoa · © 2026</sub>
</div>
