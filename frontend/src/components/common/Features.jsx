import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import QrCodeIcon from '@mui/icons-material/QrCode';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const features = [
  {
    title: 'Smart Ticketing',
    description: 'Book and scan your metro tickets using secure QR codes—no paper, no hassle.',
    icon: <QrCodeIcon sx={{ fontSize: 40, color: '#00e0ff' }} />,
  },
  {
    title: 'Digital Wallet',
    description: 'Recharge, manage and track your wallet balance directly from your dashboard.',
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 40, color: '#00e0ff' }} />,
  },
  {
    title: 'Live Metro Status',
    description: 'Stay updated with real-time metro timings and delays across all routes.',
    icon: <AccessTimeIcon sx={{ fontSize: 40, color: '#00e0ff' }} />,
  },
  {
    title: 'Admin Control Panel',
    description: 'Admins can monitor users, generate reports and manage operations easily.',
    icon: <TrainIcon sx={{ fontSize: 40, color: '#00e0ff' }} />,
  },
];

const Features = () => {
  return (
    <Box
      sx={{
        py: 8,
        px: 3,
        backgroundColor: '#0d1117',
        color: '#fff',
      }}
    >
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom
        sx={{
          fontWeight: 800,
          background: 'linear-gradient(90deg, #00e0ff, #0066ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: 1,
        }}
      >
        Powerful Features
      </Typography>
      <Typography 
        variant="subtitle1" 
        align="center" 
        sx={{ 
          color: '#ccc', 
          maxWidth: 600, 
          mx: 'auto', 
          mb: 6 
        }}
      >
        All-in-one platform for seamless metro travel experience
      </Typography>
      <Grid container spacing={4} justifyContent="center" mt={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(0, 224, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <Box 
                mb={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 60,
                }}
              >
                {feature.icon}
              </Box>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              >
                {feature.title}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#ccc',
                  lineHeight: 1.6,
                }}
              >
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features;
