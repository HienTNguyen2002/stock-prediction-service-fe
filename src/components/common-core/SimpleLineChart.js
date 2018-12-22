import React from 'react';
import LineChart from 'recharts/lib/chart/LineChart';
import AreaChart from 'recharts/lib/chart/AreaChart'
import ComposedChart from 'recharts/lib/chart/ComposedChart'
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Area from 'recharts/lib/cartesian/Area';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
var moment = require('moment')

export default class SimpleLineChart extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let { data } = this.props;
    
    if (data === null){
        return <div>Loading</div>
    }

    return (
      <LineChart data={data}>
          <XAxis dataKey='ds'/>
          <YAxis dataKey="y" tickFormatter={this.tickFormatter}/>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#82ca9d" />
      </LineChart>
    );
  }

  formatXAxis(tickItem){
    return moment(tickItem).format('MMM Do YY')
  }
}
