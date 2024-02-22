const User = require("../models/user");

exports.authentication = (req, res, next) => {
    const userData = JSON.parse(req.headers.user);
    console.log("userData:", userData);
    // console.log("type of userData:", typeof userData);
    if (userData && userData.isAdmin) {
        next();
    } else {
        console.log("This account is not admin! ");
        res.status(403).json({
            message: "This account is not admin! ",
        });
    }
};
