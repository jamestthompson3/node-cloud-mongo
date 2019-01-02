import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import WelcomePage from './WelcomePage'
import { AuthPage } from './AuthPage'
import UserPage from './UserPage'

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`

const IndexPage = () => (
  <PageWrapper>
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route path="/login" render={props => <AuthPage {...props} type="login" />} />
      <Route path="/signup" render={props => <AuthPage {...props} type="sign up" />} />
      <Route path="/:user" component={UserPage} />
    </Switch>
  </PageWrapper>
)

export default IndexPage
