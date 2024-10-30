'use client';

import { Container, Typography, Box, Paper } from '@mui/material';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            About Moroccan Kitchen Co
          </Typography>
          
          <Paper sx={{ p: 4, mt: 4 }}>
            <Typography variant="body1" paragraph>
              Welcome to Moroccan Kitchen Co, your bridge to the master artisans of Morocco. 
              We are dedicated to showcasing the exceptional craftsmanship of traditional Moroccan 
              kitchenware, connecting you directly with the skilled hands that create these timeless pieces.
            </Typography>
            
            <Typography variant="body1" paragraph>
              Our carefully curated collection features handcrafted tagines, hand-beaten copper cookware, 
              hand-painted ceramics, and intricately designed tea sets. Each piece is a testament to 
              centuries-old techniques passed down through generations of Moroccan artisans.
            </Typography>
            
            <Typography variant="body1" paragraph>
              We work directly with family-owned workshops and individual craftsmen across Morocco, 
              ensuring fair compensation and supporting the preservation of traditional craftsmanship. 
              Every item in our collection tells the story of its maker and carries the soul of 
              Moroccan artistry.
            </Typography>

            <Typography variant="body1" paragraph>
              At Moroccan Kitchen Co, we believe that artisanal kitchenware is more than just functional – 
              it's a celebration of culture, tradition, and human creativity. Our mission is to help preserve 
              these ancient crafts while bringing their beauty into modern homes.
            </Typography>

            <Typography variant="body1" paragraph>
              Whether you're a collector of fine craftsmanship or someone who appreciates the beauty of 
              handmade pieces, we invite you to explore our collection of authentic Moroccan artisanal 
              kitchenware. Each piece not only enhances your kitchen but also supports the artisans who 
              keep these traditional crafts alive.
            </Typography>
          </Paper>
        </Box>
      </Container>
      <Footer />
    </>
  );
} 