import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
body {
  -webkit-font-smoothing: antialiased !important;
  font-family: 'Roboto';
  background-image: linear-gradient(rgba(0,0,0,.6),#121212);
  background-color: #282828;
}

button {
  cursor: pointer;
}

a {
  text-decoration: none;
  color: #1ED760;
}

body html #root {
  height: 100%;
  
}

`;
