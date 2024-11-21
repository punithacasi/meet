const Event = ({ event }) => {
    return (
        <li id={event.id}>
            <h1>{event.summary}</h1>
            <div>{event.created}</div>
            @<div>{event.summary} | {event.location}</div>
            <button type="button">show details</button>
            <div id="details">
                <p>{event.description}</p>
                <button type="button">hide details</button>
            </div>
        </li>
    );
}

export default Event;