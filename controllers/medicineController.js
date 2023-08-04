// GET all medicines
const getMedicines = async (req, res) => {
    res.status(200).json({mssg: 'These are all the medicines'})
}

//GET a single medicine
const getMedicine = async (req, res) => {
    const { id } = req.params
    res.status(200).json({mssg: `This is a single medicine with id: ${id}`})
}

// POST a new medicine
const createMedicine = async (req, res) => {
    const {name, concentration, unit} = req.body
    res.status(200).json({mssg: `New medicine created: ${name} ${concentration}${unit}`})
}

module.exports = {
    getMedicines,
    getMedicine,
    createMedicine
}