import React, { Component } from 'react'
import PageContainer from '../components/page-container';
import PageRootContainer from '../components/page-root-container';

import './styles/index.less'

export default function (props) {


  return (
    <PageRootContainer>
      <PageContainer>
        详情 - {props.id}
      </PageContainer>
    </PageRootContainer>
  )

}