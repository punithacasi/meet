import { render, within, waitFor } from "@testing-library/react";
import { defineFeature, loadFeature } from "jest-cucumber";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('When the user clicks on the events\' \'show detail\' button, shows event details', ({ given, and, when, then }) => {
        let AppComponent;
        let AppDOM;
        let EventListDOM;
        let EventListItems;
        let selectedEvent;
        given('the main page is open', () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
        });

        and('the event list is displayed', async () => {
            EventListDOM = AppDOM.querySelector('#event-list');
            EventListItems = within(EventListDOM).queryAllByRole('listitem');
            await waitFor(() => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0);
                selectedEvent = EventListItems[0];
            });

        });

        when('the user clicks on the show detail button', async () => {
            const user = userEvent.setup();
            const showButton = selectedEvent.querySelector('.details-btn');
            await user.click(showButton);
        });

        then('the user should see the event detail of the respective event', () => {
            expect(selectedEvent.querySelector('#details')).toBeVisible();
        });

        and('the user should see hide detail button', () => {
            const buttonDetail = selectedEvent.querySelector('.details-btn');
            expect(buttonDetail).toHaveTextContent('hide detail');
        });

        and('the use should not see the show detail button', () => {
            const buttonDetail = selectedEvent.querySelector('.details-btn');
            expect(buttonDetail).not.toHaveTextContent('show detail');
        });
    });

    test('When the user clicks on the events\' \'hide detail\' button, hides event details', ({ given, and, when, then }) => {
        let AppComponent;
        let AppDOM;
        let EventListDOM;
        let EventListItems;
        let selectedEvent;
        given('the user sees a event detail of an event', async () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');
            EventListItems = within(EventListDOM).queryAllByRole('listitem');
            await waitFor(() => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0);
                selectedEvent = EventListItems[0];
            });
            const user = userEvent.setup();
            const showButton = selectedEvent.querySelector('.details-btn');
            await user.click(showButton);
        });

        and('the hide detail button', () => {
            const buttonDetail = selectedEvent.querySelector('.details-btn');
            expect(buttonDetail).toHaveTextContent('hide detail');
        });

        when('the user clicks on the hide detail button', async () => {
            const user = userEvent.setup();
            const hideButton = selectedEvent.querySelector('.details-btn');
            await user.click(hideButton);
        });

        then('the user should not see the event detail of the respective event', () => {
            expect(selectedEvent.querySelector('#details')).not.toBeInTheDocument();
        });;
        and('the user should not see hide detail button', () => {
            const buttonDetail = selectedEvent.querySelector('.details-btn');
            expect(buttonDetail).not.toHaveTextContent('hide detail');
        });

        and('the use should see the show detail button', () => {
            const buttonDetail = selectedEvent.querySelector('.details-btn');
            expect(buttonDetail).toHaveTextContent('show detail');
        });
    });
});