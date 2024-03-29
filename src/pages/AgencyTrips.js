import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Container, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as travelAgencyService from "./../services/travelAgencyService";
import Spinner from "../components/ui/Spinner";
import TripList from "../components/TripList";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";
import { FloatActionButton } from "../components/ui/Buttons";
import { useHistory } from "react-router-dom";
import { NoResults } from "../components/ui/SvgIcons";

function AgencyTrips() {
  const { session } = useContext(SessionContext);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  // Initial render
  useEffect(() => {
    getAgencyTrips();
  }, []);

  const getAgencyTrips = async () => {
    try {
      setLoading(true);
      const data = await travelAgencyService.getAgencyTrips(session);
      setTrips(data.trips);
    } catch (err) {
      showError(err.message);
    }
    setLoading(false);
  };

  const onTripDelete = (tripId) => {
    const tripsWithoutDeletedOne = trips.filter(t => t.id !== tripId);
    setTrips(tripsWithoutDeletedOne);
  }

  const showError = (message) => {
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

  return (
    <>
      <Box sx={{ pt: 8 }}>
        <Container maxWidth="sm" sx={{ pb: 5 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Mis viajes
          </Typography>
          <Typography
            component="h4"
            variant="h5"
            align="center"
            color="text.primary"
          >
            Bienvenido {session.profileInfo.name}
          </Typography>
        </Container>
      </Box>
      <Container sx={{ pb: 20 }}>
        {loading && <Spinner />}
        <TripList trips={trips} onTripDelete={onTripDelete} />
        {trips.length === 0 && !loading && 
          <Grid sx={{ m: 8, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <NoResults />
            <Typography
                sx={{ textAlign: "center"}}
                variant="h5"
                color="text.primary"
                marginTop={3}
              >
                Aún no tienes viajes creados
              </Typography>
          </Grid>}
      </Container>
      <FloatActionButton color="primary" aria-label="add" onClick={() => history.push("/createTrip")}>
        <AddIcon />
      </FloatActionButton>
    </>
  );
}

export default AgencyTrips;
