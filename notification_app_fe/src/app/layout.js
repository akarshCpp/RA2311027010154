"use client";

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import Link from 'next/link';
import { NotificationProvider } from '@/context/NotificationContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' }
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Campus Notifications</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NotificationProvider>
            <AppBar position="static" elevation={1}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                  Campus Notifications
                </Typography>
                <Link href="/" passHref style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'white', mr: 2 }}>All Notifications</Button>
                </Link>
                <Link href="/priority" passHref style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'white' }}>Priority Inbox</Button>
                </Link>
              </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
              <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 1 }}>
                {children}
              </Box>
            </Container>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
