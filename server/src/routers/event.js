const express = require('express');
const router = new express.Router();
require('dotenv').config();

const eventController = require('../controller/eventController');

router.post('/event', eventController.createNewEvent);

router.get('/allEvents', eventController.getAllEvents);

router.get('/event/:id', eventController.getOneEvent);

router.patch('/event/:id', eventController.updateOneEvent);

router.delete('/event/:id', eventController.deleteOneEvent);

module.exports = router;
