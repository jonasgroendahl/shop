import React, { Component } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import CartList from "./CartList";

export default class Cart extends Component {
  render() {
    let cartClasses = ["cart-window"];
    if (this.props.show) {
      cartClasses = ["cart-window", "cart-window-show "];
    }

    return (
      <div
        className={cartClasses.join(" ")}
        style={{
          top: 95,
          right: 10
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
