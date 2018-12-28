
import {baseUrl} from './base'

const basePredictionApi = `${baseUrl}/prediction`

const getPredictionApi = (modelId, days=30)=>{
    return  `${basePredictionApi}/get?model-id=${modelId}&days=${days}`
}

export {
    basePredictionApi,
    getPredictionApi
}

export default {
    basePredictionApi,
    getPredictionApi
}