import React, { redirect } from 'react'
import PageContainer from '../components/page-container';
import PageRootContainer from '../components/page-root-container';

import './styles/index.less'

export default function () {

  return (
    <PageRootContainer>
      <PageContainer>
        <div>个人中心</div>
      </PageContainer>
    </PageRootContainer>
  )
}