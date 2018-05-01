import React, { Component } from "react";
import "./Shipping.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { LoginConsumer } from "../context/LoginContext";

const Shipping = class Shipping extends Component {
  state = {
    name: {
      value: "",
      validated: false
    },
    address: {
      value: "",
      validated: false
    },
    city: {
      value: "",
      validated: false
    },
    zip: {
      value: 0,
      validated: false
    },
    rights: {
      value: false,
      validated: false
    },
    email: {
      value: "",
      validated: false
    },
    country: "USA",
    shippingConfirmed: false,
    showPayment: false
  };

  handleSubmit = event => {
    event.preventDefault();
    const { shippingConfirmed } = this.state;
    if (shippingConfirmed) {
      this.setState({
        showPayment: true
      });
    }
  };

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    let validated = true;
    switch (name) {
      case "name":
        value.match(/^[a-z\d \u00C0-\u00FF]{2,30}$/gi)
          ? (validated = true)
          : (validated = false);
        break;
      case "zip":
        value.length > 0 ? (validated = true) : (validated = false);
        break;
      case "rights":
        event.target.checked ? (validated = true) : (validated = false);
        break;
      case "address":
        value.length > 0 ? (validated = true) : (validated = false);
        break;
      case "city":
        value.length > 0 ? (validated = true) : (validated = false);
        break;
      case "email":
        value.match(/^([a-z\d-.]+)@([a-z\d-]+)\.([a-z]{2,8})$/gi)
          ? (validated = true)
          : (validated = false);
        break;
      default:
        break;
    }
    this.setState(prev => {
      let newState = { ...prev };
      newState[name].validated = validated;
      newState[name].value = value;
      console.log(newState);
      let matched = 0;
      // check if all fields match
      for (let name in newState) {
        if (name !== "country" && name !== "shippingConfirmed") {
          if (newState[name].validated) {
            matched++;
          }
        }
      }
      if (matched === 6) {
        newState.shippingConfirmed = true;
      }
      return newState;
    });
  };

  token = token => {
    console.log("Fetching token");
    console.log(token);
    axios
      .post(
        process.env.NODE_ENV === "development"
          ? "http://localhost:3001/stripe"
          : "https://brave-stonebraker-889667.netlify.com/.netlify/functions/stripe",
        token
      )
      .then(res => {
        console.log(res);
        if (res.data === "We did it reddit") {
          this.props.history.push("/success");
        } else {
          alert("An error happened");
        }
      });
  };

  render() {
    const { ...state } = this.state;

    return (
      <div>
        <div className="shipping-grid">
          <form onSubmit={this.handleSubmit}>
            <h1>Provide shipping details</h1>
            <div className="input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={state.name.value}
                onChange={this.handleChange}
                className={state.name.validated ? "validated" : "not-validated"}
              />
            </div>
            <div className="input">
              <label htmlFor="address">Street name</label>
              <input
                type="text"
                name="address"
                onChange={this.handleChange}
                className={
                  state.address.validated ? "validated" : "not-validated"
                }
              />
            </div>
            <div className="input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                className={
                  state.email.validated ? "validated" : "not-validated"
                }
              />
            </div>
            <div className="input">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                onChange={this.handleChange}
                className={state.city.validated ? "validated" : "not-validated"}
              />
            </div>
            <div className="input">
              <label htmlFor="zip">Zip</label>
              <input
                type="number"
                min="0"
                name="zip"
                onChange={this.handleChange}
                className={state.zip.validated ? "validated" : "not-validated"}
              />
            </div>
            <div className="input">
              <label htmlFor="country">Country</label>
              <select>
                <option>USA</option>
              </select>
            </div>
            <div className="input">
              <label htmlFor="rights">Accept Terms of Service</label>
              <input
                type="checkbox"
                name="rights"
                onChange={this.handleChange}
              />
            </div>
            <button className="btn" disabled={!state.shippingConfirmed}>
              Proceed
            </button>
          </form>
          {state.showPayment ? (
            <div>
              <h1>Provide payment details</h1>
              <img
                src="https://hostiso.com/wp-content/uploads/2016/05/hostiso-stripe.png"
                width="250"
                alt=""
                style={{ marginBottom: "10px" }}
              />
              <br />
              <LoginConsumer>
                {context => (
                  <StripeCheckout
                    token={this.token}
                    stripeKey="pk_test_HL8HTQVsxMUWKw2caiRdwGe3"
                    amount={context.totalPrice * 100}
                    email={state.email.value}
                  />
                )}
              </LoginConsumer>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
};

export default withRouter(Shipping);
