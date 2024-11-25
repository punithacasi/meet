import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useState, useEffect } from 'react';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';


import './App.css';
import EventGenresChart from './components/EventGenresChart';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    let errorText;
    if (isNaN(currentNOE)) {
      errorText = "Please enter a valid number to see the events"
    } else if (currentNOE < 1) {
      errorText = "Please enter a number greater than zero to see the events"
    } else {
      errorText = ""
    }
    setErrorAlert(errorText);
    let warningText = "";
    if (!navigator.onLine) {
      warningText = "Your are offline. The displayed list has been loaded from the cache";
    }
    setWarningAlert(warningText);
    fetchData();
  }, [currentCity, currentNOE, errorAlert]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
      <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
      <div className="charts-container">
        <EventGenresChart allLocations={allLocations} events={events} />
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>
      <EventList events={events} />
    </div >
  );
}

export default App;