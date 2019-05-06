import React, { Component } from 'react'
import PageContainer from '../components/page-container';
import PageRootContainer from '../components/page-root-container';

import './styles/404.less'

export default function () {

  return (
    <PageRootContainer>
      <PageContainer>
        <center>
          <img className="img" src="/assets/404.jpg" alt="" />
        </center>
      </PageContainer>
    </PageRootContainer>
  )

}