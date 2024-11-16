import React, { useState, useEffect } from 'react';

const SearchEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  // Fetch events that the user has registered for from the `registered_events` table
  const fetchRegisteredEvents = async () => {
    const userId = sessionStorage.getItem('userID'); // Assuming userID is saved in sessionStorage
    if (!userId) {
      setMessage('User ID not found');
      return;
    }

    try {
      const response = await fetch(`http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/fetch_user_registered_events.php?user_id=${userId}`);
      const data = await response.json();
      if (data.success) {
        setRegisteredEvents(data.registeredEvents);
      } else {
        setMessage(data.message || 'No registered events found.');
      }
    } catch (error) {
      console.error('Error fetching registered events:', error);
      setMessage('Error fetching registered events.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Registered Events</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Start Date</th>
            <th>Location</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {registeredEvents.length > 0 ? (
            registeredEvents.map((event) => (
              <tr key={event.event_id}>
                <td>{event.title}</td> {/* Event Name */}
                <td>{event.start_date}</td> {/* Event Date */}
                <td>{event.location}</td>
                <td>{event.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No registered events found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchEvents;