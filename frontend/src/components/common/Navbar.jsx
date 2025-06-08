import React, { useContext, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Fade,
  Grow,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AuthContext } from '../../contexts/AuthContext';

function Navbar({ toggleTheme }) {
  const { isAuthenticated, userRole, logout } = useContext(AuthContext);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    {
      label: 'Services',
      dropdown: ['Smart Metro', '24/7 Service', 'Safe Travel', 'Real-time Updates'],
    },
    {
      label: 'Tickets',
      dropdown: ['Book Ticket', 'Season Pass', 'Group Booking', 'Special Offers'],
    },
    {
      label: 'Support',
      dropdown: ['Help Center', 'Contact Us', 'FAQs', 'Feedback'],
    },
    {
      label: 'About',
    },
  ];

  const renderDesktopNav = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {navItems.map((item, index) => (
        <Box
          key={index}
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => setHoveredItem(null)}
          sx={{
            position: 'relative',
          }}
        >
          <Button
            endIcon={item.dropdown && <KeyboardArrowDownIcon />}
            sx={{
              color: '#fff',
              '&:hover': {
                color: '#00e0ff',
              },
            }}
          >
            {item.label}
          </Button>
          {item.dropdown && (
            <Grow
              in={hoveredItem === index}
              style={{ transformOrigin: '0 0 0' }}
              timeout={200}
            >
              <Box
                className="dropdown-menu"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                sx={{
                  position: 'absolute',
                  left: 0,
                  mt: 1,
                  minWidth: 200,
                  backgroundColor: '#0d1117',
                  borderRadius: 1,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  zIndex: 1000,
                  opacity: hoveredItem === index ? 1 : 0,
                  transform: hoveredItem === index ? 'translateY(0)' : 'translateY(-10px)',
                  pointerEvents: hoveredItem === index ? 'auto' : 'none',
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {item.dropdown.map((subItem, subIdx) => (
                  <Button
                    key={subIdx}
                    fullWidth
                    sx={{
                      justifyContent: 'flex-start',
                      px: 2,
                      py: 1,
                      color: '#fff',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 224, 255, 0.1)',
                        color: '#00e0ff',
                        transform: 'translateX(5px)',
                      },
                    }}
                  >
                    {subItem}
                  </Button>
                ))}
              </Box>
            </Grow>
          )}
        </Box>
      ))}
    </Box>
  );

  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        color: '#fff',
        backdropFilter: 'blur(8px)',
        background: 'rgba(13, 17, 23, 0.3)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            background: 'linear-gradient(90deg, #00e0ff, #0066ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
            fontSize: '1.5rem',
            letterSpacing: 0.5,
            '&:hover': {
              textShadow: '0 0 8px rgba(0, 224, 255, 0.5)',
            },
          }}
        >
          🚇 MetroTix
        </Typography>

        {!isMobile && renderDesktopNav()}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {!isMobile && (
            <>
              {!isAuthenticated ? (
                <>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    sx={{
                      color: '#00e0ff',
                      borderColor: '#00e0ff',
                      '&:hover': {
                        borderColor: '#00c6ff',
                        backgroundColor: 'rgba(0, 224, 255, 0.1)',
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(90deg, #00e0ff, #0066ff)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #00c6ff, #0052ff)',
                      },
                    }}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <Button
                  onClick={logout}
                  sx={{
                    color: '#ff4444',
                    borderColor: '#ff4444',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 68, 68, 0.1)',
                      borderColor: '#ff4444',
                    },
                  }}
                  variant="outlined"
                >
                  Logout
                </Button>
              )}
            </>
          )}
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: '#00e0ff',
              '&:hover': {
                backgroundColor: 'rgba(0, 224, 255, 0.1)',
              },
            }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: '#00e0ff',
                '&:hover': {
                  backgroundColor: 'rgba(0, 224, 255, 0.1)',
                },
              }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Menu */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            backgroundColor: '#0d1117',
            color: '#fff',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <List>
            {navItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  button
                  onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                  sx={{
                    color: '#fff',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 224, 255, 0.1)',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                  {item.dropdown && (
                    <KeyboardArrowDownIcon
                      sx={{
                        transform: openDropdown === index ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    />
                  )}
                </ListItem>
                {item.dropdown && (
                  <Collapse 
                    in={openDropdown === index} 
                    timeout={300}
                    easing={{
                      enter: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      exit: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <List component="div" disablePadding>
                      {item.dropdown.map((subItem, subIdx) => (
                        <ListItem
                          key={subIdx}
                          button
                          sx={{
                            pl: 4,
                            color: '#fff',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 224, 255, 0.1)',
                              color: '#00e0ff',
                              transform: 'translateX(5px)',
                            },
                          }}
                        >
                          <ListItemText primary={subItem} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
            {isAuthenticated && (
              <ListItem
                button
                onClick={logout}
                sx={{
                  color: '#ff4444',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 68, 68, 0.1)',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
