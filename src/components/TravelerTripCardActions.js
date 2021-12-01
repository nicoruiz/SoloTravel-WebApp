import * as React from "react";
import { Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";
// Styled components
import { PrimaryButton } from "./ui/Buttons";
import { makeStyles } from "@mui/styles";
import ConfirmationDialog from "./ui/ConfirmationDialog";
// Services
import * as travelerService from "./../services/travelersService";
import { useSnackbar } from "notistack";
// Context
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";
import { useHistory } from "react-router";

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
  const [isOpened, setOpened] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const styles = useStyles();

  const openConfirmationDialog = () => setOpened(true);
  const closeConfirmationDialog = () => setOpened(false);
  const history = useHistory();

  const handleToggleFavoriteStatus = async () => {
    if (session.isAuthenticated){
      if (!isFavorite) {
        await handleSetFavorite();
      } else {
        await handleRemoveFavorite();
      }
    }else{
      openConfirmationDialog()
    }
  };

  const handleSetFavorite = async () => {
    const message = "Viaje agregado a tus favoritos!";
    try {
      await travelerService.addFavorite(session, props.tripId);
      setFavorite(true);
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      showError(err.message);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      await travelerService.removeFavorite(session, props.tripId);
      setFavorite(false);
      enqueueSnackbar("Viaje eliminado de tus favoritos");
      props.onFavoriteRemove(props.tripId);
    } catch (err) {
      showError(err.message);
    }
  };

  const showError = (message) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  const onLogConfirm = () => {
    history.push(`/login`);
  }
  
  return (
    <>
      <PrimaryButton variant="contained" onClick={props.handleTripDetails}>
        Ver detalle
      </PrimaryButton>
        <IconButton
          aria-label="favorite"
          className={
            isFavorite ? styles.favoriteBtn : styles.notFavoriteBtn
          }
          onClick={handleToggleFavoriteStatus}
        >
          <Favorite fontSize="inherit" />
        </IconButton>

        <ConfirmationDialog
        title="Para realizar dicha accion se necesita estar logeado"
        message="desea logearse?"
        isOpened={isOpened}
        onConfirm={onLogConfirm}
        onClose={closeConfirmationDialog}
        />
    </>
  );
}

export default TravelerTripCardActions;
