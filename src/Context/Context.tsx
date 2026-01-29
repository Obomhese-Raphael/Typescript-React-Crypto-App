/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState, ReactNode } from "react";

export const CoinContext = createContext<any>(null);

type CoinContextProviderProps = {
  children: ReactNode;
};

const apiKey = import.meta.env.VITE_API_KEY;

const CoinContextProvider = ({ children }: CoinContextProviderProps) => {
  const [allCoin, setAllCoin] = useState<any[]>([]);
  const [trendingCoin, setTrendingCoin] = useState<any[]>([]);
  const [trendingNFTs, setTrendingNFTs] = useState<any[]>([]);
  const [trendingCategories, setTrendingCategories] = useState<any[]>([]);
  const [globalMarketData, setGlobalMarketData] = useState<any>(null);
  const [exchangeList, setExchangeList] = useState<any[]>([]);

  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  // Loading & error states
  const [loadingAllCoins, setLoadingAllCoins] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const [loadingExchanges, setLoadingExchanges] = useState(true);

  const [errorAllCoins, setErrorAllCoins] = useState<string | null>(null);
  const [errorTrending, setErrorTrending] = useState<string | null>(null);
  const [errorGlobal, setErrorGlobal] = useState<string | null>(null);
  const [errorExchanges, setErrorExchanges] = useState<string | null>(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": apiKey,
    },
  };

  const fetchAllCoin = async () => {
    setLoadingAllCoins(true);
    setErrorAllCoins(null);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        options,
      );

      if (!res.ok) {
        if (res.status === 429)
          throw new Error(
            "Rate limit exceeded. Wait 1-2 minutes and try again.",
          );
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setAllCoin(data);
    } catch (err: any) {
      console.error("All Coins fetch failed:", err);
      setErrorAllCoins(err.message || "Failed to load coins");
    } finally {
      setLoadingAllCoins(false);
    }
  };

  const fetchTrendingCoin = async () => {
    setLoadingTrending(true);
    setErrorTrending(null);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/search/trending",
        options,
      );

      if (!res.ok) {
        if (res.status === 429)
          throw new Error("Rate limit exceeded. Wait 1-2 minutes.");
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setTrendingCoin(data.coins || []);
      setTrendingNFTs(data.nfts || []);
      setTrendingCategories(data.categories || []);
    } catch (err: any) {
      console.error("Trending fetch failed:", err);
      setErrorTrending(err.message || "Failed to load trending");
    } finally {
      setLoadingTrending(false);
    }
  };

  const getGlobalMarketData = async () => {
    setLoadingGlobal(true);
    setErrorGlobal(null);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/global",
        options,
      );

      if (!res.ok) {
        if (res.status === 429) throw new Error("Rate limit exceeded.");
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setGlobalMarketData(data.data || null);
    } catch (err: any) {
      console.error("Global fetch failed:", err);
      setErrorGlobal(err.message || "Failed to load global data");
    } finally {
      setLoadingGlobal(false);
    }
  };

  const getExchangeListWithData = async () => {
    setLoadingExchanges(true);
    setErrorExchanges(null);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/exchanges",
        options,
      );

      if (!res.ok) {
        if (res.status === 429) throw new Error("Rate limit exceeded.");
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setExchangeList(data);
    } catch (err: any) {
      console.error("Exchanges fetch failed:", err);
      setErrorExchanges(err.message || "Failed to load exchanges");
    } finally {
      setLoadingExchanges(false);
    }
  };

  // Initial load - sequential to respect rate limits better
  useEffect(() => {
    const loadInitialData = async () => {
      await fetchTrendingCoin(); // Most important for Home
      await getGlobalMarketData();
      await getExchangeListWithData();
    };

    loadInitialData();
  }, []); // Only once on mount

  // Refetch coins when currency changes
  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    loadingAllCoins,
    errorAllCoins,

    trendingCoin,
    trendingNFTs,
    trendingCategories,
    loadingTrending,
    errorTrending,

    globalMarketData,
    loadingGlobal,
    errorGlobal,
    
    exchangeList,
    loadingExchanges,
    errorExchanges,

    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};

export default CoinContextProvider;
