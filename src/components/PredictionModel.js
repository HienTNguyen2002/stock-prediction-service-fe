import {fetchUrl} from './helpers'

class PredictionModel{
    constructor(){
        this.baseUrl = `https://ec2-18-191-156-176.us-east-2.compute.amazonaws.com/model`
    }
    getModels(){
        console.log('[PredictionModels/getModels]')
        let url = this.baseUrl + `/all`
        let result = fetchUrl(url) 
        return result
    }
}

export default PredictionModel;