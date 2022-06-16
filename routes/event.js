const express = require('express');
const {
  deleteEvent,
  addNotice,
  getMyEvents,
  getNotices,
  createEvent,
  createSuggestion,
  getEventSuggestions,
  addRole,
  getDutyMembers,
  getEventData,
  scheduleMeet,
  getMeets,
} = require('../controllers/event');
// const canCreateEvent = require("../middlewares/canCreateEvent");
const router = express.Router();

router.get('/myevents', getMyEvents);
router.delete('/delete/:id/:creator', deleteEvent);
router.post('/add/notice/:id', addNotice);
router.get('/get/notices/:id', getNotices);
router.post('/create', createEvent);
router.post('/suggest', createSuggestion);
router.get('/get-suggestions/:eventId', getEventSuggestions);
router.post('/add-role', addRole);
router.get('/get-dutiful', getDutyMembers);
router.get('/:id', getEventData);
router.post('/schedule/:event_id', scheduleMeet);
router.get('/get-schedule/:event_id', getMeets);

module.exports = router;
