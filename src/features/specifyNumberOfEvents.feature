Feature: Specify number of events

    Scenario: When user has not specified a number, 32 is the default number
        Given the user searched for a specific city
        When the user did not specify how many events he wants to see
        Then by default, a maximum of thirty-two events will be loaded

    Scenario: User can change the number of events they want to see
        Given the user searched for a specific city
        When the user selected in the “Number of events” field how many events he wants to see
        Then the page will load a maximum number of events equal to how many events the user selected