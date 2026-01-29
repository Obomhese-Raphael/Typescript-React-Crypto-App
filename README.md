# Crypto App – Real-Time Cryptocurrency Tracker

<img width="948" height="411" alt="image" src="https://github.com/user-attachments/assets/2cd3c031-443a-4b4d-b49f-0d61cbd5fab2" />

A modern, responsive **React + TypeScript** cryptocurrency dashboard that tracks real-time prices, trending coins, NFTs, exchanges, derivatives, and more — powered by **CoinGecko API**.

[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=typescript-react-crypto-app&style=for-the-badge&logo=vercel)](https://typescript-react-crypto-app.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Live Demo: **[https://typescript-react-crypto-app.vercel.app](https://typescript-react-crypto-app.vercel.app)**  
GitHub: **[https://github.com/Obomhese-Raphael/Typescript-React-Crypto-App](https://github.com/Obomhese-Raphael/Typescript-React-Crypto-App)**

---

## ✨ Features

- Real-time cryptocurrency prices, market cap, volume, and 24h changes  
- Trending coins, NFTs, and categories carousel (updated every few minutes)  
- Detailed coin pages with historical price change (1D / 7D / 1M / 1Y / All)  
- Centralized & decentralized exchanges overview + tickers  
- Derivatives & perpetual markets data  
- Fully responsive design (mobile-first)  
- Dark gradient theme with smooth animations  
- Authentication via **Clerk** (Google, email, etc.)  
- Currency switcher (USD, EUR, INR, NGN, etc.)  
- Error handling, loading spinners & retry buttons  
- Proxy layer for CoinGecko API (avoids CORS in production)  
- Deployed on **Vercel** with automatic CI/CD

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite  
- **Styling**: Tailwind CSS  
- **Routing**: React Router v6  
- **State Management**: React Context API  
- **Authentication**: Clerk  
- **Icons**: react-icons  
- **API**: CoinGecko (proxied via Vercel Edge Functions)  
- **Deployment**: Vercel  

---

## 📂 Project Structure

```
TYPESCRIPT-REACT-CRYPTO-APP/
│
├── src/
│   ├── assets/              # Static assets (images, icons, etc.)
│   │
│   ├── Components/          # Reusable UI components
│   │   ├── CoinsData/       # Coin-related components
│   │   ├── DerivativeData/  # Derivative markets components
│   │   ├── ExchangeData/    # Exchange-related components
│   │   ├── Footer/          # Footer component
│   │   ├── Navbar/          # Navigation bar
│   │   ├── NftData/         # NFT-related components
│   │   ├── SignUp/          # Authentication components
│   │   └── Spinner/         # Loading spinner component
│   │
│   ├── Context/             # React Context for global state
│   │   └── Context.tsx      # Main context provider
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── useTrendingCarousel.ts
│   │
│   ├── Interface/           # TypeScript interfaces/types
│   │   └── ICoin.ts         # Coin data types
│   │
│   ├── Pages/               # Page components (routes)
│   │   ├── Coin/            # Individual coin detail page
│   │   ├── Cryptocurrencies/# Main cryptocurrencies list page
│   │   ├── Exchanges/       # Exchanges list page
│   │   ├── Home/            # Landing/home page
│   │   ├── Login/           # Login page
│   │   └── NFTs/            # NFTs page
│   │
│   ├── App.css              # Global app styles
│   ├── App.tsx              # Main app component
│   ├── firebase.js          # Firebase configuration (if used)
│   ├── index.css            # Base CSS & Tailwind imports
│   └── main.tsx             # App entry point
│
├── public/                  # Public assets
├── .env                     # Environment variables (not committed)
├── .gitignore               # Git ignore rules
├── index.html               # HTML entry point
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repo

```bash
git clone https://github.com/Obomhese-Raphael/Typescript-React-Crypto-App.git
cd Typescript-React-Crypto-App
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Create `.env` file in root and add your keys

```env
VITE_API_KEY=CG-XXXXXXXXXXXXXXXXXXXXXX     # CoinGecko Demo/Pro key
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxx   # Clerk publishable key
```

### 4. Start development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) — enjoy! 🎉

---

## 📦 Build & Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel dashboard
3. Add environment variables in Vercel project settings:
   - `VITE_API_KEY`
   - `VITE_CLERK_PUBLISHABLE_KEY`
4. Deploy — done! 🎉

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for:

- New features (charts, watchlist, portfolio tracker...)
- UI/UX improvements
- Bug fixes
- Better mobile menu animations

### How to contribute:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-thing`)
3. Commit your changes (`git commit -m 'Add some amazing thing'`)
4. Push to branch (`git push origin feature/amazing-thing`)
5. Open a Pull Request

---

## ⭐ Show some love

If you like the project or find it useful — please leave a star ⭐ on the repo!  
It really helps motivate me to keep improving it.

[⭐ Star on GitHub](https://github.com/Obomhese-Raphael/Typescript-React-Crypto-App)

---

**Made with ❤️ in Lagos, NG**  
© 2025 Raphael Obomhese
