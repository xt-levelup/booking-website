import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { getTransactionsSliceActions } from "../store/getTransactionsSlice";
import { isHotelEditSliceActions } from "../store/isHotelEditSlice";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./NewHotel.module.css";

const NewHotel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const userData = localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData"))
        : null;
    const [roomData, setRoomData] = useState([]);
    const [setErrorMessagePost] = useState(null);
    const { transactionData } = useSelector((state) => {
        return state.getTransactionsSlice;
    });

    const hotelEditData = useSelector((state) => {
        return state.isHotelEditSlice.hotelEditData;
    });
    const auth = useSelector((state) => {
        return state.authSlice.auth;
    });

    const nameRef = useRef();
    const cityRef = useRef();
    const distanceRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const ratingRef = useRef();
    const typeRef = useRef();
    const addressRef = useRef();
    const titleRef = useRef();
    const priceRef = useRef();
    const featuredRef = useRef();
    const [roomsPost, setRoomsPost] = useState([]);
    const isHotelEdit = useSelector((state) => {
        return state.isHotelEditSlice.isHotelEdit;
    });

    useEffect(() => {
        if (isHotelEdit && hotelEditData) {
            nameRef.current.value = hotelEditData.name;
            cityRef.current.value = hotelEditData.city;
            distanceRef.current.value = hotelEditData.distance;
            descriptionRef.current.value = hotelEditData.desc;
            typeRef.current.value = hotelEditData.type;
            addressRef.current.value = hotelEditData.address;
            titleRef.current.value = hotelEditData.title;
            priceRef.current.value = hotelEditData.cheapestPrice;
            featuredRef.current.value =
                hotelEditData.featured === true ? "Yes" : "No";
            imageRef.current.value =
                hotelEditData && hotelEditData.photos.join("\n");
            ratingRef.current.value = hotelEditData.rating;
        }
    }, [isHotelEdit, hotelEditData]);

    useEffect(() => {
        dispatch(getTransactionsSliceActions());
    }, [dispatch]);

    useEffect(() => {
        if (transactionData && transactionData.roomData) {
            setRoomData(transactionData.roomData);
            setRoomsPost(transactionData.roomData);
        }
    }, [transactionData]);

    const validInput = () => {
        let valid = true;
        if (
            !nameRef.current.value ||
            !cityRef.current.value ||
            !distanceRef.current.value ||
            !descriptionRef.current.value ||
            !imageRef.current.value ||
            !ratingRef.current.value ||
            !typeRef.current.value ||
            !addressRef.current.value ||
            !titleRef.current.value ||
            !priceRef.current.value ||
            !featuredRef.current.value
        ) {
            window.alert("Please fill all fields!");
            valid = false;
            return;
        }
        if (
            distanceRef.current.value < 0 ||
            ratingRef.current.value < 0 ||
            priceRef.current.value < 0
        ) {
            window.alert("You need to enter positive integer!");
            valid = false;
            return;
        }

        return valid;
    };

    const roomHandle = (roomId) => (event) => {
        if (event.target.value === "Yes") {
            if (roomData && roomId) {
                const roomAdd = roomData.find((room) => {
                    return room._id === roomId;
                });
                let roomsPostTemp = roomsPost.slice();
                roomsPostTemp.push(roomAdd);
                setRoomsPost(roomsPostTemp);
            }
        } else if (event.target.value === "No") {
            if (roomData && roomData.length > 0 && roomId) {
                const roomsPostTemp = roomsPost.slice();
                const filter = roomsPostTemp.filter((room) => {
                    return room._id !== roomId;
                });
                setRoomsPost(filter);
            }
        }
    };

    const postHotelData = async (
        title,
        name,
        type,
        city,
        address,
        distance,
        photos,
        desc,
        rating,
        featured,
        rooms,
        cheapestPrice,
        isHotelEdit,
        hotelIdEdit
    ) => {
        const response = await fetch("http://localhost:5000/post-new-hotel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                userData: userData,
                User: localStorage.getItem("userData"),
            },
            body: JSON.stringify({
                title: title,
                name: name,
                type: type,
                city: city,
                address: address,
                distance: distance,
                photos: photos,
                desc: desc,
                rating: rating,
                featured: featured,
                rooms: rooms,
                cheapestPrice: cheapestPrice,
                isHotelEdit: isHotelEdit,
                hotelIdEdit,
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data ? data.message : "Something went wrong!");
        } else {
            console.log("Post hotel data sucessfully!");
        }
    };

    const sendButtonHandle = () => {
        const imageArr = imageRef.current.value
            .toString()
            .trim()
            .split(" ")[0]
            .split("\n");

        const title = titleRef.current.value;
        const name = nameRef.current.value;
        const type = typeRef.current.value;
        const city = cityRef.current.value;
        const address = addressRef.current.value;
        const distance = parseInt(distanceRef.current.value);
        const photos = imageArr;
        const desc = descriptionRef.current.value;
        const rating = parseInt(ratingRef.current.value);
        const featured = featuredRef.current.value === "Yes" ? true : false;
        const rooms =
            (roomsPost &&
                roomsPost.length > 0 &&
                roomsPost.map((room) => {
                    return room._id;
                })) ||
            [];
        const cheapestPrice = parseInt(priceRef.current.value);

        if (validInput()) {
            try {
                postHotelData(
                    title,
                    name,
                    type,
                    city,
                    address,
                    distance,
                    photos,
                    desc,
                    rating,
                    featured,
                    rooms,
                    cheapestPrice,
                    isHotelEdit,
                    params.hotelId
                );
                window.alert(
                    isHotelEdit
                        ? "Updated the hotel"
                        : "Add new hotel successfully!"
                );
                nameRef.current.value = "";
                cityRef.current.value = "";
                distanceRef.current.value = "";
                descriptionRef.current.value = "";
                imageRef.current.value = "";
                ratingRef.current.value = "";
                typeRef.current.value = "";
                addressRef.current.value = "";
                titleRef.current.value = "";
                priceRef.current.value = "";
                featuredRef.current.value = "Yes";
                dispatch(isHotelEditSliceActions.isHotelEditUpdate(false));
                navigate("/");
            } catch (err) {
                console.log("err:", err);
            }
        }
    };

    useEffect(() => {
        if (params.hotelId) {
            dispatch(isHotelEditSliceActions.isHotelEditUpdate(true));
        } else {
            dispatch(isHotelEditSliceActions.isHotelEditUpdate(false));
        }
    }, [params.hotelId]);

    return (
        <div>
            <Helmet>
                <title>Booking Admin Create Hotel</title>
            </Helmet>
            {auth && (
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h3>{isHotelEdit ? "Edit Hotel" : "Add New Hotel"}</h3>
                    </div>
                    <div className={styles.details}>
                        <div className={styles["details-content"]}>
                            <div className={styles["hotel-inform"]}>
                                <div className={styles["hotel-inform-left"]}>
                                    <div className={styles.input}>
                                        <p>Name</p>
                                        <input ref={nameRef} type="text" />
                                    </div>
                                    <div className={styles.input}>
                                        <p>City</p>
                                        <input ref={cityRef} type="text" />
                                    </div>
                                    <div className={styles.input}>
                                        <p>Distance from City Center</p>
                                        <input
                                            ref={distanceRef}
                                            type="number"
                                            min="0"
                                        />
                                    </div>
                                    <div className={styles.input}>
                                        <p>Description</p>
                                        <input
                                            ref={descriptionRef}
                                            type="text"
                                        />
                                    </div>
                                    <div className={styles.input}>
                                        <p>
                                            Images{" "}
                                            <span
                                                style={{ fontWeight: "normal" }}
                                            >
                                                (enter for each link)
                                            </span>
                                        </p>
                                        <textarea ref={imageRef} />
                                    </div>
                                    <div className={styles.input}>
                                        <p>Rating</p>
                                        <input
                                            ref={ratingRef}
                                            type="number"
                                            min="0"
                                        />
                                    </div>
                                </div>
                                <div className={styles["hotel-inform-right"]}>
                                    <div className={styles.input}>
                                        <p>Type</p>
                                        <input ref={typeRef} type="text" />
                                    </div>
                                    <div className={styles.input}>
                                        <p>Address</p>
                                        <input ref={addressRef} type="text" />
                                    </div>
                                    <div className={styles.input}>
                                        <p>Title</p>
                                        <input ref={titleRef} type="text" />
                                    </div>
                                    <div className={styles.input}>
                                        <p>Price</p>
                                        <input
                                            ref={priceRef}
                                            type="number"
                                            min="0"
                                        />
                                    </div>
                                    <div className={styles.input}>
                                        <p>Featured</p>
                                        <select ref={featuredRef}>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.rooms}>
                            <p>Rooms</p>
                            {roomData &&
                                roomData.length > 0 &&
                                roomData.map((room) => {
                                    return (
                                        <div
                                            key={room._id}
                                            className={styles["rooms-detail"]}
                                        >
                                            <span>{room.title}</span>
                                            <select
                                                onChange={roomHandle(room._id)}
                                            >
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className={styles.button}>
                            <button onClick={sendButtonHandle}>
                                {isHotelEdit ? "Update" : "Send"}
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

export default NewHotel;
