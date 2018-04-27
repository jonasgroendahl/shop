import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Success extends Component {
  render() {
    return (
      <div>
        <h1>You have successfully been charged, you've received an email</h1>
        <Link to="/" className="btn">
          Back to the frontpage
        </Link>
      </div>
    );
  }
}
