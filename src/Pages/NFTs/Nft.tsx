/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Nft.css";
import { CoinContext } from "../../Context/Context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Nft = () => {
  const { trendingNFTs, currency } = useContext(CoinContext);

  return (
    <div className="nft">
      <div className="mx_70 ccs">
        <h4 className="header">Highest Price NFT Stats</h4>
        <p className="text">
          Listed below are the stats for NFT collections and individual assets
          that have sold for the highest prices. We list the data in descending
          order. Data can be reordered by clicking on the column title. Only
          collections with a transaction in the last 30 days are included.
        </p>
      </div>

      <div className="row">
        <div className="col">
          <h2>
            Trending NFTs
            <MdOutlineKeyboardArrowRight />
          </h2>
          <div className="coin-list">
            {trendingNFTs.slice(0, 5).map((nft: any, index: number) => (
              <Link
                to={`/nft/${nft.id}`}
                className="coin-card"
                key={nft.id || index}
              >
                <div className="coin-rank">{index + 1}.</div>
                <div className="coin-info">
                  <img className="thumb" src={nft?.thumb} alt={nft.name} />
                  <span className="name">{nft?.name}</span>
                </div>
                <div className="coin-price">
                  <span className="price_price">${nft?.data?.floor_price}</span>
                  <span
                    className={
                      nft?.item?.data?.price_change_percentage_24h > 0
                        ? "price-up"
                        : "price-down"
                    }
                  >
                    {nft?.floor_price_24h_percentage_change.toFixed(2)}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="nft-list">
        <h3 className="">NFT List</h3>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Name</p>
          <p>Price</p>
          <p className="_24hr none" style={{ textAlign: "center" }}>
            24h %
          </p>
          <p className="market-cap" style={{ fontWeight: "bold" }}>
            Volume
          </p>
          <p className="avg_price">Avg. price</p>
        </div>
        {trendingNFTs.slice(0, 7).map((item: any, index: number) => (
          <Link
            to={`/nft/${item.id}`}
            className="table-layout nft_table_layout"
            key={index}
          >
            <p>{index + 1}</p>
            <div className="names">
              <img className="image" src={item?.thumb} alt={item?.name} />

              {/* The ellipsis will happen here */}
              <p className="name namess">{item?.name}</p>
            </div>
            <p className="price">
              {currency.symbol}
              {item?.data?.floor_price.toLocaleString()}
            </p>
            <p
              className={
                item?.data?.floor_price_in_usd_24h_percentage_change > 0
                  ? "green"
                  : "red"
              }
            >
              {parseFloat(
                item?.data?.floor_price_in_usd_24h_percentage_change,
              )?.toFixed(2)}
              %
            </p>
            <p className="market-cap">
              {currency.symbol}
              {item?.data?.h24_volume}
            </p>
            <div className="circulating-supply">
              <p className="cir_sup">
                {currency.symbol}
                {item?.data?.h24_average_sale_price} {item.symbol.toUpperCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Nft;
