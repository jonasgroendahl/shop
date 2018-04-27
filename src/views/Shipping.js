import React, { Component } from "react";
import "./Shipping.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

export default class Shipping extends Component {
  state = {
    name: "",
    streetName: "",
    city: "",
    zip: 0,
    country: "USA",
    shippingConfirmed: false
  };

  handleSubmit = event => {
    event.preventDefault();
    const { ...state } = this.state;
    let matched = 0;
    if (state.name.match(/[a-z/d]/gi)) {
      matched++;
    }
    if (matched === 1) {
      this.setState({ shippingConfirmed: true });
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  token = token => {
    console.log("Fetching token");
    console.log(token);
    axios.post("http://localhost:3001", token).then(res => {
      console.log(res.data);
      console.log("We did it reddit");
    });
    /*
    fetch("http://localhost:3001", {
      method: "POST",
      body: JSON.stringify(token)
    })
      .then(res => res.json())
      .then(data => console.log(data));
      PESKY FETCH
    */
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
                value={state.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="address">Street name</label>
              <input type="text" name="address" onChange={this.handleChange} />
            </div>
            <div className="input">
              <label htmlFor="city">City</label>
              <input type="text" name="city" onChange={this.handleChange} />
            </div>
            <div className="input">
              <label htmlFor="zip">Zip</label>
              <input
                type="number"
                min="0"
                name="zip"
                onChange={this.handleChange}
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
              <input type="checkbox" name="rights" />
            </div>
            <button className="btn">Proceed</button>
          </form>
          {state.shippingConfirmed ? (
            <div>
              <h1>Choose payment method</h1>
              <img
                src="http://businessdaily.co.zw/public/images/articles/paypal.png"
                width="250"
                alt=""
              />
              <StripeCheckout
                token={this.token}
                stripeKey="pk_test_HL8HTQVsxMUWKw2caiRdwGe3"
              />
              <img
                src="https://hostiso.com/wp-content/uploads/2016/05/hostiso-stripe.png"
                width="250"
                alt=""
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
