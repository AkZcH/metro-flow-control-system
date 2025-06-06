import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
} from '@mui/material';

function Navbar() {
  const location = useLocation();
  const theme = useTheme();

  const navLinks = [
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' },
    { label: 'Admin', path: '/admin/login' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: theme.palette.primary.main,
            fontWeight: 700,
            fontSize: '1.5rem',
            letterSpacing: 0.5,
            '&:hover': {
              textShadow: `0 0 4px ${theme.palette.primary.light}`,
            },
          }}
        >
          🚇 MetroTix
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {navLinks.map(({ label, path }) => (
            <Button
              key={label}
              component={RouterLink}
              to={path}
              variant={isActive(path) ? 'contained' : 'text'}
              color="primary"
              sx={{
                fontWeight: 500,
                textTransform: 'none',
                borderRadius: 2,
                boxShadow: isActive(path) ? 1 : 0,
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
