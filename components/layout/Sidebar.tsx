import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { UIContext } from "../../context";

const menuItems: string[] = ["tasks", "config"];

export const Sidebar = () => {
  const { sidemenuOpen, closeDrawer } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sidemenuOpen} onClose={closeDrawer}>
      <Box sx={{ width: 250 }}></Box>

      <Box sx={{ padding: "5px 10px" }}>
        <Typography variant="h4">Menu</Typography>
      </Box>

      <List>
        {menuItems?.map((text, index) => (
          <ListItemButton key={text}>
            <ListItemIcon>{index % 2 === 0 ? <></> : <></>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <List>
        {menuItems?.map((text, index) => (
          <ListItemButton key={text}>
            <ListItemIcon>{index % 2 === 0 ? <></> : <></>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};
