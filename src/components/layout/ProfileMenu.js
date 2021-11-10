import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { useContext } from "react";
import { SessionContext } from "./../../store/SessionContext";

function ProfileMenu({ anchorEl, open, handleClose, onMyProfileClick, onLogout }) {

	const { session, setSession } = useContext(SessionContext);
	
	return (
		<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			onClick={handleClose}
			PaperProps={{
				elevation: 0,
				sx: {
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: 1.5,
					'& .MuiAvatar-root': {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1,
					},
					'&:before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: 0,
						right: 14,
						width: 10,
						height: 10,
						bgcolor: 'background.paper',
						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: 0,
					},
				},
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
		>
			{session.isAgency && (
				<MenuItem onClick={onMyProfileClick} sx={{ justifyContent:"space-between" }}>
					<Avatar /> Profile
				</MenuItem>	
			)}
			{session.isAgency && (
				<Divider />
			)}
			<MenuItem onClick={onLogout} sx={{ justifyContent:"space-between" }}>
				<Logout /> Logout
			</MenuItem>
		</Menu>
	);
}

export default ProfileMenu;