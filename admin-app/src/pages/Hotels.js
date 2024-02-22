import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import styles from "./Hotels.module.css";
import { getTransactionsSliceActions } from "../store/getTransactionsSlice";
import { isHotelEditSliceActions } from "../store/isHotelEditSlice";
import postToCheck from "../misc/postToCheck";

const Hotels = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData"))
        : null;

    const auth = useSelector((state) => {
        return state.authSlice.auth;
    });
    const { transactionData } = useSelector((state) => {
        return state.getTransactionsSlice;
    });

    const [hotelData, setHotelData] = useState(null);
    const [errorDeleteMessage, setErrorDeleteMessage] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [hotelIdDelete, setHotelIdDelete] = useState(null);

    useEffect(() => {
        dispatch(getTransactionsSliceActions());
    }, [dispatch]);

    useEffect(() => {
        if (transactionData && transactionData.hotelData) {
            setHotelData(transactionData.hotelData);
        }
    }, [transactionData]);

    const addNewHandle = () => {
        navigate("/new-hotel");
    };

    const postDeleteHotel = async (hotelId) => {
        const response = await fetch(
            "http://localhost:5000/post-delete-hotel",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    User: localStorage.getItem("userData"),
                },
                body: JSON.stringify({
                    hotelId: hotelId,
                }),
            }
        );
        const data = await response.json();
        if (!response.ok) {
            setErrorDeleteMessage(data.message);
        } else {
            setErrorDeleteMessage(null);
            setHotelIdDelete(null);
            setDeleteConfirm(false);
            navigate("/");
        }
    };

    const deleteHandle = (hotelId) => {
        setHotelIdDelete(hotelId);
        setDeleteConfirm(true);
    };

    const noHandle = () => {
        setHotelIdDelete(null);
        setDeleteConfirm(false);
    };

    const yesHandle = () => {
        try {
            postDeleteHotel(hotelIdDelete);
        } catch (err) {
            console.log("err:", err);
        }
    };

    const okHandle = () => {
        setErrorDeleteMessage(null);
    };

    const editHandle = (hotelId, hotelEditData) => {
        dispatch(isHotelEditSliceActions.hotelEditDataUpdate(hotelEditData));
        navigate(`/new-hotel/${hotelId}`);
    };

    useEffect(() => {
        console.log("userData:", userData);
    }, [userData]);

    useEffect(() => {
        console.log("transactionData:", transactionData);
    }, [transactionData]);
    return (
        <div className={styles.contain}>
            <Helmet>
                <title>Booking Admin Hotel Page</title>
            </Helmet>
            {auth && (
                <div>
                    <div className={styles.header}>
                        <h4 style={{ color: "rgb(156, 153, 153)" }}>
                            Hotel List
                        </h4>
                        <button onClick={addNewHandle}>Add New</button>
                    </div>
                    <div className={styles["list-contain"]}>
                        <div>
                            <div className={styles["list-details"]}>
                                <div className={styles["items"]}>
                                    <input type="checkbox" />
                                    <span>|</span>
                                </div>
                                <div className={styles["items"]}>
                                    <p>ID</p>
                                    <span>|</span>
                                </div>
                                <div className={styles["items"]}>
                                    <p>Name</p>
                                    <span>|</span>
                                </div>
                                <div className={styles["items"]}>
                                    <p>Type</p>
                                    <span>|</span>
                                </div>
                                <div className={styles["items"]}>
                                    <p>Title</p>
                                    <span>|</span>
                                </div>
                                <div className={styles["items"]}>
                                    <p>City</p>
                                    <span>|</span>
                                </div>
                                <div className={styles["items"]}>
                                    <p>Admin</p>
                                    <span>|</span>
                                </div>
                            </div>
                            <div></div>
                        </div>
                        <div>
                            {hotelData &&
                                hotelData.length > 0 &&
                                hotelData.map((item) => {
                                    return (
                                        <div
                                            key={item._id}
                                            className={styles["list-details"]}
                                        >
                                            <div className={styles["items"]}>
                                                <input type="checkbox" />
                                            </div>
                                            <div className={styles["items"]}>
                                                <p>{item._id}</p>
                                            </div>
                                            <div className={styles["items"]}>
                                                <p>{item.name}</p>
                                            </div>
                                            <div className={styles["items"]}>
                                                <p>{item.type}</p>
                                            </div>
                                            <div className={styles["items"]}>
                                                <p>{item.title}</p>
                                            </div>
                                            <div className={styles["items"]}>
                                                <p>{item.city}</p>
                                            </div>
                                            <div className={styles["buttons"]}>
                                                <button
                                                    onClick={() =>
                                                        deleteHandle(item._id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        editHandle(
                                                            item._id,
                                                            item
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            <div></div>
                        </div>
                    </div>
                    <div className={styles.small}>
                        {hotelData &&
                            hotelData.length &&
                            hotelData.map((item) => {
                                return (
                                    <ul key={item._id} className={styles.ul}>
                                        <li>
                                            <p>ID: {item._id}</p>
                                            <p>Name: {item.name}</p>
                                            <p>Type: {item.type}</p>
                                            <p>Title: {item.title}</p>
                                            <p>City: {item.city}</p>
                                        </li>
                                        <div className={styles["ul-button"]}>
                                            <button
                                                onClick={() =>
                                                    deleteHandle(item._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() =>
                                                    editHandle(item._id, item)
                                                }
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </ul>
                                );
                            })}
                    </div>

                    {deleteConfirm &&
                        createPortal(
                            <div className={styles["delete-confirm"]}>
                                <div
                                    className={styles["delete-confirm-details"]}
                                >
                                    <p>Are you sure to delete this hotel?</p>
                                    <div>
                                        <button onClick={yesHandle}>Yes</button>
                                        <button onClick={noHandle}>No</button>
                                    </div>
                                </div>
                            </div>,
                            document.body
                        )}
                    {errorDeleteMessage && (
                        <div className={styles["delete-confirm"]}>
                            <div className={styles["delete-confirm-details"]}>
                                <p>{errorDeleteMessage}</p>
                                <button onClick={okHandle}>OK</button>
                            </div>
                        </div>
                    )}
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

export default Hotels;
