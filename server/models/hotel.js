// --------------------------------------------
// -----------------Model Hotel----------------
// --------------------------------------------

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    title: String,
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    photos: [
        {
            type: String,
            required: true,
        },
    ],
    desc: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        required: false,
    },
    rooms: [
        {
            type: Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
    ],
    cheapestPrice: Number,
});

module.exports = mongoose.model("Hotel", hotelSchema, "Hotel");
