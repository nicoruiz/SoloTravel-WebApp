import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import * as tripsService from "./../services/tripsService";
import Spinner from "../components/ui/Spinner";
import TripList from "../components/TripList";
import CustomSnackbar from "../components/ui/Snackbar";

function AllTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Initial render
  useEffect(() => {
    const getTrips = async () => {
      try {
        setLoading(true);
  
        const data = await tripsService.getTrips();
        setTrips(data.trips);
      } catch (err) {
        showError(err.message);
      }
      setLoading(false);
    };
    // Call fetch function
    getTrips();
  }, []);

  const showError = (message) => {
    setErrorMsg(message);
    setError(true);
  }

  return (
    <>      
      {error && <CustomSnackbar message={errorMsg} isError={true} /> }
      <Box sx={{ pt: 8, pb: 6 }}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Viajes disponibles
          </Typography>
        </Container>
      </Box>
      <Container sx={{ pb: 20 }}>
        {loading ? <Spinner /> : <TripList trips={trips} />}
      </Container>
    </>
  );
}

export default AllTrips;
