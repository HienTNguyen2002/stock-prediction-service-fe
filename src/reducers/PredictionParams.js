import * as Actions from '../actions/ActionTypes'
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
        training_years: 10,
        label:'close',
        start_date: ''
    },
    valid: true,
    errorMessages: [],
    paramConfig: null
}
const predictionParams = (state = initialState, action)=> {
    switch(action.type){
        case Actions.UPDATE_PARAMS:
            const {id, value} = action;
            console.log('ID', id)
            return{
                ...state, 
                ...updateParams(state, id, value)
            }
        case Actions.LOAD_PARAM_CONFIG_COMPLETE:
            const {paramConfig} = action
            console.log('PARAM CONFIG:', paramConfig)
            return {
                ...state,
                paramConfig
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
    console.log(newParams)
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

export default predictionParams