

const mongoose = require('mongoose');


const RecordSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    validate: {
      validator: Number.isFinite,
      message: '{VALUE} is not a valid number'
    }
  },
  postingYear: {
    type: Number,

  },
  postingMonth: {
    type: String,

  },
  actionType: {
    type: String,

  },
  actionNumber: {
    type: String,

  },
  actionName: {
    type: String,

  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Approved'],
    default: 'Pending'
  },
  impact: {
    type: String,
    enum: ['Low', 'Mid', 'High']
   
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Record', RecordSchema);
