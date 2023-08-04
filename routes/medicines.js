const express = require('express')
const {
    getMedicines,
    getMedicine,
    createMedicine,
} = require('../controllers/medicineController')

const router = express.Router()

// GET all medicines
router.get('/', getMedicines)

//GET a single medicine
router.get('/:id', getMedicine)

// POST a new medicine
router.post('/', createMedicine)

module.exports = router
