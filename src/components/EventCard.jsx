import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function EventCard(props) {
  return (
    <Card sx={{ margin: "0.5em" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.event}
        </Typography>
        <Typography variant="h5" component="div">
          {props.course}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.date}
        </Typography>
        <Typography variant="body2">{props.sponsor}</Typography>
      </CardContent>
      <CardActions>
        <Button href={props.signup_url} target="_blank" color="secondary" size="small">
          Registrering
        </Button>
      </CardActions>
    </Card>
  );
}
