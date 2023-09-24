"use client";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import React from "react";
const APP_BASE_PATH = process.env.APP_BASE_PATH;

interface Props {
  children: React.ReactNode;
}

const Provider = ({ children }: Props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider basePath={`${APP_BASE_PATH}/api/auth`}>
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Provider;
