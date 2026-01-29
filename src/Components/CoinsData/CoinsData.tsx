/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import "./CoinsData.css";
import { CoinContext } from "../../Context/Context";
import { Link } from "react-router-dom";
import ICoin from "../../Interface/ICoin";

const CoinsData = () => {
    const { allCoin, currency } = useContext(CoinContext);
    const [input, setInput] = useState<string>("");
    const [displayedCoin, setDisplayedCoin] = useState<ICoin[]>(allCoin);

    const handleInputChange = (e: any) => {
        const value = e.target.value;
        setInput(value);
        if (value === "") {
            setDisplayedCoin(allCoin);
        }
    };

    const handleSearch = (e: any) => {
        e.preventDefault();
        const filteredCoins = allCoin.filter((coin: any) => {
            return (
                coin?.name?.toLowerCase().includes(input.toLowerCase()) ||
                coin?.id?.toLowerCase().includes(input.toLowerCase())
            );
        }
        );
        setDisplayedCoin(filteredCoins);
        setInput("");
    };

    useEffect(() => {
        setDisplayedCoin(allCoin);
        setInput("");
    }, [allCoin]);

    return (
        <div className="coins-data">
            <div className="heading">
                <h3>
                    Welcome to the Premier Cryptocurrency Marketplace. <br />
                    Join us today to explore a vast array of cryptocurrencies and enhance your understanding of the market.
                </h3>
            </div>
            <div className="hero">
                <form onSubmit={handleSearch} className="form">
                    <input
                        type="text"
                        placeholder="Search cryptocurrencies..."
                        list="coinist"
                        onChange={handleInputChange}
                        value={input}
                        required
                        className="input"
                    />
                    <datalist id="coinist">
                        {allCoin.map((coin: any) => (
                            <option key={coin.id} value={coin.symbol || coin.name} />
                        ))}
                    </datalist>
                </form>
            </div>
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Name</p>
                    <p>Price</p>
                    <p style={{ textAlign: "center" }}>24h %</p>
                    <p className="market-cap">Market Cap</p>
                    <p className="circulating_suppply">Circulating Supply</p>
                </div>
                {displayedCoin.slice(0, 10).map((item: any, index: number) => (
                    <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                        <p className="rank">{item.market_cap_rank}</p>
                        <div className="home_info">
                            <img className="image small_image" src={item.image} alt={item.name} />
                            <p className="name">{`${item.name}`}</p>
                            <p className="name name_symbol">- {item.symbol.toUpperCase()}</p>
                        </div>
                        <p className="price">
                            {currency.symbol} {item.current_price.toLocaleString()}
                        </p>
                        <div className="per_change">
                            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>{item.price_change_percentage_24h.toFixed(2)}%</p>
                        </div>
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
    );
};

export default CoinsData;
