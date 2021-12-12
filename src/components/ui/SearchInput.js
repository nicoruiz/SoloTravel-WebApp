import { Grid, TextField } from "@mui/material";

export default function SearchInput(props) {
  return (
    <Grid sx={{ display: "flex", justifyContent: "center" }}>
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
