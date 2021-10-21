import * as React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
// Styled components
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  favoriteBtn: {
    color: "red",
  },
  notFavoriteBtn: {
    color: "gray",
  },
});

function AgencyTripCardActions(props) {
  const styles = useStyles();

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
