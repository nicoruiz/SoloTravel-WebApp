import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import classes from "./TripCard.module.css";
import { AttachMoney, LocationOn, Schedule } from "@mui/icons-material";
import { CardActionArea, Divider } from "@mui/material";
import { IMAGES_BUCKET_URL } from "./../config";
// Context
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";
// Helpers
import { formatToMoney } from "../helpers/number";
import TravelerTripCardActions from "./TravelerTripCardActions";
import AgencyTripCardActions from "./AgencyTripCardActions";
import { useHistory } from "react-router";

function TripCard(props) {
  const { session } = useContext(SessionContext);
  const [isRaised, setRaised] = React.useState(false);
  const history = useHistory();

  const imageUrl = `${IMAGES_BUCKET_URL}${props.image}`;

  const handleToggleRaised = () => {
    setRaised(!isRaised);
  };

  const handleTripDetails = () => {
    history.push(`/tripDetails/${props.id}`);
  };

  return (
    <>
      <Card
        raised={isRaised}
        onMouseOver={handleToggleRaised}
        onMouseOut={handleToggleRaised}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardActionArea onClick={handleTripDetails}>
          <CardMedia
            component="img"
            alt={props.name}
            height="140"
            image={imageUrl}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography className={classes.title} gutterBottom variant="h5">
              {props.name}
            </Typography>
            <Typography
              className={classes.description}
              variant="body2"
              color="text.secondary"
            >
              {props.description}
            </Typography>
            <Typography
              sx={{ pt: 2, display: "flex", alignItems: "center" }}
              variant="body1"
            >
              <LocationOn sx={{ pr: 0.5 }} fontSize="small" />
              {props.destination}
            </Typography>
            <Typography
              sx={{ pt: 2, display: "flex", alignItems: "center" }}
              variant="body1"
            >
              <Schedule sx={{ pr: 0.5 }} fontSize="small" />
              {`${props.duration} Días`}
            </Typography>
            <Typography
              sx={{ pt: 2, display: "flex", alignItems: "center" }}
              variant="h4"
            >
              <AttachMoney fontSize="small" />
              {formatToMoney(props.price)}
            </Typography>
          </CardContent>
          <Divider variant="middle" />
        </CardActionArea>
        <CardActions sx={{ p: 2, display: "flex", justifyContent: "space-around" }}>
          {session.isAgency ? (
            <AgencyTripCardActions 
              tripId={props.id} 
              tripName={props.name}
              onTripDelete={props.onTripDelete}
            />
          ) : (
            <TravelerTripCardActions
              tripId={props.id}
              handleTripDetails={handleTripDetails}
              isFavorite={props.isFavorite}
              onFavoriteRemove={props.onFavoriteRemove}
            />
          )}
        </CardActions>
      </Card>
    </>
  );
}

export default TripCard;
