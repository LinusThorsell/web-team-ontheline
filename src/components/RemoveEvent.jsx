import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { removeEvent, getEvents } from "../firebase";

function DisplayEventCard(props) {
  function handleRemoveEvent() {
    removeEvent(props.event);
  }

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: "0.25em",
          paddingLeft: "0.5em",
          margin: "0.25em",
          border: "1px solid white",
          justifyContent: "space-between",
        }}
      >
        <p>
          {props.event.event +
            " Event: " +
            props.event.course +
            " Date: " +
            props.event.date}
        </p>
        <Button onClick={handleRemoveEvent} color="secondary">
          Remove
        </Button>
      </Card>
    </>
  );
}

export default function RemoveEvent(props) {
  const [events, setEvents] = useState([]);

  function fetchEvents() {
    getEvents().then((data) => {
      setEvents(data);
    });
  }

  if (events.length == 0) {
    return (
      <Card sx={{ margin: "0.5em" }}>
        <CardContent>
          <h1>Remove Events</h1>
          <Button onClick={fetchEvents} color="secondary">
            Load Events
          </Button>
        </CardContent>
      </Card>
    );
  }

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
    <Card sx={{ margin: "0.5em" }}>
      <CardContent sx={{ display: "flex", flexWrap: "wrap" }}>
        <h1>Remove Event</h1>
      </CardContent>
      <CardContent sx={{ display: "flex", flexWrap: "wrap" }}>
        {sorted_events.map((event) => {
          return (
            <DisplayEventCard
              event={event}
              key={"RemoveEvent" + event.signup_url}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
