import * as Actions from '../actions/ActionTypes'
import { loadConfigs } from '../actions/PredictionParams';
import { string } from 'prop-types';
import Strings from '../components/constants/string'
import { isNullOrUndefined, isNumber } from 'util';

const initialState = {
    configuration: {},
    params:{
        daily_ssl: false,
        wkly_ssl: false,
        mthly_ssl: false,
        qrtly_ssl: false,
        yrly_ssl: true,
        ticker: 'VNM',
        prior: 0.5,
        ma_lag: 1,
        training_years: 10
    },
    valid: true,
    errorMessages: []
}
const predictionParams = (state = initialState, action)=> {
    switch(action.type){
        case Actions.UPDATE_PARAMS:
            const {id, value} = action;
            return{
                ...state, 
                ...updateParams(state, id, value)
            }
        case Actions.LOAD_CONFIGS:
            const {configUrl} = action
            return {
                config: loadConfigs(configUrl)
            }
        default:
            return state
    }
}

function updateParams(previousState, id, newValue){
    const {params} = previousState
    const newParams = {...params}
    newParams[id] = newValue

    const {valid, errorMessages} =  validateParams(newParams) 
    console.log(id, newValue)
    return {
        params: newParams,
        errorMessages, 
        valid
    }
}

function validateParams(params){
    let valid = false
        
    const {ticker, prior, ma_lag, training_years} = params
    let tickerLegit = !isNullOrUndefined(ticker)
    let priorLegit = isNumber(parseFloat(prior)) && prior >= 0 && prior < 1
    let maLagLegit = isNumber(parseInt(ma_lag)) && ma_lag > 0
    let trainingYearsLegit = isNumber(parseInt(training_years)) && training_years > 1
  
    if (tickerLegit && priorLegit && maLagLegit && trainingYearsLegit){
        valid = true
    }
    return {
        valid,
        errorMessages:[
           !tickerLegit && Strings.INVALID_TICKER,
           !priorLegit && Strings.PRIOR_INVALID
        ]
    }
}

// function loadConfigs(configUrl){
//     fetch('../../configs/model_parameters.json')
//     .then( result => result.json())
//     .then(json =>{ 
//         console.log(json)
//         this.setState({configuration: json})
//     })
// }

export default predictionParams