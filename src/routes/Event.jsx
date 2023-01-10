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

  let sorted_events = events;
  sorted_events.sort(function (a, b) {
    let [day1, month1] = a.date.split(" ")[0].split("/");
    let [day2, month2] = b.date.split(" ")[0].split("/");
    let year1 = a.date.split(" ")[2];
    let year2 = b.date.split(" ")[2];

    if (year1 != year2) {
      return year1 - year2;
    } else if (month1 != month2) {
      return month1 - month2;
    } else {
      return day1 - day2;
    }
  });

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
