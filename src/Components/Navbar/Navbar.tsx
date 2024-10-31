/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react"
import "./Navbar.css"
import { CoinContext } from "../../Context/Context"
import { Link } from "react-router-dom"
import arrow_icon from "../../assets/arrow_icon.png"

const Navbar = () => {
    const { setCurrency } = useContext(CoinContext);
    
    const currencyHandler = (event: any) => {
        switch (event.target.value) {
            case "usd": {
                setCurrency({
                    name: "usd",
                    symbol: "$"
                });
                break;
            }

            case "eur": {
                setCurrency({
                    name: "eur",
                    symbol: "€"
                });
                break;
            }

            case "inr": {
                setCurrency({
                    name: "inr",
                    symbol: "₹"
                });
                break;
            }

            case "ngn": {
                setCurrency({
                    name: "ngn",
                    symbol: "₦"
                });
                break;
            }

            default: {
                setCurrency({
                    name: "usd",
                    symbol: "$"
                });
                break;
            }
        }
    }
    return (
        <div className='navbar'>
            <Link to={`/`}>
                <h3>
                    Crypto App 🪙
                </h3>
            </Link>
            <ul>
                <Link to={`/`}><li className="pointer">Home</li></Link>
                <Link to={`/cryptocurrencies`}><li>Cryptocurrencies</li></Link>
                <Link to={`/nfts`}><li>NFTs</li></Link>
                <li>News</li>
            </ul>
            <div className="nav-right">
                <select onChange={currencyHandler}>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="inr">INR</option>
                    <option value="ngn">NGN</option>
                </select>
                <Link to={`/signup`}>
                    <button>
                        Sign up <img src={arrow_icon} />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar