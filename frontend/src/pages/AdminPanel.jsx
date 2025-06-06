import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth.js';

function AdminPanel() {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Total Users
              </Typography>
              {/* TODO: Add total users count */}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Active Tickets
              </Typography>
              {/* TODO: Add active tickets count */}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Revenue
              </Typography>
              {/* TODO: Add revenue information */}
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              {/* TODO: Add recent activities list */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default AdminPanel; 