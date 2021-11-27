import { Grid, TextField } from "@mui/material";
import SearchInput from "../components/ui/SearchInput";
import { PrimaryButton } from "../components/ui/Buttons";
import { Search } from "@mui/icons-material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';

function SearchTripComponent({ handleOnSearchInputChange, searchDate, handleOnSearchDateChange, handleOnSearchBtnClick }) {
    return (
        <Grid
          container
          sx={{
            padding: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            mb: 10,
            mt: 5,
            backgroundColor: "white",
            boxShadow: "rgba(24, 154, 180, 0.4) 5px 5px, rgba(24, 154, 180, 0.3) 10px 10px, rgba(24, 154, 180, 0.2) 15px 15px, rgba(24, 154, 180, 0.1) 20px 20px, rgba(24, 154, 180, 0.05) 25px 25px;",
          }}
        >
            <Grid item xs={12} md={5}>
                <SearchInput handleOnChange={handleOnSearchInputChange} />
            </Grid>
            <Grid item xs={5} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Fecha"
                        inputFormat="dd/MM/yyyy"
                        value={searchDate}
                        minDate={new Date()}
                        onChange={handleOnSearchDateChange}
                        renderInput={(params) => <TextField {...params} error={false} helperText={""} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={5} md={2}>
                <PrimaryButton
                    id="search-btn"
                    variant="contained"
                    startIcon={<Search />}
                    onClick={handleOnSearchBtnClick}
                >
                    Buscar
                </PrimaryButton>
            </Grid>
        </Grid>
    );
}

export default SearchTripComponent;