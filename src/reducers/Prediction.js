import * as Actions from '../actions/ActionTypes'

const initialState = {
    isLoading: false,
    predictions: []
}

const Prediction = (state = [], action)=> {
    switch(action.type){
        case Actions.FETCH_PREDICTON_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
                message: action.message
            }
        case Actions.FETCH_PREDICTION_SUCCESS:
            return{
                ...state,
                predictions: normalizeData(action.predictions),
                message: action.message
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

function normalizeData(data){
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
    let min = Math.min.apply( null, jsonObject.map((n) => n[key]));
    let max = Math.max.apply( null, jsonObject.map((n) => n[key]));
    console.log(min, max)
    return {
        min,
        max
    }
}



export default Prediction