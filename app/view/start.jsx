import React, { Component } from 'react'
import Header from '../components/header';
import PageContainer from '../components/page-container';
import PageRootContainer from '../components/page-root-container';
import Tab from './tab';
import "./styles/start.less";

export default class extends Component {
  constructor(props) {
    super(props);
    console.log(this)
  }

  render() {
    return (
      <PageRootContainer>
        <Header border>头部</Header>
        <Tab></Tab>
        {React.Children.only(this.props.children)}
      </PageRootContainer>
    )
  }
}