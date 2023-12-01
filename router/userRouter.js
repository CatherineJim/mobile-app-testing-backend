let express = require("express");
let {
  signUp,
  signin,
  getAllUser,
  restrictTo,
  protect,
} = require("./../controller/authController");

let router = express.Router();
let cors = require("cors");

router.post("/signup", signUp, cors({ origin: "*" }));
router.post("/signin", signin, cors({ origin: "*" }));

// // Protect all routes after this (Only-Admin) middleware
// router.use(protect);
// router.use(restrictTo("admin"));
// router.route("/").get(getAllUser);

module.exports = router;
