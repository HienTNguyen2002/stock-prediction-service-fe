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

const URL = "https://ec2-18-191-156-176.us-east-2.compute.amazonaws.com"

 class ParameterTuning extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            configuration: null,
            buildUrl: ""
        }
        this.loadConfig()
    }

    loadConfig(){
        fetch('../../configs/model_parameters.json')
        .then( result => result.json())
        .then(json =>{
            this.setState({configuration: json})
        })
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

    parseConfig(configs){
        const { classes } = this.props;
        
        let parameters = configs['parameters']
        let elements = parameters.map((item, index) => {
            const {label, active, id } = item
            let bodyElement = {}
            if(!active) return

            bodyElement = this.getElement(item)

            return (
            <Grid id={index} item xs className={classes.itemGrid}>
                <div id={`div-${id}`}>
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
        let {configuration} = this.state
        return(
            <div>
                <Grid container className={classes.gridContainer}>
                    {configuration && this.parseConfig(this.state.configuration)}
                </Grid>
                {/* <div className={classes.buttonContainer}>
                    <BuildButton className={classes.button}/> 
                </div> */}
            </div>
        )
    }
}

export default withStyles(styles)(ParameterTuning)