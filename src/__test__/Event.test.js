
import { render } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

describe('<Event /> component', () => {
    let EventComponent;
    let allEvents;
    beforeEach(async () => {
        allEvents = await getEvents(event);
        EventComponent = render(<Event event={allEvents[0]} />);
    })
    test('renders event title', () => {
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });
    test('renders event created', () => {
        expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
    });
    test('renders event location', () => {
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });
    test('renders event details buttons with the title (show details) and should be visible', () => {
        expect(EventComponent.queryByText('show details')).toBeInTheDocument();
        expect(EventComponent.queryByText('show details')).toBeVisible();
    });
    test('renders event details buttons with the title (hide details) and should be not visible', () => {
        expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
    });
    test('shows the details section when the user clicks on the "show details" button', async () => {
        const user = userEvent.setup();
        let EventDOM = EventComponent.container.firstChild;
        const showButton = EventComponent.queryByText('show details');
        await user.click(showButton);
        expect(EventDOM.querySelector('#details')).toBeVisible();
        expect(showButton).not.toBeVisible();
    });
    test('hides the details section when the user clicks on the "hide details" button', async () => {
        const user = userEvent.setup();
        let EventDOM = EventComponent.container.firstChild;
        const showButton = EventComponent.queryByText('show details');
        expect(showButton).toBeVisible();
        await user.click(showButton);
        const hideButton = EventComponent.queryByText('hide details');
        expect(hideButton).toBeVisible();
        await user.click(hideButton);
        expect(EventDOM.querySelector('#details')).not.toBeInTheDocument();
        // expect(showButton).toBeVisible();

    });

});