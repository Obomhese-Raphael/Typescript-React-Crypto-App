/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom"
import "./Exchange.css"
import { CiBank } from "react-icons/ci"
import { PiCoinsFill } from "react-icons/pi"
import { FaChartLine } from "react-icons/fa6"
import { FaLink } from "react-icons/fa";
import { FaUnlink } from "react-icons/fa";
import { BsDatabaseFillCheck, BsDatabaseFillX } from "react-icons/bs";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useContext } from "react"
import { CoinContext } from "../../../Context/Context"

const Exchange = () => {
  const { exchangeList } = useContext(CoinContext);
  return (
    <div className="exchange">   
      <div className="top"> 
        <h2>Top Crypto Exchanges Ranked by Trust Score</h2>
        <p>As of today, we track 216 crypto exchanges with a total 24h trading volume of $347 Billion, a -29.25% change in the last 24 hours. Currently, the 3 largest cryptocurrency exchanges are Binance, Coinbase Exchange, and Bybit. Total tracked crypto exchange reserves currently stands at $241 Billion.</p>
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
      <div className="list-container">
        <div className="crypto-table">
          <div className="table-layouts">
            <p>#</p> 
            <p>Exchange</p>
            <div className="trust_score">
              <p className="_score">Trust Score <AiFillExclamationCircle /></p>
            </div>
            <p className="_24hr _24vol">24h Volume</p>
            <p className="monthly-visits">Monthly Visits</p>
            <p className="country_hdd">Country</p>
            <p className="link linked">Link</p>
          </div>
          {exchangeList.slice(0, 100).map((item: any, index: number) => (
            <div className="table-layouts table_info" key={index}>
              <p className="rank index">{index + 1}</p>
              <Link className="pic_name ellipses" to={`/exchanges/${item.id}`}>
                <img className="image" src={item.image} alt={item.name} />
                <p className="name">{`${item.name}`}</p>
                <span className={item.has_trading_incentive === true ? "" : "green"}>
                  {item.has_trading_incentive
                    ? <BsDatabaseFillCheck /> : <BsDatabaseFillX />}
                </span>
              </Link>
              <div className="price trust-score">
                <p>{item.trust_score} / 10</p>
              </div>
              <p className="volume_24">
                {item.trade_volume_24h_btc.toLocaleString()}
              </p>
              <p className="monthly_visits">
                {item.trade_volume_24h_btc_normalized
                  .toLocaleString()}
              </p>
              <div className="country">
                <p className="country_text">
                  {item.country ? item.country : "Not Found"}
                </p>
              </div>
              <div className="link_icon">
                <Link className="link_url" to={item.url}>
                  {item.url ? <FaLink /> : <FaUnlink />}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Exchange