import { Grid } from "@mui/material";
import * as React from "react";
import TripCard from "./TripCard";

function TripList(props) {
  return (
    <Grid className="trip-list" container spacing={4}>
      {props.trips.map((trip) => (
        <Grid className="trip-card" item key={trip.id} xs={12} sm={6} md={4}>
          <TripCard
            id={trip.id}
            name={trip.name}
            description={trip.description}
            image={trip.image}
            destination={trip.destination}
            price={trip.price}
            isFavorite={trip.isFavorite}
            onFavoriteRemove={props.onFavoriteRemove}
            onTripDelete={props.onTripDelete}
            duration={trip.duration}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default TripList;
