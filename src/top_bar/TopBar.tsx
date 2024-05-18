import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography, Box } from '@mui/material';

interface CustomMenuItemProps {
  icon: any;
  label: string;
  menuItems: { label: string, onClick: () => void }[];
}

const CustomMenuItem: React.FC<CustomMenuItemProps> = ({ icon: Icon, label, menuItems }) => {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchor(null);
  };

  return (
    <div>
      <IconButton 
        size="large" 
        edge="end" 
        color="inherit" 
        aria-label={label} 
        onClick={handleMenuOpen}
      >
        <Icon />
      </IconButton>
      <Menu anchorEl={anchor} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
        keepMounted 
        transformOrigin={{ vertical: 'top', horizontal: 'right' }} 
        open={Boolean(anchor)} 
        onClose={handleMenuClose}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>{item.label}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

function TopMenu() {
  const menuItems = [
    { label: 'Temp', onClick: () => console.log('Temp') },
  ];

  const loginItems = [
    { label: 'Login', onClick: () => console.log('Login') },
  ];

  const userItems = [
    { label: 'Profile', onClick: () => console.log('Profile') },
    { label: 'My account', onClick: () => console.log('My account') },
    { label: 'Logout', onClick: () => console.log('Logout') }
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomMenuItem icon={AccountCircle} label="Account" menuItems={userItems} />
            <CustomMenuItem icon={MenuIcon} label="Account" menuItems={menuItems} />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopMenu;