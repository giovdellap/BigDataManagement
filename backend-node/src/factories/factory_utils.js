const model = require("../model/m_model");
const logitem = require("../model/m_logitem")
const relevations = require("../model/m_relevation")

function newItem(date) {
    return new logitem.LogItem(
        randomCustomer(),
        randomModel(),
        basicRelevation(),
        date
    )
}

function basicRelevation() {
    return new relevations.Relevation(
        randomNumber(2, 5),
        randomNumber(2, 5),
        randomNumber(2, 5)
    )
}

function randomModel() {
    modelArray = model.models
    index = randomNumber(modelArray.length, 0)
    return modelArray[index]
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
  

function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    newItem
}