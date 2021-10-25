import { useState, useContext, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { SessionContext } from "../store/SessionContext";
import * as tripsService from "./../services/tripsService";
import { useHistory } from "react-router-dom";
import TripForm from "../components/TripForm";
import { useParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";

function EditTrip() {
  const { session } = useContext(SessionContext);
  const { id } = useParams();
  const [trip, setTrip] = useState();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const history = useHistory();

  useEffect(() => {
    console.log("Trip id: ", id);
    getTripData();
  }, []);

  const getTripData = async () => {
    try {
      setLoading(true);

      const tripData = await tripsService.getTripById(session, id);
      setTrip(tripData);
      setStartDate(trip.startDate);
      setEndDate(trip.endDate);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const onStartDateChange = (newValue) => {
    setStartDate(newValue);
  };
  const onEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const createTripDto = {
        name: data.get("name"),
        destination: data.get("destination"),
        image: data.get("image"),
        description: data.get("description"),
        price: data.get("price"),
        startDate: startDate,
        endDate: endDate,
      };
      console.log("Form submitted: ", createTripDto);

      await tripsService.createTrip(session, createTripDto);
      history.push("/agencyTrips");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container sx={{ mt: 7, pb: 5 }} maxWidth="md">
      <Grid
        sx={{
          p: 2,
          pt: 5,
          backgroundColor: "white",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        }}
      >
        <Grid>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
          >
            Modificar viaje
          </Typography>
        </Grid>
        {loading ? (
          <Spinner />
        ) : (
          <TripForm
            trip={trip}
            startDate={startDate}
            onStartDateChange={onStartDateChange}
            endDate={endDate}
            onEndDateChange={onEndDateChange}
            handleSubmit={handleSubmit}
          />
        )}
      </Grid>
    </Container>
  );
}

export default EditTrip;
