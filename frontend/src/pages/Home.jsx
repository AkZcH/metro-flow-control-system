import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        mt: 8, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Metro System
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          Your Smart Transportation Solution
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/login"
            size="large"
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            component={Link} 
            to="/register"
            size="large"
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home; 