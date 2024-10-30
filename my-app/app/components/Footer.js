'use client';

import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Image from 'next/image';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#2b2b2b', color: 'white', pt: 6, pb: 3, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Image
                src="/images/logo/logo.png"
                alt="Moroccan Kitchen Co Logo"
                width={50}
                height={50}
                style={{ objectFit: 'contain' }}
              />
              <Typography variant="h6" sx={{ fontFamily: 'Playfair Display' }}>
                Moroccan Kitchen Co
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Connecting you with authentic Moroccan artisans and their handcrafted kitchen treasures. Each piece tells a story of tradition and craftsmanship.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
              Quick Links
            </Typography>
            <Link href="/products" color="inherit" display="block" sx={{ mb: 1 }}>
              Artisanal Products
            </Link>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              Our Artisans
            </Link>
            <Link href="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: artisans@moroccankitchen.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2">
              Showroom: 123 Market Street
              <br />
              San Francisco, CA 94105
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Typography variant="body2" align="center" sx={{ pt: 2 }}>
          © {new Date().getFullYear()} Moroccan Kitchen Co. Supporting artisans and preserving traditions.
        </Typography>
      </Container>
    </Box>
  );
} 