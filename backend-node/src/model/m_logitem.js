const relevation = require("./m_relevation")

class LogItem {
    
    model = {}
    customer = ""
    relevations = new relevation.Relevation()
    timestamp = new Date()

    constructor(
        customer, model, relevations, timestamp) {
        
        this.customer = customer
        this.model = model
        this.relevations = relevations
        this.timestamp = timestamp
    }
}

module.exports = {LogItem}