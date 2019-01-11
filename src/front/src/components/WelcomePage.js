import * as React from 'react'
import styled from 'styled-components'

import { Button } from '../common/ui'
// import logo from '../common/logo.png'

const StyledHeader = styled.header`
  text-align: center;
  color: ${p => p.theme.primaryColor};
`

const ButtonContainer = styled.div`
  display: flex;
  width: 85%;
  margin: auto;
  justify-content: space-around;
`

const LogoContainer = styled.div`
  text-align: center;
  margin: auto;
`

const WelcomePage = ({ history }) => {
  const jumpTo = string => history.push(string)
  return (
    <>
      <StyledHeader>
        <h1>Welcome</h1>
      </StyledHeader>
      <LogoContainer>
        <h1>Here is the logo</h1>
        <img src={'../common/logo.png'} alt="cloud-logo" />
      </LogoContainer>
      <ButtonContainer>
        <Button color="primaryColor" size="xl" inverted onClick={() => jumpTo('/login')}>
          Login
        </Button>
        <Button color="secondaryColor" size="xl" onClick={() => jumpTo('/signup')}>
          Sign up
        </Button>
      </ButtonContainer>
    </>
  )
}

export default WelcomePage
