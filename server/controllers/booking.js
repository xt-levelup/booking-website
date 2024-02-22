const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");

// ---------------------------------------------
// ----------Lấy thông tin các khách sạn--------
// ---------------------------------------------

exports.getHotels = (req, res, next) => {
    Hotel.find()
        .then((hotels) => {
            res.status(200).json(hotels);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Something went wrong!",
            });
        });
};

// --------------------------------------------
// ----------Lấy thông tin các room------------
// --------------------------------------------

exports.getRooms = (req, res, next) => {
    Room.find()
        .then((rooms) => {
            res.status(200).json(rooms);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Something went wrong!",
            });
        });
};

// --------------------------------------------------
// ------------Tìm và trả vể giá trị search----------
// --------------------------------------------------

exports.postSearch = (req, res, next) => {
    const city = req.body.city;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    // const adult = req.body.adult;
    // const children = req.body.children;
    const room = req.body.room;

    const getData = async () => {
        const getTransactionData = await Transaction.find();
        const getTransactionRooms = [];

        for (let i = 0; i < getTransactionData.length; i++) {
            for (let j = 0; j < getTransactionData[i].room.length; j++) {
                // Không biết lỗi ở đâu mà không thể sử dụng toán tử spread
                // và toán tử gán để thêm phần tử vào object! :(

                let newRoom = {
                    roomId: getTransactionData[i].room[j].roomId.toString(),
                    roomName: getTransactionData[i].room[j].roomName,
                    roomPrice: getTransactionData[i].room[j].roomPrice,
                    roomNumber: getTransactionData[i].room[j].roomNumber,
                    _id: getTransactionData[i].room[j]._id,
                    hotel: getTransactionData[i].hotel.toString(),
                    dateStart: getTransactionData[i].dateStart,
                    dateEnd: getTransactionData[i].dateEnd,
                };

                getTransactionRooms.push(newRoom);
            }
        }

        const getHotelData = await Hotel.find();

        const getDataRooms = [];
        for (let i = 0; i < getHotelData.length; i++) {
            for (let j = 0; j < getHotelData[i].rooms.length; j++) {
                getDataRooms.push({
                    hotelId: getHotelData[i]._id,
                    roomId: getHotelData[i].rooms[j],
                });
            }
        }

        let dataRoomDetails = [];

        for (let i = 0; i < getDataRooms.length; i++) {
            const roomDetail = await Room.findById({
                _id: getDataRooms[i].roomId,
            });

            if (roomDetail) {
                for (let j = 0; j < roomDetail.roomNumbers.length; j++) {
                    const newRoomDetail = {
                        dateEnd: new Date(endDate),
                        dateStart: new Date(startDate),
                        hotel: getDataRooms[i].hotelId,
                        roomId: getDataRooms[i].roomId,
                        roomNumber: roomDetail.roomNumbers[j],
                        price: roomDetail.price,
                    };

                    dataRoomDetails.push(newRoomDetail);
                }
            }
        }

        // let roomFilters = [];

        const checkOutRange = () => {
            let outRange = true;
            for (let i = 0; i < getTransactionRooms.length; i++) {
                if (
                    new Date(endDate) <
                        new Date(getTransactionRooms[i].dateStart) ||
                    new Date(startDate) >
                        new Date(getTransactionRooms[i].dateEnd)
                ) {
                    outRange = true;
                } else {
                    outRange = false;
                    break;
                }
            }

            return outRange;
        };

        if (checkOutRange() === false) {
            for (let i = 0; i < getTransactionRooms.length; i++) {
                for (let j = 0; j < dataRoomDetails.length; j++) {
                    if (
                        dataRoomDetails[j].hotel.toString() ===
                            getTransactionRooms[i].hotel.toString() &&
                        dataRoomDetails[j].roomId.toString() ===
                            getTransactionRooms[i].roomId.toString() &&
                        dataRoomDetails[j].roomNumber.toString() ===
                            getTransactionRooms[i].roomNumber.toString()
                    ) {
                        dataRoomDetails.splice(
                            dataRoomDetails.indexOf(dataRoomDetails[j]),
                            1
                        );
                    }
                }
            }
        }

        const roomFilterDate = dataRoomDetails.filter((value, index, arr) => {
            return arr.indexOf(value) === index;
        });

        const hotelIdRoomFilterDate = roomFilterDate
            .filter((room) => {
                return room.hotel !== undefined;
            })
            .map((room) => {
                return room.hotel.toString();
            })
            .filter((value, index, arr) => {
                return arr.indexOf(value) === index;
            });

        const hotelDetailRoomFilterDate = [];

        for (let i = 0; i < hotelIdRoomFilterDate.length; i++) {
            const roomDetails = roomFilterDate
                .filter((room) => {
                    return room.hotel !== undefined;
                })
                .filter((room) => {
                    return (
                        room.hotel.toString() ===
                        hotelIdRoomFilterDate[i].toString()
                    );
                });

            const roomId = roomFilterDate
                .filter((room) => {
                    return room.hotel !== undefined;
                })
                .filter((room) => {
                    return (
                        room.hotel.toString() ===
                        hotelIdRoomFilterDate[i].toString()
                    );
                })
                .map((item) => {
                    return item.roomId.toString();
                })
                .filter((value, index, arr) => {
                    return arr.indexOf(value) === index;
                });

            const roomIdDetail = [];

            for (let j = 0; j < roomId.length; j++) {
                const roomNumbers = roomDetails
                    .filter((room) => {
                        return room.roomId.toString() === roomId[j].toString();
                    })
                    .map((item) => {
                        return item.roomNumber;
                    });

                const getRoom = await Room.findById({ _id: roomId[j] });

                getRoom.roomNumbers = roomNumbers;

                roomIdDetail.push({
                    roomId: getRoom,
                });
            }

            const roomIdDetailNumberList = [];

            for (let k = 0; k < roomIdDetail.length; k++) {
                for (
                    let l = 0;
                    l < roomIdDetail[k].roomId.roomNumbers.length;
                    l++
                ) {
                    roomIdDetailNumberList.push(
                        roomIdDetail[k].roomId.roomNumbers[l]
                    );
                }
            }

            const hotelIdRoomFilterDateDetail = await Hotel.findById({
                _id: hotelIdRoomFilterDate[i],
            });

            if (
                city !== "Where are you going?" &&
                room &&
                roomIdDetailNumberList.length >= parseInt(room) &&
                city === hotelIdRoomFilterDateDetail.city
            ) {
                hotelDetailRoomFilterDate.push({
                    hotelId: hotelIdRoomFilterDateDetail,
                    rooms: roomIdDetail,
                    availableRooms: roomIdDetailNumberList.length,
                });
            } else if (
                city !== "Where are you going?" &&
                !room &&
                city === hotelIdRoomFilterDateDetail.city
            ) {
                hotelDetailRoomFilterDate.push({
                    hotelId: hotelIdRoomFilterDateDetail,
                    rooms: roomIdDetail,
                    availableRooms: roomIdDetailNumberList.length,
                });
            } else if (
                city === "Where are you going?" &&
                room &&
                roomIdDetailNumberList.length >= parseInt(room)
            ) {
                hotelDetailRoomFilterDate.push({
                    hotelId: hotelIdRoomFilterDateDetail,
                    rooms: roomIdDetail,
                    availableRooms: roomIdDetailNumberList.length,
                });
            } else if (city === "Where are you going?" && !room) {
                hotelDetailRoomFilterDate.push({
                    hotelId: hotelIdRoomFilterDateDetail,
                    rooms: roomIdDetail,
                    availableRooms: roomIdDetailNumberList.length,
                });
            }
        }

        const testObject = { a: 1, b: 2, c: 3 };
        const testObjectResult = { ...testObject };
        testObjectResult.d = 4;
        testObjectResult.e = 5;

        res.json(hotelDetailRoomFilterDate);
    };

    getData();
};

// -----------------------------------------------
// ----------Tạo một transaction mới--------------
// -----------------------------------------------

exports.reserve = (req, res, next) => {
    const userName = req.body.userName;
    const hotel = req.body.hotel;
    const room = req.body.room;
    const dateStart = new Date(req.body.dateStart);
    const dateEnd = new Date(req.body.dateEnd);
    const price = req.body.price;
    const payment = req.body.payment;
    const status = req.body.status;
    const dateCreate = req.body.dateCreate;

    const newTransaction = new Transaction({
        userName: userName,
        hotel: hotel,
        room: room,
        dateStart: dateStart,
        dateEnd: dateEnd,
        price: price,
        payment: payment,
        status: status,
        dateCreate: dateCreate,
    });

    newTransaction
        .save()
        .then((result) => {
            res.status(200).json({
                message: "Post reserve succeeded!",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
