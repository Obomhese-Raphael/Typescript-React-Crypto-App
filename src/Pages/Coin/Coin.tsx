/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../Context/Context";
import { useParams, Link } from "react-router-dom";
import "./Coin.css";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { CiStar, CiShare2, CiGlobe } from "react-icons/ci";
import { FaStar, FaRedditAlien, FaGithub } from "react-icons/fa";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { RxCaretDown } from "react-icons/rx";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { IoMdPaper } from "react-icons/io";
import { LiaStarSolid, LiaStarHalfAltSolid } from "react-icons/lia";
import { MdErrorOutline } from "react-icons/md";
import { ImLink } from "react-icons/im";
import { MinimalSpinner } from "../../Components/Spinner/Spinner";

interface CoinParams {
  coinId: string;
  [key: string]: string | undefined;
}

const Coin = () => {
  const { coinId } = useParams<CoinParams>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { currency } = useContext(CoinContext);
  const [coinResponse, setCoinResponse] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [timeRange, setTimeRange] = useState<"1d" | "7d" | "1m" | "1y" | "all">(
    "1d",
  );
  const [periodChange, setPeriodChange] = useState<number>(0);
  const [periodLoading, setPeriodLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchCoinData = async () => {
    if (!coinId) {
      console.error("CoinId is required");
      return;
    }
    setLoading(true);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apiKey,
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => {
        setCoinResponse(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        console.error("Error in Coin response: ", err);
      });
  };

  const fetchHistoricalData = async (range: typeof timeRange) => {
    if (!coinId) return;

    setPeriodLoading(true);

    let days: number | string;
    switch (range) {
      case "1d":
        days = 1;
        break;
      case "7d":
        days = 7;
        break;
      case "1m":
        days = 30;
        break;
      case "1y":
        days = 365;
        break;
      case "all":
        days = "max";
        break; // 'max' is a special value
      default:
        days = 1;
    }

    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=${days}&interval=daily`;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": apiKey,
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      // Calculate % change from first to last price
      if (data.prices?.length >= 2) {
        const startPrice = data.prices[0][1];
        const endPrice = data.prices[data.prices.length - 1][1];
        const change = ((endPrice - startPrice) / startPrice) * 100;
        setPeriodChange(change);
      }
    } catch (err: any) {
      console.error("Historical fetch failed:", err);
      setPeriodChange(0); // fallback
    } finally {
      setPeriodLoading(false);
    }
  };

  const icons = [
    <LiaStarSolid key="star1" />,
    <LiaStarSolid key="star2" />,
    <LiaStarSolid key="star3" />,
    <LiaStarSolid key="star4" />,
    <LiaStarHalfAltSolid key="star5" />,
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const units = [
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "K" },
  ];

  function formatNumber(
    number: number,
    units: { value: number; symbol: string }[],
  ) {
    for (const unit of units) {
      if (number >= unit.value) {
        return (number / unit.value).toFixed(1) + unit.symbol;
      }
    }

    return number;
  }

  useEffect(() => {
    fetchCoinData();
  }, [coinId]);

  useEffect(() => {
    if (coinResponse) {
      // only fetch history after basic data is loaded
      fetchHistoricalData(timeRange);
    }
  }, [timeRange, coinId, currency.name, coinResponse]);

  if (error) {
    console.log("Error found", error);
  }

  return (
    <div className="coin">
      {loading ? (
        <MinimalSpinner />
      ) : error ? (
        <p>Error Loading Coin: {error}</p>
      ) : (
        <div className="container">
          <div className="top-container">
            <div className="left-container">
              <div className="coin-name">
                <div className="name">
                  <img src={coinResponse?.image?.thumb} alt="" />
                  <p>{coinResponse?.name}</p>
                </div>
                <p className="small_name">
                  {coinResponse?.symbol?.toUpperCase()}
                </p>
                <p className="small_rank">#{coinResponse?.market_cap_rank}</p>
                <br />
              </div>
              <div className="amount">
                <div className="inner_amount">
                  <p className="amount_price">
                    {currency.symbol}
                    {coinResponse?.market_data?.current_price[
                      currency.name
                    ].toLocaleString()}
                  </p>
                  <p
                    className={`percentage_change ${periodChange > 0 ? "green" : "red"}`}
                  >
                    {periodLoading ? (
                      <span className="text-sm">Updating...</span>
                    ) : (
                      <>
                        {periodChange > 0 ? (
                          <MdArrowDropUp />
                        ) : (
                          <MdArrowDropDown />
                        )}
                        {Math.abs(periodChange).toFixed(2)}% (
                        {timeRange.toUpperCase()})
                      </>
                    )}
                  </p>
                </div>
                <div className="choice">
                  <button
                    className={timeRange === "1d" ? "active" : ""}
                    onClick={() => setTimeRange("1d")}
                  >
                    1D
                  </button>
                  <button
                    className={timeRange === "7d" ? "active" : ""}
                    onClick={() => setTimeRange("7d")}
                  >
                    7D
                  </button>
                  <button
                    className={timeRange === "1m" ? "active" : ""}
                    onClick={() => setTimeRange("1m")}
                  >
                    1M
                  </button>
                  <button
                    className={timeRange === "1y" ? "active" : ""}
                    onClick={() => setTimeRange("1y")}
                  >
                    1Y
                  </button>
                  <button
                    className={timeRange === "all" ? "active" : ""}
                    onClick={() => setTimeRange("all")}
                  >
                    All
                  </button>
                </div>
              </div>
            </div>

            <div className="right-container">
              <div className="container">
                <div className="star" onClick={handleLike}>
                  {isLiked ? (
                    <FaStar className="full-star" />
                  ) : (
                    <CiStar className="empty-star" />
                  )}
                  5M
                </div>
                <div className="share">
                  <CiShare2 />
                </div>
              </div>
            </div>
          </div>
          <div className="hr">
            <hr />
          </div>
          <div className="top-container website">
            <div className="left-container mini-containers">
              <div className="bitcoin-stats-container">
                <div className="stat-section mini-stat">
                  <p className="hd_1">Market Cap</p>
                  <div className="flex">
                    <p>
                      {[currency.symbol]}
                      {formatNumber(
                        coinResponse?.market_data?.market_cap[currency.name],
                        units,
                      )}
                    </p>
                    <p className="change">
                      {coinResponse.market_data
                        .price_change_percentage_24h_in_currency[
                        currency.name
                      ] > 0 ? (
                        <p className="green rate change">
                          <MdArrowDropUp />{" "}
                          {coinResponse.market_data.price_change_percentage_24h_in_currency[
                            currency.name
                          ].toFixed(2)}
                          %
                        </p>
                      ) : (
                        <p className="red rate change">
                          <MdArrowDropDown />{" "}
                          {coinResponse.market_data.price_change_percentage_24h_in_currency[
                            currency.name
                          ].toFixed(2)}
                          %
                        </p>
                      )}
                    </p>
                  </div>
                </div>
                <div className="stat-section">
                  <p className="hd">Total Volume</p>
                  <p>
                    {[currency.symbol]}
                    {formatNumber(
                      coinResponse?.market_data?.total_volume[currency.name],
                      units,
                    )}
                  </p>
                </div>
                <div className="stat-section">
                  <p className="hd">FDV</p>
                  <p>
                    {[currency.symbol]}
                    {formatNumber(
                      coinResponse?.market_data?.fully_diluted_valuation[
                        currency.name
                      ],
                      units,
                    )}
                  </p>
                </div>
                <div className="stat-section">
                  <p className="hd">Low 24h</p>
                  <p>
                    {[currency.symbol]}
                    {coinResponse?.market_data?.low_24h[
                      currency.name
                    ].toLocaleString()}
                  </p>
                </div>
                <div className="stat-section">
                  <p className="hd">Total Supply</p>
                  <p>
                    {formatNumber(
                      coinResponse?.market_data?.total_supply,
                      units,
                    )}{" "}
                    {coinResponse?.symbol.toUpperCase()}
                  </p>
                </div>
                <div className="stat-section">
                  <p className="hd">Max Supply</p>
                  {
                    <p>
                      {formatNumber(
                        coinResponse?.market_data?.max_supply,
                        units,
                      )}{" "}
                      {coinResponse?.symbol.toUpperCase()}
                    </p>
                  }
                </div>
              </div>
            </div>
            <div className="right-container">
              <div className="mini-right-container">
                <div className="info-wrapper">
                  <div className="base">
                    <div className="label">
                      <div className="display">
                        <div className="content">Website</div>
                      </div>
                    </div>
                    <div className="value">
                      <div className="more_base">
                        <div>
                          <div className="links">
                            <Link to={coinResponse?.links?.homepage[0]}>
                              Website <CiGlobe />
                            </Link>
                            <Link
                              to={coinResponse?.links?.repos_url?.whitepaper}
                            >
                              Whitepaper <IoMdPaper />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="base">
                    <div className="label">
                      <div className="display">
                        <div className="content">Socials</div>
                      </div>
                    </div>
                    <div className="value">
                      <div className="more_base">
                        <div>
                          <div className="links">
                            <Link to={coinResponse?.links?.subreddit_url}>
                              <FaRedditAlien />
                            </Link>
                            <Link
                              to={coinResponse?.links?.repos_url?.github[0]}
                            >
                              <FaGithub />
                            </Link>
                            <Link to={coinResponse?.links?.homepage[0]}>
                              <ImLink />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="base">
                    <div className="label">
                      <div className="display">
                        <div className="content">Rating</div>
                      </div>
                    </div>
                    <div className="value">
                      <div className="more_base">
                        <div>
                          <div className="links links_star">
                            <a className="icons_star" href="">
                              4.6
                              {icons.map((icon, index) => (
                                <span className="icons_span" key={index}>
                                  {icon}
                                </span>
                              ))}
                              <MdErrorOutline />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="base">
                    <div className="label">
                      <div className="display">
                        <div className="content">Explorers</div>
                      </div>
                    </div>
                    <div className="value">
                      <div className="more_base">
                        <div>
                          <div className="links">
                            <Link to={coinResponse?.links?.blockchain_site[0]}>
                              blockchain.info
                            </Link>
                            <a href="">
                              <RxCaretDown />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="base">
                    <div className="label">
                      <div className="display">
                        <div className="content">Wallets</div>
                      </div>
                    </div>
                    <div className="value">
                      <div className="more_base">
                        <div>
                          <div className="links">
                            <a href="">Ledger</a>
                            <a href="">
                              <RxCaretDown />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="stat-section cir_supply">
            <p className="flex">
              Circulating Supply <HiMiniCheckBadge className="icon" />
            </p>
            <div className="circle flex">
              <p className="flex">
                {formatNumber(
                  coinResponse?.market_data?.circulating_supply,
                  units,
                )}{" "}
                {coinResponse?.symbol.toUpperCase()}
                <MdRadioButtonUnchecked className="icon" />
              </p>
            </div>
          </div>
          <hr className="hr" />
          <div className="coins_market">
            <div className="market">
              <img src={coinResponse?.image.thumb} alt={coinResponse?.name} />
              <p className="heading">{coinResponse.name} Market</p>
            </div>
            <div className="crypto-table">
              <div className="table-layout">
                <p>#</p>
                <p>Exchange</p>
                <p className="centered">Pair</p>
                <p>Price</p>
                <p className="center">Volume</p>
              </div>
              {coinResponse?.tickers
                ?.slice(0, 10)
                .map((item: any, index: number) => (
                  <Link to={`/exchanges/${item?.market?.identifier}`}>
                    <div className="table-layout">
                      <p>{index + 1}</p>
                      <Link to={item.trade_url}>{item?.market?.name}</Link>
                      <p className="target ellipses">
                        {item.base}/{item?.target}
                      </p>
                      <p>${item.last.toLocaleString()}</p>
                      <p style={{ textAlign: "center" }}>
                        {item?.volume.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coin;
