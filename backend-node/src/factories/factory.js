const { getRateClassification } = require("./rates.js");
const { getDates } = require("./utils.js");
const { newItem, getRate } = require("./log_utils.js");
const { newRequest } = require("./request_utils.js");

class LogFactory {

    logSet = []
    requestSet = []

    constructor() {
    }

    generateOneHour(date) {        
        let rateClassification = getRateClassification(date)
        console.log('rate classification: ', rateClassification)

        let rate = getRate(rateClassification)
        console.log("logs rate: ", rate)

        let dates = getDates(date, rate)

        for (let i = 0; i < rate; i++) {
            let item = newItem(dates[i], rateClassification)
            this.logSet.push(item)
            if ((i % 3) === 0) {
                let request = newRequest(
                    (item.model.name === "ChartAnalyzer"),
                    dates[i]
                )
                this.requestSet.push(request)
            }
        }

    }

    get logSet() {
        return this.logSet
    }

    get requestSet() {
        return this.requestSet
    }

}

module.exports = {LogFactory}