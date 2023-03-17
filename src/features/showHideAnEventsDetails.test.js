import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default', ({
    given,
    when,
    then,
    and,
  }) => {
    let AppWrapper;
    given('a list of upcoming events being displayed', () => {
      AppWrapper = mount(<App />);
    });

    when('the user has not yet interacted with an event list', () => {});

    then("all events' details should be hidden", () => {
      expect(AppWrapper.find('.Event .event-details')).toHaveLength(0);
    });

    and('display a “Show details” button for each event in the list', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event-button').first().text()).toEqual(
        'Show details'
      );
    });
  });

  test('User can expand an event to see its details', ({
    given,
    when,
    then,
    and,
  }) => {
    let AppWrapper;
    given('a list of upcoming events being displayed', () => {
      AppWrapper = mount(<App />);
    });

    when('the user clicks on the “Show details” button', () => {
      AppWrapper.update();
      AppWrapper.find('.event-button').first().simulate('click');
    });

    then('the event should expand and display the details', () => {
      expect(AppWrapper.find('.Event .event-details')).toHaveLength(1);
    });

    and('a “Hide details” button should appear', () => {
      expect(AppWrapper.find('.event-button').first().text()).toEqual(
        'Hide details'
      );
    });
  });

  test('User can collapse an event to hide its details', ({
    given,
    when,
    then,
    and,
  }) => {
    let AppWrapper;
    given(
      'user is seeing the details about an event after clicking the “Show details” button',
      async () => {
        AppWrapper = await mount(<App />);
        AppWrapper.update();
        AppWrapper.find('.Event .event-button').first().simulate('click');
      }
    );

    when('the user clicks on the “Hide details” button', () => {
      AppWrapper.find('.event-button').first().simulate('click');
    });

    then('the event should be collapsed and hide the details', () => {
      expect(AppWrapper.find('.Event .event-details').first()).toHaveLength(0);
    });

    and('a “Show details” button should appear', () => {
      expect(AppWrapper.find('.event-button').first().text()).toEqual(
        'Show details'
      );
    });
  });
});
