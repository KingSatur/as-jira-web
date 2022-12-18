import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UIContext } from "../../context";
import NextLink from "next/link";

export const Navbar = () => {
  const { openDrawer } = useContext(UIContext);
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openDrawer}>
          <MenuIcon></MenuIcon>
        </IconButton>

        <NextLink href="/" passHref>
          <Typography variant="h6">Jira Clone</Typography>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
