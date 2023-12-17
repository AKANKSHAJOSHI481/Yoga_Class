const {userDetails } = require("../controllers/userController");
const router = require("express").Router();

router.post("/userDetails", userDetails);

module.exports = router;
