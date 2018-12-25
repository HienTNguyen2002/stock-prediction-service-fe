const initialState = {
    payload: 'NTXT'
}

const Test = (state = initialState, action)=> {
    switch(action.type){
        case 'ACTION_TEST':
            const {payload} = action;
            return {
                ...state,
                message: payload
            }
        default:
            return state
    }
}

export default Test