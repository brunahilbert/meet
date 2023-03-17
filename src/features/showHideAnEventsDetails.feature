Feature: Show/hide event details

    Scenario: An event element is collapsed by default
        Given a list of upcoming events being displayed
        When the user has not yet interacted with an event list
        Then all events' details should be hidden
        And display a “Show details” button for each event in the list

    Scenario: User can expand an event to see its details
        Given a list of upcoming events being displayed
        When the user clicks on the “Show details” button
        Then the event should expand and display the details
        And a “Hide details” button should appear

    Scenario: User can collapse an event to hide its details
        Given user is seeing the details about an event after clicking the “Show details” button
        When the user clicks on the “Hide details” button
        Then the event should be collapsed and hide the details
        And a “Show details” button should appear