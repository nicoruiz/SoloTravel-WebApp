import { Container, Divider, Grid, Typography } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import { GoogleButton, LoginButton } from "./../components/ui/Buttons";
import { GOOGLE_CLIENT_ID } from "./../config";
import * as authService from "./../services/authService";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom"

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();
  

  const onSuccessLogin = (response) => {
    // TODO: get tokenId and send to the backend to validate it
    const profileObj = response.profileObj;
    console.log("Google data: ", response);

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
      const response = await authService.authenticateByGoogle(profileInfo, token);
      profileInfo.userId = response.id;

      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("token", token);
      localStorage.setItem("currentSession", JSON.stringify(profileInfo));
      // TODO: Redirect to main page
      // history.push("/");
      // eslint-disable-next-line no-restricted-globals
      location.href = "/";
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
          <LoginButton variant="contained">Inicia sesión</LoginButton>
        </Grid>
        <Grid sx={{ m: 5 }}>
          <LoginButton variant="contained">Registrate</LoginButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
