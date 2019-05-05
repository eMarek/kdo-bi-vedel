// @flow
import React, { Component, Fragment } from 'react'
import { GlobalStyle, DefaultTheme } from './Style'
import { ThemeProvider } from 'styled-components'
import Topics from './components/Topics'

class App extends Component {
  render() {
    return <ThemeProvider theme={ DefaultTheme }>
      <Fragment>
        <GlobalStyle />
        <Topics />
      </Fragment>
    </ThemeProvider>
  }
}

export default App
