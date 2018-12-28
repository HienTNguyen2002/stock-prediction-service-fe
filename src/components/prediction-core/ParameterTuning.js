import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/lab/Slider';

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
    },
    formLabel: {
        margin: 5
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

    onSliderchange(event, value){
        const {target} = event
        const {id} = target
        this.updateParams(id, value)
    }

    updateParams(id, value){
        const {updateParams} = this.props
        updateParams(id, value)
    }

    generateParamTuners(){
        const { classes, paramConfig, params} = this.props;
        if(!paramConfig || !params){
            return <div></div>
        }

        const components = this.parseConfig(paramConfig)
        return components
        
        // let elements = paramConfig.map((item, index) => {
        //     const {label, active, id } = item
        //     let bodyElement = {}
        //     if(!active) return

        //     bodyElement = this.getElement(item)

        //     return bodyElement 
        // })
        // return (
        //     <FormGroup className={classes.itemGrid}>
        //         <FormLabel component="legend">Parameters</FormLabel>
        //         {elements}
        //     </FormGroup>
        //     )
    }

    parseConfig(config, id = ""){
        const {element, active}  = config
        if (!element){
            return Object.keys(config).map(key => {
                const subConfig = config[key]
                return this.parseConfig(subConfig, key)
            })
        }
        
        if(!active)
            return

        const {params, valid} = this.props
        const {label, additionalProps, children} = config
        
        let type, labelPlacement = ""
        if(additionalProps){
            type = additionalProps.type;
            labelPlacement = additionalProps.labelPlacement
        }

        let bodyElement = {}

        switch(element){
            case "controlGroup":
                return <Paper id={id} key={id} style={{margin: 5}} elevation={valid ? 1 : 5}>
                    <FormGroup style={{margin: 5}}>
                        <FormLabel component="legend" style={{margin: 5}}>{label}</FormLabel>
                        {this.parseConfig(children, id) }
                    </FormGroup>
                </Paper>
            case "checkbox":
                bodyElement = <Checkbox id={id}  checked={params[id]} onChange={this.onCheckBoxChange.bind(this)}/>
                return <FormControlLabel style={{margin: 5}} id={id}  control={bodyElement} label={label} labelPlacement={labelPlacement ? labelPlacement : "end"}/>
            case "textbox":
                bodyElement = <TextField id={id}   type={type} value={params[id]} onChange={this.onTextBoxChange.bind(this)}/>
                return <FormControlLabel key={id} style={{margin: 5}} id={id} control={bodyElement} label={label} labelPlacement={labelPlacement ? labelPlacement : "end"}/>
            case "slider":
                const {max_key, step} = additionalProps
                bodyElement = (
                    <Slider
                                    style={{minWidth: 200, margin: 20}} 
                                    min={1} 
                                    max={parseFloat(params[max_key])} 
                                    step={step} 
                                    value={params[id]} 
                                    onChange={this.onSliderchange.bind(this)}></Slider>
                )
                return <FormControlLabel key={id} id={id} control={bodyElement} label={Number(params[id]).toFixed(1) + " " + label} labelPlacement={labelPlacement ? labelPlacement : "end"}/>
            default:
                return <FormControlLabel key={id} control={<div></div>}/>
        }
        
    }

    // getElement(item){
    //     let bodyElement = {}
    //     let {params} = this.props

    //     const {id, element, type, label, labelPlacement} = item
    //     switch(element){
    //         case "checkbox":
    //             bodyElement = 
    //             break;
    //         case "textbox":
    //             bodyElement = 
    //             break;
    //         case "slider":
    //             break;
    //         default:
    //             bodyElement = <div></div>
    //     }
    //     console.log(label)
    //     return <FormControlLabel labelPlacement={labelPlacement} control={bodyElement} label={label}/>
    // }
  

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