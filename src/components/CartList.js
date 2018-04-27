import React, { Component } from "react";
import ActionDelete from "material-ui/svg-icons/action/delete";
import NavigationArrowDropUp from "material-ui/svg-icons/navigation/arrow-drop-up";
import NavigationArrowDropDown from "material-ui/svg-icons/navigation/arrow-drop-down";
import { LoginConsumer } from "../context/LoginContext";
import ExpPanel from "./ExpPanel";
import "./CardList.css";

export default class CartList extends Component {
  render() {
    let tableStyles = {};
    if (this.props.border) {
      tableStyles = { border: "1px solid var(--d-blue)" };
    }
    let showMore = () => null;
    if (this.props.showMore) {
      showMore = items => {
        return <ExpPanel items={items} />;
      };
    }

    return (
      <table className="cart-table" style={tableStyles}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <LoginConsumer>
            {context => (
              <React.Fragment>
                {context.cart.length > 0 ? (
                  context.cart.map(i => {
                    return (
                      <tr key={i.name}>
                        <td>
                          {i.name} {showMore(i.items)}
                        </td>
                        <td>{i.price * i.amount} $</td>
                        <td>{i.amount}</td>
                        <td>
                          <ActionDelete
                            onClick={() => context.removeItem(i.id)}
                          />
                          <NavigationArrowDropUp
                            onClick={() => context.incrementAmount(i.id)}
                          />
                          <NavigationArrowDropDown
                            onClick={() => context.decrementAmount(i.id)}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>Cart is empty</td>
                  </tr>
                )}
                {context.cart.length > 0 ? (
                  <tr>
                    <td>Total</td>
                    <td>{context.totalPrice} $</td>
                    <td>{context.totalAmount}</td>
                  </tr>
                ) : null}
              </React.Fragment>
            )}
          </LoginConsumer>
        </tbody>
      </table>
    );
  }
}
