const Schedule = require('../models/Schedule');

// Create a new schedule
exports.createSchedule = async (req, res) => {
  try {
    const { film_id, showTime } = req.body;

    const schedule = new Schedule({
      film_id,
      showTime
    });

    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Get all schedules
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('film_id');
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Get a schedule by film ID
exports.getSchedulesByFilmId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Film ID:", id);

    const schedules = await Schedule.find({ film_id: id });
    console.log("Schedules Found:", schedules);

    // If no schedules are found, return an empty array with a 200 status
    if (schedules.length === 0) {
      return res.status(200).json([]); // Return an empty array
    }

    res.status(200).json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//Get a schedule by schedule id
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate('film_id');

    if (!schedule) {
      return res.status(404).json({ msg: 'Schedule not found' });
    }

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};


// Update schedule by ID
exports.updateSchedule = async (req, res) => {
  try {
    const { film_id,showTime } = req.body;
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { film_id, showTime },
      { new: true }
    ).populate('film_id');

    if (!schedule) {
      return res.status(404).json({ msg: 'Schedule not found' });
    }

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Delete schedule by ID
exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!schedule) {
      return res.status(404).json({ msg: 'Schedule not found' });
    }

    res.json({ msg: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};
