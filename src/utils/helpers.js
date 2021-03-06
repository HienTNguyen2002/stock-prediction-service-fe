var moment = require('moment')
function fetchUrl(url, method = 'GET'){
    let result = {}
    try{
        result = fetch(url,
        {
            method: method
        })
        .then(resp => {
            console.log('fetched')
            return resp.json()
        })
    } catch(exception){
        console.log(exception)
        result = {
            message: exception.message
        }
    }
    return result
}

function filterDatabByParams(data =[], params = {}){
    const {start_date, training_years} = params
    var prediction_start = moment(start_date)
    return data.filter(item => {
        const {ds} = item
        return moment(ds).isAfter(prediction_start.format('YYYY MM DD'))
    })
}

function normalizeData(data, key){
    // let yhat_upperMinMax = this.getMinMaxValues(normalizedData, 'yhat_upper')
    let minMaxValues = getMinMaxValues(data, key)
    
    //let y_MinMax = getMinMaxValues(normalizedData, 'y')
    let range = (minMaxValues.max - minMaxValues.min)
    return data.map(item => {
        // item.yhat_upper = (item.yhat_upper - yhat_upperMinMax.min)/(yhat_upperMinMax.max - yhat_upperMinMax.min)
        // item.yhat_lower =  (item.yhat_lower - yhat_lowerMinMax.min)/(yhat_lowerMinMax.max - yhat_lowerMinMax.min)
        let t = {...item}
        t[key] = (item[key]-minMaxValues.min)/range
        return t
    })
}

function normalizePrediction(data){
    let normalizedData = JSON.parse(JSON.stringify(data))
    // let yhat_upperMinMax = this.getMinMaxValues(normalizedData, 'yhat_upper')
    let yhat_lowerMinMax = getMinMaxValues(normalizedData, 'yhat_lower')
    
    //let y_MinMax = getMinMaxValues(normalizedData, 'y')
    let range = (yhat_lowerMinMax.max - yhat_lowerMinMax.min)
    return normalizedData.map(item => {
        // item.yhat_upper = (item.yhat_upper - yhat_upperMinMax.min)/(yhat_upperMinMax.max - yhat_upperMinMax.min)
        // item.yhat_lower =  (item.yhat_lower - yhat_lowerMinMax.min)/(yhat_lowerMinMax.max - yhat_lowerMinMax.min)
        item.yhat_upper = (item.yhat_upper - yhat_lowerMinMax.min)/range
        item.yhat_lower = (item.yhat_lower - yhat_lowerMinMax.min)/range
        item.y =  (item.y-yhat_lowerMinMax.min)/range
        return item
    })
}

function getMinMaxValues(jsonObject, key){
    let min = Math.min.apply( null, jsonObject.map((n) => {
        if (n[key] !== 0)
            return n[key]
    }));
    let max = Math.max.apply( null, jsonObject.map((n) => {
        if(n[key] !== 0)
            return n[key]
    }));
    return {
        min,
        max
    }
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

export {fetchUrl, normalizeData, normalizePrediction, titleCase, filterDatabByParams}
export default {fetchUrl, normalizeData, normalizePrediction, titleCase, filterDatabByParams}