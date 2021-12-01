import * as React from 'react';
import ReactDOM from "react-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AccountCircle, Favorite, Logout, TravelExplore } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Avatar, Toolbar, Typography } from '@mui/material';

export default function MobileMenu({ session, isOpened, onClose, onLogout }) {
	const mobileMenuContainer = document.querySelector("#mobileMenuContainer");

	return (
		ReactDOM.createPortal(
			<div>
				<Drawer
					open={isOpened}
					onClose={onClose}
				>
					<Box
						sx={{ width: 250 }}
						role="presentation"
						onClick={onClose}
						onKeyDown={onClose}
					>
						<Toolbar>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Solo Travel
							</Typography>
						</Toolbar>
						<Divider />
						<List>
							{!session.isAgency &&
								<ListItem button component={Link} to="/">
									<ListItemIcon>
										<TravelExplore />
									</ListItemIcon>
									<ListItemText primary="Viajes" />
								</ListItem>
							}
							{session.isAuthenticated && session.isAgency &&
								<ListItem button component={Link} to="/agencyTrips">
									<ListItemIcon>
										<TravelExplore />
									</ListItemIcon>
									<ListItemText primary="Mis Viajes" />
								</ListItem>
							}
							{session.isAuthenticated && !session.isAgency &&
								<ListItem button component={Link} to="/favorites">
									<ListItemIcon>
										<Favorite />
									</ListItemIcon>
									<ListItemText primary="Favoritos" />
								</ListItem>
							}
							{session.isAuthenticated ? (
								<ListItem button>
									<ListItemIcon>
										<Avatar
											sx={{ mr: 1, width: "24px", height: "24px" }}
											src={session.profileInfo.picture}
											referrerPolicy="no-referrer"
										/>
									</ListItemIcon>
									<ListItemText primary={session.profileInfo.name} />
								</ListItem>
							) : (
								<ListItem button component={Link} to="/login">
									<ListItemIcon>
										<AccountCircle />
									</ListItemIcon>
									<ListItemText primary="Iniciar Sesión" />
								</ListItem>
							)}
						</List>
						{session.isAuthenticated &&
							<>
								<Divider />
								<ListItem button onClick={onLogout}>
									<ListItemIcon>
										<Logout />
									</ListItemIcon>
									<ListItemText primary="Logout" />
								</ListItem>
							</>
						}
					</Box>
				</Drawer>
			</div>,
			mobileMenuContainer
		)
	);
}