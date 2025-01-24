import React, { useState, useEffect } from 'react';
import './calendar.css';
import axios from 'axios';
// const ETUDIANT_ID = "6759fe066503e0f9636001ad";
const ETUDIANT_ID = "6759fe1c6503e0f9636001ae";

export default function EventParticipation() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [events, setEvents] = useState([]);
    const [participation, setParticipation] = useState({});
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [participatedInEvent, setParticipatedInEvent] = useState(false); 

    const fetchEvents = async () => {
        try {
            const response = await axios.get('https://gestion-parascolaire.vercel.app//api/events');
            console.log('Events:', response.data);
            
            const processedEvents = response.data.map(event => ({
                ...event,
                date: new Date(event.date), 
            }));
          
            setEvents(processedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const daysOfWeek = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
        setSelectedEvent(null);
        setParticipatedInEvent(false);
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
        setSelectedEvent(null);
        setParticipatedInEvent(false);
    };

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const daysInPrevMonth = getDaysInMonth(
        currentMonth === 0 ? 11 : currentMonth - 1,
        currentMonth === 0 ? currentYear - 1 : currentYear
    );

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    const dates = [];

    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        dates.push({
            day: daysInPrevMonth - i,
            currentMonth: false,
        });
    }

    
    for (let i = 1; i <= daysInMonth; i++) {
        const dateObj = new Date(currentYear, currentMonth, i);
        const event = events.find(
            (e) =>
                e.date.getDate() === i &&
                e.date.getMonth() === currentMonth &&
                e.date.getFullYear() === currentYear
        );
        dates.push({
            day: i,
            currentMonth: true,
            event: event || null,
        });
    }

    
    while (dates.length % 7 !== 0) {
        dates.push({
            day: dates.length - daysInMonth - firstDayOfMonth + 1,
            currentMonth: false,
        });
    }

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setParticipatedInEvent(event.participants.includes(ETUDIANT_ID));
    };

    const handleParticipationClick = (date) => {
        const dateKey = date.toDateString();
        setParticipation((prev) => ({
            ...prev,
            [dateKey]: !prev[dateKey],
        }));
    };

    const handleParticipation = async (eventId) => {
        const token = localStorage.getItem('token');
        
        try {
          const response = await fetch(`https://gestion-parascolaire.vercel.app//api/${eventId}/ajouter-participant`, {
            method: 'POST',
            headers: {
              
                Authorization: `Bearer ${token}`,
              },
         
          });
    
          const result = await response.json();
          if (response.ok) {
            console.log('Participant ajouté avec succès:', result);
            setParticipatedInEvent(true);
          } else {
            console.error('Erreur:', result.message);
          }
        } catch (error) {
          console.error('Erreur lors de la requête:', error);
        }
    };

    return (
        <div className="participation-body">
            <header>
                <h1>CALENDRIER</h1>
            </header>
            <main>
                <section id="calendrier">
                    <div className="calendar-header">
                        <button onClick={prevMonth}>&lt;</button>
                        <span>
                            {new Date(currentYear, currentMonth).toLocaleString('fr', { month: 'long' })}
                        </span>
                        <button onClick={nextMonth}>&gt;</button>
                    </div>
                    <div className="days">
                        {daysOfWeek.map((day) => (
                            <div key={day}>{day}</div>
                        ))}
                    </div>
                    <div className="dates">
                        {dates.map((dateObj, index) => {
                            const { day, currentMonth: isCurrentMonth, event } = dateObj;
                            const date = new Date(
                                currentYear,
                                isCurrentMonth ? currentMonth : currentMonth + (day > 15 ? -1 : 1),
                                day
                            );
                            const dateKey = date.toDateString();
                            const isParticipated = participation[dateKey];

                            return (
                                <div
                                    key={index}
                                    className={`${event ? 'event-day' : ''} ${isCurrentMonth ? '' : 'other-month'}`}
                                    onClick={() => {
                                        if (event) {
                                            
                                            handleEventClick(event);
                                            handleParticipationClick(date);
                                        }
                                    }}
                                >
                                    {day}
                                    {event && (
                                        <span
                                            className={`star ${isParticipated ? 'gray' : 'yellow'}`}
                                        ></span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {selectedEvent && (
                    <section id="details-evenement">
                        <div className="upper-section flex gap-12">
                            <img src={selectedEvent.image} alt="image de l'événement" />
                            <div className="event-info mt-16 ">
                                <h2 className='text-3xl text-cyan-300 font-bold'>{selectedEvent.titre}</h2>
                                <p className='text-lg' >{selectedEvent.date.toLocaleDateString("fr")}</p>
                                <p className='text-xl'>{selectedEvent.lieu}</p>
                            </div>
                        </div>
                        <p className="description text-white">{selectedEvent.description}</p>
                        <div className="button-wrapper">
                            <button disabled={participatedInEvent} onClick={() => handleParticipation(selectedEvent._id)}>
                                {participatedInEvent ? 'Participé' : 'Je participe'}
                            </button>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}