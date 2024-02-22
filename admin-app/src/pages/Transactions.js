import { Helmet } from "react-helmet";
import styles from "./Transactions.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getTransactionsSliceActions } from "../store/getTransactionsSlice";

const Transactions = () => {
    const dispatch = useDispatch();
    const { transactionData } = useSelector((state) => {
        return state.getTransactionsSlice;
    });
    const auth = useSelector((state) => {
        return state.authSlice.auth;
    });
    const [transactions, setTransactions] = useState([]);
    const [hotelData, setHotelData] = useState([]);
    const [roomData, setRoomData] = useState([]);

    useEffect(() => {
        dispatch(getTransactionsSliceActions());
    }, [dispatch]);

    useEffect(() => {
        if (transactionData && transactionData.transactionData) {
            setTransactions(transactionData.transactionData);
        }
        if (transactionData && transactionData.hotelData) {
            setHotelData(transactionData.hotelData);
        }
        if (transactionData && transactionData.roomData) {
            setRoomData(transactionData.roomData);
        }
    }, [transactionData]);

    const hotelNameChanger = (hotelId) => {
        if (hotelData && hotelData.length > 0) {
            const hotelName = hotelData.find((hotel) => {
                return hotel._id === hotelId;
            }).name;
            return hotelName;
        }
    };

    const dateConvert = (date) => {
        const convert = new Date(date);
        const dd = String(convert.getDate()).padStart(2, 0);
        const mm = String(convert.getMonth() + 1).padStart(2, 0);
        const yyyy = String(convert.getFullYear());
        return mm + "/" + dd + "/" + yyyy;
    };

    const roomNumberHandle = (roomArr) => {
        let roomNumbers = [];
        for (let i = 0; i < roomArr.length; i++) {
            roomNumbers.push(roomArr[i].roomNumber);
        }
        return (
            <>
                {roomNumbers.length > 1 && (
                    <p>
                        {roomNumbers
                            .slice(0, roomNumbers.length - 1)
                            .map((number) => {
                                return number;
                            })}
                        , {roomNumbers[roomNumbers.length - 1]}
                    </p>
                )}
                {roomNumbers.length === 1 && <p>{roomNumbers[0]}</p>}
            </>
        );
    };

    return (
        <div className={styles.contain}>
            <Helmet>
                <title>Booking Admin Transaction Page</title>
            </Helmet>
            {auth && (
                <div className={styles.transactions}>
                    <h3 style={{ fontSize: "18px" }}>Transactions List</h3>
                    <div className={styles["content"]}>
                        <div className={styles["header"]}>
                            <div className={styles.items}>
                                <input type="checkbox" />
                                <span>|</span>
                            </div>
                            <div className={styles.items}>
                                <p>ID</p>
                                <span>|</span>
                            </div>
                            <div className={styles.items}>
                                <p>User</p>
                                <span>|</span>
                            </div>
                            <div className={styles.items}>
                                <p>Hotel</p>
                                <span>|</span>
                            </div>
                            <div className={styles.items}>
                                <p>Rooms</p>
                                <span>|</span>
                            </div>
                            <div className={styles.items}>
                                <p>Date</p>
                                <span>|</span>
                            </div>
                            <div className={styles.items}>
                                <p>Price</p>
                                <span>|</span>
                            </div>
                            <div className={styles.items}>
                                <p>Payment Method</p>
                                <span>|</span>
                            </div>
                            <div className={styles.items}>
                                <p>Status</p>
                                <span>|</span>
                            </div>
                        </div>
                        <div className={styles.large}>
                            {transactions &&
                                transactions.length > 0 &&
                                transactions.map((trans) => {
                                    return (
                                        <div
                                            key={trans._id}
                                            className={styles["header"]}
                                        >
                                            <div className={styles.items}>
                                                <input type="checkbox" />
                                            </div>
                                            <div className={styles.items}>
                                                <p>{trans._id}</p>
                                            </div>
                                            <div className={styles.items}>
                                                <p>{trans.userName}</p>
                                            </div>
                                            <div className={styles.items}>
                                                <p>
                                                    {hotelNameChanger(
                                                        trans.hotel
                                                    )}
                                                </p>
                                            </div>
                                            <div className={styles.items}>
                                                {roomNumberHandle(trans.room)}
                                            </div>
                                            <div className={styles.items}>
                                                <p>
                                                    {dateConvert(
                                                        trans.dateStart
                                                    )}{" "}
                                                    -{" "}
                                                    {dateConvert(trans.dateEnd)}
                                                </p>
                                            </div>
                                            <div className={styles.items}>
                                                <p>${trans.price}</p>
                                            </div>
                                            <div className={styles.items}>
                                                <p>{trans.payment}</p>
                                            </div>
                                            <div className={styles.items}>
                                                <p className={styles.status}>
                                                    {trans.status}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className={styles.small}>
                            {transactions && transactions.length > 0 && (
                                <ul>
                                    {transactions.map((trans) => {
                                        return (
                                            <div className={styles.li}>
                                                <li key={trans._id}>
                                                    <p>ID: {trans._id}</p>
                                                    <p>
                                                        User: {trans.userName}
                                                    </p>
                                                    <p>
                                                        Hotel:{" "}
                                                        {hotelNameChanger(
                                                            trans.hotel
                                                        )}
                                                    </p>
                                                    <p
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: "1em",
                                                            margin: "-1em 0",
                                                        }}
                                                    >
                                                        Rooms:{" "}
                                                        {roomNumberHandle(
                                                            trans.room
                                                        )}
                                                    </p>
                                                    <p>
                                                        Date:{" "}
                                                        {dateConvert(
                                                            trans.dateStart
                                                        )}{" "}
                                                        -{" "}
                                                        {dateConvert(
                                                            trans.dateEnd
                                                        )}
                                                    </p>
                                                    <p>Price: ${trans.price}</p>
                                                    <p>
                                                        Payment Method:{" "}
                                                        {trans.method}
                                                    </p>
                                                    <p>
                                                        Status: {trans.status}
                                                    </p>
                                                </li>
                                            </div>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {!auth && (
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "3em",
                        fontSize: "18px",
                    }}
                >
                    Please login admin account to manage!
                </p>
            )}
        </div>
    );
};

export default Transactions;
