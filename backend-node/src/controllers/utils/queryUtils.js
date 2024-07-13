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

function roundToInt(data, values) {
    let res = []
    for (let i = 0; i < data.length; i++) {
        let obj = {}
        for (let j = 0; j < values.length; j++) {
            obj[values[j]] = Math.round(data[i][values[j]])
        }
        res.push(obj)
    }
    return res
}

function groupBy(data, groupField, analyzedField) {
    let res = []
    for (let i = 0; i < data.length; i++) {
        let resIndex = undefined
        //console.log('DATAITEM: ', data[i])
        //console.log('RES: ', res)
        for (let j = 0; j < res.length; j++) {
            if (res[j][groupField] === data[i][groupField]) {
                resIndex = j
            }
        }
        if(resIndex) {
            res[resIndex]['data'].push(data[i][analyzedField])
        } else {
            //console.log(res)

            let obj = {}
            obj[groupField] = data[i][groupField]
            obj['data'] = [data[i][analyzedField]]
            res.push(obj)
        }
    }
    //return res
    return res.slice(1, res.length)
}

module.exports = {
    countItems,
    roundFloats,
    roundToInt,
    groupBy
}