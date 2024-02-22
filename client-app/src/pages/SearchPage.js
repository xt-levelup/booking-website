import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchHotelsActions } from "../store/getHotelsSlice";
import { searchValuesSliceActions } from "../store/searchValuesSlice";
import { dataFromSearchSliceActions } from "../store/dataFromSearchSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./SearchPage.module.css";

const SearchPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorShow, setErrorShow] = useState(null);
    const [dataServer, setDataServer] = useState(null);
    const searchValues = useSelector((state) => {
        return state.searchValuesSlice;
    });
    const [startDate, setStartDate] = useState(
        searchValues.startDate ? new Date(searchValues.startDate) : new Date()
    );
    const [endDate, setEndDate] = useState(
        searchValues.endDate ? new Date(searchValues.endDate) : new Date()
    );
    const [city, setCity] = useState(searchValues.city || "");
    const [adult, setAdult] = useState(searchValues.adult || 0);
    const [room, setRoom] = useState(searchValues.room || 0);
    const [children, setChildren] = useState(searchValues.children || 0);
    const [isLoading, setIsLoading] = useState(true);

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
                        setIsLoading(false);
                        setErrorShow("Cannot get data!");
                    } else {
                        setIsLoading(false);
                        return response.json();
                    }
                })
                .then((data) => {
                    setIsLoading(false);
                    setErrorShow(null);
                    setDataServer(data);
                    dispatch(
                        dataFromSearchSliceActions.dataFromSearchUpdate(data)
                    );
                });
        } catch (err) {
            setIsLoading(false);
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

    const searchHandle = () => {
        setIsLoading(true);
        postSearch(city, startDate, endDate, adult, children, room)
            .then((response) => {
                if (!response.ok) {
                    setErrorShow("Cannot get data!");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setErrorShow(null);
                setDataServer(data);
                setIsLoading(false);
                dispatch(dataFromSearchSliceActions.dataFromSearchUpdate(data));
                dispatch(
                    searchValuesSliceActions.endDateUpdate(dateConvert(endDate))
                );
                dispatch(
                    searchValuesSliceActions.startDateUpdate(
                        dateConvert(startDate)
                    )
                );
                dispatch(searchValuesSliceActions.adultUpdate(adult));
                dispatch(searchValuesSliceActions.childrenUpdate(children));
                dispatch(searchValuesSliceActions.cityUpdate(city));
                dispatch(searchValuesSliceActions.roomUpdate(room));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        dispatch(fetchHotelsActions());
    }, [dispatch]);

    const cityHandle = (event) => {
        setCity(event.target.value);
    };
    const adultHandle = (event) => {
        setAdult(event.target.value);
    };
    const roomHandle = (event) => {
        setRoom(event.target.value);
    };
    const childrenHandle = (event) => {
        setChildren(event.target.value);
    };

    const hotelDetails = (bookingId) => {
        navigate(`/detail/${bookingId}`);
    };

    return (
        <div className={styles.contain}>
            <Helmet>
                <title>Booking Search Page</title>
            </Helmet>
            <div className={styles.search}>
                <div className={styles["search-content"]}>
                    <div className={styles["search-main"]}>
                        <h3>Search</h3>
                        <div>
                            <p>Destination</p>

                            <select value={city} onChange={cityHandle}>
                                <option>Where are you going?</option>
                                <option>Ha Noi</option>
                                <option>Ho Chi Minh</option>
                                <option>Da Nang</option>
                            </select>
                        </div>
                        <div>
                            <p>Check-in Date</p>
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
                    </div>
                    <div className={styles.options}>
                        <p>Options</p>
                        <div className={styles["options-details"]}>
                            <div>
                                <label>Min price per night</label>
                                <input />
                            </div>
                            <div>
                                <label>Max price per night</label>
                                <input />
                            </div>
                            <div>
                                <label>Adult</label>
                                <input value={adult} onChange={adultHandle} />
                            </div>
                            <div>
                                <label>Children</label>
                                <input
                                    value={children}
                                    onChange={childrenHandle}
                                />
                            </div>
                            <div>
                                <label>Room</label>
                                <input value={room} onChange={roomHandle} />
                            </div>
                        </div>
                    </div>
                    <button onClick={searchHandle}>Search</button>
                </div>
            </div>
            <div className={styles.hotels}>
                {isLoading && (
                    <p style={{ textAlign: "center", fontSize: "21px" }}>
                        Getting data from server...
                    </p>
                )}
                {dataServer &&
                    dataServer.length > 0 &&
                    dataServer.map((hotel) => {
                        return (
                            <div
                                key={hotel.hotelId.title}
                                className={styles["hotel-details"]}
                            >
                                <div>
                                    <img src={hotel.hotelId.photos[0]} />
                                </div>
                                <div className={styles["hotel-details-2"]}>
                                    <h3>{hotel.hotelId.title}</h3>
                                    <p>{hotel.hotelId.distance}m from center</p>
                                    <p style={{ fontWeight: "bold" }}>
                                        {hotel.hotelId.type
                                            .split("")[0]
                                            .toUpperCase() +
                                            hotel.hotelId.type
                                                .split("")
                                                .slice(1)
                                                .join("")}{" "}
                                        in {hotel.hotelId.city}
                                    </p>
                                    <p>
                                        {hotel.hotelId.rooms &&
                                            hotel.availableRooms}{" "}
                                        rooms
                                    </p>

                                    {hotel.hotelId.featured && (
                                        <p
                                            style={{
                                                color: "green",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Free cancellation
                                        </p>
                                    )}
                                    {hotel.hotelId.featured && (
                                        <p style={{ color: "rgb(7, 160, 58)" }}>
                                            You can cancel later, so lock in
                                            this great price today!
                                        </p>
                                    )}
                                </div>
                                <div className={styles["hotel-details-3"]}>
                                    <div
                                        className={styles["hotel-details-3-1"]}
                                    >
                                        <h4>
                                            {hotel.hotelId.rating >= 5
                                                ? "Exceoptional"
                                                : "Excellent"}
                                        </h4>
                                        <div>{hotel.hotelId.rating}/5</div>
                                    </div>
                                    <div
                                        className={styles["hotel-details-3-2"]}
                                    >
                                        <p style={{ fontSize: "30px" }}>
                                            ${hotel.hotelId.cheapestPrice}
                                        </p>
                                        <p>Includes taxes and fees</p>
                                        <button
                                            onClick={() => {
                                                hotelDetails(hotel.hotelId._id);
                                            }}
                                        >
                                            See availability
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default SearchPage;
