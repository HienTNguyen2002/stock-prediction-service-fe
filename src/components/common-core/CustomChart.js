import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import ComposedChart from 'recharts/lib/chart/ComposedChart'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';

var moment= require('moment')
const styles = {
    chartContainer: {
        maxHeight: 300
    }
}

class CustomChart extends React.PureComponent{
    constructor(props){
        super(props)
    }

    tickFormatter(data){
        let momentDate = moment(data)
        return momentDate.format('MMM YY')
    }

    render(){
        const {classes, className, styles} = this.props
        return(
            <span>
                <ResponsiveContainer>
                    <ComposedChart  data={this.props.data}>
                       {this.props.children}
                    </ComposedChart>
                </ResponsiveContainer>
            </span>
           
        )
    }
}

export default withStyles(styles)(CustomChart)