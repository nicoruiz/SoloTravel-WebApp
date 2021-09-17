import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Favorite, TravelExplore } from "@mui/icons-material";

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Solo Travel
          </Typography>
          <Button
            component={Link}
            to="/"
            color="inherit"
            startIcon={<TravelExplore />}
          >
            Trips
          </Button>
          <Button
            component={Link}
            to="/favorites"
            color="inherit"
            startIcon={<Favorite />}
          >
            Favorites
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
