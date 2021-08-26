const Holiday = require('../models/holiday');
require('dotenv').config();
const fetch = require('node-fetch');

exports.getHolidays = async (req, res) => {
    try {
        const holidayDocument = await Holiday.findOne({ year: req.params.id });

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
};
