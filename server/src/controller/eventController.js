const Event = require('../models/event');
require('dotenv').config();

exports.createNewEvent = async (req, res) => {
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
};

exports.getAllEvents = async (req, res) => {
    const allEvents = await Event.find({});
    res.send(allEvents);
};

exports.getOneEvent = async (req, res) => {
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
};

exports.updateOneEvent = async (req, res) => {
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
};

exports.deleteOneEvent = async (req, res) => {
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
};
