import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import AreaChart from 'recharts/lib/chart/AreaChart'
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Area from 'recharts/lib/cartesian/Area';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
var moment = require('moment')

export default class SimpleAreaChart extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let { data } = this.props;
    
    if (data === null){
        return <div>Loading</div>
    }

    return (
        <AreaChart width={730} height={250} data={data}>
            <XAxis dataKey='ds'/>
            <YAxis />
            <Area dataKey="yhat_upper"  stroke="#000" fill="green"/>
            <Area dataKey="yhat_lower"  stroke="#000" fill="white" opacity={1}/>
        </AreaChart>
    );
  }

  formatXAxis(tickItem){
    return moment(tickItem).format('MMM Do YY')
  }
}
