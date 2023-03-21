import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {

  state = { number: 32 };

  handleNumberChange = (inputValue) => {
    if (inputValue <= 0 || inputValue > 32) {
      this.setState({
        number: '',
        infoText:
          'Select a number between 1 and 32',
      });
    } else {
      return (
        this.setState({ number: inputValue, infoText: '' }),
        this.props.updateEventsNumber(inputValue)
        )
      }
    }
    
  componentDidMount() {
    this.setState({ number: this.props.number || 32 });
  }

  render() {
    return (
      <div className='NumberOfEvents'>
        <span className='number-of-events-text'>Number of events:</span>
        <ErrorAlert text={this.state.infoText} />
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
