import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth.js';

function UserDashboard() {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.name || 'User'}
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Active Tickets
              </Typography>
              {/* TODO: Add active tickets list */}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Trips
              </Typography>
              {/* TODO: Add recent trips list */}
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              {/* TODO: Add quick action buttons */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default UserDashboard; 