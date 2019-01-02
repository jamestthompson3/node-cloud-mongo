import * as React from 'react'
import styled from 'styled-components'

import { Button } from '../common/ui'

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

const WelcomePage = ({ history }) => {
  const jumpTo = string => history.push(string)
  return (
    <>
      <StyledHeader>
        <h1>Welcome</h1>
      </StyledHeader>
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
