import React, { Component } from 'react'
import PageContainer from '../components/page-container';
import PageRootContainer from '../components/page-root-container';

import './styles/index.less'

export default class extends Component {
  constructor(props) {
    super(props);
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