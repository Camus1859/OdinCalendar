const express = require('express');
const Event = require('../models/event');
const router = new express.Router();

router.post('/event', async (req, res) => {

  const newEvent = new Event({
    ...req.body,
  });

  try {
    await newEvent.save();
    res.status(201);
  } catch (e) {
    res.status(400);
  }

  res.redirect('/');
});

router.get('/allEvents', async (req, res) => {
  const allEvents = await Event.find({})
  res.send(allEvents)
})

router.get('/event/:id', async (req, res) => {
  const _id = req.params.id

  console.log(_id)

})




module.exports = router;
