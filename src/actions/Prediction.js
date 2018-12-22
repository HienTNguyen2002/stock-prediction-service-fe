import * as Actions from './ActionTypes'
import {PredictionAPI} from '../api'

function getPrediction(modelId){
    return {
        type: Actions.FETCH_PREDICTION,
        modelID
    }
}

export function fetchPredictionError(bool) {
    return {
        type: Actions.FETCH_PREDICTION_ERROR,
        hasErrored: bool
    };
}

export function fetchPredictionLoading(bool) {
    return {
        type: Actions.FETCH_PREDICTON_LOADING,
        isLoading: bool,
        message: 'Making the forecast...'
    };
}

export function fetchPredictionSuccess(predictions) {
    return {
        type: Actions.FETCH_PREDICTION_SUCCESS,
        predictions,
        message: 'Forecast result received'
    };
}

export function fetchPrediction(modelId) {
    return (dispatch) => {
        dispatch(fetchPredictionLoading(true));
        console.log('fetching Prediction')
        fetch(PredictionAPI.getPredictionApi(modelId))
            .then((response) => {
                console.log('PredictionAPI: ', response)
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(fetchPredictionLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((result) => {
                console.log('Fetched:', result)
                const {prediction} = result
                dispatch(fetchPredictionSuccess(prediction))
            })
            .catch(() => {
                console.log('ERror')
                dispatch(fetchPredictionError(true))
            });
    };
}


export default {
    getPrediction
}