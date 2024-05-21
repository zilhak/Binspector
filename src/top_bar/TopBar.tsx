import AccountCircle from "@mui/icons-material/AccountCircle";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import React, { useRef, useState } from "react";

interface CustomMenuItemProps {
  icon: any;
  label: string;
  menuItems: { label: string; onClick: () => void }[];
}

const CustomMenuItem = ({
  icon: Icon,
  label,
  menuItems,
}: CustomMenuItemProps) => {
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
      <Menu
        anchorEl={anchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchor)}
        onClose={handleMenuClose}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

interface CustomButtonItemProps {
  icon: any;
  label: string;
  onClick: () => void;
}

const CustomButtonItem = ({
  icon: Icon,
  label,
  onClick,
}: CustomButtonItemProps) => {
  return (
    <IconButton
      size="large"
      edge="end"
      color="inherit"
      aria-label={label}
      onClick={onClick}
    >
      <Icon />
    </IconButton>
  );
};

function TopMenu() {
  const [isLogin, setLogin] = React.useState(false);

  const menuItems = [{ label: "Temp", onClick: () => console.log("Temp") }];

  const loginItems = [{ label: "Login", onClick: () => console.log("Login") }];

  const userItems = [
    { label: "Profile", onClick: () => console.log("Profile") },
    { label: "My account", onClick: () => console.log("My account") },
    { label: "Logout", onClick: () => console.log("Logout") },
  ];

  const userMenu = isLogin ? userItems : loginItems;
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <CustomButtonItem
              icon={FileOpenIcon}
              label="Menu"
              onClick={handleButtonClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CustomMenuItem
              icon={AccountCircle}
              label="Account"
              menuItems={userMenu}
            />
            <CustomMenuItem
              icon={MenuIcon}
              label="Account"
              menuItems={menuItems}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopMenu;
