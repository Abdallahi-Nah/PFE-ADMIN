// import React from "react";

// class ChangingProgressProvider extends React.Component {
//   static defaultProps = {
//     interval: 1000,
//   };

//   state = {
//     valuesIndex: 0,
//   };

//   componentDidMount() {
//     setInterval(() => {
//       this.setState({
//         valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length,
//       });
//     }, this.props.interval);
//   }

//   render() {
//     return this.props.children(this.props.values[this.state.valuesIndex]);
//   }
// }

// export default ChangingProgressProvider;

import React from "react";

class ChangingProgressProvider extends React.Component {
  static defaultProps = {
    interval: 800, // Vitesse de changement (ajustable)
    values: [0, 25, 50, 75, 100],
  };

  state = {
    valuesIndex: 0,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        valuesIndex: (prevState.valuesIndex + 1) % this.props.values.length,
      }));
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ChangingProgressProvider;
