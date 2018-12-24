import * as Actions from './ActionTypes'
import {ModelAPI} from '../api'

var intervalId = 0

function buildModelError(bool) {
    return {
        type: Actions.BUILD_MODEL_ERROR,
        hasErrored: bool,
        message: 'Error occurred while building the model'
    };
}

function buildModelStarted(bool) {
    return {
        type: Actions.BUILD_MODEL_STARTED,
        message: 'Sending your model to the factory'
    };
}


function buildModelLoading(bool) {
    return {
        type: Actions.BUILD_MODEL_LOADING,
        isLoading: bool,
        message: bool && 'Your model is baking up...'
    };
}

function buildModelSuccess(modelId) {
    return {
        type: Actions.BUILD_MODEL_SUCCESS,
        modelId,
        message:'Model baked'
    };
}

function statusEveryTwoSeconds(modelId) {
    // We return a function instead of an action object
    console.log('DISPATCH NE')
    return (dispatch) => {
        dispatch(buildModelLoading(true));
        intervalId = setInterval(() => {
            // This function is able to dispatch other action creators
            console.log('Checking Statuses')
            fetch(ModelAPI.checkModelStatusApi(modelId))
            .then((response)=> {
                console.log('RESPONSE', response)
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response
            })
            .then(response => response.json())
            .then(jsonResult=> {
                const {status} = jsonResult
                console.log(status)
                if(status === 1){
                    dispatch(buildModelLoading(false));
                    dispatch(buildModelSuccess(modelId))
                    clearInterval(intervalId)
                }
                if(status === -2 ){
                    dispatch(buildModelError(true))
                    clearInterval(intervalId)
                }
            })
            .catch(()=> dispatch(buildModelError(true)))
        }, 2000);
    };
}

function buildModel(params) {
    return (dispatch) => {
        dispatch(buildModelLoading(true));

        fetch(ModelAPI.buildModelApi(params), {
            method: 'POST'
        })
            .then((response) => {
                console.log('RESPONSE', response)
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(buildModelLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then(({status_code}) => {
                const {model_id, status} = status_code
                console.log('Status_Code', status_code)
                if(status === 1 ){
                    dispatch(buildModelSuccess(model_id))
                }else{
                    dispatch(statusEveryTwoSeconds(model_id))
                }
               
            })
            .catch(() => dispatch(buildModelError(true)));
    };
}

export {
    buildModel
}

export default {
    buildModel
}