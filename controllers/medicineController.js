const Medicine = require('../models/medicineModel')
const mongoose = require('mongoose')

// GET all medicines
const getMedicines = async (req, res) => {
    const medicines = await Medicine.find().sort({name: 1})
    res.status(200).json(medicines)
}

//GET a single medicine
const getMedicine = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such medicine'})
    }

    const medicine = await Medicine.findById(id)

    if (!medicine) {
        return res.status(404).json({error: 'No such medicine'})
    }

    res.status(200).json(medicine)
}

// POST a new medicine
const createMedicine = async (req, res) => {
    const {name, concentration, unit} = req.body
  
    // add doc to db
    try {
      const medicine = await Medicine.create({name, concentration, unit})
      res.status(200).json(medicine)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

module.exports = {
    getMedicines,
    getMedicine,
    createMedicine
}