# 🕹️ Obsidian – Neon Indie Store

> A premium, AAA-quality boutique digital storefront built for elite independent game developers and passionate players. Features a Dark Cyberpunk aesthetic, Bento-Grid discovery, Web Audio API sound synthesis, persistent state management, real-time theme customizer, and an Indie Publisher portal.

![Obsidian Store Banner](https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop)

---

## 🌐 Live Application & Demo

* **Live Hosted Web Application**: [afzaludeen03-prog.github.io/obsidian---neon-indie-store](https://afzaludeen03-prog.github.io/obsidian---neon-indie-store/)
* **GitHub Repository**: [github.com/afzaludeen03-prog/obsidian---neon-indie-store](https://github.com/afzaludeen03-prog/obsidian---neon-indie-store)

---

## 🚀 Key Features

* 📱 **PWA & Offline Ready**: Service Worker caching (`sw.js`) and Web App Manifest (`manifest.json`) for desktop and mobile PWA installation ("Add to Home Screen").
* 🔊 **Web Audio API Synthesizer**: Custom retro/cyberpunk UI micro-interaction sound effects (hover ticks, vault addition chimes, order checkout fanfares) with an instant Mute/Unmute toggle.
* 🎨 **Cyberpunk Theme Customizer**: On-the-fly accent color switcher (Neon Cyan `#00f3ff`, Cyber Purple `#a855f7`, Synthwave Pink `#ff007f`, Matrix Green `#00ff66`) dynamically adjusting CSS custom properties.
* 📦 **Persistent Cart & Wishlist**: Global React context synchronized with `localStorage` so cart items and bookmarked wishlist games persist across browser sessions.
* 🚀 **Indie Publisher Portal (`DevDashboard`)**: Modal form enabling developers to publish new games live into the store grid with instant state update.
* 🕹️ **Personal Library (`UserLibrary`)**: Purchased games are automatically added to the user's permanent library with interactive *"Launch Game"* and *"Download Client"* triggers.
* 💬 **Community & Review Hub (`CommunityHub`)**: Developer patch notes, community discussions, upvote counters, and a *"Write a Review"* submission form.
* 🔍 **Real-Time Search & Sort**: Real-time filtering across titles, tags, developers, and dynamic sorting (Price, Rating, Release Date, Discounts).

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern functional component UI layer |
| **TypeScript 5.8** | Type-safe code and interface definitions |
| **Vite 6** | Ultra-fast production bundler & dev server |
| **Tailwind CSS v4** | Dark Neon design system with custom `@theme` configuration |
| **Motion** | Fluid animations, 3D card tilts, and slide-over drawers |
| **Lucide React** | Scalable UI iconography |
| **Web Audio API** | Dynamic synthesized audio SFX |

---

## 📦 Project Structure

```
play store/
├── public/
│   ├── manifest.json         # Web App Manifest for PWA
│   └── sw.js                 # Service Worker offline cache script
├── src/
│   ├── components/
│   │   ├── admin/            # DevDashboard publisher portal
│   │   ├── cart/             # CheckoutModal flow & promo code verification
│   │   ├── community/        # CommunityHub, patch notes & review creation
│   │   ├── effects/          # NeonBackground canvas particle grid
│   │   ├── home/             # Hero, FeaturedGames grid, GameModal details
│   │   ├── layout/           # Navbar, Footer, CartDrawer
│   │   ├── library/          # UserLibrary purchased games view
│   │   ├── ui/               # ThemeSwitcher & Toast notifications
│   │   └── wishlist/         # WishlistDrawer slide-over panel
│   ├── context/              # CartContext, WishlistContext, LibraryContext, CommunityContext, StoreContext, ThemeContext
│   ├── data/                 # Games catalog dataset with rich metadata
│   ├── utils/                # Audio synthesizer manager (audio.ts)
│   ├── App.tsx               # Main root app component & providers
│   ├── index.css             # Tailwind v4 theme configuration & glass utility classes
│   ├── main.tsx              # Application entry point
│   └── types.ts              # TypeScript interfaces
├── index.html                # PWA registration, Open Graph & JSON-LD schema
├── package.json              # Dependencies and build scripts
└── vite.config.ts            # Vite configuration
```

---

## 💻 Local Setup & Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/afzaludeen03-prog/obsidian---neon-indie-store.git
   cd obsidian---neon-indie-store
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run local development server**:
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License

SPDX-License-Identifier: Apache-2.0
