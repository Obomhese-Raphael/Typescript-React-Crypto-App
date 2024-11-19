import "./Signup.css"
import { FaWallet } from "react-icons/fa";
import apple_icon from "../../assets/apple-icon.png"
import google_icon from "../../assets/google_icon.webp"
import binance_icon from "../../assets/binance_icon(2).png"
import { IoQrCodeOutline } from "react-icons/io5";

const SignUp = () => {

    return (
        <div className="login">
            <div className="inner_login">
                <form
                    className="main">
                    <div className="inner_main">
                        <div className="entry">
                            <p>Email Address</p>
                            <div className="inner_entry">
                                <div className="input">
                                    <input type="text" placeholder="Enter phone number or email" id="" required/>
                                </div>

                                <p>Password</p>
                                <div className="input">
                                    <input type="password" placeholder="Enter password" id="" required/>
                                </div>
                                <p id="message" className="messgage"></p>
                                <div className="space"></div>
                                <button className="button"><p>Login</p></button>
                                <div>
                                    <div className="space"></div>
                                    <div className="bottom h3">
                                        <h3>or</h3>
                                    </div>
                                    <div className="buttons">
                                        <div className="btns">
                                            <div className="buton">
                                                <button>
                                                    <div className="inner_buton">
                                                        <div className="h-space"></div>
                                                        <div className="content">
                                                            <div className="inner_content">
                                                                <div className="icon">
                                                                    <img src={google_icon} alt="" />
                                                                </div>
                                                                <div className="g-text">
                                                                    <a href="https://accounts.google.com/">
                                                                        <p className="g-text_inner">
                                                                            Continue with Google
                                                                        </p>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="buton">
                                                <button>
                                                    <div className="inner_buton">
                                                        <div className="h-space"></div>
                                                        <div className="content">
                                                            <div className="inner_content">
                                                                <div className="icon">
                                                                    <img src={apple_icon} alt="" />
                                                                </div>
                                                                <div className="g-text">
                                                                    <a href="https://support.apple.com/en-ng/111001">
                                                                        <p className="g-text_inner">
                                                                            Continue with Apple
                                                                        </p>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="buton">
                                                <button>
                                                    <div className="inner_buton">
                                                        <div className="h-space"></div>
                                                        <div className="content">
                                                            <div className="inner_content">
                                                                <div className="icon binance">
                                                                    <img src={binance_icon} alt="" />
                                                                </div>
                                                                <div className="g-text">
                                                                    <a href="https://www.binance.us/login">
                                                                        <p className="g-text_inner">
                                                                            Continue with Binance
                                                                        </p>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="buton">
                                                <button>
                                                    <div className="inner_buton">
                                                        <div className="h-space"></div>
                                                        <div className="content">
                                                            <div className="inner_content">
                                                                <div className="icon icons">
                                                                    <FaWallet />
                                                                </div>
                                                                <div className="g-text">
                                                                    <a href="https://login.blockchain.com/">
                                                                        <p className="g-text_inner">
                                                                            Continue with Wallet
                                                                        </p>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="space"></div>
                                            <div className="bottom h3">
                                                <h3>or</h3>
                                            </div>
                                            <div className="buton">
                                                <button>
                                                    <div className="inner_buton">
                                                        <div className="h-space"></div>
                                                        <div className="content">
                                                            <div className="inner_content">
                                                                <div className="icon">
                                                                    <IoQrCodeOutline />
                                                                </div>
                                                                <div className="g-text">
                                                                    <p className="g-text_inner">
                                                                        Login with QR-Code
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>

                                        </div>
                                        <div></div>
                                        <div className="space"></div>
                                        <div className="pro">
                                            <p>By proceeding, you agree to receive calls, WhatsApp, SMS/RCS messages from CryptoApp.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp

