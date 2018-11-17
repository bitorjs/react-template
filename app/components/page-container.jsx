import React, { Component } from 'react'
import './styles/page-container.less'

export default class extends Component {
  constructor(props) {
    super(props);
  }

  className() {
    let className = ['page-container'];
    let props = this.props;
    if (props.border) className.push('border');
    if (props.padding) className.push('padding');
    if (props.paddingLeft) className.push('paddingLeft');
    if (props.paddingRight) className.push('paddingRight');
    if (props.paddingTop) className.push('paddingTop');
    if (props.paddingBottom) className.push('paddingBottom');

    return className.join(' ');
  }

  render() {
    return (
      <div className={this.className()}>{this.props.children}</div>
    )
  }
}