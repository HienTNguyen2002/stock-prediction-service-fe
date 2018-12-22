import React from 'react'
import NavLink from './NavLink'

export default class App extends React.Component{
  render() {
    return (
      <div>
       {this.props.children}
      </div>
    )
  }
}