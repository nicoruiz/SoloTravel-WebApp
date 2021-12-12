import { Container, Divider, Grid, Typography } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import { GoogleButton, LoginButton } from "./../components/ui/Buttons";
import { GOOGLE_CLIENT_ID } from "./../config";
import * as authService from "../services/authService";
import { useSnackbar } from "notistack";
import { useHistory, Link } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";
import * as sessionService from "../services/sessionService";

function Login() {
  const { setSession } = useContext(SessionContext);
  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();

  const onSuccessLogin = (response) => {
    const profileObj = response.profileObj;
    const token = response.tokenId;

    const profileInfo = {
      googleId: profileObj.googleId,
      name: profileObj.name,
      email: profileObj.email,
      picture: profileObj.imageUrl,
    };

    authenticate(profileInfo, token);
  };

  const onFailedLogin = (response) => {
    console.log("Failed: ", response);
    showError(response.error);
  };

  const authenticate = async (profileInfo, token) => {
    try {
      const response = await authService.authenticateByGoogle(token);
      const userId = response.id;

      const newSession = {
        isAuthenticated: true,
        token: token,
        profileInfo: profileInfo,
        userId: userId,
      };

      setSession(newSession);
      sessionService.setSessionInLocalStorage(newSession);
      enqueueSnackbar("Sesión iniciada exitosamente.", { variant: "success" });
      history.push("/");
    }
    catch(err) {
      console.log("Authentication error: ", err.message);
      showError(err.message);
    }
  };

  const showError = (message) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  return (
    <Container sx={{ mt: 7 }} maxWidth="sm">
      <Grid
        sx={{
          p: 2,
          pt: 5,
          backgroundColor: "white",
          boxShadow: "rgba(24, 154, 180, 0.4) 5px 5px, rgba(24, 154, 180, 0.3) 10px 10px, rgba(24, 154, 180, 0.2) 15px 15px, rgba(24, 154, 180, 0.1) 20px 20px, rgba(24, 154, 180, 0.05) 25px 25px;",
        }}
      >
        <Grid>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
          >
            Iniciar sesión
          </Typography>
        </Grid>
        <Grid sx={{ m: 5 }}>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <GoogleButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              ></GoogleButton>
            )}
            onSuccess={onSuccessLogin}
            onFailure={onFailedLogin}
            cookiePolicy={"single_host_origin"}
          />
        </Grid>
        <Divider sx={{ mb: 5 }} variant="middle" />
        <Grid sx={{ mb: 5 }}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
          >
            Si sos una agencia
          </Typography>
        </Grid>
        <Grid sx={{ m: 5 }}>
          <LoginButton component={Link} to="/agencyLogin" variant="contained">Inicia sesión</LoginButton>
        </Grid>
        <Grid sx={{ m: 5 }}>
          <LoginButton component={Link} to="/agencyRegister" variant="contained">Registrate</LoginButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
