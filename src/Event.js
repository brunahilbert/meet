import React, { Component } from 'react';


class Event extends Component {

  state = { isCollapsed: true };

  toggleCollapsed = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  render() {
    const { event } = this.props;
    const { isCollapsed } = this.state;

    return (
      <div className='Event'>
        <div className='collapsed-event'>
          <h2 className='event-summary'>{event.summary}</h2>
          <span className='event-start'>{`${event.start.dateTime} (${event.start.timeZone})`}</span><br/>
          <span className='event-location'>{`@${event.summary} | ${event.location}`}</span><br/>
          <button className='event-button' onClick={this.toggleCollapsed}>
            {isCollapsed ? 'Show details' : 'Hide details'}
          </button>
        </div>
        {!isCollapsed && (
          <div className='event-details'>
            <h4 className='about-event'>About event:</h4>
            <link className='google-calendar-link' href=''>
              See details on Google Calendar
            </link>
            <span className='event-description'>{event.description}</span>
          </div>
        )}
      </div>
    );
  }
}

export default Event;
