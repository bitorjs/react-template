import React, { Component } from 'react'
export default class extends Component {
  constructor(props) {
    super(props);
    this.sayHi = this.sayHi.bind(this);
  }

  sayHi() {
    alert(`Hi ${this.props.name}`);
  }

  render() {
    return (
      <div>
        <h1>Hello, Index</h1>
      </div>
    )
  }
}