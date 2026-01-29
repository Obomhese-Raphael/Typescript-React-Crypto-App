import { useContext, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../Context/Context";
import CoinsData from "../../Components/CoinsData/CoinsData";
import { Link } from "react-router-dom";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { MinimalSpinner } from "../../Components/Spinner/Spinner";
import { useTrendingCarousel } from "../../hooks/useTrendingCarousel";

const Home = () => {
  const { trendingCoin, loadingTrending, errorTrending, currency } =
    useContext(CoinContext);

  const [isPaused, setIsPaused] = useState(false);

  const topCoins = trendingCoin.slice(0, 10);

  const { currentItem } = useTrendingCarousel<{
    item: {
      id: string;
      name: string;
      symbol?: string;
      large: string;
      data: {
        market_cap: number;
        price_change_percentage_24h: Record<string, number>;
        // add more fields if needed
      };
    };
  }>({
    items: topCoins,
    interval: 5000,
    pause: isPaused,
    resetKey: currency.name,
  });

  // ── Loading ──
  if (loadingTrending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <MinimalSpinner />
      </div>
    );
  }

  // ── Error ──
  if (errorTrending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-red-400 text-2xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-slate-200 mb-2">
          Something went wrong
        </h2>
        <p className="text-slate-400 mb-6">{errorTrending}</p>
      </div>
    );
  }

  // ── No data ──
  if (!currentItem) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
        No trending coins available
      </div>
    );
  }

  const coin = currentItem.item;
  const priceChangeData = coin.data.price_change_percentage_24h;
  const currencyKey = Object.keys(priceChangeData)[0];
  const priceChangeValue = priceChangeData[currencyKey];

  const changeIcon =
    priceChangeValue > 0 ? <MdArrowDropUp /> : <MdArrowDropDown />;

  return (
    <div>
      <div className="home main-container">
        <div
          className="home-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Link to={`/coin/${coin.id}`} className="thumb trending_info">
            <h3 className="coin_name">{coin.name}</h3>

            <div className="coin_image">
              <div
                className="img"
                style={{
                  backgroundImage: `url(${coin.large})`,
                  height: "40px",
                  width: "40px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </Link>

          <p className="market_cap">{coin.data.market_cap.toLocaleString()}</p>

          <p
            className={`percentage price_change ${
              priceChangeValue > 0 ? "green" : "red"
            }`}
          >
            {changeIcon}
            {priceChangeValue.toFixed(2)}%
          </p>
        </div>
      </div>

      <CoinsData />
    </div>
  );
};

export default Home;
