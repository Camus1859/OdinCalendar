const express = require('express');
const Event = require('../models/event');
const Holiday = require('../models/holiday');
const router = new express.Router();
require('dotenv').config();
const fetch = require('node-fetch');

router.post('/event', async (req, res) => {
  const newEvent = new Event({
    ...req.body,
  });

  try {
    await newEvent.save();
    res.status(201).send(newEvent);
    console.log(newEvent);
    res.redirect('/');
  } catch (e) {
    res.status(400);
  }
});

router.get('/allEvents', async (req, res) => {
  const allEvents = await Event.find({});
  res.send(allEvents);
});

router.get('/event/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const event = await Event.findOne({
      _id,
    });

    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch {
    res.status(500).send();
  }
});

router.patch('/event/:id', async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const event = await Event.findOne({
      _id: req.params.id,
    });

    if (!event) {
      res.status(404).send();
    }

    updates.forEach((update) => (event[update] = req.body[update]));

    await event.save();
    res.send(event);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/event/:id', async (req, res) => {
  try {
    const eventTodelete = await Event.findOneAndDelete({
      _id: req.params.id,
    });

    if (!eventTodelete) {
      return res.status(404).send();
    }
    res.send(eventTodelete);
    console.log(eventTodelete);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/holidays/:id', async (req, res) => {
  try {
    const holidayDocument = await Holiday.findOne({ year: req.params.id })

    if (holidayDocument) {
      const nationalHolidaysArr = holidayDocument.USNationalHolidays;
      return res.status(201).send(nationalHolidaysArr);
    }

    const response = await fetch(
      `https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY}&country=US&year=${req.params.id}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          Accept: 'application/json',
        },
      }
    );
    const allHolidays = await response.json();

    const USNationalHolidays = allHolidays.response.holidays.filter(
      (holiday) => holiday.type[0] === 'National holiday'
    );

     Holiday.create({
      year: req.params.id,
      USNationalHolidays,
    });

    res.status(201).send(USNationalHolidays);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
