/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react"
import { CoinContext } from "../../Context/Context"
import { useParams, Link } from 'react-router-dom';
import "./Coin.css"
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
import { CiStar, CiShare2, CiGlobe } from "react-icons/ci";
import { FaStar, FaRedditAlien, FaGithub } from "react-icons/fa";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { RxCaretDown } from "react-icons/rx";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { IoMdPaper } from "react-icons/io";
import { LiaStarSolid, LiaStarHalfAltSolid } from "react-icons/lia";
import { MdErrorOutline } from "react-icons/md";
import { ImLink } from "react-icons/im";

const Coin = () => {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);
  const [coinResponse, setCoinResponse] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchCoinData = async () => {
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
        console.log("Coin response: ", response);
      })
      .catch((err) => console.error(err));
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
  }

  const units = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];

  function formatNumber(number: number, units: { value: number; symbol: string }[]) {
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

  if ((coinResponse)) {
    return (
      <div className="coin">
        <div className="container">
          <div className="top-container">
            <div className="left-container">
              <div className="coin-name">
                <div className="name">
                  <img src={coinResponse?.image?.thumb} alt="" />
                  <p>{coinResponse?.name}</p>
                </div>
                <p className="small_name">{coinResponse?.symbol?.toUpperCase()}</p>
                <p className="small_rank">#{coinResponse?.market_cap_rank}</p>
                <br />
              </div>
              <div className="amount">
                <div className="inner_amount">
                  <p className="amount_price">{currency.symbol}{coinResponse?.market_data?.current_price[currency.name].toLocaleString()}</p>
                  <p>
                    {
                      coinResponse?.market_data.price_change_percentage_24h_in_currency[currency.name] > 0
                        ? <p className="green rate"><MdArrowDropUp /> {coinResponse?.market_data?.                        price_change_24h.toFixed(4)

                        }% (1d)</p>
                        : <p className="red rate"><MdArrowDropDown /> {coinResponse.market_data?.
                          price_change_24h.toFixed(4)
                        }% (1d)</p>
                    }
                  </p>
                </div>
                <div className="choice">
                  <button>1D</button>
                  <button>7D</button>
                  <button>1M</button>
                  <button>1Y</button>
                  <button>All</button>
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
                <div className="stat-section">
                  <p>Market Cap</p>
                  <div className="flex">
                    <p>{[currency.symbol]}{formatNumber(coinResponse?.market_data?.market_cap[currency.name], units)}</p>
                    <p className="change">
                      {
                        coinResponse.market_data.price_change_percentage_24h_in_currency[currency.name] > 0
                          ? <p className="green rate change"><MdArrowDropUp /> {coinResponse.market_data.
                            price_change_percentage_24h_in_currency[currency.name].toFixed(2)
                          }%</p>
                          : <p className="red rate change"><MdArrowDropDown /> {coinResponse.market_data.
                            price_change_percentage_24h_in_currency[currency.name].toFixed(2)
                          }%</p>
                      }
                    </p>
                  </div>
                </div>
                <div className="stat-section">
                  <p>Total Volume</p>
                  <p>{[currency.symbol]}{formatNumber(coinResponse?.market_data?.total_volume[currency.name], units)}</p>
                </div>
                <div className="stat-section">
                  <p>FDV</p>
                  <p>{[currency.symbol]}{formatNumber(coinResponse?.market_data?.fully_diluted_valuation[currency.name], units)}</p>
                </div>
                <div className="stat-section">
                  <p>Low 24h</p>
                  <p>{[currency.symbol]}{coinResponse?.market_data?.low_24h[currency.name].toLocaleString()}</p>
                </div>
                <div className="stat-section">
                  <p>Total Supply</p>
                  <p>{formatNumber(coinResponse?.market_data?.total_supply, units)} {coinResponse?.symbol.toUpperCase()}</p>
                </div>
                <div className="stat-section">
                  <p>Max Supply</p>
                  {
                    <p>{formatNumber(coinResponse?.market_data?.max_supply, units)} {coinResponse?.symbol.toUpperCase()}</p>
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
                        <div className="content">
                          Website
                        </div>
                      </div>
                    </div>
                    <div className="value">
                      <div className="more_base">
                        <div>
                          <div className="links">
                            <Link to={coinResponse?.links?.homepage[0]}>Website <CiGlobe /></Link>
                            <Link to={coinResponse?.links?.repos_url?.whitepaper}>Whitepaper <IoMdPaper /></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="base">
                    <div className="label">
                      <div className="display">
                        <div className="content">
                          Socials
                        </div>
                      </div>
                    </div>
                    <div className="value">
                      <div className="more_base">
                        <div>
                          <div className="links">
                            <Link to={coinResponse?.links?.subreddit_url}><FaRedditAlien /></Link>
                            <Link to={coinResponse?.links?.repos_url?.github[0]}><FaGithub /></Link>
                            <Link to={coinResponse?.links?.homepage[0]}><ImLink /></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="base">
                    <div className="label">
                      <div className="display">
                        <div className="content">
                          Rating
                        </div>
                      </div>
                    </div>
                    <div className="value">
                      <div className="more_base">
                        <div>
                          <div className="links links_star">
                            <a className="icons_star" href="">4.6
                              {icons.map((icon, index) => (
                                <span className="icons_span" key={index}>{icon}</span>
                              ))}

                              <MdErrorOutline /></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="base">
                    <div className="label">
                      <div className="display">
                        <div className="content">
                          Explorers
                        </div>
                      </div>
                    </div>
                    <div className="value">
                      <div className="more_base">
                        <div>
                          <div className="links">
                            <Link to={coinResponse?.links?.blockchain_site[0]}>blockchain.info</Link>
                            <a href=""><RxCaretDown /></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="base">
                    <div className="label">
                      <div className="display">
                        <div className="content">
                          Wallets
                        </div>
                      </div>
                    </div>
                    <div className="value">
                      <div className="more_base">
                        <div>
                          <div className="links">
                            <a href="">Ledger</a>
                            <a href=""><RxCaretDown /></a>
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
            <p className="flex">Circulating Supply <HiMiniCheckBadge className="icon" /></p>
            <div className="circle flex">
              <p className="flex">
                {formatNumber(coinResponse?.market_data?.circulating_supply, units)} {coinResponse?.symbol.toUpperCase()}
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
              {coinResponse?.tickers?.slice(0, 10).map((item: any, index: number) => (
                <Link to={`/exchanges/${item?.market?.identifier}`}>
                  <div className="table-layout">
                    <p>{index + 1}</p>
                    <Link to={item.trade_url}>{item?.market?.name}</Link>
                    <p className="target ellipses">{item.base}/{item?.target}</p>
                    <p>${item.last.toLocaleString()}</p>
                    <p style={{ textAlign: "center" }}>
                      ${item?.volume.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="loading">
        <h1 className="text">Loading...</h1>
      </div>
    )
  }
}

export default Coin

