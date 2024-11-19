/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link, useNavigate } from 'react-router-dom';
import "./ExchangeData.css"
import { MdKeyboardArrowRight } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { CoinContext } from '../../Context/Context';
import { FaLinkedin, FaReddit, FaRegCircle, FaTelegram } from 'react-icons/fa6';
import { FaLink } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { CiGlobe } from 'react-icons/ci';

interface Exchange {
  id: string;
  name: string;
  image: string;
  centralized: boolean;
  description: string;
  url: string;
  trade_volume_24h_btc_normalized: number;
  trust_score: number;
  tickers?: Ticker[]; 
  facebook_url?: string;
  telegram_url?: string;
  reddit_url?: string;
  other_url_1?: string;
  address?: string;
  year_established?: number;
  country?: string;
  trust_score_rank?: number;
}

interface Ticker {
  name: string,
  coin_id: string;
  base: string;
  target: string;
  last: number;
  volume: number;
  trust_score: string;
  converted_volume: {
    usd: number;
  };
  bid_ask_spread_percentage?: number;
  trade_url?: string;
}

interface ExchangeTickersResponse {
  tickers: Ticker[];
}

const ExchangeData = () => {
  const navigate = useNavigate();
  const { exchangesId } = useParams();
  const { currency, allCoin } = useContext(CoinContext)
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(null);
  const [selectedExchangeTickers, setSelectedExchangeTickers] = useState<ExchangeTickersResponse | null>(null);
  const [showMore, setShowMore] = useState(50);
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleShowMore = () => {
    setShowMore(prevShowMore => prevShowMore + 20);
  }
  const handleShowLess = () => {
    setShowMore(prevShowMore => prevShowMore - 20);
  }
  const getExchangeDataById = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apiKey,
      },
    };

    fetch(`https://api.coingecko.com/api/v3/exchanges/${exchangesId}`, options)
      .then(res => res.json())
      .then(res => {
        console.log("Exchange Data", res);
        setSelectedExchange(res);
      })
      .catch(err => console.error(err));
  }

  const getExchangeDataTickers = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apiKey,
      },
    };

    fetch(`https://api.coingecko.com/api/v3/exchanges/${exchangesId}/tickers`, options)
      .then(res => res.json())
      .then(res => {
        console.log("Exchange Tickers", res);
        setSelectedExchangeTickers(res);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getExchangeDataById();
    getExchangeDataTickers();
  }, [exchangesId])
  return (
    <div className="exchange-data">
      <div className="mini-exchange">
        <div className="stages">
          <div className="stage">
            <p onClick={() => navigate("/cryptocurrencies")}>Cryptocurrencies</p>  <MdKeyboardArrowRight />
          </div>
          <div className="stage">
            <p onClick={() => navigate("/crypto_exchanges")}> Exchanges </p> <MdKeyboardArrowRight />
          </div>
          <div className="stage">
            <p className="name">{selectedExchange?.name}</p>
          </div>
        </div>
        <div className="name-info">
          <div className="name">
            <img src={selectedExchange?.image} alt="" />
            <h2>{selectedExchange?.name}</h2>
            <p className="centralized">{selectedExchange?.centralized ? "Centralized Exchange" : ""}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>24h Trading Volume</p>
            <h3>{currency.symbol}{selectedExchange?.tickers?.[0]?.converted_volume?.usd.toLocaleString()} - BTC</h3>
          </div>
          <div className="col">
            <p>Volume Normalized</p>
            <h3>{(selectedExchange?.trade_volume_24h_btc_normalized || 0).toLocaleString()} - BTC</h3>
          </div>
          <div className="col">
            <p>Trust Score</p>
            <h3 className='score'>{selectedExchange?.trust_score} / 10</h3>
          </div>
        </div>
        <div className="spot-market">
          <div className="heads">
            <div className="h3">SPOT MARKET</div>
          </div>
          <div className="crypto-table">
            <div className="table-layouts">
              <p>#</p>
              <p className="exchange_p">Exchange</p>
              <p className="pair_p">Pair </p>
              <p className="price_p">Price</p>
              <p className="spread_p">Spread</p>
              <p className="_24hr_p">24h Volume</p>
              <p className="volume_p">Volume</p>
              <p className="trust_p">Trust Score</p>
            </div>
            {selectedExchangeTickers?.tickers?.slice(0, showMore).map((item: any, index: number) => (
              <div className="table-layouts table_info" key={index}>
                <p className="rank">{index + 1}</p>
                <Link className="pic_name" to={`/coin/${item?.coin_id}`}>
                  <p className="name">
                    {item.coin_id.toUpperCase()}
                  </p>
                  <p>
                    {
                      allCoin?.id === item.tickers?.coin_id && allCoin.image ? (
                        <img src={allCoin.image} alt={`Coin image for ${item.coin_id}`} />
                      ) : (
                        <span></span>
                      )
                    }
                  </p>
                </Link>

                <Link to={item?.trade_url} className='pair-link'>
                  <p>{item?.base} / {item?.target}</p>
                  <p className='link'><FaLink /></p>
                </Link>
                <p className='spread_p'>{currency.symbol}{item.last.toLocaleString()}</p><p>{
                  (item.bid_ask_spread_percentage || 0).toFixed(2)
                }%</p>
                <p className='volume_p'>{item?.converted_volume?.usd.toLocaleString()}</p>
                <p className='volume_p'>{item.volume.toLocaleString()}</p>
                <p className={item.trust_score === "green" ? "trust_p green_full" : "trust_p yellow_full"}>{item.trust_score === "green" ? <FaRegCircle /> : <FaRegCircle />}</p>
              </div>
            ))}
          </div>
          <div className="show-more">
            <div className='show_more'>
              {showMore < 100 && (
                <button onClick={handleShowMore}>Show More</button>
              )}
              {showMore > 99 && (
                <button onClick={handleShowLess}>Show Less</button>
              )}
            </div>
          </div>
          <div className="exchange-info">
            <div className="top-info">
              <h3>What is {selectedExchange?.name}?</h3>
              <p>{selectedExchange?.description}</p>
            </div>
            <hr />
            <div className="middle-info">
              <div className="sites">
                <div className="site">
                  <h3>Website</h3>
                  <div className="inner-site">
                    <a href={selectedExchange?.url}><CiGlobe /> Website </a>
                  </div>
                </div>
                <hr />
                <div className="site">
                  <h3>Community</h3>
                  <div className="inner-site">
                    <a href={selectedExchange?.facebook_url}><FaFacebook />Facebook</a>
                    <a href={selectedExchange?.telegram_url}><FaTelegram />Telegram</a>
                    <a href={selectedExchange?.reddit_url} target="_blank" rel="noopener noreferrer"><FaReddit />Reddit</a>
                    <a className='none' href={selectedExchange?.other_url_1} target="_blank" rel="noopener noreferrer"><FaLinkedin />LinkedIn</a>
                  </div>
                </div>
                <hr />
                <div className="site">
                  <h3>Address</h3>
                  <div className="inner-site">
                    <p>{selectedExchange?.address || "-"}</p>
                  </div>
                </div>
                <hr />
                <div className="site">
                  <h3>Year Established</h3>
                  <div className="inner-site">
                    <p>{selectedExchange?.year_established || "-"}</p>
                  </div>
                </div>
                <hr />
                <div className="site">
                  <h3>Rank</h3>
                  <div className="inner-site">
                    <p>{selectedExchange?.
                      trust_score_rank || "-"}</p>
                  </div>
                </div>
                <hr />
                <div className="site">
                  <h3>Incoporation Country Code</h3>
                  <div className="inner-site">
                    <p>{selectedExchange?.country || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExchangeData