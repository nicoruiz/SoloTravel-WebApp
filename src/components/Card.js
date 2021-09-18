import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import classes from "./Card.module.css";

function TripCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="brc"
        height="140"
        image="https://media.staticontent.com/media/pictures/0a834808-256d-4047-8437-3dc3145fa761/1120x700?op=TRUNCATE&enlarge=false&gravity=sm&quality=80&dpr=1"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Una escapada de aventura en San Carlos de Bariloche
        </Typography>
        <Typography className={classes.description} variant="body2" color="text.secondary">
          Encontrá en San Carlos de Bariloche una invitación a vivir una
          experiencia llena de adrenalina en un lugar maravilloso.Sus paisajes y
          recorridos hacia sus rincones mágicos, no van a dejar de sorprenderte.
          ¡Una dosis de adrenalina es todo lo que necesitás!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver detalles</Button>
        <Button size="small">Marcar favorito</Button>
      </CardActions>
    </Card>
  );
}

export default TripCard;
