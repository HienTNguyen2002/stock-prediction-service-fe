import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';

export default class TouchableTableRow extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <TableRow>
              {this.props.children}
            </TableRow>
            
        )
    }
}