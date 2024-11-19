import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Coin from "./Pages/Coin/Coin";
import Footer from "./Components/Footer/Footer";
import SignUp from "./Components/SignUp/SignUp";
import Trending from "./Pages/Cryptocurrencies/Cryptocurrencies";
import Nft from "./Pages/NFTs/Nft";
import NftData from "./Components/NftData/NftData";
import Exchange from "./Pages/Exchanges/Exchange/Exchange";
import Decentralized from "./Pages/Exchanges/Decentralized/Decentralized";
import Derivatives from "./Pages/Exchanges/Derivatives/Derivatives";
import ExchangeData from "./Components/ExchangeData/ExchangeData";
import DerivativeData from "./Components/DerivativeData/DerivativeData";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cryptocurrencies" element={<Trending />} />
        <Route path="/nft" element={<Nft />} />
        <Route path="/nft/:nftId" element={<NftData />} />
        <Route path="/crypto_exchanges" element={< Exchange />}></Route>
        <Route path="/decentralized_exchanges" element={<Decentralized />}></Route>
        <Route path="/derivatives" element={<Derivatives />}></Route>
        <Route path="/derivatives/:derivativeId" element={<DerivativeData/>}></Route>
        <Route path="/exchanges/:exchangesId" element={<ExchangeData />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
