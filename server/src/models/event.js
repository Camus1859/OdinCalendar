const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event;
