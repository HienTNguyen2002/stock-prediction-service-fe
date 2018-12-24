import * as Actions from './ActionTypes'
import {StockIndexAPI} from '../api'

function getStockData(ticker){
    return {
        type: Actions.FETCH_STOCK_DATA,
        ticker
    }
}

function updateLabelStates(id, value){
    return{
        type: Actions.UPDATE_SELECTED_LABELS,
        id,
        value
    }
}

function togglePrediction(bool){
    return {
        type: Actions.TOGGLE_PREDICTION,
        bool
    }
}

export function fetchStockDataError(bool) {
    return {
        type: Actions.FETCH_STOCK_DATA_ERROR,
        hasErrored: bool
    };
}

export function fetchStockDataLoading(bool) {
    return {
        type: Actions.FETCH_STOCK_DATA_LOADING,
        isLoading: bool,
        message: 'Crawling the data...'
    };
}

export function fetchStockDataSuccess(stockData) {
    return {
        type: Actions.FETCH_STOCK_DATA_SUCCESS,
        stockData,
        message: 'Indexes loaded'
    };
}

export function loadStockIndexComplete(tickerList){
    return {
        type: Actions.LOAD_STOCK_INDEX_CONFIG_COMPLETE,
        tickerList,
        stockConfigLoaded: true,
        message: 'Config loaded'
    }
}

export function stockIndexSelected(index){
    return {
        type: Actions.STOCK_INDEX_SELECTED,
        index
    }
}

export function loadTickerList(){
    return (dispatch) => {
        fetch('../configs/stockList.json')
        .then(response => {
            console.log('Config Response:', response)
            return response.json()
        })
        .then(json => {
            let list = []
            for(var key in json){
                list = [...list, ...json[key]]
            }
            console.log('Index Config Loaded', list)
            dispatch(loadStockIndexComplete(list))
        })
        .catch(exception=>{
            console.log('error while getting index config', exception)
        })
    }
}

export function fetchStockData(ticker) {
    return (dispatch) => {
        dispatch(fetchStockDataLoading(true));
        dispatch(togglePrediction(false))
        console.log('fetching StockData')
        fetch(StockIndexAPI.getStockDataApi(ticker))
            .then((response) => {
                console.log('StockDataAPI: ', response)
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(fetchStockDataLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((result) => {
                //const {StockData} = result
                dispatch(fetchStockDataSuccess(result))
            })
            .catch(() => {
                console.log('ERror')
                dispatch(fetchStockDataError(true))
            });
    };
}

export {
    togglePrediction,
    getStockData,
    updateLabelStates
}

export default {
    togglePrediction,
    getStockData,
    updateLabelStates
}