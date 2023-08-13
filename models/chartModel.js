const mongoose = require('mongoose')
const Schema = mongoose.Schema

const timeSlotSchema = new Schema({
    medicineId: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    doseNumber: {
        type: Number,
        required: false
    },
    notes: {
        type: String,
        required: false
    }
})

const chartSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    "12:00 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "12:30 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "1:00 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "1:30 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "2:00 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "2:30 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "3:00 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "3:30 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "4:00 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "4:30 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "5:00 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "5:30 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "6:00 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "6:30 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "7:00 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "7:30 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "8:00 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "8:30 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "9:00 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "9:30 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "10:00 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "10:30 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "11:00 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "11:30 AM": {
        type: Map,
        of: timeSlotSchema
    },
    "12:00 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "12:30 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "1:00 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "1:30 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "2:00 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "2:30 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "3:00 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "3:30 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "4:00 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "4:30 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "5:00 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "5:30 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "6:00 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "6:30 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "7:00 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "7:30 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "8:00 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "8:30 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "9:00 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "9:30 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "10:00 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "10:30 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "11:00 PM": {
        type: Map,
        of: timeSlotSchema
    },
    "11:30 PM": {
        type: Map,
        of: timeSlotSchema
    }
})

module.exports = mongoose.model('Chart', chartSchema)