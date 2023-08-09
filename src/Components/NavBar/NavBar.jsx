import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { BiSolidPlusSquare } from "react-icons/bi";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import FormComponent from "../FormComponent/FormComponent";
import "./NavBar.css";

const drawerWidth = 540;
const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Cards",
    path: "cards",
  },
  {
    name: "Graph",
    path: "graph",
  },
];

export default function DrawerAppBar(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <div className="drawer__content">
      <FormComponent
        handleDrawerToggle={handleDrawerToggle}
        setEmployeeData={props.setEmployeeData}
        addEmployeeToList={props.addEmployeeToList}
      />
    </div>
  );

  return (
    <div sx={{ display: "flex" }}>
      <div className="navbar__container">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <BiSolidPlusSquare className="navbar__plus__icon" />
        </IconButton>

        <div className="navbar__links__container">
          {navItems.map((item) => (
            <Button key={item.name} sx={{ color: "#fff" }}>
              <NavLink to={item.path} className="navbar__link">
                {item.name}
              </NavLink>
            </Button>
          ))}
        </div>
      </div>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
}
