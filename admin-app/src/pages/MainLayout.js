import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "./MainLayout.module.css";
import { authSliceActions } from "../store/authSlice";

const MainLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => {
        return state.authSlice.auth;
    });
    const userData = useSelector((state) => {
        return state.authSlice.userData;
    });
    const isHotelEdit = useSelector((state) => {
        return state.isHotelEditSlice.isHotelEdit;
    });

    const dashboardIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="blue"
            viewBox="0 0 256 256"
        >
            <path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z"></path>
        </svg>
    );

    const userIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="blue"
            viewBox="0 0 256 256"
        >
            <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z"></path>
        </svg>
    );

    const hotelIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="blue"
            viewBox="0 0 256 256"
        >
            <path d="M240,208H224V115.55a16,16,0,0,0-5.17-11.78l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16Zm-88,0H104V160a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8Z"></path>
        </svg>
    );

    const roomIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="blue"
            viewBox="0 0 256 256"
        >
            <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V88H40V56Z"></path>
        </svg>
    );

    const transactionIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="blue"
            viewBox="0 0 256 256"
        >
            <path d="M247.43,117l-14-35A15.93,15.93,0,0,0,218.58,72H184V64a8,8,0,0,0-8-8H24A16,16,0,0,0,8,72V184a16,16,0,0,0,16,16H41a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A8.13,8.13,0,0,0,247.43,117ZM72,208a16,16,0,1,1,16-16A16,16,0,0,1,72,208ZM24,136V72H168v64Zm160,72a16,16,0,1,1,16-16A16,16,0,0,1,184,208Zm0-96V88h34.58l9.6,24Z"></path>
        </svg>
    );

    const newHotelIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="blue"
            viewBox="0 0 256 256"
        >
            <path d="M240,208H224V115.55a16,16,0,0,0-5.17-11.78l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16Zm-88,0H104V160a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8Z"></path>
        </svg>
    );

    const newRoomIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="blue"
            viewBox="0 0 256 256"
        >
            <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V88H40V56Z"></path>
        </svg>
    );

    const logoutIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="blue"
            viewBox="0 0 256 256"
        >
            <path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40A8,8,0,0,0,168,88v32H104a8,8,0,0,0,0,16h64v32a8,8,0,0,0,13.66,5.66l40-40A8,8,0,0,0,221.66,122.34Z"></path>
        </svg>
    );
    const loginIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="blue"
            viewBox="0 0 256 256"
        >
            <path d="M141.66,133.66l-40,40a8,8,0,0,1-11.32-11.32L116.69,136H24a8,8,0,0,1,0-16h92.69L90.34,93.66a8,8,0,0,1,11.32-11.32l40,40A8,8,0,0,1,141.66,133.66ZM192,32H136a8,8,0,0,0,0,16h56V208H136a8,8,0,0,0,0,16h56a16,16,0,0,0,16-16V48A16,16,0,0,0,192,32Z"></path>
        </svg>
    );

    const signupIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="blue"
            viewBox="0 0 256 256"
        >
            <path d="M92,140a12,12,0,1,1,12-12A12,12,0,0,1,92,140Zm72-24a12,12,0,1,0,12,12A12,12,0,0,0,164,116Zm-12.27,45.23a45,45,0,0,1-47.46,0,8,8,0,0,0-8.54,13.54,61,61,0,0,0,64.54,0,8,8,0,0,0-8.54-13.54ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88.11,88.11,0,0,0-84.09-87.91C120.32,56.38,120,71.88,120,72a8,8,0,0,0,16,0,8,8,0,0,1,16,0,24,24,0,0,1-48,0c0-.73.13-14.3,8.46-30.63A88,88,0,1,0,216,128Z"></path>
        </svg>
    );

    useEffect(() => {
        console.log("userData:", userData);
        if (userData && userData.isAdmin === true) {
            dispatch(authSliceActions.authUpdate(true));
        } else {
            dispatch(authSliceActions.authUpdate(false));
        }
    }, [userData]);

    const loginPageHandle = () => {
        navigate("/login");
    };
    const logoutHandle = () => {
        if (auth) {
            dispatch(authSliceActions.userDataUpdate(null));
            dispatch(authSliceActions.authUpdate(false));
            localStorage.removeItem("userData");
        }
    };
    const signupPageHandle = () => {
        navigate("/register");
    };

    useEffect(() => {
        console.log("auth:", auth);
    }, [auth]);

    return (
        <div className={styles.contain}>
            <div className={styles.layout}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <h3 style={{ textAlign: "center", color: "blue" }}>
                            Admin Page
                        </h3>
                    </div>
                    <div></div>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles["small-navbar"]}>
                            <h4>Main</h4>
                            <div className={styles.link}>
                                <div className={styles["link-items"]}>
                                    {dashboardIcon}
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) => {
                                            return isActive
                                                ? styles.active
                                                : undefined;
                                        }}
                                        end
                                    >
                                        Dashboard
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className={styles["small-navbar"]}>
                            <h4>List</h4>
                            <div className={styles.link}>
                                <div className={styles["link-items"]}>
                                    {userIcon}
                                    <NavLink
                                        to="/user"
                                        className={({ isActive }) => {
                                            return isActive
                                                ? styles.active
                                                : undefined;
                                        }}
                                    >
                                        Users
                                    </NavLink>
                                </div>
                                <div className={styles["link-items"]}>
                                    {hotelIcon}
                                    <NavLink
                                        to="/hotel"
                                        className={({ isActive }) => {
                                            return isActive
                                                ? styles.active
                                                : undefined;
                                        }}
                                    >
                                        Hotels
                                    </NavLink>
                                </div>
                                <div className={styles["link-items"]}>
                                    {roomIcon}
                                    <NavLink
                                        to="/room"
                                        className={({ isActive }) => {
                                            return isActive
                                                ? styles.active
                                                : undefined;
                                        }}
                                    >
                                        Rooms
                                    </NavLink>
                                </div>
                                <div className={styles["link-items"]}>
                                    {transactionIcon}
                                    <NavLink
                                        to="/transactions"
                                        className={({ isActive }) => {
                                            return isActive
                                                ? styles.active
                                                : undefined;
                                        }}
                                    >
                                        Transactions
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        <div className={styles["small-navbar"]}>
                            <h4>New</h4>
                            <div className={styles.link}>
                                <div className={styles["link-items"]}>
                                    {newHotelIcon}
                                    <NavLink
                                        to="/new-hotel"
                                        className={
                                            isHotelEdit
                                                ? ""
                                                : ({ isActive }) => {
                                                      return isActive
                                                          ? styles.active
                                                          : undefined;
                                                  }
                                        }
                                    >
                                        New Hotel
                                    </NavLink>
                                </div>
                                <div className={styles["link-items"]}>
                                    {newRoomIcon}
                                    <NavLink
                                        to="/new-room"
                                        className={({ isActive }) => {
                                            return isActive
                                                ? styles.active
                                                : undefined;
                                        }}
                                    >
                                        New Room
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className={styles["small-navbar"]}>
                            <h4>User</h4>
                            <div className={styles.link}>
                                {auth && (
                                    <div className={styles["link-items"]}>
                                        {logoutIcon}
                                        <button onClick={logoutHandle}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                                {!auth && (
                                    <div className={styles.unauthor}>
                                        <div className={styles["link-items"]}>
                                            {loginIcon}
                                            <button onClick={loginPageHandle}>
                                                Login
                                            </button>
                                        </div>
                                        <div className={styles["link-items"]}>
                                            {signupIcon}
                                            <button onClick={signupPageHandle}>
                                                Signup
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
