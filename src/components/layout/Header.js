import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { Favorite, TravelExplore } from "@mui/icons-material";
import { styled } from "@mui/system";

const NavButton = styled(Button)({
  color: "white",
  "&:hover": {
    backgroundColor: "#05445E",
  },
});

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Solo Travel
          </Typography>
          <NavButton
            component={Link}
            to="/"
            className={classes.navigationBtn}
            startIcon={<TravelExplore />}
          >
            Viajes
          </NavButton>
          <NavButton
            component={Link}
            to="/favorites"
            className={classes.navigationBtn}
            startIcon={<Favorite />}
          >
            Favoritos
          </NavButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
