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
        <h1>Hello, {this.props.name}</h1>
        <button onClick={this.sayHi}>Say Hi</button>
      </div>
    )
  }
}