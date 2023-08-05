const express = require('express')
const {
    getMedicines,
    getMedicine,
    createMedicine,
} = require('../controllers/medicineController')
const requireAuth = require('../middleware/requireAuth')
const requireAdminAuth = require('../middleware/requireAdminAuth')

const router = express.Router()

// require auth for all medicine routes
router.use(requireAuth)

// GET all medicines
router.get('/', getMedicines)

//GET a single medicine
router.get('/:id', getMedicine)

// require admin auth for post/put medicines route
router.use(requireAdminAuth)

// POST a new medicine
router.post('/', createMedicine)

module.exports = router
