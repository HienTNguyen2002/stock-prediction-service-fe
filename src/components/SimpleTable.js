import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PredictionModel from './PredictionModel'

import TouchableTableRow from './TouchableTableRow'

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    height: 200
  },
  tableBody:{
    height: 200
  }
};

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class SimpleTable extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      list: [],
      keys:[]
    }
  }

  componentDidMount(){
    this.getModelList()
  }

  async getModelList(){
    let model = new PredictionModel()
    let list = await model.getModels() || []
    let keys = list.length > 0 ? this.parseParameterKeys(list[0]) : []
    this.setState({list, keys})
  }

  parseParameterKeys(item){
    let result = []
    for (var index in Object.keys(item)){
      let key = Object.keys(item)[index]
      let words = key.split('_')
      let formattedKey = ''
      for(var index in words){
        formattedKey += words[index].charAt(0).toUpperCase() + words[index].substring(1) + ' '
      }
      if (key === 'model_id'){
        result.unshift(formattedKey)
      } else {
        result.push(formattedKey)
      }
      
    }
    return result
  }

  onTableRowClick(){
    console.log('clicked')
  }


  render(){
    let {classes} = this.props
    let {keys, list} = this.state;

    if (keys.length === 0) return <div></div>
    console.log(keys)
    return(
      <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {keys.map(key => {
                  return (
                    <TableCell key={key}>{key}</TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {list.map(item => {
                var cells = Object.keys(item).map(key =>{
                  if(key === 'model_id') return 
                  return <TableCell key={key}>{item[key]}</TableCell>
                })
                return (
                  <TouchableTableRow key={item['model_id']}>
                    <TableCell>{item['model_id']}</TableCell>
                    {cells}
                  </TouchableTableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
    )
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
