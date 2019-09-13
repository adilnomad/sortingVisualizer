import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import NavBar from './NavBar.jsx';
import { Stage, Line, Layer } from 'react-konva';

class App extends React.Component {
  constructor(props) {
    super(props);
  
    var list = new Array(60);
    for (var i = 0; i < list.length; i++) {
      var height = Math.floor((Math.random() * 300) + 10);
      list[i] = {
        p : [i, height, i, 0],
        color : "blue"
      };
    }
    this.state = {
      array : list,
      algorithm : "Insertion Sort",
      speed: 1,
      size: 40,
      msStart : null,
      msEnd : null,
      running : false
    };

    this.start = this.start.bind(this);
    this.selectionSort = this.selectionSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.insertionSort = this.insertionSort.bind(this);
    this.swap = this.swap.bind(this);
    this.generate = this.generate.bind(this);
    this.speed = this.speed.bind(this);
  }

  async swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  selectionSort() {
    this.setState({algorithm: "Selection Sort"});
  }

  quickSort() {
    this.setState({algorithm : "Quick Sort"});
  }

  insertionSort() {
    this.setState({algorithm : "Insertion Sort"});
  }

  async start() {
    if (!this.state.running) {
      if (this.state.algorithm == "Quick Sort")
        await this.qs();
      else if (this.state.algorithm == "Selection Sort")
        await this.ss();
      else if (this.state.algorithm == "Insertion Sort")
        await this.is(); 
    }
  }

  async is() {
    this.setState({running : true});
    var next = this.state.array.slice(0);
    for (let i = 1; i < next.length; i++) {
      let key = next[i].p[1];
      let j = i - 1;
      for (var a = 0; a <= i; a++) {
        next[a].color = "green";
      }
      this.setState({array : next});
      await this.sleep(this.state.speed);
      while (j >= 0 && next[j].p[1] > key) {
          if (next[j+1].color == "red")
            next[j+1].color = "green";
          next[j].color = "red";
          next[j + 1].p[1] = next[j].p[1];
          j = j - 1;
          this.setState({array : next});
          await this.sleep(this.state.speed);
      }
      next[j + 1].p[1] = key;
    }
    for (var i = 0; i < next.length; i++) {
      next[i].color = "green";
    }
    this.setState({array : next});
    await this.sleep(1000);
    for (var i = 0; i < next.length; i++) {
      next[i].color = "blue";
    }
    this.setState({array : next});
    this.setState({running : false});
  }

  // implementation of the selection sort
  async ss() {
    this.setState({running : true});
    var nextList = this.state.array.slice(0);
    var inx = 0;
    while (inx < nextList.length) {
      var minVal = nextList[inx].p[1];
      var minInx = inx;
      for (var i = inx; i < nextList.length; i++) {
          nextList[i].color = "red";
          this.setState({array : nextList});
          if (nextList[i].p[1] <= minVal) { 
            nextList[minInx].color = "blue";
            minVal = nextList[i].p[1];
            minInx = i;
            nextList[i].color = "green";
            this.setState({array : nextList});
          }
          await this.sleep(this.state.speed);
          if (nextList[i].color != "green")
            nextList[i].color = "blue";
          this.setState({array : nextList});
      }
      await this.swap(nextList, inx, minInx);
      nextList[inx].color = "green";
      inx++;
      this.setState({array : nextList});
    }
    await this.sleep(1000);
    // reset colors back to blue;
    for (var i = 0; i < nextList.length; i++) {
      nextList[i].color = "blue";
    }
    this.setState({array : nextList});
    this.setState({running : false});
  }

  // Quick Sort implementation
  async qs() {
    this.setState({running : true});
    var nextState = this.state.array.slice(0);
    await this.qsHelper(nextState, 0, nextState.length-1);
    for (var i = 0; i < nextState.length; i++) {
      nextState[i].color = "green";
    }
    this.setState({array : nextState});
    await this.sleep(1000);
    for (var i = 0; i < nextState.length; i++) {
      nextState[i].color = "blue";
    }
    this.setState({array : nextState});

    this.setState({running : false});
  }

  async qsHelper(arrayNext, start, end) {
    if (start > end)
      return;
    var pivot = start;
    var left = start + 1;
    var right = end;

    for (var i = start; i <= end; i++) {
      arrayNext[i].color = "yellow";
    }
    arrayNext[pivot].color = "red";
    this.setState({array : arrayNext});

    while (left <= right) {
      if (arrayNext[left].p[1] > arrayNext[pivot].p[1] && arrayNext[right].p[1] < arrayNext[pivot].p[1])
        this.swap(arrayNext, left, right);
      if (arrayNext[left].p[1] <= arrayNext[pivot].p[1])
        left++;
      if (arrayNext[right].p[1] >= arrayNext[pivot].p[1])
        right--;
      this.setState({array : arrayNext});
      await this.sleep(this.state.speed);
    }
    for (var i = start; i <= end; i++) {
      arrayNext[i].color = "blue";
    }
    this.setState({array : arrayNext});
    await this.swap(arrayNext, pivot, right);
    // recurse left half
    await this.qsHelper(arrayNext, start, right - 1);
    for (var i = start; i <= right - 1; i++) {
      arrayNext[i].color = "green";
    }
    this.setState({array : arrayNext});

    // recurse right half
    await this.qsHelper(arrayNext, right+1, end);
    for (var i = right + 1; i <= end; i++) {
      arrayNext[i].color = "green";
    }
    this.setState({array : arrayNext});
  }

  async sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  speed() {
    var input = document.getElementById("typeinp");
    var currentVal = input.value;
    var inverted = 100 - currentVal;
    this.setState({
      speed: inverted
    });
  }

  generate() {
    if (!this.state.running) {
      var listCopy = new Array(60);
      for (var i = 0; i < listCopy.length; i++) {
        var height = Math.floor((Math.random() * 300) + 20);
        listCopy[i] = {
          p : [20 * i, height, 20 * i, 0],
          color : "blue"
        };
      }
      this.setState({array : listCopy});
    }
  }

  render() {
    return (
    <div>
      <NavBar ss={this.selectionSort} start={this.start} algorithm={this.state.algorithm} generate={this.generate} 
      qs={this.quickSort} speed={this.speed} is={this.insertionSort} running={this.state.running} />
      <Stage className="stage" width={1200} height={500}>
      <Layer>
        {this.state.array.map((unit, index) => (
          <Line className="unit"
          key={index}
          x={160}
          y={80}
          points={[15 * index, unit.p[1], 15 * index, 0]}
          stroke={unit.color}
          strokeWidth={12}
          shadowBlur={5}
          shadowColor="black"
        />
        ))}
      </Layer>
      </Stage> 
    </div>);
  }
}

export default App;
