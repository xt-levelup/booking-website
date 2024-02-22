import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchValuesSliceActions } from "../store/searchValuesSlice";
import { dataFromSearchSliceActions } from "../store/dataFromSearchSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DetailPage.module.css";

const DetailPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataFromSearch = useSelector((state) => {
        return state.dataFromSearchSlice.dataSearch;
    });
    const params = useParams();
    const hotelId = params.bookingId;
    const [errorShow, setErrorShow] = useState(null);
    const [hotelData, setHotelData] = useState(
        dataFromSearch
            ? dataFromSearch.find((hotel) => {
                  return hotel.hotelId._id === hotelId;
              })
            : null
    );
    const searchValuesSlice = useSelector((state) => {
        return state.searchValuesSlice;
    });
    const [city, setCity] = useState(
        searchValuesSlice.city || "Where are you going?"
    );
    const [adult, setAdult] = useState(searchValuesSlice.adult || 0);
    const [children, setChildren] = useState(searchValuesSlice.children || 0);
    const [room, setRoom] = useState(searchValuesSlice.room || 0);
    const [startDate, setStartDate] = useState(
        new Date(searchValuesSlice.startDate) || new Date()
    );
    const [endDate, setEndDate] = useState(
        new Date(searchValuesSlice.endDate) || new Date()
    );
    const [roomSelected, setRoomSelected] = useState([]);
    const [isClickBook, setIsClickBook] = useState(false);
    const [fullName, setFullName] = useState(
        localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData")).fullName
            : null
    );
    const [email, setEmail] = useState(
        localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData")).email
            : null
    );
    const [phoneNumber, setPhoneNumber] = useState(
        localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData")).phoneNumber
            : null
    );
    const [payment, setPayment] = useState();
    const [totalBill, setTotalBill] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        setHotelData(
            dataFromSearch &&
                dataFromSearch.find((hotel) => {
                    return hotel.hotelId._id === hotelId;
                })
        );
    }, [dataFromSearch]);

    const locationIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="24"
            // height="24"
            fill="#000000"
            viewBox="0 0 256 256"
        >
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm78.37,64H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM128,40.11c12,13,21,29.55,26.37,47.89H101.63C107,69.66,116,53.13,128,40.11ZM96,128a145.29,145.29,0,0,1,2-24h60a145.72,145.72,0,0,1,0,48H98A145.29,145.29,0,0,1,96,128Zm5.63,40h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168Zm49.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Zm23.53-61a161.79,161.79,0,0,0,0-48h38.46a88.15,88.15,0,0,1,0,48Z"></path>
        </svg>
    );

    const checkInputHandle = (event) => {
        if (event.target.checked) {
            const newRoomSelect = [
                ...roomSelected,
                {
                    roomId: event.target.getAttribute("roomid"),
                    roomName: event.target.getAttribute("roomname"),
                    roomPrice: event.target.getAttribute("roomprice"),
                    roomNumber: event.target.value,
                },
            ];
            setRoomSelected(newRoomSelect);
            const priceList =
                newRoomSelect &&
                newRoomSelect.length &&
                newRoomSelect.map((room) => {
                    return parseFloat(room.roomPrice);
                });
            const newBill =
                (priceList &&
                    priceList.length &&
                    priceList.reduce((acc, curr) => {
                        return acc + curr;
                    }, 0)) ||
                0;
            setTotalBill(newBill);
        } else {
            const roomUnSelected = roomSelected.find((room) => {
                return (
                    room.roomId === event.target.getAttribute("roomid") &&
                    room.roomName === event.target.getAttribute("roomname") &&
                    room.roomNumber === event.target.value
                );
            });
            const roomFilter =
                roomSelected.filter((room) => {
                    return room !== roomUnSelected;
                }) || [];
            setRoomSelected(roomFilter);

            const priceList =
                roomFilter &&
                roomFilter.length &&
                roomFilter.map((room) => {
                    return parseFloat(room.roomPrice);
                });

            const newBill =
                priceList &&
                priceList.length &&
                priceList.reduce((acc, curr) => {
                    return acc + curr;
                }, 0);

            setTotalBill(newBill);
        }
    };

    const isClickBookHandle = () => {
        setIsClickBook(!isClickBook);
    };

    const fullNameHandle = (event) => {
        setFullName(event.target.value);
    };
    const emailHandle = (event) => {
        setEmail(event.target.value);
    };
    const phoneNumberHandle = (event) => {
        setPhoneNumber(event.target.value);
    };
    const paymentHandle = (event) => {
        setPayment(event.target.value);
    };

    const postReserve = async () => {
        const response = await fetch("http://localhost:5000/reserve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: localStorage.getItem("userData")
                    ? JSON.parse(localStorage.getItem("userData")).email
                    : null,
                hotel: hotelId,
                room: roomSelected,
                dateStart: startDate,
                dateEnd: endDate,
                price: totalBill,
                payment: payment,
                status: "Booked",
                dateCreate: new Date(),
            }),
        });

        if (!response) {
            setErrorMessage("Cannot post to server!");
        } else {
            const data = await response.json();
            setErrorMessage(null);
            navigate("/transactions");
        }
    };

    const reserveHandle = () => {
        if (!payment || payment === "Select Payment Method") {
            window.alert("Please choose your payment method!");
            return;
        }
        if (roomSelected && !roomSelected.length) {
            window.alert("Please choose your rooms!");
            return;
        }
        if (!localStorage.getItem("userData")) {
            window.alert("Please login or register first!");
            navigate("/login");
        }
        try {
            postReserve();
        } catch (err) {
            console.log("catch err:", err);
        }
    };

    const postSearch = async (
        city,
        startDate,
        endDate,
        adult,
        children,
        room
    ) => {
        const response = await fetch("http://localhost:5000/post-search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                city: city,
                startDate: startDate,
                endDate: endDate,
                adult: parseInt(adult),
                children: parseInt(children),
                room: parseInt(room),
            }),
        });
        return response;
    };

    const dateConvert = (date) => {
        const convert = new Date(date);
        const dd = String(convert.getDate()).padStart(2, 0);
        const mm = String(convert.getMonth() + 1).padStart(2, 0);
        const yyyy = String(convert.getFullYear());
        return mm + "/" + dd + "/" + yyyy;
    };

    const searchHandle = () => {
        postSearch(city, startDate, endDate, adult, children, room)
            .then((response) => {
                if (!response.ok) {
                    setErrorShow("Cannot get data!");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log("dataServer:", data);
                setErrorShow(null);
                setHotelData(data);
                dispatch(dataFromSearchSliceActions.dataFromSearchUpdate(data));
                dispatch(
                    searchValuesSliceActions.endDateUpdate(dateConvert(endDate))
                );
                dispatch(
                    searchValuesSliceActions.startDateUpdate(
                        dateConvert(startDate)
                    )
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onChangeStartDateHandle = (date) => {
        setStartDate(date);
        searchHandle();
    };
    const onChangeEndDateHandle = (date) => {
        setEndDate(date);
        searchHandle();
    };

    return (
        <div className={styles.contain}>
            <Helmet>
                <title>Booking Detail Page</title>
            </Helmet>
            <div className={styles.content}>
                <h2>{hotelData && hotelData.hotelId.name}</h2>
                <div className={styles.address}>
                    {locationIcon}
                    <p>{hotelData && hotelData.hotelId.address}</p>
                </div>
                <p style={{ fontWeight: "bold", color: "rgb(10,100,200)" }}>
                    Excellent location -{" "}
                    {hotelData && hotelData.hotelId.distance}m from center
                </p>
                <p style={{ fontWeight: "600", color: "rgb(10,200,100)" }}>
                    Book a stay over $
                    {hotelData && hotelData.hotelId.cheapestPrice} at this
                    property and get a free airport taxi
                </p>
                <div className={styles.image}>
                    {hotelData &&
                        hotelData.hotelId.photos &&
                        hotelData.hotelId.photos.map((imageUrl) => {
                            return (
                                <div key={imageUrl}>
                                    <img
                                        src={imageUrl}
                                        alt={hotelData.hotelId.name}
                                    />
                                </div>
                            );
                        })}
                </div>
                <div className={styles.description}>
                    <div className={styles["desc-details"]}>
                        <h2>{hotelData && hotelData.hotelId.name}</h2>
                        <p style={{ textAlign: "justify" }}>
                            {hotelData && hotelData.hotelId.desc}
                        </p>
                    </div>
                    <div className={styles.booking}>
                        <div className={styles.price}>
                            <h2>
                                ${hotelData && hotelData.hotelId.cheapestPrice}
                            </h2>
                            <span>(1 nights)</span>
                        </div>
                        <button onClick={isClickBookHandle}>
                            Reserve or Book now
                        </button>
                    </div>
                </div>
                {isClickBook && (
                    <div className={styles.orders}>
                        <div className={styles.inform}>
                            <div className={styles["date-contain"]}>
                                <h3>Dates</h3>
                                <div className={styles["date-picker"]}>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={onChangeStartDateHandle}
                                        // onChange={(date) => {
                                        //     setStartDate(date);
                                        // }}
                                        minDate={new Date()}
                                    />

                                    <span>to</span>

                                    <DatePicker
                                        selected={endDate}
                                        onChange={onChangeEndDateHandle}
                                        // selected={endDate}
                                        // onChange={(date) => {
                                        //     setEndDate(date);
                                        // }}
                                        minDate={startDate}
                                    />
                                </div>
                            </div>
                            <div className={styles.reserve}>
                                <h3>Reserve Info</h3>
                                <div className={styles["reserve-inform"]}>
                                    <div>
                                        <p>Your Full Name</p>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={fullNameHandle}
                                        />
                                    </div>
                                    <div>
                                        <p>Your Email</p>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={emailHandle}
                                        />
                                    </div>
                                    <div>
                                        <p>Your Phone Number</p>
                                        <input
                                            type="number"
                                            value={phoneNumber}
                                            onChange={phoneNumberHandle}
                                        />
                                    </div>
                                    <div>
                                        <p>Your Identity Card Number</p>
                                        <input type="number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles["select-rooms"]}>
                            <h3>Select Rooms</h3>
                            <div className={styles["room-details"]}>
                                {hotelData &&
                                    hotelData.rooms.length &&
                                    hotelData.rooms.map((room) => {
                                        return (
                                            <div
                                                key={room.roomId._id}
                                                className={styles["list-rooms"]}
                                            >
                                                <div>
                                                    <h4>{room.roomId.title}</h4>
                                                    <p>{room.roomId.desc}</p>
                                                    <p>
                                                        Max people:{" "}
                                                        {room.roomId.maxPeople}
                                                    </p>
                                                    <h4>
                                                        ${room.roomId.price}
                                                    </h4>
                                                </div>
                                                <div
                                                    className={
                                                        styles[
                                                            "room-number-list"
                                                        ]
                                                    }
                                                >
                                                    {room.roomId.roomNumbers
                                                        .length &&
                                                        room.roomId.roomNumbers.map(
                                                            (number) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            number
                                                                        }
                                                                        className={
                                                                            styles[
                                                                                "room-number"
                                                                            ]
                                                                        }
                                                                    >
                                                                        <div
                                                                            className={
                                                                                styles[
                                                                                    "room-number-details"
                                                                                ]
                                                                            }
                                                                        >
                                                                            <p>
                                                                                {
                                                                                    number
                                                                                }
                                                                            </p>
                                                                            <input
                                                                                type="checkbox"
                                                                                name={
                                                                                    number
                                                                                }
                                                                                roomid={
                                                                                    room
                                                                                        .roomId
                                                                                        ._id
                                                                                }
                                                                                roomname={
                                                                                    room
                                                                                        .roomId
                                                                                        .title
                                                                                }
                                                                                roomprice={
                                                                                    room
                                                                                        .roomId
                                                                                        .price
                                                                                }
                                                                                id={
                                                                                    number
                                                                                }
                                                                                value={
                                                                                    number
                                                                                }
                                                                                onClick={
                                                                                    checkInputHandle
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <h3>Total Bill: ${totalBill}</h3>
                            <div className={styles.payment}>
                                <select
                                    onChange={paymentHandle}
                                    value={payment}
                                >
                                    <option defaultValue>
                                        Select Payment Method
                                    </option>
                                    <option>Credit Card</option>
                                    <option>Cash</option>
                                </select>
                                <button onClick={reserveHandle}>
                                    Reserve Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailPage;
