// @flow
import { createGlobalStyle } from 'styled-components'

export const DefaultTheme = {
  CORRECT_COLOR: '#76e43e',
  WRONG_COLOR: '#ff4545',
  SELECTED_COLOR: '#373737',
  NATURAL_COLOR: '#ffffff'
}

export const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
  }
  #root {
    text-align: center;
    position: relative;
    font-size: 30px;
    position: relative;
    height: 100%;
  }
`
