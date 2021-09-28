import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { AccountCircle, Favorite, TravelExplore } from "@mui/icons-material";
// Styled components
import { NavButton } from "./../ui/Buttons";

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
            startIcon={<TravelExplore />}
          >
            Viajes
          </NavButton>
          <NavButton
            component={Link}
            to="/favorites"
            startIcon={<Favorite />}
          >
            Favoritos
          </NavButton>
          <NavButton
            component={Link}
            to="/login"
            startIcon={<AccountCircle />}
          >
            Iniciar sesión
          </NavButton>          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
