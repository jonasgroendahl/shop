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
      },
      {
        id: 4,
        name: "Vemcount Device",
        type: "accessories",
        description: "I'm a count",
        selected: false,
        price: 10,
        disabled: false
      },
      {
        id: 5,
        name: "Vemcount Device",
        type: "kit",
        description: "I'm a count",
        selected: false,
        price: 10,
        disabled: false
      },
      {
        id: 6,
        name: "Vemcount Device",
        type: "install",
        description: "I'm a count",
        selected: false,
        price: 10,
        disabled: false
      }
    ]
  };

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
      // set selected
      if (item.id === i.id) {
        i.selected = !i.selected;
      }
      // if item (differnet from selected) is of same type and we check the currentcheckbox
      if (i.type === item.type && i.id !== item.id && event.target.checked) {
        i.disabled = true;
      }
      // if accessories, don't limit the selection
      if (i.type === "accessories") {
        i.disabled = false;
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
              <button
                className="btn"
                onClick={this.nextStep}
                disabled={
                  items.filter(i => i.type === "player" && i.selected)
                    .length === 0
                }
              >
                Next step
              </button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel onClick={() => this.step(1)}>Select Screen</StepLabel>
            <StepContent>
              {itemList("video")}
              <button
                className="btn"
                onClick={this.nextStep}
                disabled={
                  items.filter(i => i.type === "video" && i.selected).length ===
                  0
                }
              >
                Next step
              </button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel onClick={() => this.step(2)}>Select Audio</StepLabel>
            <StepContent>
              {itemList("audio")}
              <button
                className="btn"
                onClick={this.nextStep}
                disabled={
                  items.filter(i => i.type === "audio" && i.selected).length ===
                  0
                }
              >
                Next step
              </button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel onClick={() => this.step(3)}>
              Select Automation Kit
            </StepLabel>
            <StepContent>
              {itemList("kit")}
              <button
                className="btn"
                onClick={this.nextStep}
                disabled={
                  items.filter(i => i.type === "kit" && i.selected).length === 0
                }
              >
                Next step
              </button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel onClick={() => this.step(4)}>Select Install</StepLabel>
            <StepContent>
              {itemList("install")}
              <button
                className="btn"
                onClick={this.nextStep}
                disabled={
                  items.filter(i => i.type === "install" && i.selected)
                    .length === 0
                }
              >
                Next step
              </button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel onClick={() => this.step(5)}>
              Select Accessories
            </StepLabel>
            <StepContent>
              {itemList("accessories")}
              <button className="btn" onClick={this.nextStep}>
                Next step
              </button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel onClick={() => this.step(6)}>Done</StepLabel>
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
                            i.selected
                              ? (acc += i.price)
                              : (acc = acc) /* To be able to do inline reduce function */,
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
          <h1>List of items</h1>
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
