import { Route, Switch } from "react-router-dom";
import Cart from "../views/CartView";
import Index from "../views/Index";
import Login from "../views/Login";
import React from "react";
import Builder from "../views/BundleBuilder";
import Shipping from "../views/Shipping";
import Success from "../views/Success";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/login" exact component={Login} />
      <Route path="/builder" exact component={Builder} />
      <Route path="/shipping" exact component={Shipping} />
      <Route path="/success" exact component={Success} />
    </Switch>
  );
};

export default Router;
