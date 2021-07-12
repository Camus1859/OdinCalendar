const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HolidaySchema = new Schema({
  holidays: [
    {
      title: { type: String },
      description: { type: String },
      date: { type: String },
    },
  ],
});


const HolidaySchema = mongoose.model('holiday', HolidaySchema)

module.exports = HolidaySchema