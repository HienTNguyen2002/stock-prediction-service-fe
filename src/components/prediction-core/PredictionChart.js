import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

import ComposedChart from 'recharts/lib/chart/ComposedChart'
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Area from 'recharts/lib/cartesian/Area';
import Line from 'recharts/lib/cartesian/Line';
import Brush from 'recharts/lib/cartesian/Brush'
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import PredictionTooltip from './PredictionTooltip'
import CustomChart from '../common-core/CustomChart'

var moment= require('moment')

const styles = theme=> ({
})

class PredictionChart extends React.Component{
    constructor(props){
        super(props)
    }

    tickFormatter(data){
        let momentDate = moment(data)
        return momentDate.format('MMM YY')
    }

    render(){
        const {classes} = this.props
        return(
            <CustomChart {...this.props}>
                <XAxis dataKey='ds' tickFormatter={this.tickFormatter}/>
                <YAxis/>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <Tooltip content={<PredictionTooltip data={this.props.actualData}/>}/>
                {/* <Legend /> */}
                <Brush dataKey='ds' height={30} stroke="#8884d8"/>
                <Area dataKey="yhat_upper"  stroke="#000" fill="green" opacity={0.5}/>
                <Area dataKey="yhat_lower"  stroke="#000" fill="white" opacity={1}/>
                    {/* <Line type="monotone" dataKey="yhat_lower" stroke="green" />
                    <Line type="monotone" dataKey="yhat_upper" stroke="blue" /> */}
                <Line type="monotone" dataKey="y" stroke="red" dot={false}/>
            </CustomChart>
        )
    }
}

export default withStyles(styles)(PredictionChart)