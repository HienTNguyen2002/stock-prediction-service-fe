import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import {updateParams, loadParamConfig} from '../actions/PredictionParams'
import {loadTickerList, stockIndexSelected} from '../actions/StockIndex'

import PriceChart from '../components/stock-core/PriceChart'
import PredictionSection from '../modules/PredictionSection'
import StockDashboardSection from '../modules/StockDashboardSection'

const styles= theme => ({
    priceChartContainer:{
        margin: 15
    }
})


class ReduxTest extends React.PureComponent{
    componentDidMount(){
        this.loadConfigurations()
    }

    loadConfigurations(){
        const {loadStockIndexConfig, loadParamConfig} = this.props
        loadParamConfig()
        loadStockIndexConfig()
    }

    renderPriceChart(){
        const {stockData, labels, classes} = this.props

      
        console.log('DISPALY', displayLabels)
        if(!stockData && stockData.length === 0)
            return <div></div>
        
        return(
            <Typography component="div" className={classes.priceChartContainer}>
                <Typography variant="h5" component="h5" gutterBottom>
                    Historical Price Data of {params.ticker} on {params.label}
                </Typography>
                <Typography component="div">
                    <PriceChart data={stockData} labels={displayLabels}/>
                </Typography>
            </Typography>
        )
    }

    render()
    {
        const {stockData, stockDataLoading, stockIndex} = this.props
        const displayChart = !stockDataLoading && stockData != null
        return(
            <div>
                <StockDashboardSection/>
                {displayChart && <PredictionSection/>}
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

const mapStateToProps = ({PredictionParams, Model, Prediction, StockIndex}) => ({
     ...PredictionParams,
     labels: StockIndex.labels,
     predictionToggle: StockIndex.predictionToggle,
     stockDataLoading: StockIndex.stockDataLoading,
     stockData: StockIndex.data
  })


  
const mapDispatchToProps = (dispatch, ownProps) => ({
    updateParams: (id, value) => dispatch(updateParams(id, value)),
    loadStockIndexConfig: ()=> dispatch(loadTickerList()),
    loadParamConfig: ()=> dispatch(loadParamConfig()),
    stockIndexSelected: (index)=> dispatch(stockIndexSelected(index))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ReduxTest))