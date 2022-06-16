const {
  Event,
  Notice,
  Suggestion,
  Role,
  Report,
  sequelize,
} = require('../models');
const { Op, QueryTypes } = require('sequelize');
const path = require('path');

const multer = require('multer');

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

exports.createEvent = async (req, res) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ message: 'No Event Data Found', success: false });

    let { eventName, managers, description, year, scheduleDate, meetUrl } =
      req.body;

    let event = await Event.create({
      event_name: eventName,
      managers: managers,
      description: description,
      year: year,
      creator: req.session.User.username + ':' + req.session.User.roll_no,
      scheduled_date: scheduleDate,
      meet_url: meetUrl,
    });

    return res
      .status(200)
      .json({ message: 'Event Created Successfully', success: true, event });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Failed To Create Event', success: false, err: err });
  }
};

exports.createSuggestion = async (req, res) => {
  try {
    let { eventId, suggestion } = req.body;

    if (!req.body)
      return res
        .status(400)
        .json({ message: 'No Event Data Found', success: false });

    if (!suggestion) {
      return res
        .status(400)
        .json({ message: "Suggestion Can't Be Empty", success: false });
    }
    await Suggestion.create({
      event_id: eventId,
      suggestion,
      creator: req.session.User.username + ':' + req.session.User.roll_no,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Failed To Add Suggestion', success: false, err: err });
  }
};

exports.getEventSuggestions = async (req, res) => {
  let { eventId } = req.params;
  let suggestions = await Event.findOne({
    where: { event_id: eventId },
    include: Suggestion,
  });
  // let suggestions = await sequelize.query(
  //   `
  // SELECT * FROM suggestions WHERE event_id='${eventId}'
  // `,
  //   {
  //     type: QueryTypes.SELECT,
  //   }
  // );

  res.status(200).json(suggestions);
};

exports.addRole = async (req, res) => {
  let { rollNo, event_id, role } = req.body;

  try {
    const roleAdded = await Role.create({
      user_rollno: rollNo.toLowerCase(),
      event_id,
      role,
    });

    res.json(roleAdded);
  } catch (err) {
    res.send(err);
  }
};

exports.getDutyMembers = async (req, res) => {
  let { event_id } = req.body;
  const dutyMembers = await Role.findAll({
    where: {
      event_id,
    },
    include: [User, Event],
  });

  res.json(dutyMembers);
};

exports.getEventData = async (req, res) => {
  let { id } = req.params;
  const event = await Event.findOne({
    where: {
      event_id: id,
    },
  });

  res.status(200).json(event);
};

exports.scheduleMeet = async (req, res) => {
  const { meetdate, reporturl } = req.body;
  const { event_id } = req.params;

  const created_by = req.session.User.full_name;
  const creator_roll_no = req.session.User.roll_no;

  try {
    await Report.create({
      date: meetdate,
      event_id,
      created_by,
      creator_roll_no,
      reporturl,
    });
    res.status(200).json({
      message: 'Meet Scheduled Successfully',
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Failed To Create Meet', success: false, err: err });
  }
};

exports.getMeets = async (req, res) => {
  const { event_id } = req.params;
  try {
    const meets = await Report.findAll({
      where: {
        event_id,
      },
    });
    res.status(200).json(meets);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Failed To Fetch Meets', success: false, err: err });
  }
};

exports.uploadReport = async (req, res) => {
  let uploadedFile;
  let reqPath = path.join(__dirname, '../reports');
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, reqPath);
    },
    filename: function (req, file, cb) {
      // console.log(file);
      uploadedFile = file;
      cb(null, file.originalname);
    },
  });

  let upload = multer({ storage: storage });
  upload.single('files')(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
      // A Multer error occurred when uploading.
    }

    res.status(200).json({
      message: 'File Uploaded Successfully',
      success: true,
    });
  });
};
