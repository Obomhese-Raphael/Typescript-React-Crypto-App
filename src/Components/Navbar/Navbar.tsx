/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react"
import "./Navbar.css"
import { CoinContext } from "../../Context/Context"
import { Link } from "react-router-dom"
import arrow_icon from "../../assets/arrow_icon.png"
import { GiHamburgerMenu } from "react-icons/gi";
import { CiBank } from "react-icons/ci";
import { PiCoinsFill } from "react-icons/pi";
import { FaChartLine } from "react-icons/fa6";

const Navbar = () => {
    const { setCurrency } = useContext(CoinContext);
    const [isOpen, setIsOpen] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);

    const toggleOptions = (event: React.MouseEvent) => {
        event.preventDefault();
        setOpenOptions(!openOptions);
    };

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
            <ul className="ul">
                <Link to={`/`}><li className="pointer">Home</li></Link>
                <Link to={`/cryptocurrencies`}><li>Cryptocurrencies</li></Link>
                <Link to={`/nft`}><li>NFTs</li></Link>
                <div className="exc">
                    <li onClick={toggleOptions}>Exchanges</li>
                    <div className={`options ${openOptions ? "show" : ""}`}>
                        <Link onClick={() => setOpenOptions(!openOptions)} to={`/crypto_exchanges`}> <CiBank /> Crypto Exchanges</Link>
                        <Link onClick={() => setOpenOptions(!openOptions)} to={`/decentralized_exchanges`}><PiCoinsFill /> Decentralized Exchanges</Link>
                        <Link onClick={() => setOpenOptions(!openOptions)} to={`/derivatives`}><FaChartLine /> Derivatives</Link>
                    </div>
                </div>
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
                <div className="hamburger" >
                    <div className="menus">
                        <div className="icon" onClick={() => setIsOpen(!isOpen)}>
                            <GiHamburgerMenu style={{ color: "black", textAlign: "center", cursor: "pointer" }} />
                        </div>
                    </div>
                    <div className={isOpen ? "open" : "close"}>
                        <div className="mobile_menus">
                            <ul className="mobile_list">
                                <Link onClick={() => setIsOpen(!isOpen)} to={`/`}><li className="pointer">Home</li></Link>
                                <Link onClick={() => setIsOpen(!isOpen)} to={`/cryptocurrencies`}><li>Cryptocurrencies</li></Link>
                                <Link onClick={() => setIsOpen(!isOpen)} to={`/nft`}><li>NFTs</li></Link>
                                <div className="exc">
                                    <li className="exc_text" onClick={toggleOptions}>Exchanges</li>
                                    <div className={`options  ${openOptions ? "show" : ""}`}>
                                        <Link onClick={() => setIsOpen(!isOpen)} to={`/crypto_exchanges`}> <CiBank /> Crypto Exchanges</Link>
                                        <Link onClick={() => setIsOpen(!isOpen)} to={`/decentralized_exchanges`}><PiCoinsFill /> Decentralized Exchanges</Link>
                                        <Link onClick={() => setIsOpen(!isOpen)} to={`/derivatives`}><FaChartLine /> Derivatives</Link>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar