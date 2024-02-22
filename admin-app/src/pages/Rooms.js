import { Helmet } from "react-helmet";
import styles from "./Rooms.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getTransactionsSliceActions } from "../store/getTransactionsSlice";
import { isRoomEditSliceActions } from "../store/isRoomEditSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData"))
        : null;
    const { transactionData, transactionErrorMessage } = useSelector(
        (state) => {
            return state.getTransactionsSlice;
        }
    );
    const auth = useSelector((state) => {
        return state.authSlice.auth;
    });
    const [roomData, setRoomData] = useState([]);
    const [errorPostDeleteRoom, setErrorPostDeleteRoom] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [roomIdToDelete, setRoomIdToDelete] = useState(null);

    useEffect(() => {
        dispatch(getTransactionsSliceActions());
    }, [dispatch]);

    useEffect(() => {
        if (transactionData && transactionData.roomData) {
            setRoomData(transactionData.roomData);
        }
    }, [transactionData]);

    const addNewButtonHandle = () => {
        navigate("/new-room");
    };

    const postDeleteRoom = async (roomId) => {
        const response = await fetch("http://localhost:5000/post-delete-room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                userData: userData,
                User: localStorage.getItem("userData"),
            },
            body: JSON.stringify({
                roomId: roomId,
            }),
        });
        const data = await response.json();

        if (!response.ok) {
            setErrorPostDeleteRoom(
                data && data.message ? data.message : "Something went wrong!"
            );
        } else {
            setErrorPostDeleteRoom(null);
            navigate("/");
        }
    };

    const deleteHandle = (roomId) => {
        setRoomIdToDelete(roomId);
        setConfirmDelete(true);
    };
    const yesConfirm = () => {
        try {
            postDeleteRoom(roomIdToDelete);
            setConfirmDelete(false);
        } catch (err) {
            console.log("err from catch post delete:", err);
        }
    };
    const noConfirm = () => {
        setConfirmDelete(false);
    };

    const okButton = () => {
        setErrorPostDeleteRoom(false);
    };

    const editHandle = (roomEditId, roomEditData) => {
        dispatch(isRoomEditSliceActions.roomEditDataUpdate(roomEditData));
        navigate(`/new-room/${roomEditId}`);
    };

    return (
        <div className={styles.contain}>
            <Helmet>
                <title>Booking Admin Room Page</title>
            </Helmet>
            {auth && (
                <div>
                    <div className={styles.header}>
                        <h3
                            style={{
                                fontSize: "18px",
                                color: "rgb(156, 153, 153)",
                            }}
                        >
                            Room List
                        </h3>
                        <button onClick={addNewButtonHandle}>Add New</button>
                    </div>
                    <div className={styles["details"]}>
                        <div className={styles["details-header"]}>
                            <div className={styles["items"]}>
                                <input type="checkbox" />
                                <span>|</span>
                            </div>
                            <div className={styles["items"]}>
                                <p>ID</p>
                                <span>|</span>
                            </div>
                            <div className={styles["items"]}>
                                <p>Title</p>
                                <span>|</span>
                            </div>
                            <div className={styles["items"]}>
                                <p>Description</p>
                                <span>|</span>
                            </div>
                            <div className={styles["items"]}>
                                <p>Price</p>
                                <span>|</span>
                            </div>
                            <div className={styles["items"]}>
                                <p>Max People</p>
                                <span>|</span>
                            </div>
                            <div className={styles["items"]}>
                                <p>Action</p>
                                <span>|</span>
                            </div>
                        </div>
                        <div className={styles.large}>
                            {roomData &&
                                roomData.length > 0 &&
                                roomData.map((room) => {
                                    return (
                                        <div
                                            key={room._id}
                                            className={styles["details-header"]}
                                        >
                                            <div className={styles["items"]}>
                                                <input type="checkbox" />
                                            </div>
                                            <div className={styles["items"]}>
                                                <p>{room._id}</p>
                                            </div>
                                            <div className={styles["items"]}>
                                                <p>{room.title}</p>
                                            </div>
                                            <div className={styles["items"]}>
                                                <p>{room.desc}</p>
                                            </div>
                                            <div className={styles["items"]}>
                                                <p>${room.price}</p>
                                            </div>
                                            <div className={styles["items"]}>
                                                <p>{room.maxPeople}</p>
                                            </div>
                                            <div className={styles["buttons"]}>
                                                <button
                                                    onClick={() =>
                                                        deleteHandle(room._id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        editHandle(
                                                            room._id,
                                                            room
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className={styles.small}>
                            {roomData && roomData.length > 0 && (
                                <ul>
                                    {roomData.map((room) => {
                                        return (
                                            <div
                                                key={room._id}
                                                className={styles["small-room"]}
                                            >
                                                <li>
                                                    <p>ID: {room._id}</p>
                                                    <p>Title: {room.title}</p>
                                                    <p>
                                                        Description: {room.desc}
                                                    </p>
                                                    <p>Price: ${room.price}</p>
                                                    <p>
                                                        Max People:{" "}
                                                        {room.maxPeople}
                                                    </p>
                                                </li>
                                                <div className={styles.buttons}>
                                                    <button
                                                        onClick={() =>
                                                            deleteHandle(
                                                                room._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            editHandle(
                                                                room._id,
                                                                room
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                    {confirmDelete && (
                        <div className={styles["delete-confirm"]}>
                            <div className={styles["confirm"]}>
                                <p>Delete this room?</p>
                                <div className={styles["delete-button"]}>
                                    <button
                                        onClick={yesConfirm}
                                        style={{ backgroundColor: "red" }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={noConfirm}
                                        style={{ backgroundColor: "blue" }}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {errorPostDeleteRoom && (
                        <div className={styles["delete-confirm"]}>
                            <div className={styles["confirm"]}>
                                <p>{errorPostDeleteRoom}</p>
                                <div className={styles["delete-button"]}>
                                    <button
                                        onClick={okButton}
                                        style={{ backgroundColor: "blue" }}
                                    >
                                        OK
                                    </button>
                                </div>
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

export default Rooms;
