import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSliceActions } from "../store/authSlice";
import styles from "./MainLayout.module.css";

const MainLayout = () => {
    const navigate = useNavigate();
    const [isMore, setIsMore] = useState(false);
    const [isList, setIsList] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector((state) => {
        return state.authSlice.auth;
    });
    const userData = useSelector((state) => {
        return state.authSlice.userData;
    });

    const bedIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 256 256"
        >
            <path d="M208,72H24V48A8,8,0,0,0,8,48V208a8,8,0,0,0,16,0V176H232v32a8,8,0,0,0,16,0V112A40,40,0,0,0,208,72ZM24,88H96v72H24Z"></path>
        </svg>
    );
    const airplaneIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 256 256"
        >
            <path d="M215.52,197.26a8,8,0,0,1-1.86,8.39l-24,24A8,8,0,0,1,184,232a7.09,7.09,0,0,1-.79,0,8,8,0,0,1-5.87-3.52l-44.07-66.12L112,183.59V208a8,8,0,0,1-2.34,5.65s-14,14.06-15.88,15.88A7.91,7.91,0,0,1,91,231.41a8,8,0,0,1-10.41-4.35l-.06-.15-14.7-36.76L29,175.42a8,8,0,0,1-2.69-13.08l16-16A8,8,0,0,1,48,144H72.4l21.27-21.27L27.56,78.65a8,8,0,0,1-1.22-12.32l24-24a8,8,0,0,1,8.39-1.86l85.94,31.25L176.2,40.19a28,28,0,0,1,39.6,39.6l-31.53,31.53Z"></path>
        </svg>
    );
    const carIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 256 256"
        >
            <path d="M240,112H211.31L168,68.69A15.86,15.86,0,0,0,156.69,64H44.28A16,16,0,0,0,31,71.12L1.34,115.56A8.07,8.07,0,0,0,0,120v48a16,16,0,0,0,16,16H33a32,32,0,0,0,62,0h66a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V128A16,16,0,0,0,240,112ZM44.28,80H156.69l32,32H23ZM64,192a16,16,0,1,1,16-16A16,16,0,0,1,64,192Zm128,0a16,16,0,1,1,16-16A16,16,0,0,1,192,192Z"></path>
        </svg>
    );

    const attractionsIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 256 256"
        >
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM62.29,186.47l2.52-1.65A16,16,0,0,0,72,171.53l.21-36.23L93.17,104a3.62,3.62,0,0,0,.32.22l19.67,12.87a15.94,15.94,0,0,0,11.35,2.77L156,115.59a16,16,0,0,0,10-5.41l22.17-25.76A16,16,0,0,0,192,74V67.67A87.87,87.87,0,0,1,211.77,155l-16.14-14.76a16,16,0,0,0-16.93-3l-30.46,12.65a16.08,16.08,0,0,0-9.68,12.45l-2.39,16.19a16,16,0,0,0,11.77,17.81L169.4,202l2.36,2.37A87.88,87.88,0,0,1,62.29,186.47Z"></path>
        </svg>
    );

    const airportTaxisIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 256 256"
        >
            <path d="M240,112H228.64L201.25,64.06A16,16,0,0,0,187.36,56H165.42l-12-29.94A15.93,15.93,0,0,0,138.58,16H117.42a15.93,15.93,0,0,0-14.86,10.06L90.58,56H68.64a16,16,0,0,0-13.89,8.06L27.36,112H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V192h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V128h8a8,8,0,0,0,0-16ZM117.42,32h21.16l9.6,24H107.82ZM80,160H64a8,8,0,0,1,0-16H80a8,8,0,0,1,0,16Zm112,0H176a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Z"></path>
        </svg>
    );

    const moreIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 256 256"
        >
            <path d="M201.54,54.46A104,104,0,0,0,54.46,201.54,104,104,0,0,0,201.54,54.46ZM190.23,190.23a88,88,0,1,1,0-124.46A88.11,88.11,0,0,1,190.23,190.23ZM165.66,82.34a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L128,108.69l26.34-26.35A8,8,0,0,1,165.66,82.34Zm0,56a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L128,164.69l26.34-26.35A8,8,0,0,1,165.66,138.34Z"></path>
        </svg>
    );
    const userIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 256 256"
        >
            <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z"></path>
        </svg>
    );

    const listIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 256 256"
        >
            <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
        </svg>
    );

    const loginHandle = () => {
        if (auth) {
            localStorage.removeItem("userData");
            dispatch(authSliceActions.userDataUpdate(null));
            dispatch(authSliceActions.authUpdate(false));
            setIsList(false);
        } else {
            navigate("/login");
        }
    };
    const logoutHandle = () => {
        if (auth) {
            dispatch(authSliceActions.userDataUpdate(null));
            dispatch(authSliceActions.authUpdate(false));
            setIsList(false);
            localStorage.removeItem("userData");
        }
    };
    const transactionsPage = () => {
        setIsList(false);
        navigate("/transactions");
    };
    const registerHandle = () => {
        navigate("/register");
    };
    const moreHandle = () => {
        setIsMore(!isMore);
    };
    const airportTaxis = () => {
        navigate("/airport-taxis");
        setIsMore(false);
    };
    const attractions = () => {
        navigate("/attractions");
        setIsMore(false);
    };

    const isListHandle = () => {
        setIsList(!isList);
    };

    return (
        <div className={styles.contain}>
            <div className={styles["nav-global"]}>
                <div className={styles.nav}>
                    <div className={styles.head}>
                        <h1>Booking Website</h1>
                        <div className={styles.button}>
                            {auth ? (
                                <div className={styles["sub-button"]}>
                                    <p className={styles["display-email"]}>
                                        {userData.email}
                                    </p>
                                    <div className={styles["user-icon"]}>
                                        {userIcon}
                                    </div>
                                    <div className={styles["button-change"]}>
                                        <button
                                            style={{
                                                width: "93px",
                                                textAlign: "center",
                                            }}
                                            onClick={transactionsPage}
                                        >
                                            Transactions
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button onClick={registerHandle}>
                                    Sign Up
                                </button>
                            )}
                            <div
                                className={
                                    styles[
                                        `${auth ? "button-change" : undefined}`
                                    ]
                                }
                            >
                                <button onClick={loginHandle}>
                                    {auth ? "Logout" : "Login"}
                                </button>
                            </div>
                            {auth && (
                                <div
                                    className={styles["list-icon"]}
                                    onClick={isListHandle}
                                >
                                    {listIcon}
                                </div>
                            )}
                            {isList && auth && (
                                <div className={styles["list-box"]}>
                                    <span>{userData.email}</span>
                                    <p onClick={transactionsPage}>
                                        Transactions
                                    </p>
                                    <p onClick={logoutHandle}>Logout</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <nav>
                        <NavLink
                            to="/"
                            className={({ isActive }) => {
                                return isActive ? styles.active : undefined;
                            }}
                            end
                        >
                            <div className={styles.link}>
                                {bedIcon}
                                <p>Stays</p>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/flights"
                            className={({ isActive }) => {
                                return isActive ? styles.active : undefined;
                            }}
                        >
                            <div className={styles.link}>
                                {airplaneIcon}
                                <p>Flights</p>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/car-rentals"
                            className={({ isActive }) => {
                                return isActive ? styles.active : undefined;
                            }}
                        >
                            <div className={styles.link}>
                                {carIcon}
                                <p>Car rentals</p>
                            </div>
                        </NavLink>
                        <div className={styles.attractions}>
                            <NavLink
                                to="/attractions"
                                className={({ isActive }) => {
                                    return isActive ? styles.active : undefined;
                                }}
                            >
                                <div className={styles.link}>
                                    {attractionsIcon}
                                    <p>Attractions</p>
                                </div>
                            </NavLink>
                        </div>
                        <div className={styles.airport}>
                            <NavLink
                                to="/airport-taxis"
                                className={({ isActive }) => {
                                    return isActive ? styles.active : undefined;
                                }}
                            >
                                <div className={styles.link}>
                                    {airportTaxisIcon}
                                    <p>Airport Taxis</p>
                                </div>
                            </NavLink>
                        </div>
                        <div className={styles.more} onClick={moreHandle}>
                            {moreIcon}
                            <p>More</p>
                            {isMore && (
                                <div className={styles.select}>
                                    <p onClick={airportTaxis}>Airport Taxis</p>
                                    <p
                                        className={styles.option01}
                                        onClick={attractions}
                                    >
                                        Attractions
                                    </p>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
            <main>
                <Outlet />
            </main>
            <div className={styles.register}>
                <div className={styles.form}>
                    <h2>Save time, save money!</h2>
                    <p>Sign up and we'll send the best deals to you</p>
                    <form>
                        <input type="text" />
                        <button>Subscribe</button>
                    </form>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles["footer-content"]}>
                    <div>
                        <a href="">Countries</a>
                        <a href="">Regions</a>
                        <a href="">Cities</a>
                        <a href="">Districts</a>
                        <a href="">Airports</a>
                        <a href="">Hotels</a>
                    </div>
                    <div>
                        <a href="">Homes</a>
                        <a href="">Apartments</a>
                        <a href="">Resorts</a>
                        <a href="">Villas</a>
                        <a href="">Hostels</a>
                        <a href="">Guest houses</a>
                    </div>
                    <div>
                        <a href="">Unique places to stay</a>
                        <a href="">Reviews</a>
                        <a href="">Unpacked:Travel articles</a>
                        <a href="">Travel communities</a>
                        <a href="">Seasonal and holiday deals</a>
                    </div>
                    <div>
                        <a href="">Car Rental</a>
                        <a href="">Fight Finder</a>
                        <a href="">Restaurant reservations</a>
                        <a href="">Travel Agents</a>
                    </div>
                    <div>
                        <a href="">Customer Service</a>
                        <a href="">Partner Help</a>
                        <a href="">Careers</a>
                        <a href="">Sustainability</a>
                        <a href="">Press center</a>
                        <a href="">Safety Resource Center</a>
                        <a href="">Investor relations</a>
                        <a href="">Terms & conditions</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
