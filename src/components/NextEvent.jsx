import styled from "styled-components";
import { useEffect, useState } from "react";
import { getNextEvent } from "../firebase";

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

function NextEvent() {
  const [nextEvent, setNextEvent] = useState({
    name: "",
    date: "",
    signup_url: "",
    override_message: ".",
  });

  useEffect(() => {
    getNextEvent().then((data) => {
      setNextEvent(data);
    });
  }, []);

  if (nextEvent.override_message.length > 0) {
    return (
      <NextEventContainer>
        <NextEventTitle>
          {nextEvent.override_message}
        </NextEventTitle>
      </NextEventContainer>
    );
  }

  return (
    <NextEventContainer>
      <NextEventTitle>
        Nästa Event: {nextEvent.name} {nextEvent.date}{" "}
        <a
          style={{ color: "white" }}
          href={nextEvent.signup_url}
          target="_blank"
        >
          Registreringslänk
        </a>
      </NextEventTitle>
    </NextEventContainer>
  );
}

export default NextEvent;
