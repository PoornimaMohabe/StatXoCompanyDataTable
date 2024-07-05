

const express = require('express');
const { getAllRecords, addRecord, updateRecords, updateRecordspatch } = require('../controllers/dataController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

//  protect routes
// router.use(authMiddleware);

// fetch all records
router.get('/records', getAllRecords);

// add a new record
router.post('/records', addRecord);


// update records
router.put('/records/:id', adminMiddleware, updateRecords);

router.patch('/recordspatch/:id', adminMiddleware, updateRecordspatch);

module.exports = router;