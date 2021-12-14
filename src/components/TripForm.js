import Box from "@mui/material/Box";
import { LoginButton } from "../components/ui/Buttons";
import { TextField, Input, InputLabel } from "@mui/material";
import Spinner from "./ui/Spinner";

// Dates
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

function TripForm(props) {
  const {
    loading,
    trip,
    onNameChange,
    onDestinationChange,
    onImageChange,
    onDescriptionChange,
    onPriceChange,
    onSlotsChange,
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
    showSlotsError,
    showStartDateError,
    showEndDateError,
    startDateErrorText,
    endDateErrorText,
  } = props;

  let disabledSubmit = showNameError || showDestinationError || showImageError || 
                       showDescriptionError || showPriceError || showSlotsError || 
                       showStartDateError || showEndDateError;
  // Errors text
  const nameErrorText = "El nombre debe tener entre 4 y 80 caracteres";
  const destinationErrorText = "El destino del viaje es requerido";
  const imageErrorText = "La imagen del viaje es inválida";
  const descriptionErrorText = "La descripción debe tener entre 10 y 800 caracteres";
  const priceErrorText = "El precio del viaje es inválido";
  const slotsErrorText = "La cantidad de lugares indicada inválida";

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
          onChange={onNameChange}
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
          onChange={onDestinationChange}
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
          onChange={onImageChange}
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
          onChange={onDescriptionChange}
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
        <Box
          sx={{
            my: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly"
          }}
        >
          <TextField            
            defaultValue={trip?.price}
            onChange={onPriceChange}
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
          <TextField
            sx={{ ml: 10 }}
            defaultValue={trip?.totalSlots}
            onChange={onSlotsChange}
            error={showSlotsError}
            type="number"
            margin="normal"
            required
            fullWidth
            variant="standard"
            name="totalSlots"
            label="Lugares diponibles totales"
            id="totalSlots"
            helperText={showSlotsError && slotsErrorText}
          />
        </Box>
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
              minDate={new Date()}
              onChange={onStartDateChange}
              renderInput={(params) => <TextField {...params} error={showStartDateError} helperText={showStartDateError && startDateErrorText} />}
            />
            <DesktopDatePicker
              label="Hasta"
              inputFormat="dd/MM/yyyy"
              value={endDate}
              minDate={new Date().setDate(new Date().getDate() + 1)}
              onChange={onEndDateChange}
              renderInput={(params) => <TextField {...params} error={showEndDateError} helperText={showEndDateError && endDateErrorText} />}
            />
          </Box>
        </LocalizationProvider>
        {loading ? <Spinner /> : <LoginButton
          type="submit"
          fullWidth
          disabled={disabledSubmit}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Confirmar
        </LoginButton>}
      </Box>
    </Box>
  );
}

export default TripForm;