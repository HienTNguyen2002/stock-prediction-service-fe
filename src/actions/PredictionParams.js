import * as Actions from './ActionTypes'

const updateParams = (id, value) => ({
    type: Actions.UPDATE_PARAMS,
    id,
    value
})

const resetPredictionParams = ()=> {
    return{
        type: Actions.RESET_PREDICTION_PARAMS
    }
}

const loadParamConfigCompleted = (paramConfig) => ({
    type: Actions.LOAD_PARAM_CONFIG_COMPLETE,
    paramConfig
})

function loadParamConfig(){
    return (dispatch) => {
        fetch('../configs/modelParameter.json')
        .then(response => {
            console.log('Config Response:', response)
            return response.json()
        })
        .then(json => {
            const {parameters} = json
            console.log('Param config Loaded', parameters)
            dispatch(loadParamConfigCompleted(parameters))
        })
        .catch(exception=>{
            console.log('error while getting index config', exception)
        })
    }
}


export {
    resetPredictionParams,
    updateParams,
    loadParamConfig
}