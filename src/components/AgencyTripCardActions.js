import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useHistory } from "react-router";
import ConfirmationDialog from "./ui/ConfirmationDialog";
// Services
import * as tripsService from "./../services/tripsService";
import { useSnackbar } from "notistack";
// Context
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";

function AgencyTripCardActions({ tripId, tripName, onTripDelete }) {
  const { session } = useContext(SessionContext);
  const [isOpened, setOpened] = useState(false);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const editTrip = () => {
    history.push(`/editTrip/${tripId}`);
  };

  const openConfirmationDialog = () => setOpened(true);
  const closeConfirmationDialog = () => setOpened(false);

  const onDeleteConfirm = async () => {
    try {
      await tripsService.deleteTrip(session, tripId);      
      enqueueSnackbar("Viaje eliminado de su lista");
      onTripDelete(tripId);
    } catch (err) {
      enqueueSnackbar(err, { variant: "error", });
    }
  };

  return (
    <>
      <IconButton aria-label="edit" variant="contained" onClick={editTrip}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" variant="contained" onClick={openConfirmationDialog}>
        <DeleteIcon />
      </IconButton>
      
      <ConfirmationDialog 
        title="Eliminar viaje"
        message={`¿Está seguro que desea eliminar el viaje '${tripName}'?`}
        isOpened={isOpened}
        onConfirm={onDeleteConfirm}
        onClose={closeConfirmationDialog}
      />
    </>
  );
}

export default AgencyTripCardActions;
