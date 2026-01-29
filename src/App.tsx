// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn, ClerkLoaded, ClerkLoading } from '@clerk/clerk-react';

import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Coin from './Pages/Coin/Coin';
import Footer from './Components/Footer/Footer';
import Trending from './Pages/Cryptocurrencies/Cryptocurrencies';
import Nft from './Pages/NFTs/Nft';
import NftData from './Components/NftData/NftData';
import Exchange from './Pages/Exchanges/Exchange/Exchange';
import Decentralized from './Pages/Exchanges/Decentralized/Decentralized';
import Derivatives from './Pages/Exchanges/Derivatives/Derivatives';
import ExchangeData from './Components/ExchangeData/ExchangeData';
import DerivativeData from './Components/DerivativeData/DerivativeData';
import { MinimalSpinner } from './Components/Spinner/Spinner';

const App = () => {
  return (
    <div className="app min-h-screen">
      <ClerkLoading>
        <MinimalSpinner />
      </ClerkLoading>

      <ClerkLoaded>
        <Navbar />

        <Routes>
          {/* Public: Sign-in page (can be accessed even if already signed in, but Clerk auto-redirects signed-in users) */}
          <Route path="/sign-in" element={<RedirectToSignIn />} />

          {/* All other routes are protected */}
          <Route
            path="*"
            element={
              <>
                <SignedIn>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/coin/:coinId" element={<Coin />} />
                    <Route path="/cryptocurrencies" element={<Trending />} />
                    <Route path="/nft" element={<Nft />} />
                    <Route path="/nft/:nftId" element={<NftData />} />
                    <Route path="/crypto_exchanges" element={<Exchange />} />
                    <Route path="/decentralized_exchanges" element={<Decentralized />} />
                    <Route path="/derivatives" element={<Derivatives />} />
                    <Route path="/derivatives/:derivativeId" element={<DerivativeData />} />
                    <Route path="/exchanges/:exchangesId" element={<ExchangeData />} />

                    {/* Catch-all for unknown paths → redirect to home if signed in */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </SignedIn>

                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>

        <SignedIn>
          <Footer />
        </SignedIn>
      </ClerkLoaded>
    </div>
  );
};

export default App;