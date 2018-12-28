import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Line from 'recharts/lib/cartesian/Line';
import Brush from 'recharts/lib/cartesian/Brush'
import Legend from 'recharts/lib/component/Legend'
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';

import PriceTooltip from'./PriceTooltip'
import CustomChart from '../common-core/CustomChart'


var moment= require('moment')
const styles = {
}

class PriceChart extends React.PureComponent{
    constructor(props){
        super(props)
        this.state={
            left: 0,
            right: -300
        }
    }

    tickFormatter(data){
        let momentDate = moment(data)
        return momentDate.format('MMM YY')
    }


    renderChart(){
        const {labels, data, classes} = this.props
        const {left, right} = this.state
        return(
            <CustomChart {...this.props}>
                <Legend />
                <XAxis dataKey='ds' tickFormatter={this.tickFormatter} allowDataOverflow={true} padding={{left,right}}/>
                <YAxis/>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <Tooltip content={<PriceTooltip data={this.props.actualData}/>}/>
                <Brush dataKey='ds' height={30} stroke="#8884d8"/>
                {
                    labels.map(label=>{
                        return <Line key={label} type="monotone" dataKey={label} stroke="red" dot={false}/>
                    })
                }
            </CustomChart>
        )
    }
  
    render(){
        const { classes} = this.props
        return(
            <div className={classes.container}>
                {this.renderChart()}
            </div>
        )
    }
}

export default withStyles(styles)(PriceChart)