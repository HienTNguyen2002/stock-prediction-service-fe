import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import PredictionChart from '../components/prediction-core/PredictionChart'
import {updateParams} from '../actions/PredictionParams'
import {buildModel} from '../actions/Model'
import {fetchPrediction} from '../actions/Prediction'

import ParameterTuning from '../components/prediction-core/ParameterTuning'
import BuildButton from '../components/prediction-core/BuildButton'

const styles= theme => ({
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


class ReduxTest extends React.PureComponent{

    componentWillReceiveProps(nextProps){

        const {currentModel, fetchPrediction} = nextProps
        const {modelId} = currentModel
        console.log('Current Model ID:', modelId)
        modelId !== this.props.currentModel.modelId &&  fetchPrediction(modelId)
    }
    
    renderErrorMessages(){
        const {errorMessages} = this.props
        return(
            <div>
                {errorMessages.map((message, index) => {
                    return <Typography color='error' id={`error-${index}`}>{message}</Typography>
                })}
            </div>
        )
    }

    renderPredictionChart(){
        const { predictions, params} = this.props
        console.log('rendering prediction chart', predictions)
        if (!predictions || predictions.length === 0)
            return <div></div>
        return(
            <Typography component="div">
                <Typography variant="h5" component="h5" gutterBottom>
                    Prediction Result on {params.ticker}
                </Typography>
                {this.renderModelParams()}
                <Typography component="div">
                    <PredictionChart data={predictions}/>
                </Typography>
            </Typography>
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

    buildModel(){
        const {buildModel, params} = this.props
        buildModel(params)
    }

    render()
    {
        const {valid, isModelLoading, isPredictionLoading, classes, modelMessage, predictionMessage} = this.props
        return(
            <div className={classes.container}>
                <Typography component='div' className={classes.tunerContainers}>
                    <ParameterTuning params={this.props.params} updateParams={this.props.updateParams}/>
                    
                    <div>
                        {this.renderErrorMessages()}
                        { isModelLoading && <Typography component='div' className={classes.progressContainer}>
                            <CircularProgress size={20} className={classes.circularProgress}/>
                            <div>{modelMessage}</div>
                        </Typography>}
                        { isPredictionLoading && <Typography component='div' className={classes.progressContainer}>       
                            <CircularProgress size={20} className={classes.circularProgress}/>
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

ReduxTest.propTypes = {
    currentModel: PropTypes.object.isRequired
};

ReduxTest.defaultProps = {
    currentModel:{
        modelId: null
    }
}

const mapStateToProps = ({PredictionParams, Model, Prediction}) => ({
     ...PredictionParams,
    currentModel: Model,
    isModelLoading: Model.isLoading,
    isPredictionLoading: Prediction.isLoading,
    predictions: Prediction.predictions,
    modelMessage: Model.message,
    predictionMessage: Prediction.message
  })


  
const mapDispatchToProps = (dispatch, ownProps) => ({
    updateParams: (id, value) => dispatch(updateParams(id, value)),
    buildModel: (params) => dispatch(buildModel(params)),
    fetchPrediction: (modelId) => dispatch(fetchPrediction(modelId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ReduxTest))