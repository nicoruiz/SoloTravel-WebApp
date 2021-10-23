import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Container, Grid, TextField, Typography } from "@mui/material";
import { LoginButton } from "../components/ui/Buttons";
// Dates
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

function CreateTrip(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const newTripDto = {
      name: data.get("name"),
      destination: data.get("destination"),
      image: data.get("image"),
      description: data.get("description"),
      price: data.get("price"),
      startDate: startDate,
      endDate: endDate,
    }
    console.log("Form submitted: ", newTripDto);
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
            Nuevo viaje
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
          <Box
            component="form"
            noValidate
            width={"85%"}
            onSubmit={handleSubmit}
          >
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              id="name"
              label="Nombre"
              name="name"
              autoFocus
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="destination"
              label="Destino"
              id="destination"
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="image"
              label="Imagen"
              id="image"
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              multiline
              rows={3}
              variant="standard"
              name="description"
              label="Descripción"
              id="description"
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="price"
              label="Precio"
              id="price"
              helperText
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box
                sx={{
                  my: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <DesktopDatePicker
                  label="Desde"
                  inputFormat="dd/MM/yyyy"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="Hasta"
                  inputFormat="dd/MM/yyyy"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </LocalizationProvider>
            <LoginButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear
            </LoginButton>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}

export default CreateTrip;
