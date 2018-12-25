import * as Actions from '../actions/ActionTypes'

const initialState = {
    modelId: null,
    isLoading: false,
    hasErrored: false,
}

const Model = (state = initialState, action)=> {
    switch(action.type){
        case Actions.BUILD_MODEL_SUCCESS:
            return {
                ...state,
                modelId: action.modelId,
                message: action.message
            }
        case Actions.BUILD_MODEL_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
                message: action.message
            }
        case Actions.BUILD_MODEL_ERROR:
            return {
                ...state,
                hasError: action.hasErrored,
                message: action.message
            }
        case Actions.RESET_MODEL_DATA:
            return{
                ...initialState
            }
        default:
            return state
    }
}

export default Model