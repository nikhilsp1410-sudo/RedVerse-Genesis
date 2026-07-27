const Analytics = require('../models/Analytics');

const getStats = async (req, res, next) => {
  try {
    const stats = await Analytics.find().sort({ date: -1 }).limit(30);
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const trackEvent = async (req, res, next) => {
  try {
    const { eventType } = req.body;
    
    if (!['pageViews', 'walletConnections', 'mintAttempts', 'mintSuccesses'].includes(eventType)) {
      return res.status(400).json({ success: false, message: 'Invalid event type' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const update = { $inc: { [eventType]: 1 } };

    await Analytics.findOneAndUpdate(
      { date: today },
      update,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, message: 'Event tracked' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  trackEvent,
};
