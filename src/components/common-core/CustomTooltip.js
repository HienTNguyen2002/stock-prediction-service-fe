import React from 'react'
import PropTypes from 'prop-types';

var moment = require('moment')

export default class CustomTooltip extends React.Component{
    getIntroOfPage(label) {
        if (label === 'Page A') {
          return "Page A is about men's clothing";
        } else if (label === 'Page B') {
          return "Page B is about women's dress";
        } else if (label === 'Page C') {
          return "Page C is about women's bag";
        } else if (label === 'Page D') {
          return "Page D is about household goods";
        } else if (label === 'Page E') {
          return "Page E is about food";
        } else if (label === 'Page F') {
          return "Page F is about baby food";
        }
      }

      getDataFromLabel(label){
          const {data} = this.props;
          if(!data){
              return {}
          }
          //console.log(data)
          return data.find(item => item.ds === label)
      }
    
      render() {
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

CustomTooltip.propTypes = {
type: PropTypes.string,
payload: PropTypes.array,
label: PropTypes.string,
}