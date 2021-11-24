import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Container, Grid, TextField, Typography } from "@mui/material";
import * as tripsService from "./../services/tripsService";
import Spinner from "../components/ui/Spinner";
import TripList from "../components/TripList";
import SearchInput from "../components/ui/SearchInput";
import { useSnackbar } from "notistack";
import { PrimaryButton } from "../components/ui/Buttons";
import { Search } from "@mui/icons-material";
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';

function AllTrips() {
  const { session } = useContext(SessionContext);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState(new Date().toDateString());
  const { enqueueSnackbar } = useSnackbar();

  // Initial render
  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = async (searchValue = "") => {
    try {
      setLoading(true);

      const _searchDate = new Date(searchDate).toISOString();
      const data = await tripsService.getTrips(session, searchValue, _searchDate);
      setTrips(data.trips);
    } catch (err) {
      showError(err.message);
    }
    setLoading(false);
  };

  const showError = (message) => {
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

  const handleOnSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOnSearchDateChange = (date) => {
    setSearchDate(date);
  }

  const handleOnSearchBtnClick = () => {
    getTrips(searchTerm);
  };

  return (
    <>
      <Box sx={{ pt: 8 }}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            className="page-title"
          >
            Viajes disponibles
          </Typography>
        </Container>
      </Box>
      <Container sx={{ pb: 20 }}>
        {/* TODO: Create SearchComponent with all inner components needed */}
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
        {loading
          ? <Spinner />
          : <TripList trips={trips} onFavoriteRemove={() => { }} />
        }
      </Container>
    </>
  );
}

export default AllTrips;
