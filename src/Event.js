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
        {/* <div className='collapsed-event'> */}
        <h2 className='event-summary'>{event.summary}</h2>
        <span className='event-start'>{`${event.start.dateTime} (${event.start.timeZone})`}</span>
        <br />
        <span className='event-location'>{`@${event.summary} | ${event.location}`}</span>
        <br />
        {/* </div> */}
        {!isCollapsed && (
          <div className='event-details'>
            <h3 className='about-event'>About event:</h3>
            <h3>
              <a className='google-calendar-link' href={event.htmlLink}> 
                See details on Google Calendar
              </a>
            </h3>
            <span className='event-description'>{event.description}</span>
          </div>
        )}
        <button className='event-button' onClick={this.toggleCollapsed}>
          {isCollapsed ? 'Show details' : 'Hide details'}
        </button>
      </div>
    );
  }
}

export default Event;
