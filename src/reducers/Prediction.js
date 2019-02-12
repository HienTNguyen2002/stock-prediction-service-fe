import * as Actions from '../actions/ActionTypes'
import {normalizePrediction} from '../utils/helpers'

const initialState = {
    isLoading: false,
    predictions: []
}

var moment = require('moment')

const Prediction = (state = initialState, action)=> {
    switch(action.type){
        case Actions.RESET_PREDICTION_DATA:
            return {
                ...initialState
            }
        case Actions.FETCH_PREDICTON_LOADING:
            return {
                ...state,
                displayPredictions: [],
                isLoading: action.isLoading,
                message: action.message
            }
        case Actions.FETCH_PREDICTION_SUCCESS:
            const {prediction, past, params} = action.predictions
            console.log("STATE", state)
            return{
                ...state,
                predictions: past,
                displayPredictions: normalizePrediction(prediction),
                message: action.message
            }
        case Actions.FETCH_PREDICTION_ERROR:
            return{
                ...state,
                hasError: action.hasErrored
            }
        case Actions.FETCH_PREDICTION:
            return [
                ...state,
                {
                    modelId: action.modelId
                }
            ]
        default:
            return state
    }
}
function getBreakPoint(params){
    const {date, training_years} = params
    var start_date =  moment(date)
    var prediction_start = start_date.add(training_years, 'years')
    var prediction_end = prediction_start.add(30, 'days')
    const numofDays= prediction_end.diff(prediction_start.format('YYYY-MM-DD'), 'days')
    const breakpointPct =  numofDays/(prediction_start.diff(prediction_end.format('YYYY-MM-DD'), 'days'))
    console.log('breakpointPct', breakpointPct*100, numofDays, prediction_end.format('DD-MM-YYYY'))
    return breakpointPct*100;
}



// function normalizeData(data){
//     let normalizedData = JSON.parse(JSON.stringify(data))
//     // let yhat_upperMinMax = this.getMinMaxValues(normalizedData, 'yhat_upper')
//     let yhat_lowerMinMax = getMinMaxValues(normalizedData, 'yhat_lower')
    
//     //let y_MinMax = getMinMaxValues(normalizedData, 'y')
//     let range = (yhat_lowerMinMax.max - yhat_lowerMinMax.min)
//     return normalizedData.map(item => {
//         // item.yhat_upper = (item.yhat_upper - yhat_upperMinMax.min)/(yhat_upperMinMax.max - yhat_upperMinMax.min)
//         // item.yhat_lower =  (item.yhat_lower - yhat_lowerMinMax.min)/(yhat_lowerMinMax.max - yhat_lowerMinMax.min)
//         item.yhat_upper = (item.yhat_upper - yhat_lowerMinMax.min)/range
//         item.yhat_lower = (item.yhat_lower - yhat_lowerMinMax.min)/range
//         item.y =  (item.y-yhat_lowerMinMax.min)/range
//         return item
//     }).slice(-100)
// }

// function getMinMaxValues(jsonObject, key){
//     let min = Math.min.apply( null, jsonObject.map((n) => n[key]));
//     let max = Math.max.apply( null, jsonObject.map((n) => n[key]));
//     console.log(min, max)
//     return {
//         min,
//         max
//     }
// }



export default Prediction