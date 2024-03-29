import './nprogress.css';
import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import MeetAppLogo from './img/meet-logo.png';
import { WarnAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

class App extends Component {
  
  state = {
    events: [],
    locations: [],
    eventsNumber: 32,
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;

    window.addEventListener('offline', this.handleOffline);
    window.addEventListener('online', this.handleOnline);

    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events,
            locations: extractLocations(events),
          });
        }
      });
    }
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
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
      : 'You are currently offline. The events may not be up to date.';

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
        <div className='data-vis-wrapper'>
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400}>
            <ScatterChart
              margin={{
                top: 30,
                right: 30,
                bottom: 30,
                left: 0,
              }}
            >
              <CartesianGrid />
              <XAxis type='category' dataKey='city' name='City' />
              <YAxis
                type='number'
                dataKey='number'
                name='Number of events'
                allowDecimals={false}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter
                data={this.getData()}
                fill='#FF5A5A'
                name='Number of events per city'
              />
              <Legend verticalAlign='bottom' height={50} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList
          events={this.state.events.slice(0, this.state.eventsNumber)}
        />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
