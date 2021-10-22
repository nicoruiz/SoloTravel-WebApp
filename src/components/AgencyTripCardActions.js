import * as React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

function AgencyTripCardActions(props) {

  const editTrip = () => {
    console.log("Edit trip: ", props.tripId);
  };

  const deleteTrip = () => {
    console.log("Delete trip: ", props.tripId);
  };

  return (
    <>
      <IconButton aria-label="edit" variant="contained" onClick={editTrip}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" variant="contained" onClick={deleteTrip}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}

export default AgencyTripCardActions;
