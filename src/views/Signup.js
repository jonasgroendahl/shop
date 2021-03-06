import React, { Component } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import EmailIcon from "material-ui/svg-icons/communication/email";
import video from "../assets/840331843.mp4";

class Signup extends Component {
  state = {
    submitted: false,
    email: "",
    password: ""
  };

  signUp = e => {
    e.preventDefault();
    console.log("Signed up!");
    this.setState({
      submitted: true
    });
  };

  render() {
    return (
      <div>
        <div className="fs-video">
          <video src={video} autoPlay="true" loop="true" />
        </div>
        <div className="signup-box-wrapper">
          <div className="signup-box">
            <h1>
              {!this.state.submitted
                ? "Create a Wexer Account"
                : "Check your email"}
            </h1>
            {!this.state.submitted ? (
              <form onSubmit={this.signUp}>
                <div className="signup-input-box">
                  <p>Sign up with your email and a password</p>
                  <div className="input">
                    <input type="email" placeholder="Email" name="email" />
                  </div>
                  <div className="input">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                  </div>
                  <button className="btn full-width">Sign up</button>
                </div>
              </form>
            ) : (
              <div className="signup-input-box">
                <EmailIcon style={{ width: 60, height: 60 }} />
                <p>
                  Check your email inbox for instructions on how to verify your
                  account.
                </p>
              </div>
            )}
            <p>
              {!this.state.submitted
                ? "Already have an account? "
                : "Go to login page: "}
              <Link className="highlight" to="/?login">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
