const Chart = require('../models/chartModel')
const mongoose = require('mongoose')

//GET a single chart
const getChart = async (req, res) => {
    const { date } = req.params

    const chart = await Chart.findOne({ date })

    if (!chart) {
        return res.status(404).json({ error: 'No chart present' })
    }

    res.status(200).json(chart)
}

// PUT a chart
const updateChart = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such chart' })
    }

    const { updateData } = req.body

    try {
        const updatedChart = await Chart.updateOne({ _id: id }, { $set: updateData })
        res.status(200).json(updatedChart)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getChart,
    updateChart
}