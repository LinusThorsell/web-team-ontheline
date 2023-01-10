import styled from "styled-components";

const EventMapContainer = styled.div`
  margin: 0;
  padding: 0;

  width: 100%;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url("https://live.staticflickr.com/2338/1735257057_60f3748b97_b.jpg")
`;
const EventMapImage = styled.img`
  width: 100%;
  height: auto;

  @media (min-width: 50em) {
    width: 50em;
  }
  @media (min-width: 70em) {
    width: 65em;
  }
`;

function EventMap(props) {
  return (
    <EventMapContainer>
      <EventMapImage src={props.url} />
    </EventMapContainer>
  );
}

export default EventMap;
