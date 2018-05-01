import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { LoginConsumer } from "../context/LoginContext";
import logo from "../assets/logoOld.png";
import FontIcon from "material-ui/FontIcon";
import Cart from "../components/Cart";
import Backdrop from "../components/Backdrop";
import { withRouter } from "react-router-dom";
import Dialog from "material-ui/Dialog";

const Nav = class Nav extends Component {
  state = {
    showCart: false,
    cartLinkClasses: ["cart-link"],
    showMobileMenu: false,
    showBackdrop: false,
    showDialog: false,
    username: "",
    password: "",
    error: ""
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

  componentDidMount() {
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
    if (
      this.props.location.search.indexOf("login") !== -1 &&
      this.state.showDialog !== true
    ) {
      this.setState({ showDialog: true });
    }
  }

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
    console.log(this.props);
  }

  handleLogin = async context => {
    const response = await context(this.state.username, this.state.password);
    console.log(response);

    if (response) {
      this.setState({ error: "Congratulations, you've logged in!" });
      setTimeout(() => {
        this.setState({ showDialog: false });
      }, 2000);
    } else {
      this.setState({ error: "Wrong username or password" });
    }
  };

  logOut = context => {
    context();
    this.props.history.push("/");
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <nav className="top-nav">
        <LoginConsumer>
          {context => (
            <React.Fragment>
              <div className="top-nav-wrapper">
                <Link to="/" style={{ height: "100%" }}>
                  <img src={logo} className="logo" alt="" />
                </Link>
                <Link to="/">Shop</Link>
                {context.user.username !== "" ? (
                  <Link to="/profile">My profile</Link>
                ) : null}
                <a
                  onClick={
                    context.user.username === ""
                      ? () => this.setState({ showDialog: true })
                      : () => this.logOut(context.logOut)
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
                    {context.user.username !== "" ? (
                      <Link to="/profile">My profile</Link>
                    ) : null}
                    <a
                      onClick={
                        context.user.username === ""
                          ? () => this.setState({ showDialog: true })
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
              </div>
              <Cart
                show={this.state.showCart}
                toggleShow={() =>
                  this.setState({ showCart: !this.state.showCart })
                }
              />
              <Backdrop
                show={this.state.showBackdrop}
                clicked={this.toggleMobileMenu}
              />
              <Dialog
                title="Log in"
                open={this.state.showDialog}
                contentStyle={{ width: "400px" }}
              >
                <div className="nav-login-dialog">
                  <div className="input">
                    <label html="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="input">
                    <label html="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={this.onChange}
                    />
                  </div>
                  <p>{this.state.error}</p>
                  <div>
                    <button
                      className="btn ma-5"
                      onClick={() => this.handleLogin(context.logIn)}
                    >
                      Log in
                    </button>
                    <button
                      className="btn ma-5"
                      onClick={() => this.setState({ showDialog: false })}
                    >
                      Cancel
                    </button>
                    <Link to="/signup" className="btn">
                      Sign up
                    </Link>
                  </div>
                </div>
              </Dialog>
            </React.Fragment>
          )}
        </LoginConsumer>
      </nav>
    );
  }
};

export default withRouter(Nav);
