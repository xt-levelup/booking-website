const User = require("../models/user");
const Transaction = require("../models/transaction");
const Hotel = require("../models/hotel");
const Room = require("../models/room");

// ---------------------------------------------
// -----------------THÊM USER-------------------
// ---------------------------------------------

exports.addUser = (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const isAdmin = req.body.isAdmin;

    User.findOne({ $or: [{ email: email }, { userName: userName }] })
        .then((user) => {
            if (user) {
                res.status(403).json({
                    message: "Account already exists! ",
                });
            } else {
                const newUser = new User({
                    userName: userName,
                    password: password,
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    email: email,
                    isAdmin: isAdmin,
                });

                newUser
                    .save()
                    .then((result) => {
                        res.status(201).json({
                            message: "Created new user successfully!",
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            message: "Cannot create account!",
                        });
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Cannot create account!",
            });
        });
};

// ------------------------------------
// --------KIỂM TRA USER LOGIN---------
// ------------------------------------

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.find()
        .then((users) => {
            const author = users.find((user) => {
                return user.email === email && user.password === password;
            });
            const passwordWrong = users.find((user) => {
                return user.email === email && user.password !== password;
            });
            if (author) {
                res.status(201).json(author);
            } else if (passwordWrong) {
                res.status(404).json({
                    message: "Wrong password!",
                });
            } else {
                res.status(404).json({
                    message: "User cannot found!",
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

// -------------------------------------------
// ----------DỮ LIỆU GIAO DỊCH CHO CLIENT-----
// -------------------------------------------

exports.postTransactions = (req, res, next) => {
    const userData = req.body.userData;

    const getData = async () => {
        const getTransactionData = await Transaction.find();

        const currentTransactions = getTransactionData.filter((data) => {
            if (userData) {
                return data.userName === userData.email;
            } else {
                return false;
            }
        });

        const newCurrentTransactions = await Promise.all(
            currentTransactions.map(async (data) => {
                const newHotel = await Hotel.findById({ _id: data.hotel });
                const newTitle = newHotel.title;
                data.hotel = newTitle;
                return {
                    dateEnd: data.dateEnd,
                    dateStart: data.dateStart,
                    hotel: newTitle,
                    payment: data.payment,
                    price: data.price,
                    room: data.room,
                    status: data.status,
                    userName: data.userName,
                    _id: data._id,
                };
            })
        );

        if (newCurrentTransactions && newCurrentTransactions.length > 0) {
            res.status(200).json(newCurrentTransactions);
        } else if (newCurrentTransactions && !newCurrentTransactions.length) {
            res.status(404).json({
                message: "Data cannot found!",
            });
        } else {
            res.status(500).json({
                message: "Something went wrong!",
            });
        }
    };

    getData();
};

//---------------------------------------------------
//-----------Dữ liệu giao dịch cho Admin-------------
//---------------------------------------------------

exports.postAdminTransactions = (req, res, next) => {
    // const userData = req.body.userData;
    const getData = async () => {
        const transactionData = await Transaction.find();
        const userData = await User.find();
        const hotelData = await Hotel.find();
        const roomData = await Room.find();
        res.status(200).json({
            transactionData: transactionData,
            userData: userData,
            hotelData: hotelData,
            roomData: roomData,
        });
    };
    try {
        getData();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ---------------------------------------------
// --------------Tạo khách sạn mới -------------
// ---------------------------------------------

exports.postNewHotel = (req, res, next) => {
    const title = req.body.title;
    const name = req.body.name;
    const type = req.body.type;
    const city = req.body.city;
    const address = req.body.address;
    const distance = req.body.distance;
    const photos = req.body.photos;
    const desc = req.body.desc;
    const rating = req.body.rating;
    const featured = req.body.featured;
    const rooms = req.body.rooms;
    const cheapestPrice = req.body.cheapestPrice;
    const isHotelEdit = req.body.isHotelEdit;
    const hotelIdEdit = req.body.hotelIdEdit;

    if (isHotelEdit) {
        Hotel.findByIdAndUpdate(hotelIdEdit, {
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
        })
            .then((result) => {
                res.status(201).json({
                    message: "Post edit hotel ok!",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        const hotel = new Hotel({
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
        });

        hotel
            .save()
            .then((result) => {
                res.status(201).json({
                    message: "Post new hotel data successfully!",
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: "Something went wrong!",
                });
            });
    }
};

// ------------------------------------------------
// -------------Xoá một khách sạn------------------
// ------------------------------------------------

exports.postDeleteHotel = (req, res, next) => {
    const hotelId = req.body.hotelId;

    const action = async () => {
        const transactionData = await Transaction.find();

        const transactionBooking = [];

        for (let i = 0; transactionData && i < transactionData.length; i++) {
            if (transactionData[i].status !== "Checkout") {
                transactionBooking.push(transactionData[i].hotel.toString());
            }
        }

        if (!transactionBooking.includes(hotelId)) {
            Hotel.findByIdAndDelete({ _id: hotelId })
                .then((result) => {
                    res.status(201).json({
                        message: "This hotel was deleted!",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            res.status(403).json({
                message: "This hotel is booking!",
            });
        }
    };

    action();
};

// ----------------------------------------------
// -------------Tạo một room mới-----------------
// ----------------------------------------------

exports.postNewRoom = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const maxPeople = req.body.maxPeople;
    const desc = req.body.desc;
    const roomNumbers = req.body.roomNumbers;
    const hotelId = req.body.hotelId;
    const isRoomEdit = req.body.isRoomEdit;
    const roomEditId = req.body.roomEditId;
    const createdAt = req.body.createdAt;
    const updatedAt = req.body.updatedAt;

    const newRoom = new Room({
        title: title,
        price: parseInt(price),
        maxPeople: parseInt(maxPeople),
        desc: desc,
        roomNumbers: roomNumbers,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
    });

    const createAndUpdateRoom = async () => {
        const getHotel = await Hotel.findById({ _id: hotelId });
        const hotelRooms = getHotel.rooms;

        if (isRoomEdit) {
            Room.findByIdAndUpdate(roomEditId, {
                title: title,
                price: parseInt(price),
                maxPeople: parseInt(maxPeople),
                desc: desc,
                roomNumbers: roomNumbers,
                updatedAt: new Date(updatedAt),
            })
                .then((result) => {
                    res.status(201).json({
                        message: "Edited the room!",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            newRoom
                .save()
                .then((room) => {
                    console.log("room:", room);
                    updatedHotelRooms = [...hotelRooms, room._id];
                    return Hotel.findByIdAndUpdate(hotelId, {
                        rooms: updatedHotelRooms,
                    });
                })
                .then(() => {
                    res.status(201).json({
                        message: "Post add room ok!",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    createAndUpdateRoom();
};

// ----------------------------------------------
// -------------Xoá một room---------------------
// ----------------------------------------------

exports.postDeleteRoom = (req, res, next) => {
    const roomId = req.body.roomId;

    const process = async () => {
        const getTransactionData = await Transaction.find();
        const roomsUnderBooking = getTransactionData.map((transaction) => {
            return transaction.room;
        });
        const roomIdsUnderBooking = [];

        for (
            let i = 0;
            roomsUnderBooking &&
            roomsUnderBooking.length > 0 &&
            i < roomsUnderBooking.length;
            i++
        ) {
            for (let j = 0; j < roomsUnderBooking[i].length; j++) {
                roomIdsUnderBooking.push(roomsUnderBooking[i][j].roomId);
            }
        }

        if (roomIdsUnderBooking.includes(roomId)) {
            res.status(403).json({
                message: "This room is under booking!",
            });
        } else {
            Room.findByIdAndDelete({ _id: roomId })
                .then((result) => {
                    res.status(201).json({
                        message: "Deleted the room!",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    process();
};
