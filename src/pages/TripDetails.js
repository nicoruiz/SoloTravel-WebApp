import { useState, useEffect } from "react";
import { Box, height, width } from "@mui/system";
import { Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import * as tripsService from "./../services/tripsService";
import Spinner from "../components/ui/Spinner";
import { IMAGES_BUCKET_URL } from "./../config";

function TripDetails() {
  const [loading, setLoading] = useState(true);
  const [tripDetails, setTripDetails] = useState();
  const { id } = useParams();

  useEffect(() => {
    getTripDetails();
  }, []);

  const getTripDetails = async () => {
    try {
      const result = await tripsService.getTripDetails(id);
      setTripDetails(result);
      console.log(result);
    }
    catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <Container sx={{ mt: 7, pb: 5 }} maxWidth="lg">
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
            Detalles del viaje
          </Typography>
        </Grid>
        <Box
          sx={{
            my: 4,
            mx: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {loading ? <Spinner /> : 
          <>
            <span>Agency Id: { tripDetails.agencyId }</span>
            <span>Agency Name: { tripDetails.agencyName }</span>
            <span>Id: { tripDetails.tripId }</span>
            <span>Name: { tripDetails.name }</span>
            <span>Destination: { tripDetails.destination }</span>
            <img src={`${IMAGES_BUCKET_URL}${tripDetails.image}`} />
            <span>Description: { tripDetails.description }</span>
            <span>Price: { tripDetails.price }</span>
            <span>Start date: { tripDetails.startDate }</span>
            <span>End date: { tripDetails.endDate }</span>
            <span>Category: { tripDetails.category }</span>
          </>}
        </Box>
      </Grid>
    </Container>
  );
}

export default TripDetails;