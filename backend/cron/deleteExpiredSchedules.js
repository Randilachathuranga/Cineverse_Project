const cron = require('node-cron');
const Schedule = require('../models/Schedule');

// Set up a cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const today = new Date();
    // Find and delete all schedules where the show_date is before today
    const result = await Schedule.deleteMany({ show_date: { $lt: today } });
    console.log(`Deleted ${result.deletedCount} expired schedules.`);
  } catch (err) {
    console.error('Error deleting expired schedules:', err);
  }
});
