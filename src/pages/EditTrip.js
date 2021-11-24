import { useState, useContext, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { SessionContext } from "../store/SessionContext";
import * as tripsService from "./../services/tripsService";
import * as imagesService from "./../services/imagesService";
import * as travelAgencyService from "./../services/travelAgencyService";
import { useHistory } from "react-router-dom";
import TripForm from "../components/TripForm";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Spinner from "../components/ui/Spinner";
import * as validatorHelper from "./../helpers/validators";

function EditTrip() {
  const { session } = useContext(SessionContext);
  const { id } = useParams();
  const [trip, setTrip] = useState();
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

  useEffect(() => {
    getTripData();
  }, []);

  const getTripData = async () => {
    try {
      setLoading(true);

      const tripData = await tripsService.getTripById(session, id);
      setTrip(tripData);
      setStartDate(new Date(tripData.startDate));
      setEndDate(new Date(tripData.endDate));
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "Error inesperado. Intente nuevamente.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
    setLoading(false);
  };

  const onStartDateChange = (newValue) => {
    checkValidDates(newValue, endDate);
    setStartDate(newValue);
  };
  const onEndDateChange = (newValue) => {
    checkValidDates(startDate, newValue);
    setEndDate(newValue);
  };

  const handleSubmit = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // Set image name
      let imageName = data.get("image")?.name;
      if (imageName === "") {
        imageName = trip.image;
      }

      // Form dto
      const updateTripDto = {
        id: id,
        name: data.get("name"),
        destination: data.get("destination"),
        image: imageName,
        description: data.get("description"),
        price: data.get("price"),
        totalSlots: data.get("totalSlots"),
        startDate: startDate,
        endDate: endDate,
      };

      // Validate dto data
      if (!isValidForm(updateTripDto)) {
        setLoading(false);
        return;
      }

      // Upload image to storage      
      if (imageName !== trip.image) {
        // If image is new, upload it
        const uploadedImageRes = await uploadImage(data.get("image"));
        // Set new image name
        updateTripDto.image = uploadedImageRes.data;
      }

      await travelAgencyService.updateTrip(session, id, updateTripDto);
      history.push("/agencyTrips");
    } catch (error) {
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

  const isValidForm = (updateTripDto) => {
    // Name
    const isValidName = validatorHelper.checkValidAttr(updateTripDto.name, setShowNameError);
    // Destination
    const isValidDestination = validatorHelper.checkValidAttr(updateTripDto.destination, setShowDestinationError);
    // Image
    const isValidImage = validatorHelper.checkValidAttr(updateTripDto.image.name, setShowImageError);
    // Description
    const isValidDescription = validatorHelper.checkValidAttr(updateTripDto.description, setShowDescriptionError);
    // Price
    const isValidPrice = validatorHelper.checkValidNumber(updateTripDto.price, 999999, setShowPriceError);
    // Slots
    const isValidSlotsValue = validatorHelper.checkValidNumber(updateTripDto.totalSlots, 99, setShowSlotsError);
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
        <Grid>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
          >
            Modificar viaje
          </Typography>
        </Grid>
        {loading ? (
          <Spinner />
        ) : (
          <TripForm
            loading={loading}
            trip={trip}
            onNameChange={(e) => validatorHelper.checkValidAttr(e.target.value, setShowNameError)}
            onDestinationChange={(e) => validatorHelper.checkValidAttr(e.target.value, setShowDestinationError)}
            onImageChange={(e) => validatorHelper.checkValidAttr(e.target.value, setShowImageError)}
            onDescriptionChange={(e) => validatorHelper.checkValidAttr(e.target.value, setShowDescriptionError)}
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
        )}
      </Grid>
    </Container>
  );
}

export default EditTrip;
