class LogOrder {
    
    date = new Date()
    minute_rate = 0

    constructor(date, rate) {
        this.date = date
        this.minute_rate = rate
    }
}

module.exports = {
    LogOrder
}