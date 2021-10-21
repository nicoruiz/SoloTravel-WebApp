import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Container, Grid, Typography } from "@mui/material";
import * as usersService from "./../services/usersService";
import Spinner from "../components/ui/Spinner";
import TripList from "../components/TripList";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";

function AgencyTrips() {
  const { session } = useContext(SessionContext);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Initial render
  useEffect(() => {
    const getAgencyTrips = async () => {
      try {
        setLoading(true);
        const data = await usersService.getAgencyTrips(session);
        setTrips(data.trips);
      } catch (err) {
        showError(err.message);
      }
      setLoading(false);
    };
    // Call fetch function
    getAgencyTrips();
  }, []);

  const showError = (message) => {
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

  return (
    <>
      <Box sx={{ pt: 8 }}>
        <Container maxWidth="sm" sx={{ p: 5 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
          >
            Mis Viajes
          </Typography>
          <Typography
            component="h4"
            variant="h5"
            align="center"
            color="text.primary"
          >
            {session.profileInfo.name}
          </Typography>
        </Container>
      </Box>
      <Container sx={{ pb: 20 }}>
        {loading && <Spinner />}
        <TripList trips={trips} onFavoriteRemove={() => {}} />
      </Container>
    </>
  );
}

export default AgencyTrips;
