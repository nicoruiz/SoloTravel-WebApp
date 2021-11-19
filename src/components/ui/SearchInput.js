import { Grid, TextField } from "@mui/material";

export default function SearchInput(props) {
  return (
    <Grid sx={{ display: "flex", justifyContent: "center", pt: 5, pb: 5, pl: 2 }}>
      <TextField
        id="search-trip-input"
        fullWidth
        label="Buscá un viaje"
        type="search"
        variant="standard"
        onChange={props.handleOnChange}
      />
    </Grid>
  );
}
