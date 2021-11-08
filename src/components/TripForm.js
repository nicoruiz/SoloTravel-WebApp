import Box from "@mui/material/Box";
import { LoginButton } from "../components/ui/Buttons";
import { TextField, Input, InputLabel } from "@mui/material";
// Dates
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { display } from "@mui/system";

function TripForm(props) {
    const { trip, startDate, onStartDateChange, endDate, onEndDateChange, handleSubmit } = props;

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
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              id="name"
              label="Nombre"
              name="name"
              autoFocus
              helperText
            />
            <TextField
              defaultValue={trip?.destination}
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="destination"
              label="Destino"
              id="destination"
              helperText
            />
            <InputLabel 
              sx={{ mt: 3 }}
              required
              variant="standard"
            >
              Imagen
            </InputLabel>
            <Input
              error={false}
              type="file"
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="image"
              id="image"
              helperText
            />
            <TextField
              defaultValue={trip?.description}
              error={false}
              margin="normal"
              required
              fullWidth
              multiline
              rows={3}
              variant="standard"
              name="description"
              label="Descripción"
              id="description"
              helperText
            />
            <TextField
              defaultValue={trip?.price}
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="price"
              label="Precio"
              id="price"
              helperText
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
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="Hasta"
                  inputFormat="dd/MM/yyyy"
                  value={endDate}
                  onChange={onEndDateChange}
                  renderInput={(params) => <TextField {...params} />}
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