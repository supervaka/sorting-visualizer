import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;
