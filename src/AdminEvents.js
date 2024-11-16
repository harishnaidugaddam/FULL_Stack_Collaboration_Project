import React, { useState, useEffect } from 'react';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    organiser: '',
    maxParticipants: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/AddEvent.php?action=fetch');
      const data = await response.json();
      if (data.success) {
        setEvents(data.events);
      } else {
        setError(data.message || 'No events found.');
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setError('Failed to fetch events. Please try again.');
    }
  };

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = async () => {
    setError('');
    if (newEvent.name && newEvent.description && newEvent.startDate && newEvent.endDate && newEvent.location && newEvent.organiser && newEvent.maxParticipants) {
      try {
        const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/AddEvent.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEvent),
        });

        const result = await response.json();

        if (response.ok && result.message === "Event added successfully") {
          fetchEvents(); // Refresh the events list after adding
          setNewEvent({ name: '', description: '', startDate: '', endDate: '', location: '', organiser: '', maxParticipants: '' });
          setEditMode(false);
        } else {
          console.error(result.message || "Failed to add event.");
          setError(result.message || "Failed to add event.");
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        setError('Failed to connect to the server. Please try again later.');
      }
    } else {
      setError('All fields are required.');
    }
  };

  const handleEditEvent = (id) => {
    const event = events.find((event) => event.id === id);
    if (event) {
      setNewEvent({
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        location: event.location,
        organiser: event.organiser,
        maxParticipants: event.maxParticipants,
      });
      setEditMode(true);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/AddEvent.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id: id }),
      });

      const result = await response.json();

      if (result.success) {
        setEvents(events.filter((event) => event.id !== id)); // Update events list in frontend
      } else {
        console.error(result.message || "Failed to delete event.");
        setError(result.message || "Failed to delete event.");
      }
    } catch (error) {
      console.error('Error during delete:', error);
      setError('Failed to delete event. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upcoming Events</h2>
      {error && <div className="alert alert-danger">{error}</div>}

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{event.startDate}</td>
              <td>{event.endDate}</td>
              <td>{event.location}</td>
              <td>{event.organiser}</td>
              <td>{event.maxParticipants}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditEvent(event.id)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <h4>{editMode ? 'Update Event' : 'Add New Event'}</h4>
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" name="name" value={newEvent.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea name="description" value={newEvent.description} onChange={handleChange} className="form-control"></textarea>
        </div>
        <div className="mb-3">
          <label>Start Date:</label>
          <input type="date" name="startDate" value={newEvent.startDate} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>End Date:</label>
          <input type="date" name="endDate" value={newEvent.endDate} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Location:</label>
          <input type="text" name="location" value={newEvent.location} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Organiser:</label>
          <input type="text" name="organiser" value={newEvent.organiser} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Max Participants:</label>
          <input type="number" name="maxParticipants" value={newEvent.maxParticipants} onChange={handleChange} className="form-control" />
        </div>
        <button className="btn btn-primary" onClick={handleAddEvent}>{editMode ? 'Update Event' : 'Add Event'}</button>
      </div>
    </div>
  );
};

export default ManageEvents;