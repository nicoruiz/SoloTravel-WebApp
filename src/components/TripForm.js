import Box from "@mui/material/Box";
import { LoginButton } from "../components/ui/Buttons";
import { TextField, Input, InputLabel } from "@mui/material";
// Dates
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

function TripForm(props) {
  const {
    trip,
    startDate,
    onStartDateChange,
    endDate,
    onEndDateChange,
    handleSubmit,
    showNameError,
    showDestinationError,
    showImageError,
    showDescriptionError,
    showPriceError,
    showStartDateError,
    showEndDateError,
    startDateErrorText,
    endDateErrorText,
  } = props;

  // Errors text
  const nameErrorText = "El nombre del viaje es requerido";
  const destinationErrorText = "El destino del viaje es requerido";
  const imageErrorText = "La imagen del viaje es inválida";
  const descriptionErrorText = "La descripción del viaje es requerida";
  const priceErrorText = "El precio del viaje es inválido";

  return (
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
          defaultValue={trip?.name}
          error={showNameError}
          margin="normal"
          required
          fullWidth
          variant="standard"
          id="name"
          label="Nombre"
          name="name"
          autoFocus
          helperText={showNameError && nameErrorText}
        />
        <TextField
          defaultValue={trip?.destination}
          error={showDestinationError}
          margin="normal"
          required
          fullWidth
          variant="standard"
          name="destination"
          label="Destino"
          id="destination"
          helperText={showDestinationError && destinationErrorText}
        />
        <InputLabel
          sx={{ mt: 3 }}
          required
          error={showImageError}
          variant="standard"
        >
          Imagen
        </InputLabel>
        <Input
          error={showImageError}
          type="file"
          margin="normal"
          required
          fullWidth
          variant="standard"
          name="image"
          id="image"
          helperText={showImageError && imageErrorText}
        />
        <TextField
          defaultValue={trip?.description}
          error={showDescriptionError}
          margin="normal"
          required
          fullWidth
          multiline
          rows={3}
          variant="standard"
          name="description"
          label="Descripción"
          id="description"
          helperText={showDescriptionError && descriptionErrorText}
        />
        <TextField
          defaultValue={trip?.price}
          error={showPriceError}
          type="number"
          margin="normal"
          required
          fullWidth
          variant="standard"
          name="price"
          label="Precio"
          id="price"
          helperText={showPriceError && priceErrorText}
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
              onChange={onStartDateChange}
              renderInput={(params) => <TextField {...params} error={showStartDateError} helperText={showStartDateError && startDateErrorText} />}
            />
            <DesktopDatePicker
              label="Hasta"
              inputFormat="dd/MM/yyyy"
              value={endDate}
              onChange={onEndDateChange}
              renderInput={(params) => <TextField {...params} error={showEndDateError} helperText={showEndDateError && endDateErrorText} />}
            />
          </Box>
        </LocalizationProvider>
        <LoginButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Confirmar
        </LoginButton>
      </Box>
    </Box>
  );
}

export default TripForm;