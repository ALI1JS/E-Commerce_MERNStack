const router = require('express').Router();
const controller = require("../controller/paymentController");

router.post("/payment",controller.Payment);

module.exports = router;




