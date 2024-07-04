

const Record = require('../models/Record');

// Get all records
const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json({ "message": "All records", records });
  } catch (error) {
    console.error('Error fetching records:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new record
const addRecord = async (req, res) => {
  const { quantity, amount, actionType, actionNumber, actionName, status, impact } = req.body;
  const currentDate = new Date();
  const postingYear = currentDate.getFullYear();
  const postingMonth = currentDate.toLocaleString('default', { month: 'long' });

  try {
    const newRecord = new Record({
      quantity,
      amount,
      postingYear,
      postingMonth,
      actionType,
      actionNumber,
      actionName,
      status,
      impact
    });

    await newRecord.save();
    res.status(201).json({ "message": "New record add successfully", newRecord });
  } catch (error) {
    console.error('Error adding record:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update records
const updateRecords = async (req, res) => {
  const updates = req.body;
  const { id } = req.params;
  console.log(id);

  if (!id) {
    return res.status(400).json({ message: 'Missing record ' });
  }

  try {
    const updatedRecord = await Record.findByIdAndUpdate({ _id: id }, updates);

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record updated successfully', updatedRecord });
  } catch (error) {
    console.error('Error updating record:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Update records
const updateRecordspatch = async (req, res) => {
  const updates = req.body;
  const { id } = req.params;
  console.log(id);

  if (!id) {
    return res.status(400).json({ message: 'Missing record ID in query parameters' });
  }

  try {
    const updatedRecord = await Record.findByIdAndUpdate({ _id: id }, updates);

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record updated successfully', updatedRecord });
  } catch (error) {
    console.error('Error updating record:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



module.exports = {
  getAllRecords,
  addRecord,
  updateRecords,
  updateRecordspatch
};