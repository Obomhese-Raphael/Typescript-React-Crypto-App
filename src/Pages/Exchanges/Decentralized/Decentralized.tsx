/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./Decentralized.css";

// Define interface for the API response
interface DecentralizedDataResponse {
  data: {
    trading_volume_24h: string;
    defi_market_cap: string;
    top_coin_name: string;
    defi_dominance: string | number;
  };
}

const Decentralized = () => {
  const [coins, setCoins] = useState<string[]>(["bitcoin"]);
  const [currencies, setCurrencies] = useState<string[]>(['ngn']);
  const [conversionRates, setConversionRates] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const [decentralizedData, setDecentralizedData] = useState<DecentralizedDataResponse | null>(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchCoinPrices = async () => {
    setLoading(true);

    const coinIds = coins.join(",");
    const currencySymbols = currencies.join(",");

    const options = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': apiKey,
      }
    };

    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=${currencySymbols}`, options)
      .then(response => response.json())
      .then(response => {
        setConversionRates(response);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching conversion rates", err));
  }

  const fetchDecentralizedData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apiKey,
      },
    };

    fetch("https://api.coingecko.com/api/v3/global/decentralized_finance_defi", options)
      .then((response) => response.json())
      .then((response) => {
        setDecentralizedData(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDecentralizedData();
  }, []);

  const handleCoinChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCoins = Array.from(event.target.selectedOptions, option => option.value);
    setCoins(selectedCoins);
  }

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrencies = Array.from(event.target.selectedOptions, option => option.value);
    setCurrencies(selectedCurrencies);
  }

  return (
    <div className="decentralized">
      <div className="mini-dec">
        <div className="top">
          <h2 className="h2">Top Decentralized Exchanges Ranked by 24H Trading Volume</h2>
          <p>We track 836 decentralized crypto exchanges with a total 24h trading volume of $12 Billion, a 16.32% change in the last 24 hours. Currently, the DeFi volume dominance is at 4.9%, and the 3 largest decentralized exchanges by volume are Raydium, Uniswap V3 (Ethereum), and Orca.</p>
        </div>
        <div className="middle">
          <div className="row">
            <div className="col">
              <h3>Dex 24h Trading Volume</h3>
              <p className="same_line">
                <p>
                  ${decentralizedData?.data?.trading_volume_24h
                    ? parseFloat(decentralizedData.data.trading_volume_24h)
                      .toLocaleString(undefined, { maximumFractionDigits: 3 })
                    : "Data not available"}
                </p>
              </p>
            </div>
            <div className="col">
              <h3>Defi Market Cap</h3>
              <p>
                {decentralizedData?.data?.defi_market_cap
                  ? parseFloat(decentralizedData.data.defi_market_cap)
                    .toLocaleString(undefined, { maximumFractionDigits: 3 })
                  : "Data not available"}
              </p>
            </div>
            <div className="col">
              <h3>Top Coin Name</h3>
              <p>{decentralizedData?.data?.top_coin_name}</p>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="exchange-rates">
            <div className="coin-currency-converter">
              <h3>Select Coins and Currencies</h3>

              {/* Select Coins */}
              <div>
                <label htmlFor="coins">Select Coins:</label>
                <select id="coins" multiple={true} value={coins} onChange={handleCoinChange}>
                  <option value="bitcoin">Bitcoin</option>
                  <option value="ethereum">Ethereum</option>
                  <option value="tether">Tether</option>
                  <option value="solana">Solana</option>
                  <option value="binancecoin">BNB</option>
                  <option value="ripple">XRP</option>
                  <option value="doge">Dogecoin</option>
                  <option value="litecoin">Litecoin</option>
                  <option value="cardano">Cardano</option>
                  <option value="polkadot">Polkadot</option>
                </select>
              </div>

              {/* Select Currencies */}
              <div>
                <label htmlFor="currencies">Select Currencies:</label>
                <select id="currencies" multiple={true} value={currencies} onChange={handleCurrencyChange}>
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="inr">INR</option>
                  <option value="ngn">NGN</option>
                </select>
              </div>

              <div>
                <button onClick={fetchCoinPrices} disabled={loading}>
                  {loading ? "Loading..." : "Get Conversion Rates"}
                </button>
              </div>

              {/* Show Conversion Rates */}
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="conversion-rates">
                  <h4>Conversion Rates:</h4>
                  {coins.map((coin) => (
                    <div key={coin}>
                      <h5>{coin.toUpperCase()}</h5>
                      {currencies.map((currency) => (
                        <p key={currency}>
                          {conversionRates?.[coin]?.[currency]
                            ? `${parseFloat(conversionRates[coin][currency]).toLocaleString(undefined, { maximumFractionDigits: 6 })} ${currency.toUpperCase()}`
                            : "Data not available"}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decentralized;
