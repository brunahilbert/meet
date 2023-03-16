import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents updateEventsNumber={() => {}} />
    );
  });

  test('render events number input', () => {
    expect(NumberOfEventsWrapper.find('.event-number')).toHaveLength(1);
  });

  test('show number 32 by default', () => {
    expect(NumberOfEventsWrapper.find('.event-number').prop('value')).toBe(32);
    expect(NumberOfEventsWrapper.state('number')).toBe(32);
  });

  test('number of events is changed', () => {
    NumberOfEventsWrapper.find('.event-number').simulate('change', {
      target: { value: 24 },
    });
    expect(NumberOfEventsWrapper.find('.event-number').prop('value')).toBe(24);
    expect(NumberOfEventsWrapper.state('number')).toBe(24);
  });

  test('reset number of events to default', () => {
    NumberOfEventsWrapper.find('.event-number').simulate('change', {
      target: { value: 24 },
    });
    expect(NumberOfEventsWrapper.find('.event-number').prop('value')).toBe(24);
    expect(NumberOfEventsWrapper.state('number')).toBe(24);

    // When creating a new wrapper with shallow(<NumberOfEvents />),
    // the previous state of the component is lost and the default
    // state defined in the constructor is returned ;)
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    expect(NumberOfEventsWrapper.find('.event-number').prop('value')).toBe(32);
    expect(NumberOfEventsWrapper.state('number')).toBe(32);
  });
});
