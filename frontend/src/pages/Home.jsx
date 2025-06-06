import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SecurityIcon from '@mui/icons-material/Security';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Features from '../components/common/features';

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const services = [
    {
      icon: <DirectionsSubwayIcon sx={{ fontSize: 40 }} />,
      title: 'Smart Metro',
      description: 'Experience our state-of-the-art metro system with real-time tracking and updates.'
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Service',
      description: 'Round-the-clock metro services ensuring you reach your destination anytime.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Safe Travel',
      description: 'Your safety is our priority with advanced security systems and monitoring.'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0d1117', // GitHub dark background
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: 6,
              backdropFilter: 'blur(12px)',
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography
              variant={isMobile ? 'h4' : 'h2'}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(90deg, #00e0ff, #0066ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: 1,
              }}
            >
              Welcome to the Future of Metro Travel
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: '#ccc', maxWidth: 600, mx: 'auto', mb: 4 }}
            >
              Book smart, travel faster. Experience next-gen ticketing powered by tech.
            </Typography>

            <Box
              sx={{
                mt: 3,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                size="large"
                sx={{
                  px: 5,
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: 3,
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/register"
                size="large"
                sx={{
                  px: 5,
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: 3,
                  color: '#00e0ff',
                  borderColor: '#00e0ff',
                  '&:hover': {
                    borderColor: '#00c6ff',
                  },
                }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ backgroundColor: '#0d1117' }}>
        <Features />
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {service.icon}
                </Box>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom align="center">
                    {service.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="center">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ 
        bgcolor: 'grey.900', 
        color: 'white',
        py: 6,
        mt: 'auto'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Metro System
              </Typography>
              <Typography variant="body2" color="grey.400">
                Providing smart and efficient transportation solutions for everyone.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Connect With Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton color="inherit">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="inherit">
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="body2" color="grey.400" align="center" sx={{ mt: 4 }}>
            © {new Date().getFullYear()} Metro System. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
