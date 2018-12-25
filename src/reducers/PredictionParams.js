import * as Actions from '../actions/ActionTypes'
import Strings from '../components/constants/string'
import { isNullOrUndefined, isNumber } from 'util';

var moment = require('moment')

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
        start_date: '01-08-2018',
        end_data:'',
        max_training_years: 10,
        max_date: '',
        min_date: '',
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
        case Actions.RESET_PREDICTION_PARAMS:
            return{
                ...state,
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
        
    const {ticker, prior, ma_lag, training_years, start_date, min_date, max_date} = params
    let tickerLegit = !isNullOrUndefined(ticker)
    let priorLegit = isNumber(parseFloat(prior)) && prior >= 0 && prior < 1
    let maLagLegit = isNumber(parseInt(ma_lag)) && ma_lag > 0
    let trainingYearsLegit = isNumber(parseInt(training_years)) && training_years > 1
    let start_dateLegit = moment(start_date).isBefore(max_date) && moment(start_date).isAfter(min_date)
  
    if (tickerLegit && priorLegit && maLagLegit && trainingYearsLegit && start_dateLegit){
        valid = true
    }
    return {
        valid,
        errorMessages:[
           !tickerLegit && Strings.INVALID_TICKER,
           !priorLegit && Strings.PRIOR_INVALID,
           !start_dateLegit && Strings.START_DATE_INVALID,
           !maLagLegit && Strings.MA_INVALID,
           !training_years && Strings.TRAINING_YEARS_INVALID
        ]
    }
}

export default predictionParams