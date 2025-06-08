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
} from '@mui/material';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SecurityIcon from '@mui/icons-material/Security';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Features from '../components/common/features';
import Hero from '../components/common/Hero';

function Home() {
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
      <Hero />

      {/* Features Section */}
      <Box sx={{ backgroundColor: '#0d1117' }}>
        <Features />
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(90deg, #00e0ff, #0066ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: 1,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            mb: 4
          }}
        >
          Our Services
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                p: 2,
                transition: 'all 0.3s ease-in-out, box-shadow 0.5s ease-in-out',
                boxShadow: '0 12px 20px rgba(0, 0, 0, 0.3)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 224, 255, 0.3), 0 0 40px rgba(0, 224, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  '& .MuiSvgIcon-root': {
                    color: '#00e0ff',
                    transform: 'scale(1.1)',
                  },
                  '& .MuiTypography-h5': {
                    color: '#00e0ff',
                  },
                  '& .MuiTypography-body1': {
                    color: '#fff',
                  }
                }
              }}>
                <Box sx={{ 
                  color: 'primary.main', 
                  mb: 2,
                  transition: 'all 0.3s ease-in-out',
                }}>
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
