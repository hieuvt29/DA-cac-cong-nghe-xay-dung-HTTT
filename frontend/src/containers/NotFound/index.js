import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Not Found with path: {this.props.location.pathname}
        </p>
      </div>
    );
  }
}

export default NotFound;
