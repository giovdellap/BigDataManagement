const utils = require("./factory_utils.js");

class LogFactory {
    constructor() {

    }

    generateTestSet(logOrder) {
        return this.hourBasicSet(logOrder)
    }

    hourBasicSet(logOrder) {
        console.log(logOrder)
        let set = []
        for (let i = 0; i < 60; i++) {
            for (let i = 0; i < logOrder.minute_rate; i++) {
                let item = utils.newItem(logOrder.date)
                set.push(item)
            }
        }

        return set
    }
}

module.exports = {LogFactory}