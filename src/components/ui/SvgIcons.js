import { Grid, SvgIcon } from "@mui/material";
import { ReactComponent as NoFavoritesSvg } from "./../../assets/no_favorites.svg";
import { ReactComponent as NoResultsSvg } from "./../../assets/no_results.svg";
import { ReactComponent as SearchingSvg } from "./../../assets/searching.svg";
import classes from "./SvgIcons.module.css";

export const NoFavorites = () => {
    return (
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <NoFavoritesSvg className={classes.svgIcon} />
        </Grid>
    );
}

export const NoResults = () => {
    return (
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <NoResultsSvg className={classes.svgIcon} />
        </Grid>
    );
}

export const Searching = () => {
    return (
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <SearchingSvg className={classes.svgIcon} />
        </Grid>
    );
}