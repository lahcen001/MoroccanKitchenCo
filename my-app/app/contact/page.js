'use client';

import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  TextField, 
  Button,
  IconButton
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // You could also add a success message here
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              fontFamily: 'Berlin Sans FB, Arial',
              color: '#c7923e',
              fontWeight: 700
            }}
          >
            Contact MoroccanKitchenCo
          </Typography>
          
          <Grid container spacing={6} sx={{ mt: 2 }}>
            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, height: '100%', backgroundColor: '#faf6f1' }}>
                <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                  Get in Touch
                </Typography>
                <Typography variant="body1" paragraph>
                  Have questions about our artisanal products or interested in becoming a partner? 
                  We&apos;d love to hear from you.
                </Typography>

                <Box sx={{ mt: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconButton sx={{ backgroundColor: '#c7923e', color: 'white', mr: 2 }}>
                      <EmailIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        artisans@moroccankitchen.com
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconButton sx={{ backgroundColor: '#c7923e', color: 'white', mr: 2 }}>
                      <PhoneIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography variant="body1">
                        +212 522-123456
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconButton sx={{ backgroundColor: '#c7923e', color: 'white', mr: 2 }}>
                      <LocationOnIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Showroom
                      </Typography>
                      <Typography variant="body1">
                        27 Boulevard Mohammed V
                        <br />
                        Casablanca 20250, Morocco
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                  Send Us a Message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={4}
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                          mt: 2,
                          backgroundColor: '#c7923e',
                          '&:hover': {
                            backgroundColor: '#a67934'
                          }
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>

          {/* Map or Additional Information */}
          <Paper sx={{ p: 4, mt: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
              Visit Our Showroom
            </Typography>
            <Typography variant="body1" paragraph>
              Experience our collection of handcrafted Moroccan kitchenware in person. 
              Our showroom in the heart of Casablanca features a curated selection of our finest pieces, 
              and our knowledgeable staff is here to help you find the perfect additions to your kitchen.
            </Typography>
            <Typography variant="body1">
              Hours: Monday - Saturday, 9:00 AM - 7:00 PM
              <br />
              Friday: 2:30 PM - 7:00 PM
              <br />
              Sunday: Closed
            </Typography>
          </Paper>
        </Box>
      </Container>
      <Footer />
    </>
  );
} 