import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getTeam, editTeamMember } from "../firebase";
import TDCard from "./TDCard";

function EditTDCard(props) {
  console.log(props);
  const [td, setTD] = useState({
    description: "",
    inthebag: "",
    mainimage: "",
    name: "",
    profileimage: "",
    tags: "",
  });

  function loadCurrentData() {
    setTD(props.td.data);
  }

  const handleChange = (event) => {
    setTD({
      ...td,
      [event.target.name]: event.target.value,
    });
  };

  function handleSubmit() {
    editTeamMember(props.td.id, td);
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <h1>{props.td.id}</h1>
        <Button onClick={loadCurrentData}>Ladda in nuvarande kort</Button>
        <form>
          <label>
            Namn:
            <input
              type="text"
              name="name"
              value={td.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Beskrivning:
            <input
              type="text"
              name="description"
              value={td.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            In The Bag:
            <input
              type="text"
              name="inthebag"
              value={td.inthebag}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Large Image:
            <input
              type="text"
              name="mainimage"
              value={td.mainimage}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Tags:
            <input
              type="text"
              name="tags"
              value={td.tags}
              onChange={handleChange}
            />
          </label>
          <br />
        </form>
      <Button onClick={handleSubmit}>Spara ändringar i databasen</Button>
      </CardContent>
      <TDCard
        mainimage={td.mainimage}
        name={td.name}
        tags={td.tags}
        description={td.description}
        inthebag={td.inthebag}
        key={td.name}
      />
    </Card>
  );
}

export default function EditTeamCard() {
  const [team, setTeam] = useState([]);

  function loadTeam() {
    getTeam().then((data) => {
      setTeam(data);
    });
  }

  return (
    <Card sx={{ margin: "0.5em" }}>
      <CardContent>
        <h1>Edit Team</h1>
        <Button onClick={loadTeam}>Load Team</Button>

        {team.map((td) => (
          <EditTDCard td={td} key={td.id} />
        ))}
      </CardContent>
    </Card>
  );
}
