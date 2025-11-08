"use client"

import * as React from "react"
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "var(--background)", paper: "var(--card)" },
    text: { primary: "var(--foreground)" },
    primary: { main: "var(--primary)", contrastText: "var(--primary-foreground)" },
    secondary: { main: "var(--accent)", contrastText: "var(--accent-foreground)" },
    divider: "var(--border)",
  },
  shape: { borderRadius: 16 },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
