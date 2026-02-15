import { useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState("");

  const addEvent = () => {
    if (!event) return;
    setEvents([...events, event]);
    setEvent("");
  };

  const deleteEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Manage Events</h2>

      <input
        value={event}
        onChange={(e) => setEvent(e.target.value)}
        placeholder="Enter event"
      />
      <button onClick={addEvent}>Add</button>

      <ul>
        {events.map((e, i) => (
          <li key={i}>
            {e}
            <button onClick={() => deleteEvent(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Events;
