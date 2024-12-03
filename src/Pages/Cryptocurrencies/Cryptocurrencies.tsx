/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react"
import "./Cryptocurrencies.css"
import { CoinContext } from "../../Context/Context"
import { MdArrowDropDown, MdArrowDropUp, MdOutlineKeyboardArrowRight } from "react-icons/md"
import { Link } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Cryptocurrencies = () => {
  const { allCoin, currency, globalMarketData, trendingCoin, trendingNFTs } = useContext(CoinContext);

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

  return (
    <div className="cryptocurrencies">
      <div className="">
        <div className=" mx_50 ccs">
          <h4 className="header">Today's Cryptocurrency Prices by Market Cap</h4>
          <div className="full_text">
            <p className="text">The global crypto market cap <span className="bold">{currency.symbol}{formatNumber(globalMarketData?.data?.total_market_cap[currency.name], units)}</span>, a {
              globalMarketData?.data?.market_cap_change_percentage_24h_usd.toFixed(2) > 0 ? <span className="color center"> <MdArrowDropUp className="arrow-up" /> {globalMarketData?.data?.market_cap_change_percentage_24h_usd.toFixed(2)
              }</span> : <span className="red center"> <MdArrowDropDown className="arrow-down" /> {globalMarketData?.data?.market_cap_change_percentage_24h_usd.toFixed(2)
              }</span>
            } market cap change percentage over the last 24hrs. <span className="more">Read more</span></p>
          </div>
        </div>
        <div className="containers">
          <div className="container">
            <div className="">
              <div className="crypto-container">
                <div className="row">
                  <div className="col">
                    <h2>Trending Coins <MdOutlineKeyboardArrowRight /></h2>
                    <div className="coin-list">
                      {trendingCoin.slice(0, 5).map((coin: any, index: number) => (
                        <Link to={`/coin/${coin.item.id}`} className="coin-card" key={coin.id || index}>
                          <div className="coin-rank">{index + 1}.</div>
                          <div className="coin-info">
                            <img className="thumb" src={coin?.item?.thumb} alt={coin.name} />
                            <span className="name ellipses">{coin?.item?.name}</span>
                            <span className="symbol">{coin?.item?.symbol}</span>
                          </div>
                          <div className="coin-price">
                            <span className="price_price">${coin?.item?.data?.price.toFixed(2)}</span>
                            <span className={coin?.item?.data?.price_change_percentage_24h > 0 ? 'price-up' : 'price-down'}>
                              {coin?.item?.data?.price_change_percentage_24h[currency.name].toFixed(2)}%
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col">
                    <h2>Trending NFTs<MdOutlineKeyboardArrowRight /></h2>
                    <div className="coin-list">
                      {trendingNFTs.slice(0, 5).map((nft: any, index: number) => (
                        <Link to={`/nft/${nft.id}`} className="coin-card" key={nft.id || index}>
                          <div className="coin-rank">{index + 1}.</div>
                          <div className="coin-info">
                            <img className="thumb" src={nft?.thumb} alt={nft.name} />
                            <span className="name ellipses">{nft?.name}</span>
                            <span></span>
                            <span className="symbol">{nft?.symbol}</span>
                          </div>
                          <div className="coin-price">
                            <span className="price_price">${nft?.data?.floor_price}</span>
                            <span className={nft?.item?.data?.price_change_percentage_24h > 0 ? 'price-up' : 'price-down'}>
                              {nft?.floor_price_24h_percentage_change
                                .toFixed(2)}%
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="row four_containers">
                    <div className="col small_container">
                      <h2>Market Cap<MdOutlineKeyboardArrowRight /></h2>
                      <div className="coin-card blocked">
                        <p>{currency.symbol}{formatNumber(globalMarketData?.data?.total_market_cap[currency.name], units)}</p>
                        <p className={globalMarketData?.data?.market_cap_change_percentage_24h_usd > 0 ? "color_green" : "color_red"} >  {globalMarketData?.data?.market_cap_change_percentage_24h_usd > 0 ? <FaCaretUp /> : <FaCaretDown />} {globalMarketData?.data?.market_cap_change_percentage_24h_usd.toFixed(2)}%</p>
                      </div>
                    </div>
                    <div className="col small_container">
                      <h2>Volume <MdOutlineKeyboardArrowRight /></h2>
                      <div className="coin-card">
                        <p>{currency.symbol}{formatNumber(globalMarketData?.data?.total_volume[currency.name], units)}</p>
                      </div>
                    </div>
                    <div className="col small_container">
                      <h2>Dominance<MdOutlineKeyboardArrowRight /></h2>
                      <div>
                        <p>
                          {allCoin.slice(0, 2).map((coin: { id: any; image: string | undefined; symbol: string; }, index: number) => (
                            <div className="coin-card" key={coin.id || index}>
                              <div className="coin-rank">{index + 1}.</div>
                              <div className="coin-info">
                                <Link to={`/coin/${coin.id}`} className="thumb">
                                  <img className="thumb" src={coin?.image} alt="" />
                                </Link>
                                <p className="coin_count">{coin?.symbol.toUpperCase()}</p>
                              </div>
                            </div>
                          ))}
                        </p>
                      </div>
                    </div>
                    <div className="col small_container">
                      <h2>Notes<MdOutlineKeyboardArrowRight /></h2>
                      <div className="coin-card block">
                        <p>Active crypto- {globalMarketData?.data?.active_cryptocurrencies}</p>
                        <p>Ongoing Icos - {globalMarketData?.data?.ongoing_icos}</p>
                        <p>Ended Icos - {globalMarketData?.data?.ended_icos} </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Name</p>
          <p>Price</p>
          <p className="_24hr" style={{ textAlign: "center" }}>24h %</p>
          <p className="market-cap">Market Cap</p>
          <p className="circulating_suppply">Circulating Supply</p>
        </div>
        {allCoin.slice(0, 100).map((item: any, index: number) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p className="rank">{item.market_cap_rank}</p>
            <div>
              <img className="image" src={item.image} alt={item.name} />
              <p className="name">{`${item.name}`}</p>
              <p className="name name_symbol">- {item.symbol.toUpperCase()}</p>
            </div>
            <p className="price">
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
              {item.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className="market-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
            <div className="circulating-supply">
              <p className="cir_sup">
                {item.circulating_supply.toLocaleString()} {item.symbol.toUpperCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Cryptocurrencies
