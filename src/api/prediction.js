
import {baseUrl} from './base'

const basePredictionApi = `${baseUrl}/prediction`

const getPredictionApi = (modelId)=>{
    return  `${basePredictionApi}/get?model-id=${modelId}`
}

export {
    basePredictionApi,
    getPredictionApi
}

export default {
    basePredictionApi,
    getPredictionApi
}