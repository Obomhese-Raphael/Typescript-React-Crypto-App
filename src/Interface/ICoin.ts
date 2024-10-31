// ICoin Interface
interface ICoin {
    id: string; 
    coingecko_id: string;
    symbol: string;
    name: string;
    image: string; 
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
    isLoading?: boolean; 
    error?: string | null;
    market_cap_rank: number;
}

export default ICoin