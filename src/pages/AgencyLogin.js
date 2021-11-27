import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BackButton, LoginButton } from "../components/ui/Buttons";
import { useSnackbar } from "notistack";
import * as authService from "../services/authService";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";
import * as sessionService from "../services/sessionService";
import pictureSrc from "../assets/travelAgencyLoginImages/travel-agency-login-pic-1.jpg";

const theme = createTheme();

function AgencyLogin() {
  const { setSession } = useContext(SessionContext);
  const [emailAddressError, setEmailAddressError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [emailAddressErrorText, setEmailAddressErrorText] = React.useState("Este campo es obligatorio");
  const passwordErrorText = "Este campo es obligatorio";
  let history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password")
    const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (email.length === 0 || password.length === 0) {
      setEmailAddressError(email.length === 0);
      setPasswordError(password.length === 0);
    } else if (!re.test(email.toLowerCase())) {
      setEmailAddressError(true);
      setPasswordError(password.length === 0);
      setEmailAddressErrorText("Este campo debe ser un email valido")
    } else {
      setEmailAddressError(false);
      setPasswordError(false);
      const response = authService.authenticateByAgency(email, password).then(response => {

        const newSession = {
          isAuthenticated: true,
          isAgency: true,
          token: response.data.token,
          profileInfo: {
            name: response.data.agencyName,
            picture: "guestTravelAgency_image",
          },
          userId: response.data.agencyId,
        };

        setSession(newSession);
        sessionService.setSessionInLocalStorage(newSession);
        enqueueSnackbar("Sesión iniciada exitosamente.", { variant: "success" });
        history.push("/agencyTrips");
      }).catch(error => {
        const errorMessage = error.response
          ? error.response.data.message
          : "Error inesperado. Intente nuevamente.";
        return enqueueSnackbar(errorMessage, { variant: "error" });
      })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${pictureSrc})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                error={emailAddressError}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={emailAddressError && emailAddressErrorText}
              />
              <TextField
                error={passwordError}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={passwordError && passwordErrorText}
              />
              <BackButton
                onClick={() => history.goBack()}
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 1 }}>
                Volver
              </BackButton>
              <LoginButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Inicia Sesión
              </LoginButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AgencyLogin;
