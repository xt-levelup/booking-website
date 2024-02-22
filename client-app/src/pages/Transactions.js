import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./Transactions.module.css";

const Transactions = () => {
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("userData")) || null
    );
    const [transactionData, setTransactionData] = useState(null);
    const [errorMeesage, setErrorMessage] = useState(null);
    const auth = useSelector((state) => {
        return state.authSlice.auth;
    });

    const postTransactions = async () => {
        const response = await fetch(
            "http://localhost:5000/post-transactions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userData: userData,
                }),
            }
        );
        const data = await response.json();
        if (!response.ok) {
            setErrorMessage(data.message || "Cannot post to server!");
            setTransactionData(null);
        } else {
            setTransactionData(data);
            setErrorMessage(null);
        }
    };

    const dateConvert = (date) => {
        const convert = new Date(date);
        const dd = String(convert.getDate()).padStart(2, 0);
        const mm = String(convert.getMonth() + 1).padStart(2, 0);
        const yyyy = String(convert.getFullYear());
        return mm + "/" + dd + "/" + yyyy;
    };

    useEffect(() => {
        try {
            postTransactions();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div className={styles.contain}>
            <Helmet>
                <title>Booking Transaction Page</title>
            </Helmet>
            {auth && (
                <div>
                    <div className={styles.large}>
                        <h2>Your Transactions</h2>
                        <div>
                            <div className={styles["table-head"]}>
                                <div className={styles["border-head"]}>#</div>
                                <div className={styles["border-head"]}>
                                    Hotel
                                </div>
                                <div className={styles["border-head"]}>
                                    Room
                                </div>
                                <div className={styles["border-head"]}>
                                    Date
                                </div>
                                <div className={styles["border-head"]}>
                                    Price
                                </div>
                                <div className={styles["border-head"]}>
                                    Payment Method
                                </div>
                                <div className={styles["border-head"]}>
                                    Status
                                </div>
                            </div>
                            <div>
                                {transactionData &&
                                    transactionData.length > 0 &&
                                    transactionData.map((data, index) => {
                                        return (
                                            <div
                                                className={styles["table-list"]}
                                                // style={{ backgroundColor: "black" }}
                                                style={
                                                    parseInt(index) % 2 === 0
                                                        ? {
                                                              backgroundColor:
                                                                  "rgb(228, 225, 225)",
                                                          }
                                                        : undefined
                                                }
                                                key={data._id}
                                            >
                                                <div
                                                    className={
                                                        styles["border-list"]
                                                    }
                                                >
                                                    {index + 1}
                                                </div>
                                                <div
                                                    className={
                                                        styles["border-list"]
                                                    }
                                                >
                                                    {data.hotel}
                                                </div>
                                                <div
                                                    className={
                                                        styles["border-list"]
                                                    }
                                                >
                                                    {data.room.slice(
                                                        0,
                                                        data.room.length - 1
                                                    ) &&
                                                        data.room.slice(
                                                            0,
                                                            data.room.length - 1
                                                        ).length > 0 &&
                                                        data.room
                                                            .slice(
                                                                0,
                                                                data.room
                                                                    .length - 1
                                                            )
                                                            .map((room) => {
                                                                return (
                                                                    <span>
                                                                        {
                                                                            room.roomNumber
                                                                        }
                                                                        ,{" "}
                                                                    </span>
                                                                );
                                                            })}
                                                    <span>
                                                        {
                                                            data.room[
                                                                data.room
                                                                    .length - 1
                                                            ].roomNumber
                                                        }
                                                    </span>
                                                </div>

                                                <div
                                                    className={
                                                        styles["border-list"]
                                                    }
                                                >
                                                    {dateConvert(
                                                        data.dateStart
                                                    )}{" "}
                                                    -{" "}
                                                    {dateConvert(data.dateEnd)}
                                                </div>
                                                <div
                                                    className={
                                                        styles["border-list"]
                                                    }
                                                >
                                                    ${data.price}
                                                </div>
                                                <div
                                                    className={
                                                        styles["border-list"]
                                                    }
                                                >
                                                    {data.payment}
                                                </div>
                                                <div
                                                    className={
                                                        styles["border-list"]
                                                    }
                                                >
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                "rgb(100,180,100)",
                                                            padding: "6px 3px",
                                                            borderRadius: "3px",
                                                        }}
                                                    >
                                                        {data.status}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className={styles["for-small"]}>
                        <h2>Your Transactions</h2>
                        <div>
                            <div className={styles["head"]}>
                                <div
                                    className={
                                        styles["border-list-small-header"]
                                    }
                                >
                                    #
                                </div>
                                <div
                                    className={
                                        styles["border-list-small-header"]
                                    }
                                >
                                    Details
                                </div>
                            </div>
                            <div>
                                {transactionData &&
                                    transactionData.length > 0 &&
                                    transactionData.map((data, index) => {
                                        return (
                                            <div
                                                key={data._id}
                                                className={styles["head"]}
                                                style={
                                                    parseInt(index) % 2 === 0
                                                        ? {
                                                              backgroundColor:
                                                                  "rgb(228, 225, 225)",
                                                          }
                                                        : undefined
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles[
                                                            "border-list-small-header"
                                                        ]
                                                    }
                                                >
                                                    {index + 1}
                                                </div>
                                                <div
                                                    className={
                                                        styles[
                                                            "border-list-small"
                                                        ]
                                                    }
                                                >
                                                    <ul className={styles.ul}>
                                                        <li>
                                                            Hotel: {data.hotel}
                                                        </li>
                                                        <li
                                                            className={
                                                                styles.number
                                                            }
                                                        >
                                                            Rooms:{" "}
                                                            {data.room.map(
                                                                (number) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                number.roomNumber
                                                                            }
                                                                        >
                                                                            {
                                                                                number.roomNumber
                                                                            }
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </li>
                                                        <li>
                                                            Date:{" "}
                                                            {dateConvert(
                                                                data.dateStart
                                                            )}{" "}
                                                            -{" "}
                                                            {dateConvert(
                                                                data.dateEnd
                                                            )}
                                                        </li>
                                                        <li>
                                                            Price: ${data.price}
                                                        </li>
                                                        <li>
                                                            Payment Method:{" "}
                                                            {data.payment}
                                                        </li>
                                                        <li>
                                                            Status:{" "}
                                                            {data.status}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;
