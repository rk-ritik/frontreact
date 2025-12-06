import { Component } from "react";

class LifeCycleDemo extends Component {
  componentDidMount() {
    console.log("Component Mounted");
  }
  constructor(props)
  { super(props);
    console.log("Constructor executed");
  }

  componentDidUpdate() {
    console.log("Component Updated");
  }

  componentWillUnmount() {
    console.log("Component Removed");
  }

  render() {
    return <h1>Lifecycle Demo</h1>;
  }
}
export default LifeCycleDemo;