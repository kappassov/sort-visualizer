import React from "react";
import "./SortingVisualizer.css";
import { mergeSortAlgorithm } from "../SortingAlgorithm/SortingAlgorithm.js";
export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }
  resetArray() {
    const array = [];
    for (let i = 0; i < 150; i++) {
      array.push(randomNumber(10, 500));
    }
    this.setState({ array });
  }
  mergeSort() {
    const swaps = mergeSortAlgorithm(this.state.array);

    for (let i = 0; i < swaps.length; i++) {
      const bars = document.getElementsByClassName("val-bar");
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = swaps[i];
        const barOneStyle = bars[barOneIdx].style;
        const barTwoStyle = bars[barTwoIdx].style;
        const color = i % 3 === 0 ? "limegreen" : "magenta";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 4);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = swaps[i];
          const barOneStyle = bars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 4);
      }
    }
  }
  render() {
    const { array } = this.state;

    return (
      <div className="arr-container">
        {array.map((val, key) => (
          <div
            className="val-bar"
            style={{ height: `${val}px` }}
            key={key}
          ></div>
        ))}
        {<br />}
        <button onClick={() => this.resetArray()}>Generate new array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
      </div>
    );
  }
}
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
