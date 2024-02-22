import { Helmet } from "react-helmet";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTransactionsSliceActions } from "../store/getTransactionsSlice";
import { isRoomEditSliceActions } from "../store/isRoomEditSlice";
import styles from "./NewRoom.module.css";

const NewRoom = () => {
    const { transactionData, transactionErrorMessage } = useSelector(
        (state) => {
            return state.getTransactionsSlice;
        }
    );
    const isRoomEdit = useSelector((state) => {
        return state.isRoomEditSlice.isRoomEdit;
    });
    const roomEditData = useSelector((state) => {
        return state.isRoomEditSlice.roomEditData;
    });
    const auth = useSelector((state) => {
        return state.authSlice.auth;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const userData = localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData"))
        : null;
    const [hotelData, setHotelData] = useState([]);
    const titleRef = useRef();
    const priceRef = useRef();
    const descRef = useRef();
    const maxPeopleRef = useRef();
    const roomsRef = useRef();
    const hotelRef = useRef();

    useEffect(() => {
        if (params.roomId) {
            dispatch(isRoomEditSliceActions.isRoomEditUpdate(true));
        } else {
            dispatch(isRoomEditSliceActions.isRoomEditUpdate(false));
        }
    }, [params.roomId]);

    useEffect(() => {
        if (isRoomEdit && roomEditData) {
            titleRef.current.value = roomEditData.title;
            priceRef.current.value = roomEditData.price;
            descRef.current.value = roomEditData.desc;
            maxPeopleRef.current.value = roomEditData.maxPeople;
            roomsRef.current.value = roomEditData.roomNumbers.join(",");
        }
    }, [isRoomEdit, roomEditData]);

    useEffect(() => {
        dispatch(getTransactionsSliceActions());
    }, [dispatch]);

    useEffect(() => {
        if (transactionData && transactionData.hotelData) {
            setHotelData(transactionData.hotelData);
        }
    }, [transactionData]);

    const validHandle = () => {
        let valid = true;

        if (
            !titleRef.current.value ||
            !priceRef.current.value ||
            !descRef.current.value ||
            !maxPeopleRef.current.value ||
            !roomsRef.current.value ||
            !hotelRef.current.value
        ) {
            valid = false;
            window.alert("Please fill all fields!");
            return valid;
        }
        if (parseInt(priceRef.current.value) < 0) {
            window.alert("Price must be positive integer number");
            valid = false;
            return valid;
        }
        if (parseInt(maxPeopleRef.current.value) < 1) {
            window.alert(
                "Max People must be positive integer number and lager than 0"
            );
            valid = false;
            return valid;
        }
        return valid;
    };

    const postNewRoom = async (
        title,
        price,
        maxPeople,
        desc,
        roomNumbers,
        hotelId,
        isRoomEdit,
        roomEditId
    ) => {
        const response = await fetch("http://localhost:5000/post-new-room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                userData: userData,
                User: localStorage.getItem("userData"),
            },
            body: JSON.stringify({
                title: title,
                price: price,
                maxPeople: maxPeople,
                desc: desc,
                roomNumbers,
                hotelId,
                isRoomEdit,
                roomEditId,
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data ? data.message : "Something went wrong!");
        } else {
            console.log("New room created!");
        }
    };

    const sendHandle = () => {
        if (validHandle()) {
            const title = titleRef.current.value;
            const price = parseInt(priceRef.current.value);
            const desc = descRef.current.value;
            const maxPeople = parseInt(maxPeopleRef.current.value);
            const roomNumbers = roomsRef.current.value
                .split(",")
                .map((value) => {
                    return value.trim();
                })
                .filter((value) => {
                    return !isNaN(value);
                })
                .map((value) => {
                    return parseInt(value);
                });

            const hotelId =
                hotelData &&
                hotelData.find((hotel) => {
                    return hotel.name === hotelRef.current.value;
                })._id;

            try {
                postNewRoom(
                    title,
                    price,
                    maxPeople,
                    desc,
                    roomNumbers,
                    hotelId,
                    isRoomEdit,
                    params.roomId
                );
                dispatch(isRoomEditSliceActions.isRoomEditUpdate(false));
                navigate("/room");
            } catch (err) {
                console.log("err from catch:", err);
            }
        }
    };

    return (
        <div className={styles.contain}>
            <Helmet>
                <title>Booking Admin Create Room</title>
            </Helmet>
            {auth && (
                <div>
                    <div className={styles.title}>
                        <h3 style={{ color: "rgb(146, 143, 143)" }}>
                            {isRoomEdit ? "Edit Room" : "Add New Room"}
                        </h3>
                    </div>

                    <div className={styles.details}>
                        <div className={styles.input}>
                            <div>
                                <div>
                                    <p>Title</p>
                                    <input ref={titleRef} type="text" />
                                </div>
                                <div>
                                    <p>Price</p>
                                    <input
                                        ref={priceRef}
                                        type="number"
                                        min="0"
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Description</p>
                                    <input ref={descRef} type="text" />
                                </div>
                                <div>
                                    <p>Max People</p>
                                    <input
                                        ref={maxPeopleRef}
                                        type="number"
                                        min="1"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.end}>
                            <div>
                                <p>Rooms</p>
                                <textArea
                                    ref={roomsRef}
                                    placeholder="Give comma between room numbers."
                                ></textArea>
                            </div>
                            <div style={{ margin: "-1em 0 2em" }}>
                                <p>Choose a hotel</p>
                                <select ref={hotelRef}>
                                    {hotelData &&
                                        hotelData.length &&
                                        hotelData.map((hotel) => {
                                            return (
                                                <option key={hotel._id}>
                                                    {hotel.name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <button onClick={sendHandle}>
                                {isRoomEdit ? "Update" : "Send"}
                            </button>
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

export default NewRoom;
