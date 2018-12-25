import React from 'react'
import CustomTooltip from '../common-core/CustomTooltip'
var moment= require('moment')
class PredictionTooltip extends CustomTooltip{
    getDataFromLabel(label){
        const {data} = this.props;
        if(!data){
            return {}
        }
        //console.log(data)
        return data.find(item => item.ds === label)
    }

    renderTooltipData(){
        const { active } = this.props;
    
        if (active) {
        const { payload, label } = this.props;
        let activeData = this.getDataFromLabel(label)
        let formattedLabel = moment(label).format('MMMM Do Y')
        return (
                <div className="custom-tooltip">
                    <div>{formattedLabel}</div>
                    <div>Estimation: {activeData && activeData['y']}</div>
                    <div>Upper Bound: {activeData && activeData['yhat_upper']}</div>
                    <div>Lower Bound: {activeData && activeData['yhat_lower']}</div>
                </div>
            );
        }
    
        return null;
    }
}

export default PredictionTooltip;