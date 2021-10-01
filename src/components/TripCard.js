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
// Services
import * as usersService from "./../services/usersService";
import { useSnackbar } from "notistack";
// Context
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";

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
  const { session } = useContext(SessionContext);
  const [isFavorite, setFavorite] = useState(props.isFavorite);
  const [isRaised, setRaised] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const styles = useStyles();

  const handleToggleFavoriteStatus = async () => {
    if (!isFavorite) {
      await handleSetFavorite();
    } else {
      await handleRemoveFavorite();
    }
  };

  const handleSetFavorite = async () => {
    const message = "Viaje agregado a tus favoritos!";
    try {
      await usersService.addFavorite(session.userId, props.id);
      setFavorite(true);
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      showError(err.message);
    }
  };

  const handleRemoveFavorite = async () => {
    const message = "Viaje eliminado de tus favoritos";
    try {
      await usersService.removeFavorite(session.userId, props.id);
      setFavorite(false);
      enqueueSnackbar(message, { variant: "warning" });

      setTimeout(() => {
        props.onFavoriteRemove(props.id);
      }, 300);
    } catch (err) {
      showError(err.message);
    }
  };

  const handleToggleRaised = () => {
    setRaised(!isRaised);
  };

  const handleTripDetails = () => {
    console.log(`Trip: ${props.name}`);
  };

  const showError = (message) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  return (
    <>
      <Card
        raised={isRaised}
        onMouseOver={handleToggleRaised}
        onMouseOut={handleToggleRaised}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardActionArea onClick={handleTripDetails}>
          <CardMedia
            component="img"
            alt={props.name}
            height="140"
            image={props.image}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography className={classes.title} gutterBottom variant="h5">
              {props.name}
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
              {props.destination}
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
          <PrimaryButton variant="contained" onClick={handleTripDetails}>
            Ver detalle
          </PrimaryButton>
          {session.isAuthenticated && (
            <IconButton
              aria-label="favorite"
              size="large"
              className={ isFavorite ? styles.favoriteBtn : styles.notFavoriteBtn }
              onClick={handleToggleFavoriteStatus}
            >
              <Favorite fontSize="inherit" />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </>
  );
}

export default TripCard;
