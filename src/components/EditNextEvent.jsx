import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { getTeam, submitNextEvent } from "../firebase";

export default function EditNextEvent() {
  const [nextEvent, setNextEvent] = useState({
    name: "",
    date: "",
    override_message: "",
    signup_url: "",
  });

  const handleChange = (event) => {
    setNextEvent({
      ...nextEvent,
      [event.target.name]: event.target.value,
    });
  };

  function handleSubmit() {
    submitNextEvent(nextEvent);
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <h1>Set Next Event</h1>
        <form>
          <label>
            Namn <br />
            <input
              type="text"
              name="name"
              value={nextEvent.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Date <br />
            <input
              type="text"
              name="date"
              value={nextEvent.date}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Signup URL <br />
            <input
              type="text"
              name="signup_url"
              value={nextEvent.signup_url}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Override NextEvent Bar with: <br /> (Leave empty to not override) <br />
            <input
              type="text"
              name="override_message"
              value={nextEvent.override_message}
              onChange={handleChange}
            />
          </label>
          <br />
        </form>
        <Button onClick={handleSubmit} color="secondary">
          Spara ändringar i databasen
        </Button>
      </CardContent>
    </Card>
  );
}
