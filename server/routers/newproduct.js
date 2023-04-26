
const router = require("express").Router();
const controller = require("../controller/newproduct");

router.post('/addproduct', controller.addNewproduct);
router.get('/products',controller.getProducts);

module.exports = router;