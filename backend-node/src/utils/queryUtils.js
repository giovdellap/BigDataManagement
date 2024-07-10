function countItems(data, value1, value2) {
    let resArray = []
    for (let i = 0; i < data.length; i++) {
        let resIndex = undefined
        for (let j = 0; j < resArray.length; j++) {
            if (data[i][value1] === resArray[j][value1] 
            && data[i][value2] === resArray[j][value2]) {
                resIndex = j
            }
        }
        if (resIndex) {
            resArray[resIndex].count++
        } else {
            let obj = data[i]
            obj.count = 1
            resArray.push(obj)
        }
    }
    return resArray
}

function roundFloats(data, values) {
    let res = []
    for (let i = 0; i < data.length; i++) {
        let obj = {}
        for (let j = 0; j < values.length; j++) {
            obj[values[j]] = data[i][values[j]].toFixed(2)
        }
        res.push(obj)
    }
    return res
}

module.exports = {
    countItems,
    roundFloats
}