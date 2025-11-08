"use client"

import * as React from "react"
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { MotionConfig } from "framer-motion"

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#0a0c10", paper: "rgba(255, 255, 255, 0.04)" },
    text: { primary: "#e6e8eb" },
    primary: { main: "#42e8e0", contrastText: "#0a0c10" },
    secondary: { main: "#6cf3ed", contrastText: "#0a0c10" },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  shape: { borderRadius: 16 },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <MotionConfig reducedMotion="user">
        <CssBaseline />
        {children}
      </MotionConfig>
    </MuiThemeProvider>
  )
}
