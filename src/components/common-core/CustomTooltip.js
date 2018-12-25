import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


var moment = require('moment')

const styles = theme => ({
    container:{
      
    },
    margin:{
      margin: 5
    }
})

class CustomTooltip extends React.Component{
      renderTooltipData(){
        const { active } = this.props;
        
        if (active) {
          const { payload, label } = this.props;
          return (
            <Typography component='div' style={{display: 'inline-block'}}>
              <Typography variant='body1'>{label}</Typography>
            </Typography>
          )
        }
      }
    
      render(){
        const {classes} = this.props
         return(
           <Paper>
              <div style={{margin: 5}}>
                {this.renderTooltipData()}
              </div>
           </Paper>
         )
      }
}

export default CustomTooltip

CustomTooltip.propTypes = {
  type: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.string,
}