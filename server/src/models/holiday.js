const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HolidaySchema = new Schema({
  USNationalHolidays: [
    {
      name: { type: String },
      description: { type: String },
      country: { type: Object },
      date: { type: Object },
      type: { type: Array },
      locations: { type: String },
      states: { types: String },
    },
  ],
});

const Holiday = mongoose.model('holiday', HolidaySchema);

module.exports = Holiday;
