import {fetchUrl} from './helpers'


class StockData{
    constructor(){
        this.baseUrl = `https://ec2-18-191-156-176.us-east-2.compute.amazonaws.com/data`
    }
    loadStockData(ticker){
        console.log('Fetching')
        let url = this.baseUrl + `/price/${ticker}`
        return fetchUrl(url)
    }
}

export default StockData;