import React, { Component } from "react";
import "./Profile.css";

export default class Profile extends Component {
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
    email: {
      value: "",
      validated: false
    },
    password: {
      value: "",
      validated: false
    },
    country: "USA",
    personal_info_validated: false,
    login_info_validated: false
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
      default:
        break;
    }
    this.setState(prev => {
      let newState = { ...prev };
      newState[name].validated = validated;
      newState[name].value = value;
      let matchedInfo = 0;
      let matchedLogin = 0;
      // check if all fields match
      for (let name in newState) {
        if (name === "username" || name === "password") {
          if (newState[name].validated) {
            matchedLogin++;
          }
        } else if (
          name === "name" ||
          name === "address" ||
          name === "city" ||
          name === "zip"
        ) {
          if (newState[name].validated) {
            matchedInfo++;
          }
        }
      }
      if (matchedInfo === 4) {
        newState.personal_info_validated = true;
      }
      if (matchedLogin === 2) {
        newState.login_info_validated = true;
      }
      return newState;
    });
  };

  render() {
    const { ...state } = this.state;

    return (
      <div className="profile-grid">
        <form>
          <h1>Personal information</h1>
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
          <button className="btn" disabled={!state.shippingConfirmed}>
            Save
          </button>
        </form>
        <form>
          <h1>Orders</h1>
          <ul />
        </form>
        <form>
          <h1>Login information</h1>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              min="0"
              name="email"
              onChange={this.handleChange}
              className={state.email.validated ? "validated" : "not-validated"}
            />
          </div>
          <div className="input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              min="0"
              name="password"
              onChange={this.handleChange}
              className={
                state.password.validated ? "validated" : "not-validated"
              }
            />
          </div>
          <button className="btn" disabled={!state.shippingConfirmed}>
            Save
          </button>
        </form>
      </div>
    );
  }
}
