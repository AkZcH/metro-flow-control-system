import React, { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { User, Settings, LogOut } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';

function Navbar({ toggleTheme }) {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAdminLogout = () => {
    logout();
    handleMenuClose();
  };

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
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                color: '#00e0ff',
                textShadow: '0 0 5px rgba(0, 224, 255, 0.4)',
                transition: 'all 0.3s ease-in-out',
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
                    component={RouterLink}
                    to={`/${item.label.toLowerCase()}/${subItem.toLowerCase().replace(/ /g, '-')}`}
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
        backdropFilter: 'blur(10px) brightness(80%)',
        background: 'linear-gradient(to right, rgba(13, 17, 23, 0.6), rgba(25, 29, 36, 0.6))',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
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
                    to="/login-gateway"
                    variant="outlined"
                    sx={{
                      color: '#00e0ff',
                      borderColor: '#00e0ff',
                      fontWeight: 600,
                      borderRadius: '8px',
                      padding: '8px 18px',
                      '&:hover': {
                        borderColor: '#00c6ff',
                        backgroundColor: 'rgba(0, 224, 255, 0.1)',
                        boxShadow: '0 0 15px rgba(0, 224, 255, 0.4)',
                      },
                      transition: 'all 0.3s ease-in-out',
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
                      fontWeight: 600,
                      borderRadius: '8px',
                      padding: '8px 18px',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #00c6ff, #0052ff)',
                        boxShadow: '0 0 15px rgba(0, 102, 255, 0.6)',
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton onClick={toggleTheme} color="inherit" size="large">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>

                  {user?.role === 'admin' ? (
                    <>
                      <IconButton onClick={handleMenuClick} color="inherit" size="large">
                        <Avatar sx={{ bgcolor: '#8a2be2' }}>
                          <User />
                        </Avatar>
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                          sx: {
                            backgroundColor: '#1a1a1a',
                            color: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          },
                        }}
                      >
                        <MenuItem
                          onClick={handleMenuClose}
                          component={RouterLink}
                          to="/admin/dashboard"
                          sx={{
                            '&:hover': {
                              backgroundColor: 'rgba(0, 224, 255, 0.1)',
                              color: '#00e0ff',
                            },
                          }}
                        >
                          <Settings sx={{ mr: 1, fontSize: '1.2rem' }} /> Admin Dashboard
                        </MenuItem>
                        <MenuItem
                          onClick={handleAdminLogout}
                          sx={{
                            '&:hover': {
                              backgroundColor: 'rgba(255, 0, 0, 0.1)',
                              color: '#ff0000',
                            },
                          }}
                        >
                          <LogOut sx={{ mr: 1, fontSize: '1.2rem' }} /> Logout
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Button
                      onClick={logout}
                      variant="outlined"
                      sx={{
                        color: '#00e0ff',
                        borderColor: '#00e0ff',
                        fontWeight: 600,
                        borderRadius: '8px',
                        padding: '8px 18px',
                        '&:hover': {
                          borderColor: '#00c6ff',
                          backgroundColor: 'rgba(0, 224, 255, 0.1)',
                        },
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      Logout
                    </Button>
                  )}
                </Box>
              )}
            </>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 0 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            backgroundColor: '#0d1117',
            color: '#fff',
          },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <IconButton sx={{ my: 2 }}>
            <CloseIcon sx={{ color: '#fff' }} />
          </IconButton>
          <List>
            {navItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  button
                  onClick={() => item.dropdown && setOpenDropdown(openDropdown === index ? null : index)}
                  sx={{ '&:hover': { backgroundColor: 'rgba(0, 224, 255, 0.1)' } }}
                >
                  <ListItemText primary={item.label} />
                  {item.dropdown && (
                    openDropdown === index ? <KeyboardArrowDownIcon sx={{ transform: 'rotate(180deg)' }} /> : <KeyboardArrowDownIcon />
                  )}
                </ListItem>
                {item.dropdown && (
                  <Collapse in={openDropdown === index} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.dropdown.map((subItem, subIdx) => (
                        <ListItem
                          key={subIdx}
                          button
                          component={RouterLink}
                          to={`/${item.label.toLowerCase()}/${subItem.toLowerCase().replace(/ /g, '-')}`}
                          sx={{
                            pl: 4,
                            '&:hover': { backgroundColor: 'rgba(0, 224, 255, 0.05)' },
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
            {!isAuthenticated ? (
              <>
                <ListItem button component={RouterLink} to="/login-gateway" sx={{ '&:hover': { backgroundColor: 'rgba(0, 224, 255, 0.1)' } }}>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={RouterLink} to="/register" sx={{ '&:hover': { backgroundColor: 'rgba(0, 224, 255, 0.1)' } }}>
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            ) : (
              <ListItem button onClick={logout} sx={{ '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.1)' } }}>
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
