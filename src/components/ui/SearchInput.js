import { Grid, TextField } from "@mui/material";

export default function SearchInput(props) {
  return (
    <Grid sx={{ display: "flex", justifyContent: "center", p: 5 }}>
      <TextField
        id="filled-search"
        fullWidth
        label="Buscá un viaje"
        type="search"
        variant="standard"
        onChange={props.onSearch}
      />
    </Grid>
  );
}
