import React, { Component } from 'react'
import './styles/page-container.less'


export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-root">{this.props.children}</div>
    )
  }
}