const Schedule = require('../models/scheduleModel')
const mongoose = require('mongoose')

// GET all schedules
const getSchedules = async (req, res) => {
    const schedules = await Schedule.find().sort({ medicineName: 1 })
    res.status(200).json(schedules)
}

//GET a single schedule
const getSchedule = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such schedule' })
    }

    const schedule = await Schedule.findById(id)

    if (!schedule) {
        return res.status(404).json({ error: 'No such schedule' })
    }

    res.status(200).json(schedule)
}

// POST a new schedule
const createSchedule = async (req, res) => {
    const {
        medicineId,
        medicineName,
        additionalInfo,
        timing1,
        timing2,
        timing3,
        startFromDate,
        startFromTime,
        tillDate,
        tillTime,
        countDoseNumber,
        frequency,
        status } = req.body

    // add doc to db
    try {
        const schedule = await Schedule.create({
            medicineId,
            medicineName,
            additionalInfo,
            timing1,
            timing2,
            timing3,
            startFromDate,
            startFromTime,
            tillDate,
            tillTime,
            countDoseNumber,
            frequency,
            status
        })
        res.status(200).json(schedule)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Discontinue schedule
const discontinueSchedule = async (req, res) => {
    const { id } = req.params

    // add doc to db
    try {
        const updatedSchedule = await Schedule.findOneAndUpdate({_id: id}, {status: "Discontinued"}, { new: true }).exec()
        res.status(200).json(updatedSchedule)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getSchedules,
    getSchedule,
    createSchedule,
    discontinueSchedule
}