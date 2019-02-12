import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {updateParams} from '../actions/PredictionParams'
import {buildModel} from '../actions/Model'
import {fetchPrediction} from '../actions/Prediction'

import ParameterTuning from '../components/prediction-core/ParameterTuning'
import BuildButton from '../components/prediction-core/BuildButton'
import PredictionChart from '../components/prediction-core/PredictionChart'
import {filterDatabByParams, normalizeData} from '../utils/helpers'
const styles = theme => ({
    container:{
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    chartContainer:{
    },
    tunerContainers:{
        height: 200
    },
    circularProgress:{
        margin: theme.spacing.unit,
    },
    progressContainer:{
        display: 'flex',
        alignItems: 'center'
    },
    paramContainer:{
        margin: 10
    },
})

var moment = require('moment')

class PredictionSection extends React.PureComponent{
    componentWillReceiveProps(nextProps){
        // const {currentModel, params, fetchPrediction, stockDescription} = nextProps
        // const {modelId} = currentModel
        // // const {days} = params
        // // console.log('Current Model ID:', modelId)
        // const loadNewPrediction =  (modelId !== this.props.currentModel.modelId)
        // loadNewPrediction&&  this.scrollToBottom()
    }

    renderErrorMessages(){
        const { errorMessages,  } = this.props
        return(
            <div>
                {errorMessages.map((message, index) => {
                    return <Typography style={{fontWeight: "bold", marginLeft: 10}} color="error" key={`error-${index}`}>{message}</Typography>
                })}
            </div>
        )
    }

    renderMessages(){
        const {classes, isModelLoading, isPredictionLoading,  modelMessage, predictionMessage, hasError} = this.props
        return(
            <div>
                 { isModelLoading && <Typography component='div' className={classes.progressContainer}>
                    {!hasError && <CircularProgress pro size={20} className={classes.circularProgress}/>}
                    <div>{modelMessage}</div>
                </Typography>}
                { isPredictionLoading && <Typography component='div' className={classes.progressContainer}>       
                    {!hasError && <CircularProgress size={20} className={classes.circularProgress}/>}
                    <div>{predictionMessage}</div>
                </Typography>}
            </div>
        )
    }

    renderModelParams(){
        const {params, classes} = this.props
        const {ticker, ma_lag, start_date, daily_ssl, wkly_ssl, mthly_ssl, qrtly_ssl, yrly_ssl} = params
        return (
           <div className={classes.paramContainer}>
               <Typography variant="h5" component="h5">Model Paramters</Typography>
               <Typography component="div">{`Forecast starts from Jan 08 2016`}</Typography>
               <Typography component="div">{`Ticker: ${ticker}`}</Typography>
               <Typography component="div">{`Moving Averages: MA${ma_lag}`}</Typography>
           </div>
        )
    }

    renderPredictionChart(){
        const { displayData, params, actualData, classes, stockData} = this.props
        const {days} = params
        if (!displayData || displayData.length === 0)
            return <div></div>

        let filteredData= filterDatabByParams(stockData, params)
        let normalized = normalizeData(filteredData, 'close')
        console.log('Filtered Data', filteredData)
        return(
            <Typography component='div' className={classes.chartContainer}>
                <Typography variant="h5" component="h5" gutterBottom>
                    Prediction Result on {params.ticker}
                </Typography>
                {this.renderModelParams()}
                <div style={{marginTop: 20, height: 300}}>
                    <Typography style={{margin: 10, fontWeight:"bold"}} component="div" variant="h6">Prediction Result</Typography>
                    <PredictionChart data={displayData} dataKey="y" actualData={actualData}/>
                </div>
                <div style={{height: 300}}>
                    <Typography style={{margin: 10, fontWeight:"bold"}} component="div" variant="h6">Actual Price</Typography>
                    <PredictionChart data={normalized} dataKey="close" actualData={stockData} startIndex={0} endIndex={days}/>
                </div>
                
            </Typography>
        )
    }

    buildModel(){
        const {buildModel, stockDescription, params} = this.props
        buildModel(params)
    }

    // handleSliderChange(event, value){
    //     this.props.
    // }

    renderTuners(){
        const {params, valid} =this.props
        return(
            <Grid container style={{display: 'flex', marginBottom: 20, marginTop: 20}}>
                {/* <Grid item style={{alignItems:'flex-start', margin: 15}}>
                    <Typography variant='subtitle2' style={{margin: 10}}>Years of training data</Typography>
                    <FormControlLabel control={slider} label={Number(params.training_years).toFixed(1)}/> 
                </Grid> */}
                <Grid item xs>
                    <ParameterTuning 
                        valid={valid}
                        paramConfig={this.props.paramConfig}  
                        params={params} 
                        updateParams={this.props.updateParams}/>
                </Grid>
            </Grid>
        )
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }

    render(){
        const {valid, classes, params} = this.props
        
        return(
            <div style={{marginLeft: 10, flexGrow:1}}>
                 <div component='div' className={classes.tunerContainers}>
                    <div>
                        <Typography variant="h5">{`Build Prediction Model For ${params.ticker}`}</Typography>
                    </div>
                    {this.renderTuners()}
                    {this.renderErrorMessages()}
                    {this.renderMessages()}
                    <BuildButton active={valid} onClick={this.buildModel.bind(this)}/>
                    {this.renderPredictionChart()}
                </div>       
                <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({Model, PredictionParams, Prediction, StockIndex}) => ({
    ...PredictionParams,
    currentModel: Model,
    displayData: Prediction.displayPredictions,
    actualData: Prediction.predictions,
    breakpointPct: Prediction.breakpointPct,

    isModelLoading: Model.isLoading,
    isPredictionLoading: Prediction.isLoading,

    modelMessage: Model.message,
    predictionMessage: Prediction.message,

    stockDescription: StockIndex.stockDescription,
    stockData: StockIndex.data,

    hasError: Model.hasError || Prediction.hasError
})

const mapDispatchToProps = (dispatch) => ({
    updateParams: (id, value) => dispatch(updateParams(id, value)),
    buildModel: (params) => dispatch(buildModel(params)),
    fetchPrediction: (modelId, days) => dispatch(fetchPrediction(modelId, days)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(PredictionSection))