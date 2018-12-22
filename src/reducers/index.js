import { combineReducers } from 'redux'
import Prediction from './Prediction'
import PredictionParams from './PredictionParams'
import Model from './Model'
import Test from './Test'


export default combineReducers({
    Prediction,
    PredictionParams,
    Model
})