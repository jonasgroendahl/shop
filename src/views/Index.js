import React, { Component } from "react";
import Bundle from "../components/Bundle";
import "./Index.css";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      items: [
        {
          id: 1,
          name: "Basic",
          description:
            "This package is designed for the average user. It contains 1 On-Demand player.",
          items: [{ name: "A monitor" }, { name: "A Wexer License" }],
          amount: 1,
          price: 44
        },
        {
          id: 2,
          name: "Premium",
          description: "This package is for the advanced user.",
          items: [
            { name: "DummyText" },
            { name: "lorem" },
            { name: "axwaciwicjwicwcwcw" }
          ],
          amount: 1,
          price: 55
        },
        {
          id: 999,
          name: "Custom",
          description: "Create your own",
          items: [
            { name: "?????" },
            { name: "??" },
            { name: "???" },
            { name: "????" }
          ]
        }
      ]
    };
  }

  render() {
    const listOfBundles = this.state.items.map(i => {
      return (
        <Bundle
          name={i.name}
          id={i.id}
          description={i.description}
          items={i.items}
          key={i.id}
          amount={i.amount}
          price={i.price}
        />
      );
    });
    return (
      <div className="animate">
        <div className="index-overview">{listOfBundles}</div>
      </div>
    );
  }
}
