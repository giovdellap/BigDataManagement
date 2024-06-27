// returns an array containing the values of the parameters
function getParametersValues(parameters) {
    let keys = Object.keys(parameters)
    let values = []
    for (let i = 0; i < keys.length; i++) {
        values.push(parameters[keys[i]])
    }
    return values
}

// returns an array containing the names of the columns
function getColumnsNames(item) {
    let values = [
        "ts", 
        "customer", 
        "name", "version",
        "generations", "satisfaction", "wli", "tokens"
    ]
    let parameters = Object.keys(item.parameters)
    return values.concat(parameters)
}

//returns a string defining the columns
function getColumnsString(values) {
    let str = ""
    for (let i = 0; i < values.length - 1; i++) {
        str = str + values[i] + ", "
    }
    str = str + values[values.length - 1] + ")"
    return str
}

//returns a string containing the question marks
function getQuestionMarks(values) {
    //console.log('get question marks - values: ', values)
    let str = ""
    for (let i = 0; i < values.length - 1; i++) {
        str = str + "?, "
    }
    str = str + "?)"
    return str
}

module.exports = {
    getParametersValues,
    getColumnsNames,
    getColumnsString,
    getQuestionMarks
}