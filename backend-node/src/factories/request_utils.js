const { getRequestClassification } = require("./rates");
const { randomNumber } = require("./utils");
const { Request, SpecialRequest } = require("../model/m_request")

function newRequest(special, date) {
    let input_tokens = randomNumber(1000, 10001)
    let total_tokens = input_tokens + randomNumber(10000, 70001)
    let stream_messages = randomNumber(1, 9)
    let input_dimension = 0
    let loading_time = 0
    if (special) {
        //console.log('IM SPECIAL')
        input_dimension = randomNumber(1000, 8001)
    }
    if (getRequestClassification(date) === "LOW") {
        loading_time = randomNumber(10, 31) + (stream_messages * 2)
    } else {
        loading_time = randomNumber(51, 90) + (stream_messages * 3.5)
    }
    loading_time = loading_time + (total_tokens / 2000)
    if (input_dimension > 2500) {
        loading_time = loading_time + randomNumber(25, 51)
    }
    
    if (special) {
        return new SpecialRequest(
            input_tokens,
            total_tokens,
            date,
            Math.round(loading_time),
            stream_messages,
            input_dimension
        )
    } else {
        return new Request(
            input_tokens,
            total_tokens,
            date,
            Math.round(loading_time),
            stream_messages
        )
    }

}

module.exports = {
    newRequest
}

