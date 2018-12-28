import React from 'react'
import Button from '@material-ui/core/Button';
import {fetchUrl} from '../helpers'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    chartContainer:{
        height: 500
    },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  content: {
      marginBottom: 20
  },
});


const URL = ""
class BuildButton extends React.PureComponent{

    constructor(props){
        super(props)
        this.state = {
            disabled: false,
            status: -1,
            modelId: -1,
            prediction: []
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    async buildModel(){
       
        let buildUrl = this.buildModelUrl()
        console.log("Building Model", buildUrl)
        let code = 0
        let result = {}
        try{
            fetchUrl(buildUrl, 'POST').then(result => {
                console.log('Result', result)
                const {status_code} = result
                this.interval = setInterval(()=>{
                    this.updateBuildingStatus(status_code.model_id)
                }, 1000)
            })
           
            
        }
        catch(exception){

        }
    }

    updateBuildingStatus(modelId){
        fetchUrl(URL+`/model/status/${modelId}`).then(({status})=>{
            let disabled = true
            let loadingPrediction = this.state.loadingPrediction
            if(status === 1){
                disabled = false
                loadingPrediction = 2
            }
            console.log(modelId, status)
            this.setState({disabled, status, modelId}, ()=>{ 
                if(status ===1 )
                {
                   console.log('Interval Cleared')
                   clearInterval(this.interval)
                }
            })
            console.log("Update status")
        })
    }

    loadStockData(modelId){
        let stock = new StockPrediction(modelId)
        stock.predict().then(result=>{
            console.log(result)
            const {prediction} = result
            this.setState({loadingPrediction: 1})
        })
        //console.log(data)
    }

    render(){
        const {classes, active} = this.props
        const {disabled, status, loadingPrediction} = this.state
        let message = ""
        switch(status){
            case 1: 
                message = "Build Finished"
                break;
            case 2:
                message = "In Progress"
            case 3: 
                message = "Build Started"
        }
        return(
            <div className={classes.content}>
                <div>
                    <Button disabled={!active} color="primary" variant="contained" onClick={this.props.onClick}>Build</Button>
                    <Typography>{message}</Typography>
                </div>
              
            </div>
        )
    }
}


export default withStyles(styles)(BuildButton)