import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = { number: 32 };

  handleNumberChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ number: inputValue });
  };

  render() {
    return (
      <div className='NumberOfEvents'>
        <input
          type='number'
          className='event-number'
          value={this.state.number}
          onChange={this.handleNumberChange}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
