const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedulecontroller');
const auth = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const filmController = require("../controllers/filmcontroller")

// Create a new schedule - Only accessible by coordinators
router.post('/create',auth, authorize(['admin']), scheduleController.createSchedule);

// Get all schedules - Accessible by admin and coordinators
router.get('/all', scheduleController.getSchedules);

// Get a schedules by film ID - Accessible by everyone (consider adding auth if needed)
router.get('/film/:id',scheduleController.getSchedulesByFilmId);

//Get a schedule by id
router.get('/:id', scheduleController.getScheduleById);

// Update schedule by ID - Only accessible by coordinators
router.put('/:id', auth, authorize(['admin']), scheduleController.updateSchedule);

// Delete schedule by ID - Only accessible by coordinators
router.delete('/:id', auth, authorize(['admin']), scheduleController.deleteSchedule);

module.exports = router;
