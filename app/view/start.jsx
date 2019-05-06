import React, { Component } from 'react'
import Header from '../components/header';
import PageContainer from '../components/page-container';
import PageRootContainer from '../components/page-root-container';
import Tab from './tab';
import "./styles/start.less";

// 创建context实例
const ThemeContext = React.createContext({
  background: 'red',
  color: 'white'
});

export default function (props) {

  return (
    <ThemeContext.Provider value={{ background: 'green', color: 'white' }}>
      <PageRootContainer>
        <Header border>头部</Header>
        <ThemeContext.Consumer>
          {(provider) => {
            console.log(provider)
            return (<button
              style={{ backgroundColor: provider.background }}>
              Toggle Theme
            </button>
            )
          }
          }
        </ThemeContext.Consumer>
        <Tab></Tab>
        {React.Children.only(props.children)}
      </PageRootContainer>
    </ThemeContext.Provider>

  )

}