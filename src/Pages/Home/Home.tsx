/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../Context/Context";
import CoinsData from "../../Components/CoinsData/CoinsData";
import { Link } from "react-router-dom";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";


const Home = () => {
  const { trendingCoin } = useContext(CoinContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const topCoins = trendingCoin.slice(0, 10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === topCoins.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [topCoins.length, trendingCoin]);

  if (!trendingCoin || trendingCoin.length === 0) {
    return <p>Loading...</p>;
  }

  const coin = topCoins[currentIndex].item;
  const priceChangeData = coin.data.price_change_percentage_24h;

  const currencyKeys = Object.keys(priceChangeData);
  const currentCurrencyKey = currencyKeys[0];

  let changeIcon;
  const priceChangeValue = priceChangeData[currentCurrencyKey];

  if (priceChangeValue > 0) {
    changeIcon = <MdArrowDropUp />
  } else {
    changeIcon = <MdArrowDropDown />
  }

  return (
    <div className="">
      <div className="home main-container">
        <div className="home-container">
          <p className="trending_coins">Trending Coins</p>
          <Link to={`/coin/${coin.id}`} className="thumb">
            <p>{currentIndex + 1}.</p>
            <h3>{coin.name}</h3>
            <div>
              <div
                className="img"
                style={{
                  backgroundImage: `url(${coin.large})`,
                  height: '40px',
                  width: '40px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            </div>
          </Link>
          <p className="market_cap">{coin.data.market_cap.toLocaleString()}</p>
          <p className={`price_change ${priceChangeData[currentCurrencyKey] > 0 ? "green" : "red"}`}>
            {changeIcon}
            {priceChangeData[currentCurrencyKey].toFixed(2)}%
          </p>
        </div>
      </div>
      <CoinsData />
    </div>
  );
};

export default Home;
