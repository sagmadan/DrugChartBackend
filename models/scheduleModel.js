const mongoose = require('mongoose')

const Schema = mongoose.Schema

const scheduleSchema = new Schema({
  medicineId: {
    type: String,
    required: true
  },
  medicineName: {
    type: String,
    required: true
  },
  timing1: {
    type: String,
    required: true
  },
  timing2: {
    type: String,
    required: false
  },
  timing3: {
    type: String,
    required: false
  },
  startFromDate: {
    type: String,
    required: true
  },
  startFromTime: {
    type: String,
    required: true
  },
  tillDate: {
    type: String,
    required: true
  },
  tillTime: {
    type: String,
    required: true
  },
  countDoseNumber: {
    type: Boolean,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Schedule', scheduleSchema)