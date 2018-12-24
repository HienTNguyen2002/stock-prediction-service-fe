import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {fetchUrl} from '../helpers'


const styles = theme => ({
    buttonContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
    },
    gridContainer:{
        minHeight: 100,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    label:{
        height: 50
    },
    itemGrid:{
        minHeight: 70
    },
    paramPaper:{
        width: 50,
        height: 20
    },
    button:{
        backgroundColor: 'blue'
    }
});

 class ParameterTuning extends React.PureComponent{
    constructor(props){
        super(props)
    }

    onCheckBoxChange(event, value){
        let {target} = event
        let {id} = target
        this.updateParams(id, value)
    }

    onTextBoxChange(event){
        let {target} = event;
        let {id} = target
        let {value} = target;
        this.updateParams(id, value)
    }

    updateParams(id, value){
        const {updateParams} = this.props
        updateParams(id, value)
    }

    generateParamTuners(){
        const { classes, paramConfig, params} = this.props;
        console.log('TUNERS',paramConfig)
        if(!paramConfig || !params){
            return <div></div>
        }
        
        let elements = paramConfig.map((item, index) => {
            const {label, active, id } = item
            let bodyElement = {}
            if(!active) return

            bodyElement = this.getElement(item)

            return (
            <Grid key={`div-${id}`} item xs className={classes.itemGrid}>
                <div >
                    <Typography component="div" variant="body1" className={classes.label}>{label}</Typography>
                    {bodyElement}
                </div>
            </Grid>
            )
        })
        return elements
    }

    getElement(item){
        let bodyElement = {}
        let {params} = this.props

        const {id, element, type} = item
        switch(element){
            case "checkbox":
                bodyElement = <Checkbox id={id} checked={params[id]} onChange={this.onCheckBoxChange.bind(this)}/>
                break;
            case "textbox":
                bodyElement = <Input id={id} type={type} value={params[id]} onChange={this.onTextBoxChange.bind(this)}/>
                break;
            default:
                bodyElement = null
        }
        return bodyElement
    }
  

    render(){
        let {classes} = this.props
        return(
            <div>
                <Grid container className={classes.gridContainer}>
                    {this.generateParamTuners()}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ParameterTuning)