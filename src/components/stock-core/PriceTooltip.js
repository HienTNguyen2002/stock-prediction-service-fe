import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import CustomTooltip from '../common-core/CustomTooltip'
import Typography from '@material-ui/core/Typography';

const styles= theme => ({
    tooltipContainer:{
        display: 'flex',
        alignItems: 'center'
    }
})

class PredictionTooltip extends CustomTooltip{
    renderTooltipData(){
        const { active, classes } = this.props;
    
        if (active) {
        const { payload, label } = this.props;
        // let activeData = this.getDataFromLabel(label)
        // let formattedLabel = moment(label).format('MMMM Do Y')
        return (
                payload.map(data=>{
                    const {dataKey, payload} = data
                   
                    return(
                        <div key={dataKey} className={classes.tooltipContainer}>
                            <Typography style={{fontWeight: 'bold'}} variant="body2">{dataKey.toUpperCase() + ": "}</Typography>
                            &nbsp;
                            <Typography variant="body2">{" " + payload[dataKey]}</Typography>
                        </div>
                    )
                })
            );
        }
    
        return null;
    }
}

export default withStyles(styles)(PredictionTooltip);