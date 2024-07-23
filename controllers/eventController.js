const Event = require('../models/event');

createEvent = async (req, res) => {
    const { title, description, date, time } = req.body;
    try {
        const event = new Event({ title, description, date, time, createdBy: req.user.id });
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

getEvents = async (req, res) => {
    try {
        const events = await Event.find({ createdBy: req.user.id });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        Object.assign(event, req.body);
        await event.save();
        res.json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await event.remove();
        res.json({ message: 'Event removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
}