import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UIContext } from "../../context";

export const Navbar = () => {
  const { openDrawer } = useContext(UIContext);
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openDrawer}>
          <MenuIcon></MenuIcon>
        </IconButton>
        <Typography variant="h6">Jira clone</Typography>
      </Toolbar>
    </AppBar>
  );
};
