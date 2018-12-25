import {baseUrl} from './base'

const baseStockDataApi = `${baseUrl}/data/price`

const getStockDataApi = (ticker)=>{
    return  `${baseStockDataApi}/${ticker}`
}

export {
    baseStockDataApi,
    getStockDataApi
}

export default {
    baseStockDataApi,
    getStockDataApi
}