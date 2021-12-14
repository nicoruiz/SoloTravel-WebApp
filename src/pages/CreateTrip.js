import { useState, useContext } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { SessionContext } from "../store/SessionContext";
import * as imagesService from "./../services/imagesService";
import * as travelAgencyService from "./../services/travelAgencyService";
import { useHistory } from "react-router-dom";
import TripForm from "../components/TripForm";
import { useSnackbar } from "notistack";
import * as validatorHelper from "./../helpers/validators";
import { BackButton } from "../components/ui/Buttons";
import { ArrowBack } from "@mui/icons-material";

function CreateTrip() {
  const { session } = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  // Form state
  const [showNameError, setShowNameError] = useState(false);
  const [showDestinationError, setShowDestinationError] = useState(false);
  const [showImageError, setShowImageError] = useState(false);
  const [showDescriptionError, setShowDescriptionError] = useState(false);
  const [showPriceError, setShowPriceError] = useState(false);
  const [showSlotsError, setShowSlotsError] = useState(false);
  const [showStartDateError, setShowStartDateError] = useState(false);
  const [showEndDateError, setShowEndDateError] = useState(false);
  const [startDateErrorText, setStartDateErrorText] = useState("");
  const [endDateErrorText, setEndDateErrorText] = useState("");

  const onStartDateChange = (newValue) => {    
    checkValidDates(newValue, endDate);
    setStartDate(newValue);    
  }
  const onEndDateChange = (newValue) => {    
    checkValidDates(startDate, newValue);
    setEndDate(newValue);
  }

  const handleSubmit = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // Form dto
      const createTripDto = {
        name: data.get("name"),
        destination: data.get("destination"),
        image: data.get("image"),
        description: data.get("description"),
        price: data.get("price"),
        totalSlots: data.get("totalSlots"),
        startDate: startDate,
        endDate: endDate,
      }

      // Validate dto data
      if (!isValidForm(createTripDto)) {
        setLoading(false);
        return;
      }

      // Upload image to storage
      const uploadedImageRes = await uploadImage(createTripDto.image);
      createTripDto.image = uploadedImageRes.data;

      await travelAgencyService.createTrip(session, createTripDto);
      history.push("/agencyTrips");
    }
    catch (error) {
      let errorMessage = error.response
        ? error.response.data.message
        : "Error inesperado. Intente nuevamente.";
      errorMessage = typeof errorMessage === "object" 
        ? Object.values(errorMessage).map(e => e.concat(', '))
        : errorMessage;
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
    setLoading(false);
  };

  const isValidForm = (createTripDto) => {
    // Name
    const isValidName = validatorHelper.checkValidAttrWithRange(createTripDto.name, 4, 80, setShowNameError);
    // Destination
    const isValidDestination = validatorHelper.checkValidAttr(createTripDto.destination, setShowDestinationError);
    // Image
    const isValidImage = validatorHelper.checkValidAttr(createTripDto.image.name, setShowImageError);
    // Description
    const isValidDescription = validatorHelper.checkValidAttrWithRange(createTripDto.description, 10, 800, setShowDescriptionError);
    // Price
    const isValidPrice = validatorHelper.checkValidNumber(createTripDto.price, 999999, setShowPriceError);
    // Slots
    const isValidSlotsValue = validatorHelper.checkValidNumber(createTripDto.totalSlots, 99, setShowSlotsError);
    // Dates
    const areValidDates = checkValidDates(startDate, endDate);

    return isValidName && isValidDestination && isValidImage && isValidDescription && isValidPrice && isValidSlotsValue && areValidDates;
  }

  const checkValidDates = (startDate, endDate) => {
    // Using toDateString to avoid time comparison
    const today = new Date(new Date().toDateString());
    const _startDate = new Date(startDate?.toDateString());
    const _endDate = new Date(endDate?.toDateString());

    const isValidStartDate = _startDate >= today;
    const isValidEndDate = _endDate >= today;
    const endDateHigherThanStartDate = _endDate > _startDate;

    setShowStartDateError(!isValidStartDate);
    if (!isValidStartDate) {
      setStartDateErrorText("La fecha desde es inválida");
    }
    setShowEndDateError(!isValidEndDate);
    if (!isValidEndDate) {
      setEndDateErrorText("La fecha hasta es inválida");
    }
    // Si la fecha desde es valida, hay que chequear que no sea mayor que la fecha hasta
    if (isValidStartDate) {
      setShowStartDateError(!endDateHigherThanStartDate);
      if (!endDateHigherThanStartDate) {
        setStartDateErrorText("La fecha desde debe ser menor");
      }
    }

    return isValidStartDate && isValidEndDate && endDateHigherThanStartDate;
  }

  const uploadImage = async (image) => {
    const imageFormData = new FormData();
    imageFormData.append("image", image);

    return imagesService.uploadImage(session, imageFormData);
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
            Nuevo viaje
          </Typography>
        </Grid>
        <TripForm
          loading={loading}
          onNameChange={(e) => validatorHelper.checkValidAttrWithRange(e.target.value, 4, 80, setShowNameError)}
          onDestinationChange={(e) => validatorHelper.checkValidAttr(e.target.value, setShowDestinationError)}
          onImageChange={(e) => validatorHelper.checkValidAttr(e.target.value, setShowImageError)}
          onDescriptionChange={(e) => validatorHelper.checkValidAttrWithRange(e.target.value, 10, 800, setShowDescriptionError)}
          onPriceChange={(e) => validatorHelper.checkValidNumber(e.target.value, 999999, setShowPriceError)}
          onSlotsChange={(e) => validatorHelper.checkValidNumber(e.target.value, 99, setShowSlotsError)}
          startDate={startDate}
          onStartDateChange={onStartDateChange}
          endDate={endDate}
          onEndDateChange={onEndDateChange}
          handleSubmit={handleSubmit}
          showNameError={showNameError}
          showDestinationError={showDestinationError}
          showImageError={showImageError}
          showDescriptionError={showDescriptionError}
          showPriceError={showPriceError}
          showSlotsError={showSlotsError}
          showStartDateError={showStartDateError}
          showEndDateError={showEndDateError}
          startDateErrorText={startDateErrorText}
          endDateErrorText={endDateErrorText}
        />
      </Grid>
    </Container>
  );
}

export default CreateTrip;
