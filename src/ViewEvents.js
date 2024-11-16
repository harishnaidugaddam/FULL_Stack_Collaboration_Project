// src/components/researcher/ViewEvents.js
import React from 'react';

const ViewEvents = () => {
  // Sample data; replace with real data from your API
  const events = [
    { name: 'AI Conference 2024', date: '2024-11-10', location: 'New York' },
    { name: 'Healthcare Symposium', date: '2024-12-15', location: 'Los Angeles' },
  ];

  return (
    <div className="container mt-5">
      <h2>View Registered Events</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEvents;
