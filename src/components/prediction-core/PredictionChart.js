import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import ComposedChart from 'recharts/lib/chart/ComposedChart'
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Area from 'recharts/lib/cartesian/Area';
import Line from 'recharts/lib/cartesian/Line';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import CustomTooltip from '../common-core/CustomTooltip'
import {fetchUrl} from '../helpers'


var moment= require('moment')
const styles = {

}

class PredictionChart extends React.Component{
    constructor(props){
        super(props)
    }

    tickFormatter(data){
        let momentDate = moment(data)
        return momentDate.format('MMM YY')
    }

    render(){
        return(
            <div>
                <ResponsiveContainer>
                    <ComposedChart  data={this.props.data}>
                        <XAxis dataKey='ds' tickFormatter={this.tickFormatter}/>
                        <YAxis/>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <Tooltip content={<CustomTooltip data={this.props.data}/>}/>
                        <Legend />
                        
                        <Area dataKey="yhat_upper"  stroke="#000" fill="green" opacity={0.5}/>
                        <Area dataKey="yhat_lower"  stroke="#000" fill="white" opacity={1}/>
                         {/* <Line type="monotone" dataKey="yhat_lower" stroke="green" />
                         <Line type="monotone" dataKey="yhat_upper" stroke="blue" /> */}
                        <Line type="monotone" dataKey="y" stroke="red" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
           
        )
    }
}

export default withStyles(styles)(PredictionChart)