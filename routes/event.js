const express = require('express');
const { deleteEvent } = require('../controllers/event');
const { Event, Suggestion, Role, User } = require('../models');
// const canCreateEvent = require("../middlewares/canCreateEvent");
const router = express.Router();

router.get('/myevents', async (req, res) => {
  let allEvents = await Event.findAll();
  let myEvents = allEvents.filter((event) =>
    event.year.includes(req.session.User.year)
  );

  return res.status(200).json(myEvents);

  // return res
  //     .status(500)
  //     .json({ message: "Failed To Create Event", success: false, err: err });
});

router.delete('/delete/:id/:creator', deleteEvent);

router.post('/create', async (req, res) => {
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
});

router.post('/suggest', async (req, res) => {
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
});

router.get('/get-suggestions/:eventId', async (req, res) => {
  let { eventId } = req.params;
  console.log('RUNNING');
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
});

router.post('/add-role', async (req, res) => {
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
});

router.get('/get-dutiful', async (req, res) => {
  let { event_id } = req.body;
  const dutyMembers = await Role.findAll({
    where: {
      event_id,
    },
    include: [User, Event],
  });

  res.json(dutyMembers);
});

router.get('/:id', async (req, res) => {
  let { id } = req.params;
  console.log(id);
  const event = await Event.findOne({
    where: {
      event_id: id,
    },
  });

  console.log(event);

  res.status(200).json(event);
});

module.exports = router;
