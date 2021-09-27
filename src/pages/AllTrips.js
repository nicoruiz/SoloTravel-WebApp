import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Container, Grid, Typography } from "@mui/material";
import * as tripsService from "./../services/tripsService";
import Spinner from "../components/ui/Spinner";
import TripList from "../components/TripList";
import SearchInput from "../components/ui/SearchInput";
import { useSnackbar } from "notistack";
import { PrimaryButton } from "../components/ui/Buttons";
import { Search } from "@mui/icons-material";

const guestUser = 1;

function AllTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  // Initial render
  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = async (searchValue = "") => {
    try {
      setLoading(true);

      const data = await tripsService.getTrips(guestUser, searchValue);
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
          >
            Viajes disponibles
          </Typography>
        </Container>
      </Box>
      <Container sx={{ pb: 20 }}>
        {/* TODO: Create SearchComponent with all inner components needed */}
        <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={7} md={9}>
            <SearchInput handleOnChange={handleOnSearchInputChange} />
          </Grid>
          <Grid item xs={5} md={3} >
            <PrimaryButton
              variant="contained"
              startIcon={<Search />}
              onClick={handleOnSearchBtnClick}
            >
              Buscar
            </PrimaryButton>
          </Grid>
        </Grid>
        {loading && <Spinner />}
        <TripList trips={trips} onFavoriteRemove={() => {}} />
      </Container>
    </>
  );
}

export default AllTrips;
