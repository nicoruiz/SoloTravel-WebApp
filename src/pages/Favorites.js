import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TripCard from "../components/TripCard";
import { Container, Typography } from "@mui/material";

function Favorites() {
  const favorites = [];
  const hasFavorites = favorites.length > 0;

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
            Favoritos
          </Typography>
        </Container>
      </Box>
      <Container>
        {!hasFavorites && <p>Aún no tienes favoritos..</p>}
        <Grid container spacing={4}>
          {favorites.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              {/* <TripCard
                title={cardTitle}
                description={cardDescription}
                image={cardImage}
              /> */}
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Favorites;
