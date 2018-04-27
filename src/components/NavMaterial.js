import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";

export default class Nav extends Component {
  render() {
    return (
      <AppBar
        title={
          <img
            src="http://is2.mzstatic.com/image/thumb/Purple122/v4/31/5a/8b/315a8b2e-aedd-8d06-6fe5-7492ff8d0471/source/1200x630bb.jpg"
            class="logo"
            alt=""
          />
        }
        showMenuIconButton={false}
        style={{
          height: "112px",
          alignItems: "center"
        }}
      />
    );
  }
}
