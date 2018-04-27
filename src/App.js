import React, { Component } from "react";
import Nav from "./components/Nav";
import Router from "./router/router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { LoginProvider } from "./context/LoginContext";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <LoginProvider>
          <div className="App">
            <Nav />
            <div className="container">
              <Router />
            </div>
          </div>
        </LoginProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
