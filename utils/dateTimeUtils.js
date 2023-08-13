function getDateAndTime(dateString, timeString) {
    const combinedString = `${dateString} ${timeString}`
    const dateTimeUTC = new Date(combinedString)
    const dateTimeIST = new Date(dateTimeUTC.getTime() + 19800000);
    return dateTimeIST
}

function getDateStringFromDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

function addDaysToDate(date, days) {
    const newDateTimestamp = date.getTime() + days * 24 * 60 * 60 * 1000
    return new Date(newDateTimestamp)
}

module.exports = { getDateAndTime, getDateStringFromDate, addDaysToDate }