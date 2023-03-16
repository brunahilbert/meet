import React, { Component } from 'react';

class NumberOfEvents extends Component {
    
  state = { number: 32 };

  handleNumberChange = (inputValue) => {
    this.setState({ number: inputValue });
    this.props.updateEventsNumber(inputValue);
  };

  componentDidMount() {
    this.setState({ number: this.props.number || 32 });
  }

  render() {
    return (
      <div className='NumberOfEvents'>
        <span>Number of events:</span>
        <br />
        <input
          type='number'
          className='event-number'
          value={this.state.number}
          onChange={(event) => this.handleNumberChange(event.target.value)}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
