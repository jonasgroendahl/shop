import React, { Component } from "react";

export default class Login extends Component {
  login() {
    console.log("Logged in");
  }

  render() {
    return (
      <div className="login-wrapper">
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}
