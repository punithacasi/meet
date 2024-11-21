
import { render } from '@testing-library/react';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    //let allEvents;
    beforeEach(async () => {
        //allEvents = await getEvents(event);
        NumberOfEventsComponent = render(<NumberOfEvents />);
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