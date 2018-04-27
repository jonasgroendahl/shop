import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { LoginConsumer } from "../context/LoginContext";
import logo from "../assets/logoOld.png";
import FontIcon from "material-ui/FontIcon";
import Cart from "../components/Cart";
import Backdrop from "../components/Backdrop";
import { withRouter } from "react-router-dom";

const Nav = class Nav extends Component {
  state = {
    showCart: false,
    cartLinkClasses: ["cart-link"],
    showMobileMenu: false,
    showBackdrop: false
  };

  showCartHandler = event => {
    const { showCart } = this.state;
    this.setState({
      showCart: !showCart
    });
  };

  toggleMobileMenu = () => {
    const { showMobileMenu, showBackdrop } = this.state;
    this.setState({
      showMobileMenu: !showMobileMenu,
      showBackdrop: !showBackdrop,
      showCart: false
    });
  };

  componentDidUpdate() {
    if (
      this.props.location.pathname === "/cart" &&
      this.state.showCart === true
    ) {
      this.setState({ showCart: false });
      let cartLink = [...this.state.cartLinkClasses, "cart-link-active"];
      this.setState({ cartLinkClasses: cartLink });
    } else if (
      this.state.cartLinkClasses.indexOf("cart-link-active") !== -1 &&
      this.props.location.pathname !== "/cart"
    ) {
      this.setState({ cartLinkClasses: ["cart-link"] });
    }
  }

  render() {
    return (
      <nav className="top-nav">
        <div className="top-nav-wrapper">
          <LoginConsumer>
            {context => (
              <React.Fragment>
                <Link to="/" style={{ height: "100%" }}>
                  <img src={logo} className="logo" alt="" />
                </Link>
                <Link to="/">Shop</Link>
                <a
                  onClick={
                    context.user.username === ""
                      ? context.logIn
                      : context.logOut
                  }
                >
                  {context.user.username === "" ? "Login" : "Logout"}
                </a>
                <a
                  className={this.state.cartLinkClasses.join(" ")}
                  onClick={e => this.showCartHandler(e)}
                >
                  <FontIcon className="material-icons">shopping_cart</FontIcon>
                  ({context.totalAmount})
                </a>
                <FontIcon
                  className="material-icons mobile-menu-btn"
                  onClick={this.toggleMobileMenu}
                >
                  menu
                </FontIcon>
                {this.state.showMobileMenu ? (
                  <div className="mobile-menu">
                    <Link to="/">Shop</Link>
                    <a
                      onClick={
                        context.user.username === ""
                          ? context.logIn
                          : context.logOut
                      }
                    >
                      {context.user.username === "" ? "Login" : "Logout"}
                    </a>
                    <a
                      className={this.state.cartLinkClasses.join(" ")}
                      onClick={e => this.showCartHandler(e)}
                    >
                      <FontIcon className="material-icons">
                        shopping_cart
                      </FontIcon>
                      ({context.totalAmount})
                    </a>
                  </div>
                ) : null}
              </React.Fragment>
            )}
          </LoginConsumer>
        </div>
        <Cart
          show={this.state.showCart}
          toggleShow={() => this.setState({ showCart: !this.state.showCart })}
        />
        <Backdrop
          show={this.state.showBackdrop}
          clicked={this.toggleMobileMenu}
        />
      </nav>
    );
  }
};

export default withRouter(Nav);
