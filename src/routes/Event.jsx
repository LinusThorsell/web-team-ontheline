import styled from "styled-components";
import EventCard from "../components/EventCard";
import { useState, useEffect } from "react";

import { getEvents } from "../firebase";

const EventCardContainer = styled.ul`
  margin: 0;
  padding: 0;

  display: flex;
  flex-wrap: wrap;

  align-content: center;
  justify-content: center;

  background-color: #301934;

  list-style: none;
`;

function Event() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data);
    });
  }, []);

  return (
    <EventCardContainer>
      {events.map((event) => (
        <EventCard
          event={event.event}
          course={event.course}
          sponsor={event.sponsor}
          date={event.date}
          signup_url={event.signup_url}
          key={event.signup_url}
        />
      ))}
    </EventCardContainer>
  );
}

export default Event;
