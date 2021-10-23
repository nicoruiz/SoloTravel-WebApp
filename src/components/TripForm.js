import Box from "@mui/material/Box";
import { LoginButton } from "../components/ui/Buttons";
import { TextField } from "@mui/material";
// Dates
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

function TripForm(props) {
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
            onSubmit={props.handleSubmit}
          >
            <TextField
              value={props.formData.name}
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
              value={props.formData.destination}
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
            <TextField
              value={props.formData.image}
              error={false}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="image"
              label="Imagen"
              id="image"
              helperText
            />
            <TextField
              value={props.formData.description}
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
              value={props.formData.price}
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
                  value={props.startDate}
                  onChange={props.onStartDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="Hasta"
                  inputFormat="dd/MM/yyyy"
                  value={props.endDate}
                  onChange={props.onEndDateChange}
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
              Crear
            </LoginButton>
          </Box>
        </Box>
    );
}

export default TripForm;