import { Box } from "@mui/material";
import Head from "next/head";
import React, { FC, PropsWithChildren, useContext } from "react";
import { UIContext } from "../../context";
import { Navbar } from "../ui";
import { Sidebar } from "../ui/Sidebar";

interface Props {
  title?: string;
}

export const Layout: FC<PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <Sidebar />

      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
