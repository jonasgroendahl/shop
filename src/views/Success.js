import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LoginConsumer } from "../context/LoginContext";
import CheckIcon from "material-ui/svg-icons/action/check-circle";
import "./Success.css";

class Success extends Component {
  componentDidMount() {
    this.props.emptyCart();
  }

  render() {
    return (
      <div className="success-wrapper">
        <h1>You have successfully been charged, you've received an email</h1>
        <CheckIcon style={{ width: 150, height: 150 }} className="rotate" />
        <Link to="/" className="btn">
          Back to the frontpage
        </Link>
      </div>
    );
  }
}

export default props => (
  <LoginConsumer>
    {context => <Success {...props} emptyCart={() => context.emptyCart()} />}
  </LoginConsumer>
);
