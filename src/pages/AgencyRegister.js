import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import { Container, Grid, TextField, Typography } from "@mui/material";
import { Divider } from '@mui/material';
import { BackButton, LoginButton } from "../components/ui/Buttons";
import * as registrationService from "./../services/registrationService";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../store/SessionContext";
import { useSnackbar } from "notistack";
import { ArrowBack } from "@mui/icons-material";

function AgencyRegister(props) {
  const history = useHistory();
  const { session } = useContext(SessionContext);
  const { enqueueSnackbar } = useSnackbar();

  //form validation
  const [agencyEmailError, setAgencyEmailError] = React.useState(false);
  const [agencyNameError, setAgencyNameError] = React.useState(false);
  const [agencyPasswordError, setAgencyPasswordError] = React.useState(false);
  const [agencyFiscalNammeError, setAgencyFiscalNameError] = React.useState(false);
  const [agencyCuitError, setAgencyCuitError] = React.useState(false);
  //agency location errors
  const [locationProvinceError, setLocationProvinceError] = React.useState(false);
  const [locationCityError, setLocationCityError] = React.useState(false);
  const [locationStreetError, setLocationStreetError] = React.useState(false);
  const [locationNumberError, setLocationNumberError] = React.useState(false);
  //agency manager errors
  const [managerFirstNameError, setManagerFirstNameError] = React.useState(false);
  const [managerSurnameError, setManagerSurnameError] = React.useState(false);
  const [managerDniError, setManagerDniError] = React.useState(false);
  const [managerCuitError, setManagerCuitError] = React.useState(false);
  //errorMessages
  const [agencyEmailErrorMsg, setAgencyEmailErrorMsg] = React.useState("");
  const [agencyNameErrorMsg, setAgencyNameErrorMsg] = React.useState("");
  const [agencyPasswordErrorMsg, setAgencyPasswordErrorMsg] = React.useState("");
  const [agencyFiscalNammeErrorMsg, setAgencyFiscalNameErrorMsg] = React.useState("");
  const [agencyCuitErrorMsg, setAgencyCuitErrorMsg] = React.useState("");
  //agency location errors
  const [locationProvinceErrorMsg, setLocationProvinceErrorMsg] = React.useState("");
  const [locationCityErrorMsg, setLocationCityErrorMsg] = React.useState("");
  const [locationStreetErrorMsg, setLocationStreetErrorMsg] = React.useState("");
  const [locationNumberErrorMsg, setLocationNumberErrorMsg] = React.useState("");
  //agency manager errors
  const [managerFirstNameErrorMsg, setManagerFirstNameErrorMsg] = React.useState("");
  const [managerSurnameErrorMsg, setManagerSurnameErrorMsg] = React.useState("");
  const [managerDniErrorMsg, setManagerDniErrorMsg] = React.useState("");
  const [managerCuitErrorMsg, setManagerCuitErrorMsg] = React.useState("");
    
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
            
      if(isValidForm(travelAgencyRegistrationDto)){
        await registrationService.registerTravelAgency(session, travelAgencyRegistrationDto);
        enqueueSnackbar("You have been registered successfully.", { variant: "success" });
        history.push("/login");
      }
    }catch(err){
      console.log(err.data);
    } 
  };

  const isValidForm = (travelAgencyRegistrationDto) => {
    const nameLengthIsOk = travelAgencyRegistrationDto.name.length > 3 && travelAgencyRegistrationDto.name.length < 20;
    
    const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const emailFormatIsOk = pattern.test(travelAgencyRegistrationDto.email.toLowerCase);
    const emailLengthIsOk = travelAgencyRegistrationDto.email.lenght > 3 && travelAgencyRegistrationDto.email.length < 40;

    const passwordLengthIsOk = travelAgencyRegistrationDto.password.length > 3 && travelAgencyRegistrationDto.password.length < 20;
    
    const fiscalNameLengthIsOk = travelAgencyRegistrationDto.fiscalName.length > 3 && travelAgencyRegistrationDto.fiscalName.length < 20;

    const agencyCuitIsOk = travelAgencyRegistrationDto.cuit > 11111111111 && travelAgencyRegistrationDto.cuit < 99999999999;
    
    const locationProvinceLengthIsOk = travelAgencyRegistrationDto.locationProvince.length > 3 && travelAgencyRegistrationDto.locationProvince.length < 20;

    const locationCityLengthIsOk = travelAgencyRegistrationDto.locationCity.length > 3 && travelAgencyRegistrationDto.locationCity.length < 20;

    const locationStreetLengthIsOk = travelAgencyRegistrationDto.locationStreet.length > 3 && travelAgencyRegistrationDto.locationStreet.length < 20;

    const locationNumberIsOk = travelAgencyRegistrationDto.locationNumber > 1;

    const managerFirstNameLengthIsOk = travelAgencyRegistrationDto.managerFirstName.length > 3 && travelAgencyRegistrationDto.managerFirstName.length < 20;

    const managerSurnameLengthIsOk = travelAgencyRegistrationDto.managerSurname.length > 3 && travelAgencyRegistrationDto.managerSurname.length < 20;

    const managerDniLengthIsOk = travelAgencyRegistrationDto.managerDni.length > 3 && travelAgencyRegistrationDto.managerDni.length < 20;

    const managerCuitIsOk = travelAgencyRegistrationDto.managerCuit > 11111111111 && travelAgencyRegistrationDto.managerCuit < 99999999999;

    if(!nameLengthIsOk){
      setAgencyNameError(true)
      setAgencyNameErrorMsg("Este campo debe tener entre 3 y 20 caracteres")
    }
    
    if(!emailFormatIsOk && emailLengthIsOk){
      setAgencyEmailError(true)
      setAgencyEmailErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }

    if(!passwordLengthIsOk){
      setAgencyPasswordError(true)
      setAgencyPasswordErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }
    
    if(!fiscalNameLengthIsOk){
      setAgencyFiscalNameError(true)
      setAgencyFiscalNameErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }

    if(!agencyCuitIsOk){
      setAgencyCuitError(true)
      setAgencyCuitErrorMsg("Valor invalido para dicho campo")
    }

    if(!locationProvinceLengthIsOk){
      setLocationProvinceError(true)
      setLocationProvinceErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }
    
    if(!locationCityLengthIsOk){
      setLocationCityError(true)
      setLocationCityErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }

    if(!locationStreetLengthIsOk){
      setLocationNumberError(true)
      setLocationNumberErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }

    if(!locationNumberIsOk){
      setLocationNumberError(true);
      setLocationNumberErrorMsg("Valor invalido para dicho campo")
    }

    if(!managerFirstNameLengthIsOk){
      setManagerFirstNameError(true)
      setManagerFirstNameErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }

    if(!managerSurnameLengthIsOk){
      setManagerSurnameError(true)
      setManagerSurnameErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }

    if(!managerDniLengthIsOk){
      setManagerDniError(true)
      setManagerDniErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }

    if(!managerCuitIsOk){
      setManagerCuitError(true)
      setManagerCuitErrorMsg("Valor invalido para dicho campo")
    }

    return nameLengthIsOk && emailFormatIsOk && emailLengthIsOk && passwordLengthIsOk && fiscalNameLengthIsOk && agencyCuitIsOk && 
    locationProvinceLengthIsOk && locationCityLengthIsOk && locationStreetLengthIsOk && locationNumberIsOk && managerFirstNameLengthIsOk && 
    managerSurnameLengthIsOk && managerDniLengthIsOk && managerCuitIsOk;
  }


  const validateAgencyName = (event) => {
    const name = event.target.value
    const nameLengthIsOk = name.length > 3 && name.length < 20;
    if(!nameLengthIsOk){
      setAgencyNameError(true)
      setAgencyNameErrorMsg("Este campo debe tener entre 3 y 20 caracteres")
    }else{
      setAgencyNameError(false)
    }
  }

  const validateAgencyEmail = (event) => {
    const email = event.target.value
    const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const emailFormatIsOk = pattern.test(email);
    const emailLengthIsOk = email > 3 && email < 40;
    if(!emailFormatIsOk || emailLengthIsOk){
      setAgencyEmailError(true)
      setAgencyEmailErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }else{
      setAgencyEmailError(false)
    }
  }

  const validateAgencyPass = (event) => {
    const pass = event.target.value
    const passwordLengthIsOk = pass > 3 && pass < 20;
    if(!passwordLengthIsOk){
      setAgencyPasswordError(true)
      setAgencyPasswordErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }else{
      setAgencyPasswordError(false)
    }
  }

  const validateAgencyFiscalName = (event) => {
    const fiscalName = event.target.value
    const fiscalNameLengthIsOk = fiscalName > 3 && fiscalName < 20;
    if(!fiscalNameLengthIsOk){
      setAgencyFiscalNameError(true)
      setAgencyFiscalNameErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }else{
      setAgencyFiscalNameError(true)
    }
  }

  const validateAgencyCuit = (event) => {
    const cuit = event.target.value
    const agencyCuitIsOk = cuit > 11111111111 && cuit < 99999999999;
    if(!agencyCuitIsOk){
      setAgencyCuitError(true)
      setAgencyCuitErrorMsg("Valor invalido para dicho campo")
    }else{
      setAgencyCuitError(false)
    }
  }

  const validateLocationProvince = (event) => {
    const locationProvinceLengthIsOk = province > 3 && province < 20;
    const province = event.target.value
    if(!locationProvinceLengthIsOk){
      setLocationProvinceError(true)
      setLocationProvinceErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }else{
      setLocationProvinceError(false)
    }
  }

  const validateLocationCity = (event) => {
    const city = event.target.value
    const locationCityLengthIsOk = city > 3 && city < 20;
    if(!locationCityLengthIsOk){
      setLocationCityError(true)
      setLocationCityErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }else{
      setLocationCityError(false)
    }
  }

  const validateLocationStreet = (event) => {
    const number = event.target.value
    const locationStreetLengthIsOk = number > 3 && number < 20;
    if(!locationStreetLengthIsOk){
      setLocationStreetError(true)
      setLocationStreetErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }else{
      setLocationStreetError(false)
    }
  }

  const validateLocationStreetNumber = (event) => {
    const number = event.target.value
    const locationNumberIsOk = number > 1;
    if(!locationNumberIsOk){
      setLocationNumberError(true);
      setLocationNumberErrorMsg("Valor invalido para dicho campo")
    }else{
      setLocationNumberError(false);
    }
  }

  const validateManagerName = (event) => {
    const name = event.target.value
    const managerFirstNameLengthIsOk = name > 3 && name < 20;
    if(!managerFirstNameLengthIsOk){
      setManagerFirstNameError(true)
      setManagerFirstNameErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }else{
      setManagerFirstNameError(false)
    }
  }

  const validateManagerSurname = (event) => {
    const surname = event.target.value
    const managerSurnameLengthIsOk = surname > 3 && surname < 20;
    if(!managerSurnameLengthIsOk){
      setManagerSurnameError(true)
      setManagerSurnameErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }else{
      setManagerSurnameError(false)
    }
  }

  const validateManagerCuit = (event) => {
    const cuit = event.target.value
    const managerCuitIsOk = cuit > 11111111111 && cuit < 99999999999;
    if(!managerCuitIsOk){
      setManagerCuitError(true)
      setManagerCuitErrorMsg("Valor invalido para dicho campo")
    }else{
      setManagerCuitError(false)
    }
  }

  const validateManagerDni = (event) => {
    const dni = event.target.value
    const managerDniLengthIsOk = dni > 3 && dni < 20;
    if(!managerDniLengthIsOk){
      setManagerDniError(true)
      setManagerDniErrorMsg("Este campo debe tener entre 3 y 20 casacteres y cumplir con un formato de mail valido")
    }else{
      setManagerDniError(false)
    }
  }

  return (
    <Container sx={{ mt: 7, pb: 5 }} maxWidth="md">
      <Grid
        sx={{
          p: 2,
          pt: 5,
          backgroundColor: "white",
          boxShadow: "rgba(24, 154, 180, 0.4) 5px 5px, rgba(24, 154, 180, 0.3) 10px 10px, rgba(24, 154, 180, 0.2) 15px 15px, rgba(24, 154, 180, 0.1) 20px 20px, rgba(24, 154, 180, 0.05) 25px 25px;",
        }}
      >
        <BackButton startIcon={<ArrowBack />} onClick={() => history.goBack()}>
          Volver
        </BackButton>
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
              error={agencyNameError}
              margin="normal"
              required
              fullWidth
              variant="standard"
              id="agencyName"
              label="Nombre de la agencia"
              name="agencyName"
              autoFocus
              onChange={validateAgencyName}
              helperText= {agencyNameError && agencyNameErrorMsg}
            />
            <TextField
              error={agencyEmailError}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="agencyEmail"
              label="Email de la agencia"
              id="agencyEmail"
              onChange={validateAgencyEmail}
              helperText= {agencyEmailError && agencyEmailErrorMsg}
            />
            <TextField
              error={agencyPasswordError}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="agencyPassword"
              type="password"
              label="Contraseña"
              id="agencyPass"
              onChange={validateAgencyPass}
              helperText= {agencyPasswordError && agencyPasswordErrorMsg}
            />
            <TextField
              error={agencyFiscalNammeError}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="agencyFiscalName"
              label="Nombre fiscal"
              id="agencyFiscalName"
              onChange={validateAgencyFiscalName}
              helperText= {agencyFiscalNammeError && agencyFiscalNammeErrorMsg}
            />
            <TextField
              error={agencyCuitError}
              margin="normal"
              required
              fullWidth
              type="number"
              variant="standard"
              name="agencyCuit"
              label="Cuit"
              id="agencyCuit"
              onChange={validateAgencyCuit}
              helperText= {agencyCuitError && agencyCuitErrorMsg}
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
              error={locationProvinceError}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="locationProvince"
              label="Provincia"
              id="locationProvince"
              onChange={validateLocationProvince}
              helperText= {locationProvinceError && locationProvinceErrorMsg}
            />
            <TextField
              error={locationCityError}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="locationCity"
              label="Ciudad"
              id="locationCity"
              onChange={validateLocationCity}
              helperText= {locationCityError && locationCityErrorMsg}
            />
            <TextField
              error={locationStreetError}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="locationStreet"
              label="Calle"
              id="locationStreet"
              onChange={validateLocationStreet}
              helperText= {locationStreetError && locationStreetErrorMsg}
            />
            <TextField
              error={locationNumberError}
              margin="normal"
              required
              fullWidth
              variant="standard"
              type="number"
              name="locationStreetNumber"
              label="Altura"
              id="locationStreetNumber"
              onChange={validateLocationStreetNumber}
              helperText= {locationNumberError && locationNumberErrorMsg}
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
              error={managerFirstNameError}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="managerName"
              label="Nombre"
              id="managerName"
              onChange={validateManagerName}
              helperText= {managerFirstNameError && managerFirstNameErrorMsg}
            />
            <TextField
              error={managerSurnameError}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="managerSurname"
              label="Apellido"
              id="managerSurname"
              onChange={validateManagerSurname}
              helperText= {managerSurnameError && managerSurnameErrorMsg}
            />
            <TextField
              error={managerDniError}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="managerDni"
              label="Dni"
              id="managerDni"
              onChange={validateManagerDni}
              helperText= {managerDniError && managerDniErrorMsg}
            />
            <TextField
              error={managerCuitError}
              margin="normal"
              required
              fullWidth
              variant="standard"
              type="number"
              name="managerCuit"
              label="Cuit"
              id="managerCuit"
              onChange={validateManagerCuit}
              helperText= {managerCuitError && managerCuitErrorMsg}
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