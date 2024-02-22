import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Dashboard.module.css";
import { getTransactionsSliceActions } from "../store/getTransactionsSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => {
        return state.authSlice.auth;
    });
    const userData = useSelector((state) => {
        return state.authSlice.userData;
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const { transactionData, transactionStatus, transactionErrorMessage } =
        useSelector((state) => {
            return state.getTransactionsSlice;
        });
    const [userNumber, setUserNumber] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0);
    const [earnings, setEarnings] = useState(0);
    const [balance, setBalance] = useState(0);
    const [nearestOrder, setNearestOrder] = useState([]);

    const userIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="red"
            viewBox="0 0 256 256"
        >
            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
        </svg>
    );

    const orderIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="orange"
            viewBox="0 0 256 256"
        >
            <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path>
        </svg>
    );

    const earningIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="rgb(100,255,100)"
            viewBox="0 0 256 256"
        >
            <path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path>
        </svg>
    );

    const balanceIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="blue"
            viewBox="0 0 256 256"
        >
            <path d="M223.16,68.42l-16-32A8,8,0,0,0,200,32H56a8,8,0,0,0-7.16,4.42l-16,32A8.08,8.08,0,0,0,32,72V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V72A8.08,8.08,0,0,0,223.16,68.42ZM60.94,48H195.06l8,16H52.94ZM208,208H48V80H208V208Zm-42.34-61.66a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L120,164.69V104a8,8,0,0,1,16,0v60.69l18.34-18.35A8,8,0,0,1,165.66,146.34Z"></path>
        </svg>
    );

    const dateConvert = (date) => {
        const convert = new Date(date);
        const dd = String(convert.getDate()).padStart(2, 0);
        const mm = String(convert.getMonth() + 1).padStart(2, 0);
        const yyyy = String(convert.getFullYear());
        return mm + "/" + dd + "/" + yyyy;
    };

    useEffect(() => {
        if (transactionData) {
            setUserNumber(transactionData.userData.length);
            setOrderNumber(transactionData.transactionData.length);
            const listDate =
                transactionData.transactionData &&
                transactionData.transactionData.length > 0 &&
                transactionData.transactionData.map((transaction) => {
                    return dateConvert(transaction.dateStart);
                });
            const listYear =
                listDate &&
                listDate.length > 0 &&
                listDate
                    .map((date) => {
                        return date.substring(date.length - 4);
                    })
                    .filter((value, index, arr) => {
                        return arr.indexOf(value) === index;
                    });
            const listMonth =
                listDate &&
                listDate.length > 0 &&
                listDate
                    .map((year) => {
                        return year.slice(0, 2);
                    })
                    .filter((value, index, arr) => {
                        return arr.indexOf(value) === index;
                    });
            const listMonthData = [];
            for (let i = 0; i < listYear.length; i++) {
                for (let j = 0; j < listMonth.length; j++) {
                    const monthData = transactionData.transactionData.filter(
                        (data) => {
                            const year = dateConvert(data.dateStart).substring(
                                dateConvert(data.dateStart).length - 4
                            );
                            const month = dateConvert(data.dateStart).slice(
                                0,
                                2
                            );
                            return (
                                year === listYear[i] && month === listMonth[j]
                            );
                        }
                    );
                    listMonthData.push(monthData);
                }
            }
            const priceList =
                transactionData.transactionData &&
                transactionData.transactionData.length > 0 &&
                transactionData.transactionData
                    .map((transaction) => {
                        return transaction.price;
                    })
                    .reduce((acc, curr) => {
                        return parseFloat(acc) + parseFloat(curr);
                    }, 0);

            setBalance(priceList / listMonthData.length);
            setEarnings(priceList);

            const nearestOrderTemp =
                transactionData.transactionData &&
                transactionData.transactionData.length > 0 &&
                transactionData.transactionData
                    .slice()
                    .sort((a, b) => {
                        return b.dateCreate - a.dateCreate;
                    })
                    .slice(0, 8);

            setNearestOrder(nearestOrderTemp);
        } else {
            setUserNumber(0);
            setOrderNumber(0);
            setEarnings(0);
            setBalance(0);
            setNearestOrder([]);
        }
    }, [transactionData]);

    const hotelNameChanger = (hotelId) => {
        if (
            transactionData &&
            transactionData.hotelData &&
            transactionData.hotelData.length > 0
        ) {
            const hotelName = transactionData.hotelData.find((hotel) => {
                return hotel._id.toString() === hotelId.toString();
            }).name;
            return hotelName;
        } else {
            return hotelId;
        }
    };

    useEffect(() => {
        dispatch(getTransactionsSliceActions());
    }, [dispatch]);

    return (
        <div>
            <Helmet>
                <title>Booking Admin Home Page</title>
            </Helmet>
            {auth && (
                <div>
                    <div className={styles.top}>
                        <div className={styles["top-item"]}>
                            <h4 style={{ color: "rgb(156, 153, 153)" }}>
                                USERS
                            </h4>
                            <p>{userNumber}</p>
                            <div className={styles["top-icon"]}>
                                <div className={styles["user-icon"]}>
                                    {userIcon}
                                </div>
                            </div>
                        </div>
                        <div className={styles["top-item"]}>
                            <h4 style={{ color: "rgb(156, 153, 153)" }}>
                                ORDERS
                            </h4>
                            <p>{orderNumber}</p>
                            <div className={styles["top-icon"]}>
                                <div className={styles["order-icon"]}>
                                    <div>{orderIcon}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles["top-item"]}>
                            <h4 style={{ color: "rgb(156, 153, 153)" }}>
                                EARNINGS
                            </h4>
                            <p>${earnings}</p>
                            <div className={styles["top-icon"]}>
                                <div className={styles["earning-icon"]}>
                                    <div>{earningIcon}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles["top-item"]}>
                            <h4 style={{ color: "rgb(156, 153, 153)" }}>
                                BALANCE
                            </h4>
                            <p>${balance}</p>
                            <div className={styles["top-icon"]}>
                                <div className={styles["balance-icon"]}>
                                    <div>{balanceIcon}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.list}>
                        <div className={styles["list-items"]}>
                            <h2 style={{ color: "rgb(156, 153, 153)" }}>
                                Latest Transactions
                            </h2>
                            <div className={styles["large-details"]}>
                                <div className={styles["list-head"]}>
                                    <div className={styles.caption}>
                                        <input type="checkbox" />
                                        <span>|</span>
                                    </div>
                                    <div className={styles.caption}>
                                        <p>ID</p>
                                        <span>|</span>
                                    </div>
                                    <div className={styles.caption}>
                                        <p>User</p>
                                        <span>|</span>
                                    </div>
                                    <div className={styles.caption}>
                                        <p>Hotel</p>
                                        <span>|</span>
                                    </div>
                                    <div className={styles.caption}>
                                        <p>Room</p>
                                        <span>|</span>
                                    </div>
                                    <div className={styles.caption}>
                                        <p>Date</p>
                                        <span>|</span>
                                    </div>
                                    <div className={styles.caption}>
                                        <p>Price</p>
                                        <span>|</span>
                                    </div>
                                    <div className={styles.caption}>
                                        <p>Payment Method</p>
                                        <span>|</span>
                                    </div>
                                    <div className={styles.caption}>
                                        <p>Status</p>
                                        <span>|</span>
                                    </div>
                                </div>
                                {nearestOrder &&
                                    nearestOrder.length > 0 &&
                                    nearestOrder.map((item) => {
                                        return (
                                            <div
                                                key={item._item}
                                                className={styles["list-head"]}
                                            >
                                                <div
                                                    className={
                                                        styles[
                                                            "caption-content"
                                                        ]
                                                    }
                                                >
                                                    <input type="checkbox" />
                                                </div>
                                                <div
                                                    className={
                                                        styles[
                                                            "caption-content"
                                                        ]
                                                    }
                                                >
                                                    <p>{item._id}</p>
                                                </div>
                                                <div
                                                    className={
                                                        styles[
                                                            "caption-content"
                                                        ]
                                                    }
                                                >
                                                    <p>{item.userName}</p>
                                                </div>
                                                <div
                                                    className={
                                                        styles[
                                                            "caption-content"
                                                        ]
                                                    }
                                                >
                                                    <p>
                                                        {hotelNameChanger(
                                                            item.hotel
                                                        )}
                                                    </p>
                                                </div>
                                                <div
                                                    className={
                                                        styles[
                                                            "caption-content"
                                                        ]
                                                    }
                                                >
                                                    {item.room &&
                                                        item.room.length >
                                                            1 && (
                                                            <p>
                                                                {item.room
                                                                    .slice(
                                                                        0,
                                                                        item
                                                                            .room
                                                                            .length -
                                                                            1
                                                                    )
                                                                    .map(
                                                                        (
                                                                            room
                                                                        ) => {
                                                                            return room.roomNumber;
                                                                        }
                                                                    )}
                                                                ,{" "}
                                                            </p>
                                                        )}{" "}
                                                    {
                                                        item.room[
                                                            item.room.length - 1
                                                        ].roomNumber
                                                    }
                                                </div>
                                                <div
                                                    className={
                                                        styles[
                                                            "caption-content"
                                                        ]
                                                    }
                                                >
                                                    <p>
                                                        {dateConvert(
                                                            item.dateStart
                                                        )}{" "}
                                                        -{" "}
                                                        {dateConvert(
                                                            item.dateEnd
                                                        )}
                                                    </p>
                                                </div>
                                                <div
                                                    className={
                                                        styles[
                                                            "caption-content"
                                                        ]
                                                    }
                                                >
                                                    <p>${item.price}</p>
                                                </div>
                                                <div
                                                    className={
                                                        styles[
                                                            "caption-content"
                                                        ]
                                                    }
                                                >
                                                    <p>{item.payment}</p>
                                                </div>
                                                <div
                                                    className={
                                                        styles[
                                                            "caption-content"
                                                        ]
                                                    }
                                                >
                                                    <p>{item.status}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className={styles["small-details"]}>
                                {nearestOrder && nearestOrder.length > 0 && (
                                    <div>
                                        <ul>
                                            {nearestOrder.map((item) => {
                                                return (
                                                    <li key={item._id}>
                                                        <p>ID: {item._id}</p>
                                                        <p>
                                                            User:{" "}
                                                            {item.userName}
                                                        </p>
                                                        <p>
                                                            Hotel:{" "}
                                                            {hotelNameChanger(
                                                                item.hotel
                                                            )}
                                                        </p>
                                                        <p
                                                            style={{
                                                                display: "flex",
                                                                gap: "1em",
                                                                alignItems:
                                                                    "center",
                                                                marginTop:
                                                                    "-1em",
                                                                marginBottom:
                                                                    "-1em",
                                                            }}
                                                        >
                                                            Room:{" "}
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    gap: "1em",
                                                                }}
                                                            >
                                                                {item.room.map(
                                                                    (room) => {
                                                                        return (
                                                                            <p>
                                                                                {
                                                                                    room.roomNumber
                                                                                }
                                                                            </p>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>
                                                        </p>
                                                        <p>
                                                            Date:{" "}
                                                            {dateConvert(
                                                                item.dateStart
                                                            )}{" "}
                                                            -{" "}
                                                            {dateConvert(
                                                                item.dateEnd
                                                            )}
                                                        </p>
                                                        <p>
                                                            Price: ${item.price}
                                                        </p>
                                                        <p>
                                                            Payment Method:{" "}
                                                            {item.payment}
                                                        </p>
                                                        <p>
                                                            Status:{" "}
                                                            {item.status}
                                                        </p>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!auth && (
                <p style={{ textAlign: "center", marginTop: "3em" }}>
                    Please login admin account to manage!
                </p>
            )}
        </div>
    );
};

export default Dashboard;
