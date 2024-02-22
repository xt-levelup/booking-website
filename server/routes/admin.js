const express = require("express");

const adminControllers = require("../controllers/admin");
const authentication = require("../middleware/authentication");

const router = express.Router();

// Thêm user
router.post("/add-user", adminControllers.addUser);

//User login
router.post("/login", adminControllers.login);

// Post user data
router.post("/post-transactions", adminControllers.postTransactions);

//Post admin data
router.post(
    "/post-admin-transactions",
    authentication.authentication,
    adminControllers.postAdminTransactions
);

// Post new hotel
router.post(
    "/post-new-hotel",
    authentication.authentication,
    adminControllers.postNewHotel
);

// Post delete hotel
router.post(
    "/post-delete-hotel",
    authentication.authentication,
    adminControllers.postDeleteHotel
);

//Post new room
router.post(
    "/post-new-room",
    authentication.authentication,
    adminControllers.postNewRoom
);

//Post delete room
router.post(
    "/post-delete-room",
    authentication.authentication,
    adminControllers.postDeleteRoom
);

module.exports = router;
