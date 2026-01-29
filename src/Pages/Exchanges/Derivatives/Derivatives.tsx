/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import "./Derivatives.css"
import { CiBank } from "react-icons/ci";
import { PiCoinsFill } from "react-icons/pi";
import { FaChartLine, FaLink } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Derivatives = () => {
  const [derivativeList, setDerivativeList] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const fetchDerivativesListWithData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apiKey,
      },
    };

    fetch("https://api.coingecko.com/api/v3/derivatives/exchanges", options)
      .then((response) => response.json())
      .then((response) => {
        setDerivativeList(response);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => { 
    fetchDerivativesListWithData();
  }, []);
  return (
    <div className="derivative">
      <div className="top">
        <h2>Top Derivative Exchanges Ranked by Open Interest & Trade Volume</h2>
        <p>The total derivatives volume is $741 Billion, a -27.09% change in the last 24 hours. We track 107 crypto derivative exchanges with Binance (Futures), Bybit (Futures), and CoinW (Futures) in the top 3 rankings.</p>
      </div>
      <div className="exchange_change">
        <div className="containers">
          <Link to={`/crypto_exchanges`} className="container">
            <div > <CiBank /> Crypto Exchanges</div>
          </Link>
          <Link to={`/decentralized_exchanges`} className="container">
            <div ><PiCoinsFill /> Decentralized Exchanges</div>
          </Link>
          <Link to={`/derivatives`} className="container">
            <div ><FaChartLine /> Derivatives</div>
          </Link>
        </div>
      </div>
      <div className="derivative-container">
        <div className="crypto-table">
          <div className="table-layouts">
            <p>#</p>
            <p className="exchange">Exchange</p>
            <p className="pairs">F-Pairs / P-Pairs</p>
            <p className="open_interest">Open Interest(BTC)</p>
            <p className="trade_volume">Trade Volume(BTC)</p>
            <p className="links_icons">Link</p>
            <p className="year_est">Year Established</p>
          </div>
          {derivativeList.slice(0, 50).map((item: any, index: number) => (
            <div className="table-layouts table-info" key={index}>
              <p>{index + 1}</p>
              <Link className="pic_name" to={`/derivatives/${item.id}`}>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
              </Link>
              <p className="pairs">{item.number_of_futures_pairs} / {item.number_of_perpetual_pairs}</p>
              <p className="open_interest">{item.open_interest_btc.toLocaleString()}</p>
              <p className="trade_volume">{parseFloat(item.trade_volume_24h_btc).toLocaleString()}</p>
              <a className="link_img links_icons" href={item.url} target="_blank" rel="noopener noreferrer">
                <FaLink />
              </a>
              <p className="year_est">{item.year_established}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Derivatives