const router = require('express').Router();
const Controller =require('../controller/detailscontroller');

router.get('/details',Controller.getDetails);

module.exports = router;