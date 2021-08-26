const Event = require ('../models/event');
const Holiday = require('../models/holiday');
require('dotenv').config();
const fetch = require('node-fetch');




exports.createNewEvent = (req, res) => {
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
  }