// --------------------------------------------
// -----------Server với port 5000-------------
// --------------------------------------------

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const adminRoutes = require("./routes/admin");
const bookingRoutes = require("./routes/booking");

app.use(cors());
app.use(bodyParser.json());

app.use(adminRoutes);
app.use(bookingRoutes);

mongoose
    .connect(
        "mongodb+srv://xitrumvndn:2991981DBok@cluster0.lbmnaue.mongodb.net/booking?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected!");
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });
