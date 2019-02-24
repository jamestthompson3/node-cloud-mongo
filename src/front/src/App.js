import * as React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { theme } from './common/theme'
import IndexPage from './components/IndexPage'
import {RootProvider} from './RootProvider'

const GlobalStyle = createGlobalStyle`
  body {
   font-family: 'IBM Plex Serif', serif;
   margin: 0;
   padding: 0;
   background: #333;
}
`

const App = () => (
  <ThemeProvider theme={theme}>
    <RootProvider>
      <GlobalStyle />
      <BrowserRouter>
        <IndexPage />
      </BrowserRouter>
    </RootProvider>
  </ThemeProvider>
)

export default App
