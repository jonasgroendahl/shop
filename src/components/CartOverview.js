import React, { Component } from "react";
import "./CartOverview.css";
import CartList from "./CartList";
import { Link } from "react-router-dom";
import { LoginConsumer } from "../context/LoginContext";

export default class Cart extends Component {
  render() {
    return (
      <div className="animate">
        <div className="checkout-page-wrapper">
          <div className="cart-overview">
            <div className="cart-overview-header black">
              <h1>List of items</h1>
            </div>
            <div className="cart-overview-body">
              <CartList border={true} showMore={true} />
              <div className="pa-5" />
            </div>
          </div>
          <div className="cart-overview">
            <div className="cart-overview-header black">
              <LoginConsumer>
                {context => (
                  <Link
                    to={context.cart.length === 0 ? "#" : "/shipping"}
                    className={
                      context.cart.length === 0 ? "btn disabled" : "btn gray"
                    }
                  >
                    Proceed to shipping
                  </Link>
                )}
              </LoginConsumer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
