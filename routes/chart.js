const express = require('express')
const {
    getChart,
    updateChart,
} = require('../controllers/chartController')
const requireAuth = require('../middleware/requireAuth')
const requireAdminAuth = require('../middleware/requireAdminAuth')

const router = express.Router()

// require auth for all chart routes
router.use(requireAuth)

//GET a single day chart
router.get('/:date', getChart)

// require admin auth for post/put charts route
router.use(requireAdminAuth)

// PUT a chart
router.put('/update/:id', updateChart)

module.exports = router
