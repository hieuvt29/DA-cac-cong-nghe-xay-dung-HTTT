import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div className="App">
        <h3 className="App-intro">
          {this.props.location? "Not found: " + this.props.location.pathname: "Not found"}
        </h3>
      </div>
    );
  }
}

export default NotFound;
