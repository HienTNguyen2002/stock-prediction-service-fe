import * as Actions from './ActionTypes'

const updateParams = (id, value) => ({
    type: Actions.UPDATE_PARAMS,
    id,
    value
})

const loadConfigs = (configUrl) => ({
    type: Actions.LOAD_CONFIGS,
    configUrl
})

export {
    updateParams,
    loadConfigs
}