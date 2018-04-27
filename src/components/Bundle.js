import React, { Component } from "react";
import "./Bundle.css";
import { LoginConsumer } from "../context/LoginContext";
import { Link } from "react-router-dom";

export default class Bundle extends Component {
  addItem = id => {
    console.log("Added item");
    console.log(id);
  };

  render() {
    const { key, ...item } = this.props;

    return (
      <div className="card">
        <div className="card-header">
          <h1>{this.props.name}</h1>
          <p>{this.props.description}</p>
        </div>
        <ul>
          {this.props.items.map(i => {
            return <li key={i.name}>{i.name}</li>;
          })}
        </ul>
        <div className="card-footer">
          {this.props.id !== 999 ? (
            <LoginConsumer>
              {context => (
                <button className="btn" onClick={() => context.addItem(item)}>
                  Add to cart
                </button>
              )}
            </LoginConsumer>
          ) : (
            <Link to="/builder" className="btn">
              Customize build
            </Link>
          )}
        </div>
      </div>
    );
  }
}
