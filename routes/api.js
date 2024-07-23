const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authController');

router.post('/register', authControllers.registerUser);
router.post('/login', authControllers.loginUser);

const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createEvent', authMiddleware, eventController.createEvent);
router.get('/getEvent', authMiddleware, eventController.getEvents);
router.put('/event/:id', authMiddleware, eventController.updateEvent);
router.delete('/event/:id', authMiddleware, eventController.deleteEvent);


const invitationController = require('../controllers/invitationController');

router.post('/event/:id/invite', authMiddleware, invitationController.inviteUser);
router.post('/event/:id/rsvp', authMiddleware, invitationController.rsvpEvent);

module.exports = router;
