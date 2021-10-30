import * as React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useHistory } from "react-router";
// Services
import * as tripsService from "./../services/tripsService";
import { useSnackbar } from "notistack";
// Context
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";
import { DialogContext } from "../store/DialogContext";

function AgencyTripCardActions(props) {
  const { session } = useContext(SessionContext);
  const { setShowDialog, setOnConfirmFn } = useContext(DialogContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const editTrip = () => {
    history.push(`/editTrip/${props.tripId}`);
  };

  const showConfirmationDialog = () => {    
    setShowDialog(true);
    setOnConfirmFn(() => onDeleteConfirm);
  }

  const onDeleteConfirm = async () => {
    console.log("Delete trip: ", props.tripId);
    try {
      await tripsService.deleteTrip(session, props.tripId);      
      enqueueSnackbar("Viaje eliminado de su lista");
      props.onTripDelete(props.tripId);
    } catch (err) {
      enqueueSnackbar(err, { variant: "error", });
    }
  };

  return (
    <>
      <IconButton aria-label="edit" variant="contained" onClick={editTrip}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" variant="contained" onClick={showConfirmationDialog}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}

export default AgencyTripCardActions;
