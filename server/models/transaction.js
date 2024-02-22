// -----------------------------------------
// -------------Model Transaction-----------
// -----------------------------------------

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomId: {
        type: String,
        required: true,
    },
    roomName: {
        type: String,
        required: true,
    },
    roomPrice: {
        type: String,
        required: true,
    },
    roomNumber: {
        type: String,
        required: true,
    },
});

const transactionSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    hotel: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    room: [roomSchema],
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    dateCreate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Transaction", transactionSchema);
