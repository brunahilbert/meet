import './nprogress.css';
import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import MeetAppLogo from './img/meet-logo.png';
import { WarnAlert } from './Alert';

class App extends Component {

  state = { events: [], locations: [], eventsNumber: 32 };

  componentDidMount() {
    this.mounted = true;
    window.addEventListener('offline', this.handleOffline);
    window.addEventListener('online', this.handleOnline);
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

  handleOffline = () => {
    this.setState({ offline: true });
  };

  handleOnline = () => {
    this.setState({ offline: false });
  };

  render() {

    const offlineMessage = window.navigator.onLine
      ? ''
      : 'You are currently offline. The events may not be up to date';

    return (
      <div className='App'>
        <img className='meet-logo' src={MeetAppLogo} alt='Meet app logo' />{' '}
        <br />
        <span className='city-search-text'>Choose your nearest city:</span>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          updateEventsNumber={this.updateEventsNumber}
          eventsNumber={this.state.eventsNumber}
        />
        <WarnAlert text={offlineMessage} />
        <EventList
          events={this.state.events.slice(0, this.state.eventsNumber)}
        />
      </div>
    );
  }
}

export default App;
