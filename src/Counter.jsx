import { Component } from "react";

class Counter extends Component {

  constructor(props)
  { super(props);
    this.state = {count:0}
  }

  incLogics = () => {
     this.setState({
      count: this.state.count + 1,
    });
  }

render() {
  return (
    <>
    <h2>Counter: {this.state.count}</h2>
     <button onClick={this.incLogics}>Increament</button>
    </>
  )
 }
}
export default Counter;