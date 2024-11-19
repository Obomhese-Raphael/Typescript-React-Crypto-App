/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from 'react-router-dom';
import "./DerivativeData.css"
import { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CoinContext } from '../../Context/Context';
import ICoin from '../../Interface/ICoin';

const DerivativeData = () => {
    const navigate = useNavigate();
    const { currency } = useContext(CoinContext)
    const { derivativeId } = useParams();
    const [selectedDerivativeTickers, setSelectedDerivativeTickers] = useState([]);
    const [selectedDerivative, setSelectedDerivative] = useState<ICoin | any>([]);
    const [showMore, setShowMore] = useState(20);
    const apiKey = import.meta.env.VITE_API_KEY;

    const handleShowMore = () => {
        setShowMore(prevShowMore => prevShowMore + 20);
    }
    const handleShowLess = () => {
        setShowMore(prevShowMore => prevShowMore - 20);
    }

    const getDerivativeDataById = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": apiKey,
            },
        };

        fetch(`https://api.coingecko.com/api/v3/derivatives/exchanges/${derivativeId}`, options)
            .then((response) => response.json())
            .then((response) => {
                console.log("Derivative response: ", response);
                setSelectedDerivative(response);
            })
            .catch((error) => console.error(error));
    }


    const getDerivativeDataTickers = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": apiKey,
            },
        };

        fetch(`https://api.coingecko.com/api/v3/derivatives`, options)
            .then((response) => response.json())
            .then((response) => {
                console.log("Derivative Tickers: ", response);
                setSelectedDerivativeTickers(response);
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        getDerivativeDataById();
        getDerivativeDataTickers();
    }, [derivativeId])
    return (
        <div className="derivative-data">
            <div className="mini-derivative">
                <div className="stages">
                    <div className="stage">
                        <p onClick={() => navigate("/cryptocurrencies")}>Cryptocurrencies</p>  <MdKeyboardArrowRight />
                    </div>
                    <div className="stage">
                        <p onClick={() => navigate("/crypto_exchanges")}>Derivatives </p> <MdKeyboardArrowRight />
                    </div>
                    <div className="stage">
                        <p className="name">{selectedDerivative.name}</p>
                    </div>
                </div>
                <div className="name-info">
                    <div className="name">
                        <img src={selectedDerivative.image} alt="" />
                        <h2>{selectedDerivative.name}</h2>
                        <p className="centralized">Centralized Exchange</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p>24h Trading Volume</p>
                        <h3>{currency.symbol}{parseFloat(selectedDerivative?.trade_volume_24h_btc || 0).toLocaleString()} - BTC</h3>
                    </div>
                    <div className="col">
                        <p>Open Interest</p>
                        <h3>{parseFloat(selectedDerivative?.open_interest_btc || 0).toLocaleString()}  - BTC</h3>
                    </div>
                    <div className="col">
                        <p>Pairs</p>
                        <h3 className=''>{selectedDerivative?.number_of_perpetual_pairs
                        } </h3>
                    </div>
                </div>
                <div className="spot-market">
                    <div className="heads">
                        <div className='h3'>Perpetual Market</div>
                    </div>
                    <div className="crypto-table">
                        <div className="table-layouts">
                            <p>#</p>
                            <p>Exchange</p>
                            <p>Price</p>
                            <p className=''>24hr %</p>
                            <p className='spread'>Spread</p>
                            <p className='volume_24hrs'>Volume (24hr)</p>
                            <p className='open_interest'>Open Interest</p>
                            <p className='funding'>Funding Rate</p>
                        </div>
                        {selectedDerivativeTickers?.slice(0, showMore).map((item: any, index: number) => (
                            <div className="table-layouts table_info" key={index}>
                                <p className="rank">{index + 1}</p>
                                <p>{item?.market}</p>  
                                <p>${parseFloat(item?.price).toLocaleString()}</p>
                                <p className={item?.price_percentage_change_24h > 0 ? "green" : "red"}>{item?.price_percentage_change_24h.toFixed(3)}%</p>
                                <p className='spread'>{item?.spread ? item?.spread : "-"}</p>
                                <p className='volume_24hrs'>{item?.volume_24h.toLocaleString()}</p>
                                <p className='open_interest'>{item?.open_interest.toLocaleString()}</p>
                                <p className='funding'>{item?.funding_rate.toFixed(3)}</p>
                            </div>
                        ))}
                    </div>
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
            </div>
        </div>
    ) 
}

export default DerivativeData