import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import { useHistory } from "react-router";
import ConfirmationDialog from "./ui/ConfirmationDialog";
import { PrimaryIconButton, RedIconButton } from "./ui/Buttons";
// Services
import * as travelAgencyService from "./../services/travelAgencyService";
import { useSnackbar } from "notistack";
// Context
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";

function AgencyTripCardActions({ tripId, tripName, onTripDelete, canEditOrDelete }) {
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
      await travelAgencyService.deleteTrip(session, tripId);
      enqueueSnackbar("Viaje eliminado de su lista");
      onTripDelete(tripId);
    } catch (err) {
      enqueueSnackbar(err, { variant: "error", });
    }
  };

  return (
    <>
      <Tooltip title="Modificar" placement="top">
        <PrimaryIconButton aria-label="edit" variant="contained" onClick={editTrip} disabled={!canEditOrDelete}>
          <EditIcon />
        </PrimaryIconButton>
      </Tooltip>
      <Tooltip title="Eliminar" placement="top">
        <RedIconButton aria-label="delete" variant="contained" onClick={openConfirmationDialog} disabled={!canEditOrDelete}>
          <DeleteIcon />
        </RedIconButton>
      </Tooltip>

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
