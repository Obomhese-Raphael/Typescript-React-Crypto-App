/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState, useEffect } from "react"; // ← add useEffect
import "./Navbar.css";
import { CoinContext } from "../../Context/Context";
import { Link } from "react-router-dom";
import arrow_icon from "../../assets/arrow_icon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiBank } from "react-icons/ci";
import { PiCoinsFill } from "react-icons/pi";
import { FaChartLine } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

// Clerk imports
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

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
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      case "ngn":
        setCurrency({ name: "ngn", symbol: "₦" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  // Lock/Unlock body scroll when mobile menu opens/closes
  useEffect(() => {
    if (isOpen) {
      // Disable scroll
      document.body.style.overflow = "hidden";
      // Optional: prevent iOS bounce
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      // Re-enable scroll
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  return (
    <div className="navbar">
      {/* Logo */}
      <Link className="logo_name" to="/">
        <h3 className="name">Crypto App🪙</h3>
      </Link>

      {/* Desktop Menu */}
      <ul className="ul">
        <Link to="/">
          <li className="pointer">Home</li>
        </Link>
        <Link to="/cryptocurrencies">
          <li>Cryptocurrencies</li>
        </Link>
        <Link to="/nft">
          <li>NFTs</li>
        </Link>
        <div className="exc">
          <li onClick={toggleOptions}>Exchanges</li>
          <div className={`options ${openOptions ? "show" : ""}`}>
            <Link onClick={() => setOpenOptions(false)} to="/crypto_exchanges">
              <CiBank /> Crypto Exchanges
            </Link>
            <Link
              onClick={() => setOpenOptions(false)}
              to="/decentralized_exchanges"
            >
              <PiCoinsFill /> Decentralized Exchanges
            </Link>
            <Link onClick={() => setOpenOptions(false)} to="/derivatives">
              <FaChartLine /> Derivatives
            </Link>
          </div>
        </div>
      </ul>

      {/* Right side */}
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
          <option value="ngn">NGN</option>
        </select>

        <div className="auth-section flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="button signup_button">
                Sign in <img src={arrow_icon} alt="arrow" />
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="user-button flex items-center">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox:
                      "w-10 h-10 border-2 border-blue-500 rounded-full overflow-hidden",
                    userButtonTrigger: "focus:outline-none",
                    userButtonPopoverCard:
                      "bg-slate-900 border border-slate-700 shadow-2xl",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>

        {/* Hamburger */}
        <div className="hamburger">
          <div className="menus">
            <div className="icon" onClick={() => setIsOpen(!isOpen)}>
              <GiHamburgerMenu style={{ color: "white", cursor: "pointer" }} />
            </div>
          </div>

          {/* Mobile Menu */}
          {/* Mobile Menu */}
          <div className={isOpen ? "open" : "close"}>
            {/* Backdrop - click to close */}
            <div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <div className="mobile_menus relative z-50">
              {/* Close Button - top left */}
              <button
                className="close-icon absolute top-5 left-6 z-50 text-white text-3xl p-2 hover:text-blue-400 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <IoClose />
              </button>

              <ul className="mobile_list pt-20">
                {" "}
                {/* ← add pt-20 so content doesn't hide under close button */}
                <Link onClick={() => setIsOpen(false)} to="/">
                  <li>Home</li>
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/cryptocurrencies">
                  <li>Cryptocurrencies</li>
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/nft">
                  <li>NFTs</li>
                </Link>
                <div className="exc">
                  <li className="exc_text" onClick={toggleOptions}>
                    Exchanges
                  </li>
                  <div className={`options ${openOptions ? "show" : ""}`}>
                    <Link
                      onClick={() => {
                        setIsOpen(false);
                        setOpenOptions(false);
                      }}
                      to="/crypto_exchanges"
                    >
                      <CiBank /> Crypto Exchanges
                    </Link>
                    <Link
                      onClick={() => {
                        setIsOpen(false);
                        setOpenOptions(false);
                      }}
                      to="/decentralized_exchanges"
                    >
                      <PiCoinsFill /> Decentralized Exchanges
                    </Link>
                    <Link
                      onClick={() => {
                        setIsOpen(false);
                        setOpenOptions(false);
                      }}
                      to="/derivatives"
                    >
                      <FaChartLine /> Derivatives
                    </Link>
                  </div>
                </div>
                {/* Mobile Auth */}
                <div className="mobile-auth mt-8 px-6">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="w-full button signup_button py-4 text-lg">
                        Sign in / Sign up
                      </button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
