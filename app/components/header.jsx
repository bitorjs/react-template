import React, { Component } from 'react'
import './styles/header.less'


export default class extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className={`header ${this.props.border ? 'border' : ''}`}>{this.props.children}</div>
    )
  }
}