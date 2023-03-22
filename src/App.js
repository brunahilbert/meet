import './nprogress.css';
import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import MeetAppLogo from './img/meet-logo.png'

class App extends Component {
  
  state = { events: [], locations: [], eventsNumber: 32 };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events,
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
      });
    });
  };

  updateEventsNumber = (inputNumber) => {
    this.setState({ eventsNumber: inputNumber });
  };

  render() {
    return (
      <div className='App'>
        <img className='meet-logo' src={MeetAppLogo} alt='Meet app logo'/> <br/>
        <span className='city-search-text'>Choose your nearest city:</span>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          updateEventsNumber={this.updateEventsNumber}
          eventsNumber={this.state.eventsNumber}
        />
        <EventList
          events={this.state.events.slice(0, this.state.eventsNumber)}
        />
      </div>
    );
  }
}

export default App;
