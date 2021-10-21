import * as React from "react";
import { Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";
// Styled components
import { PrimaryButton } from "./ui/Buttons";
import { makeStyles } from "@mui/styles";
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
    color: "gray",
  },
});

function TravelerTripCardActions(props) {
  const { session } = useContext(SessionContext);
  const [isFavorite, setFavorite] = React.useState(props.isFavorite);
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
      await usersService.addFavorite(session, props.tripId);
      setFavorite(true);
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      showError(err.message);
    }
  };

  const handleRemoveFavorite = async () => {
    const message = "Viaje eliminado de tus favoritos";
    try {
      await usersService.removeFavorite(session, props.tripId);
      setFavorite(false);
      enqueueSnackbar(message, { variant: "warning" });

      setTimeout(() => {
        props.onFavoriteRemove(props.tripId);
      }, 300);
    } catch (err) {
      showError(err.message);
    }
  };

  const showError = (message) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  return (
    <>
      <PrimaryButton variant="contained" onClick={props.handleTripDetails}>
        Ver detalle
      </PrimaryButton>
      {session.isAuthenticated && (
        <IconButton
          aria-label="favorite"
          className={
            isFavorite ? styles.favoriteBtn : styles.notFavoriteBtn
          }
          onClick={handleToggleFavoriteStatus}
        >
          <Favorite fontSize="inherit" />
        </IconButton>
      )}
    </>
  );
}

export default TravelerTripCardActions;
