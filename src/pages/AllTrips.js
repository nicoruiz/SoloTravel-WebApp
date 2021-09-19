import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TripCard from "../components/TripCard";
import { Container, Typography } from "@mui/material";

function AllTrips() {
  const cardTitle = "Una escapada de aventura en San Carlos de Bariloche";
  const cardDescription =
    "Encontrá en San Carlos de Bariloche una invitación a vivir una experiencia llena de adrenalina en un lugar maravilloso.Sus paisajes y recorridos hacia sus rincones mágicos, no van a dejar de sorprenderte. ¡Una dosis de adrenalina es todo lo que necesitás!";
  const cardImage =
    "https://media.staticontent.com/media/pictures/0a834808-256d-4047-8437-3dc3145fa761/1120x700?op=TRUNCATE&enlarge=false&gravity=sm&quality=80&dpr=1";
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
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
      <Container>
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <TripCard
                title={cardTitle}
                description={cardDescription}
                image={cardImage}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default AllTrips;
