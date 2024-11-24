Feature: Show/Hide Event Details
    Scenario: When the user clicks on the events' 'show detail' button, shows event details
        Given the main page is open
        And the event list is displayed
        When the user clicks on the show detail button
        Then the user should see the event detail of the respective event
        And the user should see hide detail button
        And the use should not see the show detail button

    Scenario: When the user clicks on the events' 'hide detail' button, hides event details
        Given the user sees a event detail of an event
        And the hide detail button
        When the user clicks on the hide detail button
        Then the user should not see the event detail of the respective event
        And the user should not see hide detail button
        And the use should see the show detail button