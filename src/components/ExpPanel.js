import React, { Component } from "react";
import "./ExpPanel.css";

export default class ExpPanel extends Component {
  state = {
    showList: false,
    showText: "Show more"
  };

  toggleShow = () => {
    const show = this.state.showList;
    let text = "Show more";
    if (show) {
      text = "Show less";
    }
    this.setState({ showList: !show, showText: text });
    console.log(this.props.items);
  };

  render() {
    return (
      <div>
        <div className="show-more" onClick={this.toggleShow}>
          {this.state.showText}
        </div>
        {this.state.showList ? (
          <ul className="show-more-list">
            {this.props.items.map(i => <li key={i.name}>{i.name}</li>)}
          </ul>
        ) : null}
      </div>
    );
  }
}
