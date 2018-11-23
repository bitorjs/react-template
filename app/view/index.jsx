import React, { Component } from 'react'
import PageContainer from '../components/page-container';
import PageRootContainer from '../components/page-root-container';

import './styles/index.less'

export default class extends Component {
  constructor(props) {
    super(props);

    // console.log("&&%%%%", this.get("/api2/default"));
    console.log("&&%%%%", this.post("/api/person/45"));
    console.log("&&%%%%", this.delete("/api/detail"));
  }

  render() {
    return (
      <PageRootContainer>
        <PageContainer>
          <div onClick={() => { this.redirect('/order') }}>To Order</div>
        </PageContainer>
      </PageRootContainer>
    )
  }
}