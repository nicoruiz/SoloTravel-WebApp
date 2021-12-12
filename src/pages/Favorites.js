import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Container, Grid, Typography } from "@mui/material";
import * as travelersService from "./../services/travelersService";
import TripList from "../components/TripList";
import Spinner from "../components/ui/Spinner";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";
import { NoFavorites } from "../components/ui/SvgIcons";

function Favorites() {
  const { session } = useContext(SessionContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Initial render
  useEffect(() => {
    const getFavorites = async () => {
      try {
        setLoading(true);
        const data = await travelersService.getFavorites(session);
        setFavorites(data.trips);
      } catch (err) {
        showError(err.message);
      }
      setLoading(false);
    };
    // Call fetch function
    getFavorites();
  }, []);

  const showError = (message) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  const handleFavoriteRemove = (tripId) => {
    const newFavorites = favorites.filter(f => f.id !== tripId);
    setFavorites(newFavorites);
  }

  return (
    <>
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
      <Container sx={{ pb: 20 }}>        
        {loading ? <Spinner /> :
          <>
            <TripList trips={favorites} onFavoriteRemove={handleFavoriteRemove} />
            {favorites.length === 0 && 
            <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <NoFavorites />
              <Typography
                  variant="h5"
                  color="text.primary"
                  marginTop={3}
                >
                  Aún no tienes favoritos..
                </Typography>
            </Grid>}
          </>
        }
      </Container>
    </>
  );
}

export default Favorites;
