const express = require('express');
const router = new express.Router();

require('dotenv').config();

const holidayController = require('../controller/holidayController');

router.get('/holidays/:id', holidayController.getHolidays);

module.exports = router;
