import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { AccountCircle, Favorite, TravelExplore } from "@mui/icons-material";
// Styled components
import { NavButton } from "./../ui/Buttons";
import { Avatar } from "@mui/material";
// Context
import { guestSession, SessionContext } from "./../../store/SessionContext";

function Header() {
  const { session, setSession } = useContext(SessionContext);

  const logout = () => {
    setSession(guestSession);
    // eslint-disable-next-line no-restricted-globals
    location.href = "/";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Solo Travel
          </Typography>
          <NavButton component={Link} to="/" startIcon={<TravelExplore />}>
            Viajes
          </NavButton>
          {session.isAuthenticated && (
            <NavButton
              component={Link}
              to="/favorites"
              startIcon={<Favorite />}
            >
              Favoritos
            </NavButton>
          )}
          {session.isAuthenticated ? (
            <NavButton onClick={logout}>
              <Avatar
                sx={{ mr: 1 }}
                src={session.profileInfo.picture}
                referrerPolicy="no-referrer"
              />
              {session.profileInfo.name}
            </NavButton>
          ) : (
            <NavButton
              component={Link}
              to="/login"
              startIcon={<AccountCircle />}
            >
              Iniciar sesión
            </NavButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
