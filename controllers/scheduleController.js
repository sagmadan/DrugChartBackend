const Schedule = require('../models/scheduleModel')
const Chart = require('../models/chartModel')
const mongoose = require('mongoose')

const { getDateAndTime, getDateStringFromDate, addDaysToDate } = require('../utils/dateTimeUtils')
const { timings, frequencyToDaysMap, currentMedicineStatus } = require('../constants/scheduleConstants')

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


        // Adding schedule to the chart starts here
        const startDateAndTime = getDateAndTime(startFromDate, startFromTime)
        const tillDateAndTime = getDateAndTime(tillDate, tillTime)
        let insertionDate = new Date(startFromDate)
        let doseNumber = 1

        // iterating over different dates to insert the new schedule
        while (insertionDate <= tillDateAndTime) {

            try {
                // get insertion date string which will be the date in the chart collection documents
                const insertionDateString = getDateStringFromDate(insertionDate)

                // get the chart document from the collection using date as the filter
                let insertionDateChart = await Chart.findOne({ date: insertionDateString })

                // if the chart document does not exist, create one
                if (insertionDateChart == null) {
                    insertionDateChart = getEmptyChart(insertionDateString)
                }

                // timing 1 will always be present
                const scheduleDateTime1 = getDateAndTime(insertionDateString, timing1);
                // checking if the schedule date and time falls under the start and till date time
                if (scheduleDateTime1 >= startDateAndTime && scheduleDateTime1 <= tillDateAndTime) {
                    if (countDoseNumber) {
                        insertionDateChart[timing1].set(schedule._id, { medicineId, status: currentMedicineStatus.NOT_GIVEN, doseNumber })
                        doseNumber++
                    } else {
                        insertionDateChart[timing1].set(schedule._id, { medicineId, status: currentMedicineStatus.NOT_GIVEN })
                    }
                }

                // check if timing 2 is present
                if (timing2) {
                    const scheduleDateTime2 = getDateAndTime(insertionDateString, timing2);
                    // checking if the schedule date and time falls under the start and till date time
                    if (scheduleDateTime2 >= startDateAndTime && scheduleDateTime2 <= tillDateAndTime) {
                        if (countDoseNumber) {
                            insertionDateChart[timing2].set(schedule._id, { medicineId, status: currentMedicineStatus.NOT_GIVEN, doseNumber })
                            doseNumber++
                        } else {
                            insertionDateChart[timing2].set(schedule._id, { medicineId, status: currentMedicineStatus.NOT_GIVEN })
                        }
                    }
                }

                // check if timing 3 is present
                if (timing3) {
                    const scheduleDateTime3 = getDateAndTime(insertionDateString, timing3);
                    // checking if the schedule date and time falls under the start and till date time
                    if (scheduleDateTime3 >= startDateAndTime && scheduleDateTime3 <= tillDateAndTime) {
                        if (countDoseNumber) {
                            insertionDateChart[timing3].set(schedule._id, { medicineId, status: currentMedicineStatus.NOT_GIVEN, doseNumber })
                            doseNumber++
                        } else {
                            insertionDateChart[timing3].set(schedule._id, { medicineId, status: currentMedicineStatus.NOT_GIVEN })
                        }
                    }
                }

                // save the updated chart
                const updatedChart = await insertionDateChart.save();

                // update the insertion date
                insertionDate = addDaysToDate(insertionDate, frequencyToDaysMap[frequency])

            } catch (error) {
                res.status(400).json({ error: error.message })
                return
            }

        }

        // return the schedule
        res.status(200).json(schedule)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Discontinue schedule
const discontinueSchedule = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such schedule' })
    }
    // add doc to db
    try {
        const updatedSchedule = await Schedule.findOneAndUpdate({ _id: id }, { status: "Discontinued" }, { new: true }).exec()

        // get the schedule using id
        const schedule = await Schedule.findById(id)

        // Deleting schedule from the chart starts here
        const startDateAndTime = getDateAndTime(schedule.startFromDate, schedule.startFromTime)
        const tillDateAndTime = getDateAndTime(schedule.tillDate, schedule.tillTime)
        let deletionDate = new Date(schedule.startFromDate)

        // iterating over different dates to delete the given schedule
        while (deletionDate <= tillDateAndTime) {

            try {
                // get deletion date string which will be the date in the chart collection documents
                const deletionDateString = getDateStringFromDate(deletionDate)

                // get the chart document from the collection using date as the filter
                let deletionDateChart = await Chart.findOne({ date: deletionDateString })

                // timing 1 will always be present
                const scheduleDateTime1 = getDateAndTime(deletionDateString, schedule.timing1);
                // checking if the schedule date and time falls under the start and till date time
                if (scheduleDateTime1 >= startDateAndTime
                    && scheduleDateTime1 <= tillDateAndTime
                    && deletionDateChart[schedule.timing1].get(id).status === currentMedicineStatus.NOT_GIVEN) {
                    deletionDateChart[schedule.timing1].delete(id)
                }

                // check if timing 2 is present
                if (schedule.timing2) {
                    const scheduleDateTime2 = getDateAndTime(deletionDateString, schedule.timing2);
                    // checking if the schedule date and time falls under the start and till date time
                    if (scheduleDateTime2 >= startDateAndTime
                        && scheduleDateTime2 <= tillDateAndTime
                        && deletionDateChart[schedule.timing2].get(id).status === currentMedicineStatus.NOT_GIVEN) {
                        deletionDateChart[schedule.timing2].delete(id)
                    }
                }

                // check if timing 3 is present
                if (schedule.timing3) {
                    const scheduleDateTime3 = getDateAndTime(deletionDateString, schedule.timing3);
                    // checking if the schedule date and time falls under the start and till date time
                    if (scheduleDateTime3 >= startDateAndTime
                        && scheduleDateTime3 <= tillDateAndTime
                        && deletionDateChart[schedule.timing3].get(id).status === currentMedicineStatus.NOT_GIVEN) {
                        deletionDateChart[schedule.timing3].delete(id)
                    }
                }

                // save the updated chart
                const updatedChart = await deletionDateChart.save();

                // update the insertion date
                deletionDate = addDaysToDate(deletionDate, frequencyToDaysMap[schedule.frequency])

            } catch (error) {
                res.status(400).json({ error: error.message })
                return
            }

        }

        res.status(200).json(updatedSchedule)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

function getEmptyChart(date) {
    return new Chart({
        date,
        "12:00 AM": new Map(),
        "12:30 AM": new Map(),
        "1:00 AM": new Map(),
        "1:30 AM": new Map(),
        "2:00 AM": new Map(),
        "2:30 AM": new Map(),
        "3:00 AM": new Map(),
        "3:30 AM": new Map(),
        "4:00 AM": new Map(),
        "4:30 AM": new Map(),
        "5:00 AM": new Map(),
        "5:30 AM": new Map(),
        "6:00 AM": new Map(),
        "6:30 AM": new Map(),
        "7:00 AM": new Map(),
        "7:30 AM": new Map(),
        "8:00 AM": new Map(),
        "8:30 AM": new Map(),
        "9:00 AM": new Map(),
        "9:30 AM": new Map(),
        "10:00 AM": new Map(),
        "10:30 AM": new Map(),
        "11:00 AM": new Map(),
        "11:30 AM": new Map(),
        "12:00 PM": new Map(),
        "12:30 PM": new Map(),
        "1:00 PM": new Map(),
        "1:30 PM": new Map(),
        "2:00 PM": new Map(),
        "2:30 PM": new Map(),
        "3:00 PM": new Map(),
        "3:30 PM": new Map(),
        "4:00 PM": new Map(),
        "4:30 PM": new Map(),
        "5:00 PM": new Map(),
        "5:30 PM": new Map(),
        "6:00 PM": new Map(),
        "6:30 PM": new Map(),
        "7:00 PM": new Map(),
        "7:30 PM": new Map(),
        "8:00 PM": new Map(),
        "8:30 PM": new Map(),
        "9:00 PM": new Map(),
        "9:30 PM": new Map(),
        "10:00 PM": new Map(),
        "10:30 PM": new Map(),
        "11:00 PM": new Map(),
        "11:30 PM": new Map()
    })
}

module.exports = {
    getSchedules,
    getSchedule,
    createSchedule,
    discontinueSchedule
}