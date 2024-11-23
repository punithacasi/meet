
import { render, waitFor, within } from '@testing-library/react';
//import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    //let allEvents;
    beforeEach(async () => {
        //allEvents = await getEvents(event);
        NumberOfEventsComponent = render(<NumberOfEvents currentNOE={32} />);
    })
    test('renders text input', () => {
        const NumberOfEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(NumberOfEventsTextBox).toBeInTheDocument();
        expect(NumberOfEventsTextBox).toHaveClass('numberOfEvents');
    });
    test('by default text input value should be 32', () => {
        const NumberOfEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(NumberOfEventsTextBox).toHaveValue('32');
    });
    test('textbox values changes accordingly when user types 10', async () => {
        const user = userEvent.setup();
        const NumberOfEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
        await user.type(NumberOfEventsTextBox, '{backspace}{backspace}10');
        expect(NumberOfEventsTextBox).toHaveValue('10');
    });
});

describe('<NumberOfEvents /> integration', () => {
    test('renders only the number of events less or equal to the NOE count', async () => {

        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const EventListDOM = AppDOM.querySelector('#event-list');
        const NOEDOM = AppDOM.querySelector('#number-of-events');
        const NumberOfEventsTextBox = within(NOEDOM).queryByRole('textbox');
        await user.type(NumberOfEventsTextBox, '{backspace}{backspace}10');

        await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBeLessThanOrEqual(10);
        });
    });
});