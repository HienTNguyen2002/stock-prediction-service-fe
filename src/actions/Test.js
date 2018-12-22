import * as Actions from './ActionTypes'

const testFunction = state => ({
    type: Actions.ACTION_TEST,
    payload: 'Hello'
})

export {
    testFunction
}