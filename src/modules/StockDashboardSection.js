import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PriceChart from '../components/stock-core/PriceChart'

import {updateParams} from '../actions/PredictionParams'
import {fetchStockData, updateLabelStates, togglePrediction} from '../actions/StockIndex'
import {titleCase} from '../utils/helpers'

const styles = theme => ({
    stockInfoContainer:{
        marginTop: 20
    },
    descLineContainer:{
        display: 'flex',
        alignItems: 'flex-start'
    },
    descTitle:{
        fontWeight: 'bold'
    },
})

var moment = require('moment')
class StockDashboardSection extends React.PureComponent{

    renderStockInfo(){
        const {params, classes, stockDescription} = this.props

        const getInfoComponent = (title, content) => (
            <div key={'div'+ title} className={classes.descLineContainer}>
                <Typography className={classes.descTitle}>{title+":"}</Typography>
                &nbsp;
                <Typography  variant='body1'>{content}</Typography>
            </div>
        )

        return(
            <div>
                <Typography className={classes.stockInfoContainer} variant="h5" component="h5" gutterBottom>
                    Historical Price Data of {params.ticker} on {params.label}
                </Typography>
                {Object.keys(stockDescription).map(key=>{
                    let title =  titleCase(key.split('_').join(' '))
                    let content = stockDescription[key]
                    if (key === 'ticker'){
                        content = content.toUpperCase()
                    }
                    if (key === 'max_date' || key === 'min_date'){
                        content = moment(content).format('Mo-DD-YYYY')
                    }
                    return getInfoComponent(title, content)
                })}
            </div>
           
        )
    }

    onCheckBoxChange(event, value){
        const {updateLabelStates} = this.props
        let {target} = event
        let {id} = target
        console.log(target, id)
        updateLabelStates(id, value)
    }


    renderLabels(){
        const {labels} = this.props
        return(
            <FormGroup row>
                {Object.keys(labels).map(key=>{
                    const {label, id, selected, active} = labels[key]
                    if (!active) return
                    return (
                        <FormControlLabel label={label}
                            control={<Checkbox id={label} key={label}checked={selected} onChange={this.onCheckBoxChange.bind(this)}></Checkbox>}
                        />
                    )
                })}
            </FormGroup>
        )
    }

    togglePrediction(){
        const {params, togglePrediction, classes} = this.props 

        return(
            <div style={{margin: 10}}>
                <Button variant="contained" color="primary"  onClick={()=>togglePrediction(true)}>Predict {params.ticker} Price</Button>
            </div>
        )
    }

    render(){
        const {tickerList, params, stockDataLoading, stockDescription, displayLabels, stockData} = this.props
        const displayChart = !stockDataLoading && stockData != null

        console.log('displayLabels: ',displayLabels ) 
        return(
            <div>
                <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                    <List component="nav" >
                        {tickerList.map(stockIndex => {
                            const ticker = stockIndex['ticker']
                            console.log(ticker, params.ticker)
                            return (
                            <MenuItem key={ticker} disabled={stockDataLoading} button selected={ticker === params.ticker} onClick={({target})=>{
                                this.props.updateParams('ticker', ticker)
                                this.props.fetchStockData(ticker)
                            }}>
                                <ListItemText primary={ticker}/>
                            </MenuItem>)
                        })}
                    </List>
                </Paper>
                {displayChart && this.renderStockInfo()}
                {displayChart && this.renderLabels()}
                {displayChart && <PriceChart data={this.props.stockData} labels={displayLabels}/>}
                {displayChart && this.togglePrediction()}
            </div>  
        )
    }
}


const mapStateToProps = ({StockIndex, PredictionParams}) => ({
    params: PredictionParams.params,
    stockDescription: StockIndex.stockDescription,
    stockData: StockIndex.data,
    tickerList : StockIndex.tickerList,
    stockDataLoading: StockIndex.isLoading,
    labels: StockIndex.labels,
    displayLabels: StockIndex.displayLabels
    // stockIndex: StockIndex.index,
    // stockConfigLoaded: StockIndex.stockConfigLoaded
})

const mapDispatchToProps = (dispatch) => ({
    updateParams: (id, value) => dispatch(updateParams(id, value)),
    fetchStockData: (ticker) => dispatch(fetchStockData(ticker)),
    updateLabelStates: (id, value) => dispatch(updateLabelStates(id, value)),
    togglePrediction: (bool) => dispatch(togglePrediction(bool))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(StockDashboardSection))
