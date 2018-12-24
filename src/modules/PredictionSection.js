import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import {updateParams} from '../actions/PredictionParams'
import {buildModel} from '../actions/Model'
import {fetchPrediction} from '../actions/Prediction'

import ParameterTuning from '../components/prediction-core/ParameterTuning'
import BuildButton from '../components/prediction-core/BuildButton'
import PredictionChart from '../components/prediction-core/PredictionChart'

const styles = theme => ({
    container:{
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    chartContainer:{
        minWidth: 600,
        height: 300
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
        const {currentModel, updateParams, fetchPrediction, stockDescription} = nextProps
        const {modelId} = currentModel
        console.log('Current Model ID:', modelId)
        modelId !== this.props.currentModel.modelId &&  fetchPrediction(modelId)
    }

    renderErrorMessages(){
        const {errorMessages} = this.props
        return(
            <div>
                {errorMessages.map((message, index) => {
                    return <Typography color='error' key={`error-${index}`}>{message}</Typography>
                })}
            </div>
        )
    }

    renderModelParams(){
        const {params, classes} = this.props
        const {ticker, ma_lag, start_date, daily_ssl, wkly_ssl, mthly_ssl, qrtly_ssl, yrly_ssl} = params
        return (
           <div className={classes.paramContainer}>
               <Typography variant="h5" component="h5">Model Paramters</Typography>
               <Typography variant="body" component="div">{`Forecast starts from Jan 08 2016`}</Typography>
               <Typography variant="body"  component="div">{`Ticker: ${ticker}`}</Typography>
               <Typography variant="body"  component="div">{`Moving Averages: MA${ma_lag}`}</Typography>
           </div>
        )
    }

    renderPredictionChart(){
        const { displayData, params, actualData} = this.props
        console.log('rendering prediction chart', displayData)
        if (!displayData || displayData.length === 0)
            return <div></div>
        return(
            <Typography component="div">
                <Typography variant="h5" component="h5" gutterBottom>
                    Prediction Result on {params.ticker}
                </Typography>
                {this.renderModelParams()}
                <Typography component="div">
                    <PredictionChart data={displayData} actualData={actualData}/>
                </Typography>
            </Typography>
        )
    }

    buildModel(){
        const {buildModel, stockDescription} = this.props
        const params = {...this.props.params}
        console.log(stockDescription)
        let end_date = moment(stockDescription['max_date'])
        let start_date = moment(stockDescription['min_date'])

        const training_years= end_date.diff(start_date.format('YYYY-MM-DD'), 'years', true)
        console.log('TRAINING_YEARS:', training_years)
        params['start_date'] = stockDescription['min_date']
        params['training_years'] = training_years
        console.log(params)
        buildModel(params)
    }

    render(){
        console.log('render model builder')
        const {valid, isModelLoading, isPredictionLoading, classes, modelMessage, predictionMessage, hasError, stockDescription} = this.props
        
        const params = {...this.props.params}
        console.log(stockDescription)
        params['start_date'] = stockDescription['min_date']
        
        return(
            <div>
                 <Typography component='div' className={classes.tunerContainers}>
                    <ParameterTuning paramConfig={this.props.paramConfig}  params={params} updateParams={this.props.updateParams}/>
                    <div>
                        {this.renderErrorMessages()}
                        { isModelLoading && <Typography component='div' className={classes.progressContainer}>
                            {!hasError && <CircularProgress pro size={20} className={classes.circularProgress}/>}
                            <div>{modelMessage}</div>
                        </Typography>}
                        { isPredictionLoading && <Typography component='div' className={classes.progressContainer}>       
                            {!hasError && <CircularProgress size={20} className={classes.circularProgress}/>}
                            <div>{predictionMessage}</div>
                        </Typography>}
                    </div>
                  
                    <BuildButton active={valid} onClick={this.buildModel.bind(this)}/>
                </Typography>       
                <Typography component='div' className={classes.chartContainer}>
                    {this.renderPredictionChart()}
                </Typography>
            </div>
        )
    }
}

const mapStateToProps = ({Model, PredictionParams, Prediction, StockIndex}) => ({
    ...PredictionParams,
    currentModel: Model,
    displayData: Prediction.displayPredictions,
    actualData: Prediction.predictions,

    isModelLoading: Model.isLoading,
    isPredictionLoading: Prediction.isLoading,

    modelMessage: Model.message,
    predictionMessage: Prediction.message,

    stockDescription: StockIndex.stockDescription,

    hasError: Model.hasError || Prediction.hasError
})

const mapDispatchToProps = (dispatch) => ({
    updateParams: (id, value) => dispatch(updateParams(id, value)),
    buildModel: (params) => dispatch(buildModel(params)),
    fetchPrediction: (modelId) => dispatch(fetchPrediction(modelId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(PredictionSection))