import React from "react";
import axios from "axios";

const login = {
  user: {
    username: "",
    password: "123"
  },
  cart: [],
  totalPrice: 0,
  totalAmount: 0,
  logOut: () => null,
  logIn: () => null
};

const LoginContext = React.createContext(login);

export const LoginConsumer = LoginContext.Consumer;

export class LoginProvider extends React.Component {
  state = {
    user: { ...login.user },
    cart: login.cart,
    totalAmount: login.totalAmount,
    totalPrice: login.totalPrice
  };

  logOut = () => {
    console.log("Logout pressed");
    this.setState((prev, props) => {
      console.log(prev);
      const newState = {
        ...prev
      };
      newState.user.index++;
      newState.user.username = "";
      return newState;
    });
  };

  logIn = async (user, password) => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    if (user === "jonas") {
      const { user } = this.state;
      user.username = user;
      this.setState(user);
      return true;
    } else {
      return false;
    }
  };

  addItem = item => {
    console.log(item);
    this.setState(prev => {
      let newState = { ...prev };
      let foundDublicate = false;
      newState.cart.forEach(i => {
        if (i.id === item.id) {
          i.amount = i.amount + 1;
          foundDublicate = true;
        }
      });
      if (!foundDublicate) {
        newState.cart.push(item);
      }
      newState.totalAmount += 1;
      newState.totalPrice += item.price;
      console.log(newState);
      return newState;
    });
  };

  removeItem = id => {
    console.log("Removing item with ID", id);
    this.setState(prev => {
      let newState = { ...prev };
      const item = newState.cart.findIndex(i => i.id === id);
      console.log("item", item);
      if (item !== -1) {
        newState.totalAmount -= newState.cart[item].amount;
        newState.totalPrice -=
          newState.cart[item].amount * newState.cart[item].price;
        newState.cart[item].amount = 1; // reset amount, not sure why we have to do this?
        newState.cart.splice(item, 1);
      }
      return newState;
    });
  };

  incrementAmount = id => {
    this.setState(prev => {
      let newState = { ...prev };
      const item = newState.cart.findIndex(i => i.id === id);
      if (item !== -1) {
        newState.cart[item].amount++;
        newState.totalAmount += 1;
        newState.totalPrice += newState.cart[item].price;
      }
      return newState;
    });
  };

  decrementAmount = id => {
    this.setState(prev => {
      let newState = { ...prev };
      const item = newState.cart.findIndex(i => i.id === id);
      if (item !== -1) {
        if (newState.cart[item].amount > 1) {
          newState.cart[item].amount--;
          newState.totalAmount -= 1;
          newState.totalPrice -= newState.cart[item].price;
        } else {
          alert("Can't decrement amount below 1");
        }
      }
      return newState;
    });
  };

  emptyCart = () => {
    const { cart } = this.state;
    cart.splice(0, cart.length);
    console.log(cart);
    this.setState({
      cart: cart,
      totalAmount: 0,
      totalPrice: 0
    });
  };

  render() {
    return (
      <LoginContext.Provider
        value={{
          user: this.state.user,
          cart: this.state.cart,
          logOut: this.logOut,
          logIn: this.logIn,
          addItem: this.addItem,
          removeItem: this.removeItem,
          incrementAmount: this.incrementAmount,
          decrementAmount: this.decrementAmount,
          totalAmount: this.state.totalAmount,
          totalPrice: this.state.totalPrice,
          emptyCart: this.emptyCart
        }}
      >
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}
