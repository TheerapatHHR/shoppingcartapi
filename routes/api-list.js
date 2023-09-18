const express = require('express');
const apiController = require('../controller/discount');

const router = express.Router();

router.route('/get-discount').post(apiController.getDiscount);
router.route('/get-item').get(apiController.getItems);

module.exports = router;