import * as Actions from './ActionTypes'

const updateParams = (id, value) => ({
    type: Actions.UPDATE_PARAMS,
    id,
    value
})

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
    updateParams,
    loadParamConfig
}