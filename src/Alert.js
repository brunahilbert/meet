import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.fontSize = '18px';
  }

  getStyle = () => {
    return {
      color: this.color,
      fontSize: this.fontSize,
    };
  };

  render() {
    return (
      <div className='Alert'>
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }
}

class WarnAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'orange';
  }
}

export { InfoAlert, ErrorAlert, WarnAlert };
