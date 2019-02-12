import React from 'react'
import CustomTooltip from '../common-core/CustomTooltip'
var moment= require('moment')
class PredictionTooltip extends CustomTooltip{
    getDataFromLabel(label){
        const {data} = this.props;
        if(!data){
            return {}
        }
       
        return data.find(item => item.ds === label)
    }

    renderTooltipData(){
        const { active } = this.props;
        console.log(this.props)
        if (active) {
        const { content, label } = this.props;
        const {key} = content
        let activeData = this.getDataFromLabel(label)
        let y = activeData && activeData[key]
        console.log(activeData, y, key)
        let formattedLabel = moment(label).format('MMMM Do Y')
        return (
                <div className="custom-tooltip">
                    <div>{formattedLabel}</div>
                    <div>Y value: {y}</div>
                </div>
            );
        }
    
        return null;
    }
}

export default PredictionTooltip;