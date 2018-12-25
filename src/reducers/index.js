import { combineReducers } from 'redux'
import Prediction from './Prediction'
import PredictionParams from './PredictionParams'
import Model from './Model'
import StockIndex from './StockIndex'

export default combineReducers({
    Prediction,
    PredictionParams,
    Model,
    StockIndex
})