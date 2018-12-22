import {fetchUrl} from './helpers'

class StockPrediction{
    constructor(modelId){
        this.modelId = modelId
        this.baseUrl = `https://ec2-18-191-156-176.us-east-2.compute.amazonaws.com/prediction`
    }   

    getPredictionUrl(){
        let url = this.baseUrl + `/get?${this.modelId}`
        
    }

    predict(){
        console.log(`Fetching prediction of model ${this.modelId}`)
        let result = fetchUrl(this.getPredictionUrl())
        return result
    }
}

export default StockPrediction