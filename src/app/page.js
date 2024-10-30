'use client';

import { Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Moroccan Kitchen
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Discover authentic Moroccan cookware and ingredients
        </Typography>
      </Box>
    </Container>
  );
} 