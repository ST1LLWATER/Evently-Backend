const { Event } = require('../models');

exports.deleteEvent = async (req, res) => {
  if (req.params.creator !== req.session.User.roll_no) {
    return res.status(400).json({
      message: 'You are not authorized to delete this event',
      success: false,
    });
  }

  try {
    await Event.destroy({
      where: {
        event_id: req.params.id,
      },
    });
    return res.status(200).json({
      message: 'Event Deleted Successfully',
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Failed To Delete Event, Server Error',
      success: false,
      err: err,
    });
  }
};
