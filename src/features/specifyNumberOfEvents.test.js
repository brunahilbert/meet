import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  let AppWrapper;

  test('When user has not specified a number, 32 is the default number', ({
    given,
    when,
    then,
  }) => {
    given('the user searched for a specific city', () => {
      AppWrapper = mount(<App />);
      AppWrapper.find('.city').simulate('change', {
        target: { value: 'Berlin' },
      });
      AppWrapper.find('.suggestions li').at(0).simulate('click');
    });

    when('the user did not specify how many events he wants to see', () => {});

    then('by default, a maximum of thirty-two events will be loaded', () => {
      expect(AppWrapper.state('eventsNumber')).toEqual(32);
    });
  });

  test('User can change the number of events they want to see', ({
    given,
    when,
    then,
  }) => {
    given('the user searched for a specific city', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.find('.city').simulate('change', {
        target: { value: 'Berlin' },
      });
      AppWrapper.find('.suggestions li').at(0).simulate('click');
    });

    when(
      'the user selected in the “Number of events” field how many events he wants to see',
      () => {
        AppWrapper.find('.event-number').simulate('change', {
          target: { value: 10 },
        });
      }
    );

    then(
      'the page will load a maximum number of events equal to how many events the user selected',
      () => {
        expect(AppWrapper.state('eventsNumber')).toEqual(10);
      }
    );
  });
});
