import { useState } from "react";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <li class="event" id={event.id}>
            <h3>{event.summary}</h3>
            <div>{event.created}</div>
            <div> @{event.summary} | <span> {event.location}</span></div>

            {showDetails ?
                <div id="details">
                    <p>{event.description}</p>
                    <button class="details-btn" type="button" onClick={() => setShowDetails(false)}>hide details</button>
                </div> :
                <button class="details-btn" type="button" onClick={() => setShowDetails(true)}>show details</button>}
        </li>
    );
}

export default Event;