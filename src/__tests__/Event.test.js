import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {

  let EventWrapper;
  let event = mockData[0];
  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  });

  test('render correct tags when an event is collapsed', () => {
    expect(EventWrapper.find('.event-summary')).toHaveLength(1);
    expect(EventWrapper.find('.event-start')).toHaveLength(1);
    expect(EventWrapper.find('.event-location')).toHaveLength(1);
    expect(EventWrapper.find('.about-event')).toHaveLength(0);
    expect(EventWrapper.find('.google-calendar-link')).toHaveLength(0);
    expect(EventWrapper.find('.event-description')).toHaveLength(0);
    expect(EventWrapper.find('.event-button')).toHaveLength(1);
  });

  test('render correct value/state when an event is collapsed', () => {
    expect(EventWrapper.find('.event-summary').text()).toBe(event.summary);
    expect(EventWrapper.find('.event-start').text()).toBe(
      `${event.start.dateTime} (${event.start.timeZone})`
    );
    expect(EventWrapper.find('.event-location').text()).toBe(
      `@${event.summary} | ${event.location}`
    );
    expect(EventWrapper.find('.event-button').text()).toBe('Show details');
    expect(EventWrapper.state('isCollapsed')).toBeTruthy();
  });

  test('render correct tags when an event is expanded', () => {
    EventWrapper.find('.event-button').simulate('click');
    expect(EventWrapper.find('.event-summary')).toHaveLength(1);
    expect(EventWrapper.find('.event-start')).toHaveLength(1);
    expect(EventWrapper.find('.event-location')).toHaveLength(1);
    expect(EventWrapper.find('.about-event')).toHaveLength(1);
    expect(EventWrapper.find('.google-calendar-link')).toHaveLength(1);
    expect(EventWrapper.find('.event-description')).toHaveLength(1);
    expect(EventWrapper.find('.event-button')).toHaveLength(1);
  });

  test('render correct value/state when an event is expanded', () => {
    expect(EventWrapper.find('.event-summary').text()).toBe(event.summary);
    expect(EventWrapper.find('.event-start').text()).toBe(
      `${event.start.dateTime} (${event.start.timeZone})`
    );
    expect(EventWrapper.find('.event-location').text()).toBe(
      `@${event.summary} | ${event.location}`
    );
    expect(EventWrapper.find('.about-event').text()).toBe('About event:');
    expect(EventWrapper.find('.google-calendar-link').text()).toBe(
      'See details on Google Calendar'
    );
    expect(EventWrapper.find('.event-description').text()).toBe(
      event.description
    );
    expect(EventWrapper.find('.event-button').text()).toBe('Hide details');
    expect(EventWrapper.state('isCollapsed')).toBeFalsy();
  });

  test('toggle event button after expanded', () => {
    EventWrapper.setState({ isCollapsed: false});
    EventWrapper.find('.event-button').simulate('click');
    expect(EventWrapper.find('.event-button').text()).toBe('Show details');
    expect(EventWrapper.state('isCollapsed')).toBeTruthy();
  });

  test('reset event state to default (isCollapsed: true)', () => {
    EventWrapper.setState({ isCollapsed: false});

    // When creating a new wrapper, the previous state of the component is
    // lost and the default state defined in the constructor is returned
    EventWrapper = shallow(<Event event={event} />);
    expect(EventWrapper.find('.event-button').text()).toBe('Show details');
    expect(EventWrapper.state('isCollapsed')).toBeTruthy();
  });
});
