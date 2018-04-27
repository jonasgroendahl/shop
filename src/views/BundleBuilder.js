import React, { Component } from "react";
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import Item from "../components/Item";
import "./BundleBuilder.css";
import { LoginConsumer } from "../context/LoginContext";
import { Link } from "react-router-dom";

export default class BundeBundler extends Component {
  state = {
    stepIndex: 0,
    items: [
      {
        id: 0,
        name: "On Demand",
        type: "player",
        description: "I'm a player",
        selected: false,
        price: 4,
        disabled: false
      },
      {
        id: 1,
        name: "Basic",
        type: "player",
        description: "I'm a player",
        selected: false,
        price: 4,
        disabled: false
      },
      {
        id: 2,
        name: "LG TV",
        type: "video",
        description: "I'm a player",
        selected: false,
        price: 4,
        disabled: false
      },
      {
        id: 3,
        name: "LG TV",
        type: "audio",
        description: "I'm a player",
        selected: false,
        price: 4,
        disabled: false
      }
    ]
  };

  renderStepActions = step => {};

  nextStep = () => {
    const { stepIndex } = this.state;
    console.log(stepIndex);
    this.setState({ stepIndex: stepIndex + 1 });
  };

  step = step => {
    this.setState({ stepIndex: step });
  };

  onSelected = (event, item) => {
    const items = [...this.state.items];
    items.forEach(i => {
      i.disabled = false;
      if (item.id === i.id) {
        i.selected = !i.selected;
      }
      if (i.type === item.type && i.id !== item.id && event.target.checked) {
        i.disabled = true;
      }
    });
    this.setState({ items: items });
  };

  render() {
    const { stepIndex, items } = this.state;

    const itemList = type => {
      return items
        .filter(i => i.type === type)
        .map(j => (
          <Item
            name={j.name}
            description={j.description}
            price={j.price}
            key={j.id}
            onSelect={e => this.onSelected(e, j)}
            disabled={j.disabled}
            selected={j.selected}
          />
        ));
    };

    return (
      <div className="animate bb-wrapper">
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel onClick={() => this.step(0)}>Select Player</StepLabel>
            <StepContent>
              <div className="item-list">{itemList("player")}</div>
              <button className="btn" onClick={this.nextStep}>
                Next step
              </button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel onClick={() => this.step(1)}>Select Screen</StepLabel>
            <StepContent>
              {itemList("video")}
              <button className="btn" onClick={this.nextStep}>
                Next step
              </button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel onClick={() => this.step(2)}>Select Audio</StepLabel>
            <StepContent>
              {itemList("audio")}
              <button className="btn" onClick={this.nextStep}>
                Next step
              </button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel onClick={() => this.step(3)}>Done</StepLabel>
            <StepContent>
              <LoginConsumer>
                {context => (
                  <button
                    className="btn"
                    onClick={() =>
                      context.addItem({
                        name: "Custom Build",
                        items: items.filter(i => i.selected),
                        price: items.reduce(
                          (acc, i) =>
                            i.selected ? (acc += i.price) : (acc = acc),
                          0
                        ),
                        amount: 1,
                        id: Math.floor(Math.random() * Math.floor(100000)) + 1
                      })
                    }
                  >
                    Add to cart
                  </button>
                )}
              </LoginConsumer>
              <Link className="btn ma-5" to="/">
                Back to home screen
              </Link>
            </StepContent>
          </Step>
        </Stepper>
        <div className="pa-5">
          {items.filter(i => i.selected).map(i => (
            <li key={i.id + i.name}>
              {i.name} - {i.price}$
            </li>
          ))}
        </div>
      </div>
    );
  }
}
