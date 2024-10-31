/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState, ReactNode } from "react";

export const CoinContext = createContext<any>(null);

type CoinContextProviderProps = {
    children: ReactNode;
};

const apiKey = import.meta.env.VITE_API_KEY

const CoinContextProvider = ({ children }: CoinContextProviderProps) => {
    const [allCoin, setAllCoin] = useState([]);
    const [trendingCoin, setTrendingCoin] = useState([]);
    const [globalMarketData, setGlobalMarketData] = useState([]);
    const [nftMarketData, setNftMarketData] = useState([]);
    const [trendingNFTs, setTrendingNFTs] = useState([]);
    const [trendingCategories, setTrendingCategories] = useState([]);
    const [nftList, setNftList] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$",
    });

    const fetchAllCoin = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": apiKey,
            },
        };

        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
            options
        )
            .then((response) => response.json())
            .then((response) => {
                console.log("All Coin", response);
                setAllCoin(response)
            })
            .catch((error) => console.error(error));
    };

    const fetchTrendingCoin = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": apiKey,
            },
        };
        fetch(`https://api.coingecko.com/api/v3/search/trending`, options)
            .then(response => response.json())
            .then(response => {
                console.log("Trending Coins", response)
                setTrendingCoin(response.coins)
                setTrendingNFTs(response.nfts)
                setTrendingCategories(response.categories)
            })
            .catch(err => console.error(err));
    }

    const getGlobalMarketData = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": apiKey,
            },
        };

        fetch('https://api.coingecko.com/api/v3/global', options)
            .then(response => response.json())
            .then(response => {
                setGlobalMarketData(response);
                console.log("Global market data: ", response);
            })
            .catch(err => console.error(err));
    }

    const getNftMarketData = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": apiKey,
            },
        };

        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&include_market_cap=true&include_24hr_vol=true&include_market_cap_change_24hr=true&include_last_updated_at=true&order=market_cap_desc', options)
            .then(response => response.json())
            .then(response => {
                console.log("NFT Market data: ", response);
                setNftMarketData(response);
            })
            .catch(err => console.error(err));
    }

    const getNftList = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": apiKey,
            },
        };

        fetch('https://api.coingecko.com/api/v3/nfts/list', options)
            .then(response => response.json())
            .then(response => {
                console.log("NFT List: ", response);
                setNftList(response);
                console.log("Nft List Ids: ", response.id)
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    useEffect(() => {
        fetchTrendingCoin();
        getGlobalMarketData();
        getNftMarketData();
        getNftList();
    }, []);

    const contextValue = {
        allCoin,
        trendingCoin,
        currency,
        setCurrency,
        fetchCoinData: fetchAllCoin,
        fetchTrendingCoinData: fetchTrendingCoin,
        setTrendingCoin,
        globalMarketData,
        setGlobalMarketData,
        nftMarketData,
        setNftMarketData,
        trendingNFTs,
        setTrendingNFTs,
        trendingCategories,
        setTrendingCategories,
        nftList,
        setNftList,
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
