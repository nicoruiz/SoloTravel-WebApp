import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Container, Grid, TextField, Typography } from "@mui/material";
import { LoginButton } from "../components/ui/Buttons";

function CreateTrip(props) {

    const handleSubmit = () => {
        alert("Form submitted");
    }

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
                id="email"
                label="Nombre"
                name="email"
                autoComplete="email"
                autoFocus
                helperText
              />
              <TextField
                error={false}
                margin="normal"
                required
                fullWidth
                variant="standard"
                name="password"
                label="Destino"
                id="destino"
                helperText
              />
              <TextField
                error={false}
                margin="normal"
                required
                fullWidth
                variant="standard"
                name="password"
                label="Imagen"
                id="destino"
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
                name="password"
                label="Descripción"
                id="destino"
                helperText
              />
              <TextField
                error={false}
                margin="normal"
                required
                fullWidth
                variant="standard"
                name="password"
                label="Precio"
                id="destino"
                helperText
              />
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
