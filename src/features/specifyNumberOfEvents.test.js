import { render, within, waitFor } from "@testing-library/react";
import { defineFeature, loadFeature } from "jest-cucumber";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When the user type 10 in the NOE textbox, Event list will display only 10 events.', ({ given, and, when, then }) => {
        let AppComponent;
        let AppDOM;
        let EventListDOM;
        let EventListItems;
        let NOEDOM;
        let NumberOfEventsTextBox;
        given('the main page is open', async () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');
            EventListItems = within(EventListDOM).queryAllByRole('listitem');
        });

        and('the event list is displayed is greater then 10', async () => {
            await waitFor(() => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(10);
            });
        });

        and('NOE textbox is visible with value 32', () => {
            NOEDOM = AppDOM.querySelector('#number-of-events');
            NumberOfEventsTextBox = within(NOEDOM).queryByRole('textbox');
            expect(NumberOfEventsTextBox).toHaveValue('32');
        });

        when('the user type 10 in NOE textbox', async () => {
            const user = userEvent.setup();
            await user.type(NumberOfEventsTextBox, '{backspace}{backspace}10');
        });

        then('user should see only 10 events', async () => {
            await waitFor(() => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(10);
            });
        });
    });
});