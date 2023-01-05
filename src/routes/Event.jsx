import styled from "styled-components";
import EventCard from "../components/EventCard";

const EventData = [
  {
    event: "Tour: OnTheLine 2023",
    course: "Hästhagen DGC",
    sponsor: "Sponsored by: MVP Disc Sports & RocketDiscs.com",
    date: "15/4 - 2023",
    signup_url: "tjing.se",
  },
  {
    event: "Tour: OnTheLine 2023",
    course: "Brickeberg DGC",
    sponsor: "Sponsored by: MVP Disc Sports & RocketDiscs.com",
    date: "16/4 - 2023",
    signup_url: "tjing.se",
  },
];

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
  return (
    <EventCardContainer>
      {EventData.map((event) => (
        <>
          <EventCard
            event={event.event}
            course={event.course}
            sponsor={event.sponsor}
            date={event.date}
            signup_url={event.signup_url}
          />
        </>
      ))}
    </EventCardContainer>
  );
}

export default Event;
