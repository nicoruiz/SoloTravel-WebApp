import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TripCard from "../components/TripCard";
import { Container, Typography } from "@mui/material";
// Services
import * as tripsService from "./../services/tripsService";

function AllTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTrips = async () => {
    try {
      setLoading(true);

      const data = await tripsService.getTrips();
      console.log(data);
      setTrips(data.trips);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  // Initial render
  useEffect(() => {
    getTrips();
  }, []);

  return (
    <>
      {loading ?
        <p>Loading..</p>
        :
        <div>
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
            <Grid container spacing={4}>
              {trips.map((trip) => (
                <Grid item key={trip.id} xs={12} sm={6} md={4}>
                  <TripCard
                    name={trip.name}
                    description={trip.description}
                    image={trip.image}
                    destination={trip.destination}
                    price={trip.price}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      }
    </>
  );
}

export default AllTrips;
