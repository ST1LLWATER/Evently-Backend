const { Event, Notice, sequelize } = require('../models');
const { Op, QueryTypes } = require('sequelize');

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

exports.getMyEvents = async (req, res) => {
  try {
    let myEvents = await Event.findAll({
      where: {
        [Op.or]: [
          {
            creator: req.session.User.username + ':' + req.session.User.roll_no,
          },
          {
            year: {
              [Op.contains]: [req.session.User.year],
            },
          },
        ],
      },
      order: [['scheduled_date', 'ASC']],
    });

    console.log(myEvents);

    res.status(200).json({
      message: 'Successfully Fetched Events',
      success: true,
      events: myEvents,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed To Fetch Events, Server Error',
      success: false,
      err: err,
    });
  }
};

exports.getNotices = async (req, res) => {
  try {
    let notices = await Notice.findAll({
      where: {
        event_id: req.params.id,
      },
    });

    res.status(200).json({
      message: 'Successfully Fetched Notices',
      success: true,
      notices: notices,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed To Fetch Notices, Server Error',
      success: false,
      err: err,
    });
  }
};

exports.addNotice = async (req, res) => {
  const { title, notice, date, url } = req.body;
  console.log(req.body);

  try {
    const addedNotice = await Notice.create({
      event_id: req.params.id,
      title,
      notice,
      date: date || null,
      url: url || null,
    });

    return res.status(200).json({
      message: 'Notice Added Successfully',
      success: true,
      addedNotice,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Failed To Add Notice', success: false, err: err });
  }
};
