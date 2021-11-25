import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Container, Grid, Typography } from "@mui/material";
import * as tripsService from "./../services/tripsService";
import Spinner from "../components/ui/Spinner";
import TripList from "../components/TripList";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";
import SearchTripComponent from "../components/SearchTripComponent";
import { NoResults, Searching } from "../components/ui/SvgIcons";

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
        <SearchTripComponent 
          handleOnSearchInputChange={handleOnSearchInputChange} 
          searchDate={searchDate}
          handleOnSearchDateChange={handleOnSearchDateChange} 
          handleOnSearchBtnClick={handleOnSearchBtnClick}
        />
        {loading
          ? <div><Searching /> <Spinner /></div>
          : <TripList trips={trips} onFavoriteRemove={() => { }} />
        }
        {trips.length === 0 && 
          <Grid sx={{ m: 3, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <NoResults />
            <Typography
                variant="h5"
                color="text.primary"
                marginTop={3}
              >
                Sin resultados para su búsqueda
              </Typography>
          </Grid>}
      </Container>
    </>
  );
}

export default AllTrips;
