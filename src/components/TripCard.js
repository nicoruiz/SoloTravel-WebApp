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
import CustomSnackbar from "../components/ui/Snackbar";
// Styled components
import { PrimaryButton } from "./ui/Buttons";
// Services
import * as usersService from "./../services/usersService";

const guestUser = 1;

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
  const [isFavorite, setFavorite] = useState(props.isFavorite);
  const [isRaised, setRaised] = useState(false);
  const [showAddSnackbar, setShowAddSnackbar] = useState(false);
  const [showRemoveSnackbar, setShowRemoveSnackbar] = useState(false);
  const styles = useStyles();

  async function handleToggleFavoriteStatus() {
    if (!isFavorite) {
      await usersService.addFavorite(guestUser, props.id);
      setFavorite(true);
      setShowAddSnackbar(true);
    }
    else {
      await usersService.removeFavorite(guestUser, props.id);
      setFavorite(false);
      setShowRemoveSnackbar(true);
      props.onFavoriteRemove(props.id);
    }
  }

  function handleToggleRaised() {
    setRaised(!isRaised);
  }

  function handleTripDetails() {
    console.log(`Trip: ${props.title}`);
  }

  return (
    <>      
      {showAddSnackbar && <CustomSnackbar message={"Viaje agregado a favoritos!"} isError={false} /> }
      {showRemoveSnackbar && <CustomSnackbar message={"Viaje eliminado de favoritos"} isError={true} /> }
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
          <PrimaryButton
            className={styles.detailBtn}
            variant="contained"
            onClick={handleTripDetails}
          >
            Ver detalle
          </PrimaryButton>
          <IconButton
            aria-label="favorite"
            size="large"
            className={isFavorite ? styles.favoriteBtn : styles.notFavoriteBtn}
            onClick={handleToggleFavoriteStatus}
          >
            <Favorite fontSize="inherit" />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

export default TripCard;
