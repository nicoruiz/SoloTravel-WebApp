import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import classes from "./TripCard.module.css";
import { AttachMoney, Favorite, LocationOn } from "@mui/icons-material";
import { CardActionArea, Divider, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
// Styled components
import { PrimaryButton } from "./ui/Buttons";

const useStyles = makeStyles({
  favoriteBtn: {
    color: "red",
  },
  notFavoriteBtn: {
    "&:hover": {
      color: "red",
    },
  },
});

function TripCard(props) {
  const [isFavorite, setFavorite] = useState(false);
  const [isRaised, setRaised] = useState(false);
  const styles = useStyles();

  function toggleFavoriteStatusHandler() {
    // TODO: Call API and set this trip as a favorite
    setFavorite(!isFavorite);
  }

  function toggleRaised() {
    setRaised(!isRaised);
  }

  function tripDetailsHandler() {
    console.log(`Trip: ${props.title}`);
  }

  return (
    <Card
      raised={isRaised}
      onMouseOver={toggleRaised}
      onMouseOut={toggleRaised}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea onClick={tripDetailsHandler}>
        <CardMedia
          component="img"
          alt={props.title}
          height="140"
          image={props.image}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography className={classes.title} gutterBottom variant="h5">
            {props.title}
          </Typography>
          <Typography
            className={classes.description}
            variant="body2"
            color="text.secondary"
          >
            {props.description}
          </Typography>
          <Typography
            sx={{ pt: 2, display: "flex", alignItems: "center" }}
            variant="overline"
          >
            <LocationOn sx={{ pr: 0.5 }} fontSize="small" />
            {props.location}
          </Typography>
          <Typography
            sx={{ pt: 2, display: "flex", alignItems: "center" }}
            variant="h4"
          >
            <AttachMoney fontSize="small" />
            {props.price}
          </Typography>
        </CardContent>
        <Divider variant="middle" />
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <PrimaryButton
          className={styles.detailBtn}
          variant="contained"
          onClick={tripDetailsHandler}
        >
          Ver detalle
        </PrimaryButton>
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
