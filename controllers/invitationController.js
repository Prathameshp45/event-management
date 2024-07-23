const Event = require('../models/event');
const User = require('../models/user');

inviteUser = async (req, res) => {
    console.log(req.body)
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        // if (event.createdBy.toString() !== req.user.id) {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (event.invites.includes(user._id)) {
            return res.status(400).json({ message: 'User already invited' });
        }
        event.invites.push(user._id);
        await event.save();
        res.json({ message: 'User invited' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

rsvpEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (!event.invites.includes(req.user.userId)) {
            return res.status(401).json({ message: 'Not invited to this event' });
        }

        const existingRSVP = event.rsvps.find(rsvp => rsvp.userId.toString() === req.user.userId);
        if (existingRSVP) {
            existingRSVP.response = req.body.response;
        } else {
            event.rsvps.push({ userId: req.user.userId, response: req.body.response });
        }

        await event.save();
        res.json({ message: 'RSVP confirmed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports ={
    inviteUser,
    rsvpEvent
}