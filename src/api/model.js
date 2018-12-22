import {baseUrl} from './base'
import {buildModelParamsUrl} from './helpers'

const baseModelUrl = `${baseUrl}/model`

const buildModelApi = (params) => {
    const paramsUrl = buildModelParamsUrl(params)
    return `${baseModelUrl}/build${paramsUrl}`
}

const checkModelStatusApi = (modelId) => {
    return `${baseModelUrl}/status/${modelId}`
}

export {
    baseModelUrl,
    buildModelApi,
    checkModelStatusApi
}

export default {
    baseModelUrl,
    buildModelApi,
    checkModelStatusApi
}