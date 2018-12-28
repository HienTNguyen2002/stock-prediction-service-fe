import * as Actions from './ActionTypes'
import {PredictionAPI} from '../api'

function resetPredictionData(){
    return{
        type: Actions.RESET_PREDICTION_DATA
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

function fetchPrediction(modelId, days) {
    return (dispatch) => {
        dispatch(fetchPredictionLoading(true));
        fetch(PredictionAPI.getPredictionApi(modelId, days))
            .then((response) => {
                console.log('PREDICTION REQUEST RESPONSE: ', response)
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(fetchPredictionLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((result) => {
                console.log('PREDICTION RESULT:', result)
                //const {prediction} = result
                dispatch(fetchPredictionSuccess(result))
            })
            .catch((exception) => {
                console.log(exception)
                dispatch(fetchPredictionError(true))
            });
    };
}

export {
    resetPredictionData,
    fetchPrediction
}
export default {
    resetPredictionData,
    fetchPrediction
}