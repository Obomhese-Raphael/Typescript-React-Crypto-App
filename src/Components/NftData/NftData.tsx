/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react"
import "./NftData.css"
import { CoinContext } from "../../Context/Context"
import { Link, useParams } from "react-router-dom";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
import { CiStar, CiShare2, CiGlobe } from "react-icons/ci";
import { FaStar, FaTwitter } from "react-icons/fa";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { LiaStarSolid, LiaStarHalfAltSolid } from "react-icons/lia";
import { MdErrorOutline } from "react-icons/md";
import { ImLink } from "react-icons/im";
const NftData = () => {
    const { currency } = useContext(CoinContext);
    const { nftId } = useParams();
    const [nftResponse, setNftResponse] = useState<any>(null);
    const [isLiked, setIsLiked] = useState(false);
    const apiKey = import.meta.env.VITE_API_KEY;

    const getNftCollectionData = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": apiKey,
            },
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/nfts/${nftId}`, options);
            const data = await response.json();

            if (response.ok) {
                setNftResponse(data);
                console.log("NFT Collection Data: ", data);
            } else {
                console.error("Error fetching NFT data: ", data.error);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const icons = [
        <LiaStarSolid key="star1" />,
        <LiaStarSolid key="star2" />,
        <LiaStarSolid key="star3" />,
        <LiaStarSolid key="star4" />,
        <LiaStarHalfAltSolid key="star5" />,
    ];

    const handleLike = () => {
        setIsLiked(!isLiked);
    }

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

    useEffect(() => {
        getNftCollectionData();
    }, [nftId]);

    if ((nftResponse)) {
        return (
            <div className="nft">
                <div className="container">
                    <div className="top-container">
                        <div className="left-container">
                            <div className="coin-name">
                                <div className="name">
                                    <img className="rounded" src={nftResponse?.image?.small} alt="" />
                                    <p className="ellipses">{nftResponse?.name}</p>
                                </div>
                                <p className="small_name">{nftResponse?.symbol.toUpperCase()}</p>
                                <br />
                            </div>
                            <div className="amount">
                                <div className="inner_amount">
                                    <p className="amount_price">{currency.symbol}{nftResponse?.floor_price.usd.toLocaleString()}</p>
                                    <p className="percentage_change">
                                        {
                                            nftResponse.floor_price_24h_percentage_change.usd > 0
                                                ? <p className="green rate"><MdArrowDropUp /> {nftResponse.floor_price_24h_percentage_change.usd.toFixed(2)
                                                }% (1d)</p>
                                                : <p className="red rate"><MdArrowDropDown /> {nftResponse.floor_price_24h_percentage_change.usd.toFixed(2)
                                                }% (1d)</p>
                                        }
                                    </p>
                                </div>
                                <div className="choice">
                                    <button>1D</button>
                                    <button>7D</button>
                                    <button>1M</button>
                                    <button>1Y</button>
                                    <button>All</button>
                                </div>
                            </div>
                        </div>

                        <div className="right-container">
                            <div className="container">
                                <div className="star" onClick={handleLike}>
                                    {isLiked ? (
                                        <FaStar className="full-star" />
                                    ) : (
                                        <CiStar className="empty-star" />
                                    )}

                                    5M
                                </div>
                                <div className="share">
                                    <CiShare2 />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hr">
                        <hr />
                    </div>
                    <div className="top-container website">
                        <div className="left-container mini-containers">
                            <div className="bitcoin-stats-container">
                                <div className="stat-section">
                                    <p>Market Cap</p>
                                    <div className="flex">
                                        <p>{[currency.symbol]}{formatNumber(nftResponse?.market_cap.usd, units)}</p>
                                        <p className="change">
                                            {
                                                nftResponse.market_cap_24h_percentage_change.usd > 0
                                                    ? <p className="green rate change"><MdArrowDropUp /> {nftResponse?.market_cap_24h_percentage_change.usd.toFixed(2)
                                                    }%</p>
                                                    : <p className="red rate change"><MdArrowDropDown /> {nftResponse.market_cap_24h_percentage_change.usd.toFixed(2)
                                                    }%</p>
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="stat-section">
                                    <p>Total Volume</p>
                                    <p>{[currency.symbol]}{formatNumber(nftResponse?.volume_24h.usd, units)}</p>
                                </div>
                                <div className="stat-section">
                                    <p>ATH</p>
                                    <p>{[currency.symbol]}{formatNumber(nftResponse?.ath.usd, units)}</p>
                                </div>
                                <div className="stat-section">
                                    <p>Total Supply</p>
                                    <p>{formatNumber(nftResponse?.total_supply, units)} {nftResponse?.symbol.toUpperCase()}</p>
                                </div>
                                <div className="stat-section">
                                    <p>Vol % (24h)</p>
                                    {
                                        <p>{formatNumber(nftResponse?.
                                            volume_24h_percentage_change.usd.toFixed(2), units)} {nftResponse?.symbol.toUpperCase()}</p>
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="right-container">
                            <div className="mini-right-container">
                                <div className="info-wrapper">
                                    <div className="base">
                                        <div className="label">
                                            <div className="display">
                                                <div className="content">
                                                    Website
                                                </div>
                                            </div>
                                        </div>
                                        <div className="value">
                                            <div className="more_base">
                                                <div>
                                                    <div className="links">
                                                        <Link to={nftResponse?.links?.homepage}>Website <CiGlobe /></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="base">
                                        <div className="label">
                                            <div className="display">
                                                <div className="content">
                                                    Socials
                                                </div>
                                            </div>
                                        </div>
                                        <div className="value">
                                            <div className="more_base">
                                                <div>
                                                    <div className="links">
                                                        <Link to={nftResponse?.links?.twitter}><FaTwitter /></Link>
                                                        <Link to={nftResponse?.links?.homepage}><ImLink /></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="base">
                                        <div className="label">
                                            <div className="display">
                                                <div className="content">
                                                    Rating
                                                </div>
                                            </div>
                                        </div>
                                        <div className="value">
                                            <div className="more_base">
                                                <div>
                                                    <div className="links links_star">
                                                        <a className="icons_star" href="">4.6
                                                            {icons.map((icon, index) => (
                                                                <span className="icons_span" key={index}>{icon}</span>
                                                            ))}

                                                            <MdErrorOutline /></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stat-section cir_supply">
                        <p className="flex">Description<MdDescription className="icon" /></p>
                        <div className="circle flex">
                            <p className="flex desc">
                                {nftResponse?.description}
                                <MdOutlineRadioButtonUnchecked className="icon" />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="chart">
                    
                </div>
            </div>
        )
    } else {
        return (
            <div className="loading">
                <h1 className="text">Loading...</h1>
            </div>
        )
    }
}

export default NftData