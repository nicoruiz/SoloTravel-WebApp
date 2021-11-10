import { useContext } from "react";
import Box from "@mui/material/Box";
import { Container, Grid, TextField, Typography } from "@mui/material";
import { Divider } from '@mui/material';
import { LoginButton } from "../components/ui/Buttons";
import * as registrationService from "./../services/registrationService";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../store/SessionContext";
import { useSnackbar } from "notistack";

function AgencyRegister(props) {
    const history = useHistory();
    const { session } = useContext(SessionContext);
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (event) => {
        try{
            event.preventDefault();
            const data = new FormData(event.currentTarget);
    
            const travelAgencyRegistrationDto = {
              email: data.get("agencyEmail"),
              name: data.get("agencyName"),
              password: data.get("agencyPassword"),
              fiscalName: data.get("agencyFiscalName"),
              cuit: data.get("agencyCuit"),
              locationProvince: data.get("locationProvince"),
              locationCity: data.get("locationCity"),
              locationStreet: data.get("locationStreet"),
              locationNumber: data.get("locationStreetNumber"),
              managerFirstName: data.get("managerName"),
              managerSurname: data.get("managerSurname"),
              managerDni: data.get("managerDni"),
              managerCuit: data.get("managerCuit")
            };
            
            await registrationService.registerTravelAgency(session, travelAgencyRegistrationDto);
            enqueueSnackbar("You have been registered successfully.", { variant: "success" });
            history.push("/login");
        }catch(err){
            console.log(err.data);
        } 
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
            Nueva agencia de viajes
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
              id="agencyName"
              label="Nombre de la agencia"
              name="agencyName"
              autoFocus
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="agencyEmail"
              label="Email de la agencia"
              id="agencyEmail"
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="agencyPassword"
              type="password"
              label="Contraseña"
              id="agencyPass"
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="agencyFiscalName"
              label="Nombre fiscal"
              id="agencyFiscalName"
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="agencyCuit"
              label="cuit"
              type="agencyCuit"
              id="price"
              helperText
            />
            <Divider>
                <Typography
                  component="h6"
                  variant="h6"
                  align="center"
                  color="text.primary"
                >
            Ubicación de la agencia
                </Typography>
            </Divider>
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="locationProvince"
              label="Provincia"
              id="locationProvince"
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="locationCity"
              label="Ciudad"
              id="locationCity"
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="locationStreet"
              label="Calle"
              id="locationStreet"
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              type="number"
              name="locationStreetNumber"
              label="Altura"
              id="locationStreetNumber"
              helperText
            />
             <Divider>
                <Typography
                  component="h6"
                  variant="h6"
                  align="center"
                  color="text.primary"
                >
            Manager de la agencia
                </Typography>
            </Divider>
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="managerName"
              label="Nombre"
              id="managerName"
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="managerSurname"
              label="Apellido"
              id="managerSurname"
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="managerDni"
              label="dni"
              id="managerDni"
              helperText
            />
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              type="number"
              name="managerCuit"
              label="cuit"
              id="managerCuit"
              helperText
            />
            <LoginButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar Agencia
            </LoginButton>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}

export default AgencyRegister;