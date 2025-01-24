import React, { useState, useEffect } from 'react'; 
import './upcomingEvents.css';

export default function UpcomingEvents() {
  // State to store the events fetched from the API
  const [items, setEvents] = useState([]);
  const [error, setError] = useState(null); // State to handle errors

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token
    if (!token) {
      setError('Utilisateur non authentifié.');
      return;
    }

    fetch('https://gestion-parascolaire.vercel.app//api/evenements', {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in headers
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des événements.');
        }
        return response.json();
      })
      .then((data) => setEvents(data.evenementsAVenir || []))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="UpcomingEvents_container">
      {items.length > 0 ? (
        items.map((item) => (
          <div className="img-container" key={item.id}>
            <img 
              src={`${item.image}`} 
              alt={`Image ${item.id}`} 
            />
            <div className="description">{item.titre} - {item.date} <br /> {item.description}</div>
          </div>
        ))
      ) : (
        <p>Aucun événement à venir pour le moment.</p>
      )}
    </div>
  );
}