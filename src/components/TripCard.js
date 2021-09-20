import * as React from 'react';
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import classes from "./TripCard.module.css";
import { Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  detailBtn: {
    background: "#189AB4",
    '&:hover': {
      background: "#05445E",
    }
  },
  favoriteBtn: {
    color: "red",
  },
  notFavoriteBtn: {
    color: "lightgrey",
    '&:hover': {
      color: "red",
    }
  },
});

function TripCard(props) {
  const [isFavorite, setFavorite] = useState(false);
  const styles = useStyles();

  function toggleFavoriteStatusHandler() {
    // TODO: Call API and set this trip as a favorite
    setFavorite(!isFavorite);
  }

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        alt={props.title}
        height="140"
        image={props.image}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography
          className={classes.description}
          variant="body2"
          color="text.secondary"
        >
          {props.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button className={styles.detailBtn} size="small" variant="contained">
          Ver viaje
        </Button>
        <IconButton
          aria-label="favorite"
          size="large"
          className={isFavorite ? styles.favoriteBtn : styles.notFavoriteBtn}
          onClick={toggleFavoriteStatusHandler}
        >
          <Favorite fontSize="inherit" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default TripCard;
