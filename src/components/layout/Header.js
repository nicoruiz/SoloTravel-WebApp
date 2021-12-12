import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { AccountCircle, Favorite, TravelExplore } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
// Styled components
import { NavButton } from "./../ui/Buttons";
import { Avatar, IconButton, Typography } from "@mui/material";
// Context
import { defaultSession, SessionContext } from "./../../store/SessionContext";
import ProfileMenu from "./ProfileMenu";
import * as sessionService from "../../services/sessionService";
//logo
import logo from "../../assets/logo.png";
import MenuIcon from '@mui/icons-material/Menu';
import MobileMenu from "./MobileMenu";
import useMediaQuery from '@mui/material/useMediaQuery';

function Header() {
  const { session, setSession } = useContext(SessionContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfileMenu = Boolean(anchorEl);
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const history = useHistory();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const goToMyProfile = () => {
    history.push("/myProfile");
  }

  const logout = () => {
    setSession(defaultSession);
    sessionService.removeSessionFromLocalStorage();
    history.push('/');
  };

  const goToHome = () => {
    const redirectUrl = session.isAgency
      ? "/agencyTrips"
      : "/";
    history.push(redirectUrl);
  }

  const toggleMobileMenu = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileMenuOpened(!isMobileMenuOpened);
  }

  const onMobileMenuClose = () => {
    setMobileMenuOpened(false);
  }

  return (
    <>
      <MobileMenu
        session={session}
        isOpened={isMobileMenuOpened}
        onClose={onMobileMenuClose}
        onLogout={logout}
      />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className={classes.header}>
            {/* Mobile Menu button */}
            {isMobile &&
              <IconButton onClick={toggleMobileMenu} aria-label="menu" sx={{ color: "white", mr: "1rem" }}>
                <MenuIcon />
              </IconButton>
            }
            <Typography component="div" sx={{ flexGrow: 1 }}>
              <img className={classes.logo} src={logo} onClick={goToHome} />
            </Typography>

            {/* Desktop navbar */}
            {!isMobile &&
              <>
                {!session.isAgency && (
                  <NavButton component={Link} to="/" startIcon={<TravelExplore />}>
                    Viajes
                  </NavButton>
                )}
                {session.isAuthenticated && session.isAgency && (
                  <NavButton
                    component={Link}
                    to="/agencyTrips"
                    startIcon={<TravelExplore />}
                  >
                    Mis Viajes
                  </NavButton>
                )}
                {session.isAuthenticated && !session.isAgency && (
                  <NavButton
                    component={Link}
                    to="/favorites"
                    startIcon={<Favorite />}
                  >
                    Favoritos
                  </NavButton>
                )}
                {session.isAuthenticated ? (
                  <NavButton onClick={handleProfileClick}>
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
              </>
            }
          </Toolbar>
        </AppBar>
        {/* Menu desplegable */}
        <ProfileMenu
          anchorEl={anchorEl}
          open={openProfileMenu}
          handleClose={handleProfileClose}
          onMyProfileClick={goToMyProfile}
          onLogout={logout}
        />
      </Box>
    </>
  );
}

export default Header;
