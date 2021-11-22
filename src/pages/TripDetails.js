import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Alert, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import * as tripsService from "./../services/tripsService";
import Spinner from "../components/ui/Spinner";
import { IMAGES_BUCKET_URL } from "./../config";
import { makeStyles } from "@mui/styles";
import { AirplaneTicket, AttachMoney, CardTravel, DateRange, LocationOn } from "@mui/icons-material";
import { BackButton, LoginButton } from "../components/ui/Buttons";
import { useHistory } from "react-router";
import { formatToMoney } from "../helpers/number";

const useStyles = makeStyles({
  image: {
    height: "90%",
    width: "90%",
    objectFit: "cover",
  }
});

function TripDetails() {
  const [loading, setLoading] = useState(true);
  const [tripDetails, setTripDetails] = useState({});
  const { id } = useParams();
  const styles = useStyles();
  const history = useHistory();

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

  const goBack = () => {
    history.goBack();
  }

  const reservar = () => {
    // Chequear si esta logueado
    alert(`Click reserva de viaje: ${tripDetails.name}`);
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
        {loading ? <Spinner /> :
          <>
            <Typography
              variant="h4"
              align="center"
              color="text.primary"
            >
              {tripDetails.name}
            </Typography>
            <Box
              sx={{
                my: 3,
                mx: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Destino */}
              <Typography
                sx={{ pt: 2, display: "flex", alignItems: "center" }}
                variant="h6"
                color="GrayText"
                marginBottom="1.5rem"
              >
                <LocationOn sx={{ pr: 0.5 }} />
                {tripDetails.destination}
              </Typography>

              {/* Fechas */}
              <Typography
                variant="h5"
                color="text.primary"
                gutterBottom="true"
              >
                Fechas
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                variant="h6"
                color="GrayText"
                marginBottom="2rem"
              >
                <DateRange sx={{ pr: 0.5 }} />
                Desde el {new Date(tripDetails.startDate).toLocaleDateString()} al {new Date(tripDetails.endDate).toLocaleDateString()}
              </Typography>

              {/* Image */}
              <img className={styles.image} src={`${IMAGES_BUCKET_URL}${tripDetails.image}`} alt={tripDetails.name} />

              {/* Descripcion */}
              <Typography
                variant="h6"
                color="text.primary"
                padding="3rem"
              >
                {tripDetails.description}
              </Typography>

              {/* Agencia */}
              <Typography
                variant="h5"
                color="text.primary"
                gutterBottom="true"
              >
                Agencia que lo ofrece
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                variant="h6"
                color="GrayText"
                marginBottom="1.5rem"
              >
                <CardTravel sx={{ pr: 0.5 }} />
                {tripDetails.agencyName}
              </Typography>

              {/* Lugares */}
              <Typography
                variant="h5"
                color="text.primary"
                gutterBottom="true"
              >
                Lugares disponibles
              </Typography>
              <Box sx={{ mb: "1.5rem" }}>
                {tripDetails.availableSlots > 0
                  ? <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    variant="h6"
                    color="GrayText"
                    >
                      <AirplaneTicket sx={{ pr: 0.5 }} />
                      {tripDetails.availableSlots}
                    </Typography>
                  : <Alert severity="error">En este momento no hay disponibilidad para este viaje.</Alert>}
              </Box>

              {/* Precio final */}
              <Typography
                variant="h5"
                color="text.primary"
                gutterBottom="true"
              >
                Precio final
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                variant="h4"
              >
                <AttachMoney fontSize="small" />
                {formatToMoney(tripDetails.price)}
              </Typography>
            </Box>
          </>}
        <Box sx={{ mx: 10, mb: 3 }}>
          <BackButton
            onClick={goBack}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}>
            Volver
          </BackButton>
          <LoginButton
            disabled={tripDetails.availableSlots === 0}
            onClick={reservar}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reservar
          </LoginButton>
        </Box>
      </Grid>
    </Container>
  );
}

export default TripDetails;