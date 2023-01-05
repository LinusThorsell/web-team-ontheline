import styled from "styled-components";

const NextEventContainer = styled.div`
  padding: 0;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  margin: 0;

  height: fit-content;
  width: 100vw;

  color: white;
  background-image: linear-gradient(to right, black, purple);

  display: flex;
  align-items: center;
  justify-content: center;
`;
const NextEventTitle = styled.h2`
  margin: 0;
  padding: 0;

  color: white;

  text-align: center;
  font-size: 1em;
`;

function NextEvent(props) {
  return (
    <NextEventContainer>
      <NextEventTitle>
        Nästa Event: {props.name} {props.date}
      </NextEventTitle>
    </NextEventContainer>
  );
}

export default NextEvent;
