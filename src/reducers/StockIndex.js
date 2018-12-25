import * as Actions from '../actions/ActionTypes'

const initialState = {
    isLoading: false,
    stockData: null,
    stockInfo: {},
    stockConfigLoaded: false,
    tickerList: [],
    index: 'VIC',
    labels:[],
    displayLabels: ['close'],
    predictionToggle: false
}

const StockIndex = (state = initialState, action)=> {
    switch(action.type){
        case Actions.FETCH_STOCK_DATA_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
                message: action.message
            }
        case Actions.FETCH_STOCK_DATA_SUCCESS:
            const {info, price} = action.stockData
            const  parsedlabels = parseLabels(price[0])
            return{
                ...state,
                data: price,
                stockDescription: info,
                labels: parsedlabels,
                message: action.message
            }
        case Actions.FETCH_STOCK_DATA_ERROR:
            return{
                ...state,
                hasError: action.hasErrored
            }
        case Actions.LOAD_STOCK_INDEX_CONFIG_COMPLETE:
            return {
                ...state,
                tickerList: action.tickerList,
                stockConfigLoaded: action.stockConfigLoaded
            }
        case Actions.STOCK_INDEX_SELECTED:
            return {
                ...state,
                index: action.index
            }
        case Actions.UPDATE_SELECTED_LABELS:
            const {id, value} = action
            const {labels} = state
            const newLabels = {...labels}
            newLabels[id.toLowerCase()].selected = value
            return{
                ...state,
                labels:newLabels,
                displayLabels: parseDisplayLabels(newLabels, id)
            }
        case Actions.TOGGLE_PREDICTION:
            console.log(action.bool)
            return {
                ...state,
                predictionToggle: action.bool
            }
            break;
        default:
            return state
    }
}

function parseDisplayLabels(labels, selectedLabel){
    const displayLabels = Object.keys(labels).filter(key => {
        if (labels[key].selected === true)
            return key
    })
    return displayLabels.length === 0 ? [selectedLabel] : displayLabels
}

function parseLabels(item){
    let labels = {}
    for(var key in item){
        console.log(key)
        let selected = false;
        let active = true
        switch(key){
            case "ds":
                active= false
                break;
            case "close":
                selected = true
                break
        }
        labels[key] = {
            id: key,
            label: key.toUpperCase(),
            selected,
            active
        }
    }
    return labels
}


export default StockIndex