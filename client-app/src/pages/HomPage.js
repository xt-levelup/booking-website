import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./HomePage.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { imageSource } from "../imageSource";
import { fetchHotelsActions } from "../store/getHotelsSlice";
import { fetchRoomsData } from "../store/getRoomsSlice";
import { searchValuesSliceActions } from "../store/searchValuesSlice";
import { dataFromSearchSliceActions } from "../store/dataFromSearchSlice";
import { useSelector, useDispatch } from "react-redux";

const HomePage = () => {
    const navigate = useNavigate();
    const [city, setCity] = useState("Where are you going?");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [adult, setAdult] = useState(0);
    const [children, setChildren] = useState(0);
    const [room, setRoom] = useState(0);
    const dispatch = useDispatch();
    const auth = useSelector((state) => {
        return state.authSlice.auth;
    });
    const { hotelData, status, errorMessage } = useSelector((state) => {
        return state.getHotelsSlice;
    });
    const { roomData, roomStatus, errorRoomMessage } = useSelector((state) => {
        return state.getRoomsSlice;
    });

    useEffect(() => {
        dispatch(fetchHotelsActions());
        dispatch(fetchRoomsData());
    }, [dispatch]);

    const hotelCities = [
        hotelData
            ? hotelData.filter((hotel) => {
                  return hotel.city === "Ha Noi";
              })
            : null,
        hotelData
            ? hotelData.filter((hotel) => {
                  return hotel.city === "Ho Chi Minh";
              })
            : null,
        hotelData
            ? hotelData.filter((hotel) => {
                  return hotel.city === "Da Nang";
              })
            : null,
    ];
    const propertyTypes = [
        hotelData &&
            hotelData.length &&
            hotelData.filter((hotel) => {
                return hotel.type === "hotel" || [];
            }),
        hotelData &&
            hotelData.length &&
            hotelData.filter((hotel) => {
                return hotel.type === "apartment" || [];
            }),
        hotelData &&
            hotelData.length &&
            hotelData.filter((hotel) => {
                return hotel.type === "resort" || [];
            }),
        hotelData &&
            hotelData.length &&
            hotelData.filter((hotel) => {
                return hotel.type === "villa" || [];
            }),
        hotelData &&
            hotelData.length &&
            hotelData.filter((hotel) => {
                return hotel.type === "cabin" || [];
            }),
    ];
    const ratingHotels =
        hotelData &&
        hotelData.length &&
        hotelData
            .slice()
            .sort((a, b) => {
                return b.rating - a.rating;
            })
            .slice(0, 3);

    const userIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#000000"
            viewBox="0 0 256 256"
        >
            <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z"></path>
        </svg>
    );
    const bedIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#000000"
            viewBox="0 0 256 256"
        >
            <path d="M208,72H24V48A8,8,0,0,0,8,48V208a8,8,0,0,0,16,0V176H232v32a8,8,0,0,0,16,0V112A40,40,0,0,0,208,72ZM24,88H96v72H24Z"></path>
        </svg>
    );
    const calendarIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#000000"
            viewBox="0 0 256 256"
        >
            <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM112,184a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm56-8a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136a23.76,23.76,0,0,1-4.84,14.45L152,176ZM48,80V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80Z"></path>
        </svg>
    );

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

    useEffect(() => {
        try {
            postSearch(city, startDate, endDate, adult, children, room)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Cannot get data");
                    } else {
                        return response.json();
                    }
                })
                .then((data) => {
                    dispatch(
                        dataFromSearchSliceActions.dataFromSearchUpdate(data)
                    );
                });
        } catch (err) {
            console.log(err);
        }
    }, []);

    const dateConvert = (date) => {
        const convert = new Date(date);
        const dd = String(convert.getDate()).padStart(2, 0);
        const mm = String(convert.getMonth() + 1).padStart(2, 0);
        const yyyy = String(convert.getFullYear());
        return mm + "/" + dd + "/" + yyyy;
    };

    const searchHandle = async () => {
        dispatch(searchValuesSliceActions.cityUpdate(city));
        dispatch(
            searchValuesSliceActions.startDateUpdate(dateConvert(startDate))
        );
        dispatch(searchValuesSliceActions.endDateUpdate(dateConvert(endDate)));
        dispatch(searchValuesSliceActions.adultUpdate(adult));
        dispatch(searchValuesSliceActions.childrenUpdate(children));
        dispatch(searchValuesSliceActions.roomUpdate(room));

        navigate("/search");
    };

    const cityHandle = (event) => {
        setCity(event.target.value);
    };

    const adultHandle = (event) => {
        setAdult(event.target.value);
    };
    const childrenHandle = (event) => {
        setChildren(event.target.value);
    };
    const roomHandle = (event) => {
        setRoom(event.target.value);
    };
    const signRegisterHandle = () => {
        navigate("/login");
    };
    const hotelDetails = (bookingId) => {
        navigate(`/detail/${bookingId}`);
    };

    return (
        <>
            <Helmet>
                <title>Booking Home Page</title>
            </Helmet>
            <div className={styles.global}>
                <div className={styles.contain}>
                    <div className={styles.adverse}>
                        <h2>A lifetime of discounts? It's Genius.</h2>
                        <p>
                            Get rewarded for your travels - unlock instant
                            savings of 10% or more with a free account
                        </p>
                        {!auth && (
                            <button onClick={signRegisterHandle}>
                                Sign in / Register
                            </button>
                        )}
                    </div>
                    <div className={styles.details}>
                        <div className={styles.calendar}>
                            {bedIcon}
                            <select value={city} onChange={cityHandle}>
                                <option>Where are you going?</option>
                                <option>Ha Noi</option>
                                <option>Ho Chi Minh</option>
                                <option>Da Nang</option>
                            </select>
                        </div>
                        <div className={styles.calendar}>
                            {calendarIcon}
                            <div className={styles.dateSelection}>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => {
                                        setStartDate(date);
                                    }}
                                    minDate={new Date()}
                                />
                                <span>to</span>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => {
                                        setEndDate(date);
                                    }}
                                    minDate={startDate}
                                />
                            </div>
                        </div>
                        <div className={styles.order}>
                            {userIcon}
                            <input value={adult} onChange={adultHandle} />
                            <label>adult</label>
                            <span>-</span>
                            <input value={children} onChange={childrenHandle} />
                            <label>children</label>
                            <span>-</span>
                            <input value={room} onChange={roomHandle} />
                            <label>room</label>
                        </div>
                        <button onClick={searchHandle}>Search</button>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.cities}>
                    <div
                        className={styles["cities-items"]}
                        style={{
                            backgroundImage: `url(${imageSource.HanoiImage})`,
                        }}
                    >
                        <h2>Ha Noi</h2>
                        <p>
                            {hotelCities &&
                                hotelCities.length > 0 &&
                                hotelCities[0] &&
                                hotelCities[0].length}{" "}
                            properties
                        </p>
                    </div>
                    <div
                        className={styles["cities-items"]}
                        style={{
                            backgroundImage: `url(${imageSource.HCMImage})`,
                        }}
                    >
                        <h2>Ho Chi Minh</h2>
                        <p>
                            {hotelCities &&
                                hotelCities.length > 0 &&
                                hotelCities[1] &&
                                hotelCities[1].length}{" "}
                            properties
                        </p>
                    </div>
                    <div
                        className={styles["cities-items"]}
                        style={{
                            backgroundImage: `url(${imageSource.DaNangImage})`,
                        }}
                    >
                        <h2>Da Nang</h2>
                        <p>
                            {hotelCities &&
                                hotelCities.length > 0 &&
                                hotelCities[2] &&
                                hotelCities[2].length}{" "}
                            properties
                        </p>
                    </div>
                </div>
                <div style={{ marginTop: "2em" }}>
                    <h2 style={{ margin: "0 0 1em 1%" }}>
                        Browse by property type
                    </h2>
                    <div className={styles["booking-types"]}>
                        <div className={styles["booking-type-details"]}>
                            <img src={imageSource.type01Image} />
                            <h3>Hotel</h3>
                            <p>
                                {propertyTypes &&
                                    propertyTypes.length > 0 &&
                                    propertyTypes[0] &&
                                    propertyTypes[0].length}{" "}
                                hotels
                            </p>
                        </div>
                        <div className={styles["booking-type-details"]}>
                            <img src={imageSource.type02Image} />
                            <h3>Apartments</h3>
                            <p>
                                {propertyTypes &&
                                    propertyTypes.length > 0 &&
                                    propertyTypes[1] &&
                                    propertyTypes[1].length}{" "}
                                apartments
                            </p>
                        </div>
                        <div className={styles["booking-type-details"]}>
                            <img src={imageSource.type03Image} />
                            <h3>Resorts</h3>
                            <p>
                                {propertyTypes &&
                                    propertyTypes.length > 0 &&
                                    propertyTypes[2] &&
                                    propertyTypes[2].length}{" "}
                                resorts
                            </p>
                        </div>
                        <div className={styles["booking-type-details"]}>
                            <img src={imageSource.type04Image} />
                            <h3>Villas</h3>
                            <p>
                                {propertyTypes &&
                                    propertyTypes.length > 0 &&
                                    propertyTypes[3] &&
                                    propertyTypes[3].length}{" "}
                                villas
                            </p>
                        </div>
                        <div className={styles["booking-type-details"]}>
                            <img src={imageSource.type05Image} />
                            <h3>Cabins</h3>
                            <p>
                                {propertyTypes &&
                                    propertyTypes.length > 0 &&
                                    propertyTypes[4] &&
                                    propertyTypes[4].length}{" "}
                                cabins
                            </p>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "2em" }}>
                    <h2 style={{ marginLeft: "1%" }}>Homes guests love</h2>
                    <div className={styles["guests-love"]}>
                        {ratingHotels &&
                            ratingHotels.length > 0 &&
                            ratingHotels.map((hotel) => {
                                return (
                                    <div
                                        className={
                                            styles["guests-love-details"]
                                        }
                                    >
                                        <img
                                            src={hotel.photos[0]}
                                            alt={hotel.title}
                                        />
                                        <p
                                            style={{
                                                fontWeight: "bold",
                                                color: "blue",
                                                cursor: "pointer",
                                                textDecoration: "underline",
                                            }}
                                            onClick={() =>
                                                hotelDetails(hotel._id)
                                            }
                                        >
                                            {hotel.title}
                                        </p>
                                        <p>{hotel.city}</p>
                                        <p style={{ fontWeight: "bold" }}>
                                            Starting from ${hotel.cheapestPrice}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
