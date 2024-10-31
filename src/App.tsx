import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Coin from "./Pages/Coin/Coin";
import Footer from "./Components/Footer/Footer";
import SignUp from "./Components/SignUp/SignUp";
import Trending from "./Pages/Cryptocurrencies/Cryptocurrencies";
import Nft from "./Pages/NFTs/Nft";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cryptocurrencies" element={<Trending />} />
        <Route path="/nfts/:nftId" element={<Nft />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
