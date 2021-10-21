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
import { LoginButton } from "../components/ui/Buttons";
import { useSnackbar } from "notistack";
import * as authService from "../services/authService";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";

const theme = createTheme();

function AgencyLogin() {
  const { setSession } = useContext(SessionContext);
  const [emailAddressError, setEmailAddressError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const errorText = "Este campo es obligatorio";
  let history = useHistory(); 

  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const email = data.get("email");
    const password = data.get("password")

    if(email.length === 0 || password.length === 0){
      setEmailAddressError(email.length === 0);
      setPasswordError(password.length === 0);
    }else{
      const response = authService.authenticateByAgency(email, password).then( response => {
        // TODO: Receive and set real agency data from response to session
        const newSession = {
          isAuthenticated: true,
          isAgency: true,
          token: response.data.token,
          profileInfo: {
            name: "guestTravelAgency",
            picture: "guestTravelAgency_image",
          },
          userId: -1,
        };
  
        setSession(newSession);
        enqueueSnackbar("You have logged in successfully.", { variant: "success" });
        history.push("/agencyTrips");
      }).catch( error => {
        return enqueueSnackbar(error.response.data.message, { variant: "error" });
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
            backgroundImage: "url(https://source.unsplash.com/random)",
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
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                helperText= {emailAddressError && errorText}
              />
              <TextField
                error={passwordError}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText= {passwordError && errorText}
              />
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
