const express = require('express')
const {
    getSchedules,
    getSchedule,
    createSchedule,
    discontinueSchedule
} = require('../controllers/scheduleController')
const requireAuth = require('../middleware/requireAuth')
const requireAdminAuth = require('../middleware/requireAdminAuth')

const router = express.Router()

// require auth for all schedule routes
router.use(requireAuth)

// GET all schedules
router.get('/', getSchedules)

//GET a single schedule
router.get('/:id', getSchedule)

// require admin auth for post/put schedule route
router.use(requireAdminAuth)

// POST a new schedule
router.post('/', createSchedule)

// Discontinue a schedule
router.put('/discontinue/:id', discontinueSchedule)

module.exports = router
