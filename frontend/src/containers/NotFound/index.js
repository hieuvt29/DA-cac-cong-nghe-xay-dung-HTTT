import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div className="span9">
        <h3 className="App-intro">
          {this.props.location? "Not found: " + this.props.location.pathname: "Not found"}
        </h3>
      </div>
    );
  }
}

export default NotFound;
