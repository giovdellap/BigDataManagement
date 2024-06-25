const model = require("../model/m_model");
const logitem = require("../model/m_logitem")
const { Relevation } = require("../model/m_relevation");
const { Parameters, ChartGeneratorParameters, ChartAnalyzerParameters, GraphPredictorParameters, MarketTrackerParameters } = require("../model/m_parameters");

function newItem(date) {
    let model = randomModel()
    return new logitem.LogItem(
        randomCustomer(),
        model,
        basicRelevation(),
        getParameters(model.name),
        date
    )
}


function basicRelevation() {
    return new Relevation(
        randomNumber(2, 5),
        randomNumber(2, 5),
        randomNumber(2, 5)
    )
}

function randomModel() {
    modelArray = model.models
    model_index = randomNumber(modelArray.length, 0)
    selected = modelArray[model_index]
    version_index = randomNumber(selected.versions.length, 0)
    return new model.Model(selected.name, selected.versions[version_index])
}

function randomCustomer() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 3; i++) {
      result += chars.charAt(Math.floor(randomNumber(chars.length + 1, 0)));
    }
    for (let i = 0; i < 3; i++) {
        result += randomNumber(0, 10).toString();
      }
    return result;
  }
  
function getParameters(name) {
    let parameters = new Parameters()
    switch (name) {
        case "ChartGenerator":
            parameters = new ChartGeneratorParameters(0.3, 0.2)
            break
        case "ChartAnalyzer":
            parameters = new ChartAnalyzerParameters(0.3, 0.2)
            break
        case "GraphPredictor":
            parameters = new GraphPredictorParameters(0.2, 0.3)
            break
        case "MarketTracker":
            parameters = new MarketTrackerParameters(0.5)
            break
    }
    return parameters
}

function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    newItem
}