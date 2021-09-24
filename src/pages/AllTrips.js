import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import * as tripsService from "./../services/tripsService";
import Spinner from "../components/ui/Spinner";
import TripList from "../components/TripList";
import CustomSnackbar from "../components/ui/Snackbar";
import SearchInput from "../components/ui/SearchInput";

const guestUser = 1;

function AllTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    setErrorMsg(message);
    setError(true);
  }

  const handleOnSearch = (event) => {
    const searchValue = event.target.value;
    getTrips(searchValue);
  }

  return (
    <>      
      {error && <CustomSnackbar message={errorMsg} isError={true} /> }
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
        <SearchInput onSearch={handleOnSearch} />
        {loading ? <Spinner /> : <TripList trips={trips} onFavoriteRemove={() => {}} />}
      </Container>
    </>
  );
}

export default AllTrips;
