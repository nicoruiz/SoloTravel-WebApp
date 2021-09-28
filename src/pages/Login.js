import { Container, Divider, Grid, Typography } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import { GoogleButton, RegisterButton } from "./../components/ui/Buttons";
import { GOOGLE_CLIENT_ID } from "./../config";

function Login() {
  const onSuccessLogin = (response) => {
    const profileObj = response.profileObj;
    console.log("Profile data: ", profileObj);
  };

  const onFailedLogin = (response) => {
    console.log("Failed: ", response);
  };

  return (
    <Container sx={{ pt: 10 }}>
      <Grid sx={{ height: "25rem", width: "80%", m: "inherit", p: 5, backgroundColor: "white", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" }}>
        <Grid sx={{ mb: 7 }}>
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
        <Grid sx={{ m: 5 }}>
          <RegisterButton variant="contained">Registrate</RegisterButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
