const model = require("../model/m_model");
const { LogItem} = require("../model/m_logitem")
const { Relevation } = require("../model/m_relevation");
const { ChartGeneratorParameters, ChartAnalyzerParameters, GraphPredictorParameters, MarketTrackerParameters } = require("../model/m_parameters");
const { randomNumber, randomFloat } = require("./utils")

function newItem(date, classification) {

    let customer = randomCustomer()
    let model = randomModel()
    let temperature = randomFloat(0.2, 0.6)
    let tokens = randomNumber(3000, 10001)
    let relevation = getRelevation(classification, tokens, temperature)
    let parameters = getParameters(model.name, temperature)

    return new LogItem(
        customer,
        model,
        relevation,
        parameters,
        date
    )
}

function randomModel() {
    modelArray = model.models
    model_index = randomNumber(0, modelArray.length)
    selected = modelArray[model_index]
    version_index = randomNumber(0, selected.versions.length)
    return new model.Model(selected.name, selected.versions[version_index])
}

function randomCustomer() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 3; i++) {
      result += chars.charAt(Math.floor(randomNumber(0, chars.length + 1)));
    }
    for (let i = 0; i < 3; i++) {
        result += randomNumber(0, 10).toString();
      }
    return result;
  }
  
function getParameters(name, temperature) {
    switch (name) {
        case "ChartGenerator":
            return new ChartGeneratorParameters(randomFloat(0, 2), temperature)
        case "ChartAnalyzer":
            return new ChartAnalyzerParameters(randomFloat(0, 2), temperature)
        case "GraphPredictor":
            return new GraphPredictorParameters(randomFloat(0, 2), randomFloat(0, 2))
        case "MarketTracker":
            return new MarketTrackerParameters(randomFloat(0, 1))
    }
}

function getRelevation(classification, tokens, temperature) {
    let wli = getWli(classification)
    
    let satisfaction = 5
    let wli_factor = wli * 0.25
    let tokens_factor = tokens / 20000

    satisfaction = satisfaction - (wli_factor + tokens_factor)
    if ((wli_factor + tokens_factor) > 0.7) {
        satisfaction = satisfaction - (wli_factor + tokens_factor)
    }
    if (temperature > 0.4) {
        satisfaction = satisfaction - temperature
    }

    let generations = randomNumber (1, 3) + (tokens / 5000) + (wli * 0.4)
    if (temperature > 0.4) {
        generations = generations + (temperature * 2)
    }

    return new Relevation (
        Math.round(generations),
        Math.round(satisfaction),
        wli, tokens
    )

}

function getRate(classification) {
    switch (classification) {
        case "LOW":
            return randomNumber(20, 51)
        case "MEDIUM":
            return randomNumber(51, 81)
        case "HIGH":
            return randomNumber(81, 130)
        default:
            return 10
    }
}

function getWli(classification) {
    switch (classification) {
        case "LOW":
            return randomNumber(1, 3)
        case "MEDIUM":
            return randomNumber(3, 5)
        case "HIGH":
            return 5
        default:
            return 10
    }
}

module.exports = {
    newItem,
    getRate,
    getWli
}