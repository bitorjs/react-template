import React, { Component } from 'react'
import PageContainer from '../components/page-container';
import PageRootContainer from '../components/page-root-container';

import './styles/index.less'

export default class extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render() {
    return (
      <PageRootContainer>
        <PageContainer>
          详情 - {this.props.id}
        </PageContainer>
      </PageRootContainer>
    )
  }
}