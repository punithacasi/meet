import { useState } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
    const [NOE, setNOE] = useState(currentNOE ? currentNOE : 32);
    const handleInputChanged = (event) => {
        setNOE(event.target.value);
        if (setCurrentNOE) {
            setCurrentNOE(event.target.value);
        }
    };
    return (
        <div id="number-of-events">
            <span>Number of Events : </span>
            <input
                type="text"
                className="numberOfEvents"
                value={NOE}
                onChange={handleInputChanged}
            />
        </div>
    );
}

export default NumberOfEvents;