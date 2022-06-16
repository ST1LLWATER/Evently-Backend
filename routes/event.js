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
  uploadReport,
} = require('../controllers/event');
// const canCreateEvent = require("../middlewares/canCreateEvent");
const router = express.Router();
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'reports');
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

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
router.post('/upload-report/:meet_id', uploadReport);
// router.post('/upload-report/:meet_id', upload.single('files'), (req, res) => {
//   console.log(req.file);
//   res.json({ message: 'File Uploaded Successfully' });
// });

module.exports = router;
