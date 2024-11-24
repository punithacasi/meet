Feature: Specify Number of Events
    Scenario: When the user type 10 in the NOE textbox, Event list will display only 10 events.
        Given the main page is open
        And the event list is displayed is greater then 10
        And NOE textbox is visible with value 32
        When the user type 10 in NOE textbox
        Then user should see only 10 events
