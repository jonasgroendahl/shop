import React, { Component } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import CartList from "./CartList";

export default class Cart extends Component {
  render() {
    return (
      <div
        className="cart-window"
        style={{
          top: 95,
          right: 10,
          display: this.props.show ? "block" : "none"
        }}
      >
        <div className="cart-body">
          <h1>Cart</h1>
          <CartList />
          <Link className="btn" to="/cart">
            Go to cart page
          </Link>
        </div>
      </div>
    );
    /*     <div className="backDrop" onClick={this.props.toggleShow} />  */
  }
}
