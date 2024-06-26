import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function TDCard(props) {
  return (
    <Card
      sx={{
        minWidth: "20em",
        width: "23em",
        maxWidth: "30%",
        margin: "1em",
      }}
    >
      <CardHeader title={props.name} subheader={props.tags} />
      <CardMedia
        component="img"
        height="280"
        image={props.mainimage}
        alt={"Picture of: " + props.name}
      />
      <CardContent style={{paddingBottom: 0}}>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TDCard;
