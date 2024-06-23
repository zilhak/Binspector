import AccountCircle from "@mui/icons-material/AccountCircle";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, SvgIconTypeMap } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Toolbar from "@mui/material/Toolbar";
import "./TopMenu.css";
import { FileContext } from "@/hooks/FileReferenceContext";

import {
  ChangeEvent,
  useContext,
  MouseEvent,
  useRef,
  useState,
} from "react";

export function TopMenu() {
  const setFile = useContext(FileContext).setFile;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLogin, setLogin] = useState(false);

  const menuItems = [{ label: "Change Theme", onClick: () => document.body.classList.toggle("dark-theme") }];

  const loginItems = [{ label: "Login", onClick: () => console.log("Login") }];

  const userItems = [
    { label: "Profile", onClick: () => console.log("Profile") },
    { label: "My account", onClick: () => console.log("My account") },
    { label: "Logout", onClick: () => console.log("Logout") },
  ];

  const userMenu = isLogin ? userItems : loginItems;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
    event.target.value = "";
  };

  return (
    <div>
      <AppBar position="static" className="top-bar">
        <Toolbar>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <CustomButtonItem
              Icon={FileOpenIcon}
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
              Icon={AccountCircle}
              label="Account"
              menuItems={userMenu}
            />
            <CustomMenuItem
              Icon={MenuIcon}
              label="Account"
              menuItems={menuItems}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

interface CustomMenuItemProps {
  Icon: OverridableComponent<SvgIconTypeMap>;
  label: string;
  menuItems: { label: string; onClick: () => void }[];
}

const CustomMenuItem = (props: CustomMenuItemProps) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
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
        aria-label={props.label}
        onClick={handleMenuOpen}
      >
        <props.Icon />
      </IconButton>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchor)}
        onClose={handleMenuClose}
      >
        {props.menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

interface CustomButtonItemProps {
  Icon: OverridableComponent<SvgIconTypeMap>;
  label: string;
  onClick: () => void;
}

const CustomButtonItem = (props: CustomButtonItemProps) => {
  return (
    <IconButton
      size="large"
      edge="end"
      color="inherit"
      aria-label={props.label}
      onClick={props.onClick}
    >
      <props.Icon />
    </IconButton>
  );
};
