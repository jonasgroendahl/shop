import React, { Component } from "react";
import Nav from "./components/Nav";
import Router from "./router/router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { LoginProvider } from "./context/LoginContext";
import { withRouter, Route } from "react-router-dom";
import Signup from "./views/Signup";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <LoginProvider>
          {this.props.location.pathname !== "/signup" ? (
            <div className="App">
              <Nav />
              <div className="container">
                <Router />
              </div>
            </div>
          ) : (
            <Route path="/signup" exact component={Signup} />
          )}
        </LoginProvider>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
