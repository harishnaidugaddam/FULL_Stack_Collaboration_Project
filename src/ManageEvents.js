import React, { useState, useEffect } from 'react';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEvents();
    fetchRegisteredEvents();
  }, []);

  // Fetch all available events
  const fetchEvents = async () => {
    try {
      const userId = sessionStorage.getItem('userID');
      if (!userId) {
        setMessage('User ID not found');
        return;
      }

      const response = await fetch(`http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/fetch_unregistered_events.php?user_id=${userId}`);
      const data = await response.json();
      if (data.success) {
        setEvents(data.unregisteredEvents); // Assuming your PHP script sends unregistered events
      } else {
        setMessage('Failed to fetch events.');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setMessage('Error fetching events.');
    }
  };

  // Fetch events that the user has already registered for
  const fetchRegisteredEvents = async () => {
    const userId = sessionStorage.getItem('userID');
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/fetch_user_registered_events.php?user_id=${userId}`);
      const data = await response.json();
      if (data.success) {
        const registeredEventIds = data.registeredEvents.map((event) => event.event_id);
        setRegisteredEvents(registeredEventIds);
      }
    } catch (error) {
      console.error('Error fetching registered events:', error);
    }
  };

  // Register the user for an event
  const handleRegisterEvent = async (eventId) => {
    const userId = sessionStorage.getItem("userID");
    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/register_event.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, event_id: eventId }),
      });
      const result = await response.json();
      if (result.success) {
        setRegisteredEvents([...registeredEvents, eventId]);
        setEvents(events.filter((event) => event.event_id !== eventId)); // Remove the event from the available list
        setMessage('Successfully registered for the event.');
      } else {
        setMessage(result.message || "Failed to register for the event.");
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('Failed to register for the event. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Available Events</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Location</th>
            <th>Organiser</th>
            <th>Max Participants</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.event_id}>
              <td>{event.title}</td>
              <td>{event.description}</td>
              <td>{event.start_date}</td>
              <td>{event.end_date}</td>
              <td>{event.location}</td>
              <td>{event.organiser}</td>
              <td>{event.max_participants}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleRegisterEvent(event.event_id)}
                >
                  Register
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvents;