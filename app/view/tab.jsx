import React, { Component } from 'react'
import './styles/tab.less'

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tab">
        <span onClick={() => { this.redirect('/') }}>首页</span>
        <span onClick={() => { this.redirect('/order') }}>订单</span>
        <span onClick={() => { this.redirect('/notfount') }}>404</span>
        <span onClick={() => { this.redirect('/person/5') }}>个人中心</span>
      </div>
    )
  }
}