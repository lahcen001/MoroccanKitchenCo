'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Paper, Divider, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Footer from './components/Footer';
import Image from 'next/image';

const sliderImages = [
  {
    url: 'https://images.unsplash.com/photo-1547637589-f54c34f5d7a4',
    title: 'Authentic Moroccan Tagines',
    description: 'Handcrafted with traditional techniques'
  },
  {
    url: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b',
    title: 'Artisanal Craftsmanship',
    description: 'Each piece tells a unique story'
  },
  {
    url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b',
    title: 'Premium Spice Blends',
    description: 'Experience the flavors of Morocco'
  }
];

const featuredProducts = [
  {
    id: 1,
    name: 'Traditional Tagine',
    description: 'Handcrafted clay cooking pot perfect for slow-cooking stews, meats, and vegetables.',
    price: 49.99,
    image: '/images/tagine.jpg',
    category: 'Cookware',
    etsyUrl: 'https://www.etsy.com/listing/your-tagine-listing'
  },
  {
    id: 7,
    name: 'Luxury Tea Set',
    description: 'Complete silver-plated tea service including teapot, tray, and 6 traditional glasses.',
    price: 89.99,
    image: '/images/tea-set.jpg',
    category: 'Tea & Coffee',
    etsyUrl: 'https://www.etsy.com/listing/your-tea-set-listing'
  },
  {
    id: 4,
    name: 'Premium Ras el Hanout',
    description: 'Our signature blend of 27 spices including saffron, rose petals, cinnamon, and cumin.',
    price: 14.99,
    image: '/images/ras-el-hanout.jpg',
    category: 'Spices',
    etsyUrl: 'https://www.etsy.com/listing/your-spice-listing'
  }
];

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleBuyOnEtsy = (etsyUrl) => {
    window.open(etsyUrl, '_blank');
  };

  return (
    <Box maxWidth="100%">
      {/* Hero Section with Slider */}
      <Box 
        sx={{ 
          position: 'relative',
          height: '600px',
          mb: 8,
          overflow: 'hidden'
        }}
      >
        {sliderImages.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                src={slide.url}
                alt={slide.title}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority={index === 0} // Load first image immediately
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  textAlign: 'center',
                  px: 4
                }}
              >
                <Typography 
                  variant="h1" 
                  sx={{ 
                    mb: 2,
                    fontFamily: 'Playfair Display, serif',
                    fontSize: { xs: '2.5rem', md: '4rem' }
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography variant="h5" sx={{ mb: 4 }}>
                  {slide.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        
        {/* Slider Navigation Dots */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2
          }}
        >
          {sliderImages.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Story Section */}
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, mb: 8, backgroundColor: '#faf6f1' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="/images/moroccan-kitchen.jpg"
                alt="Traditional Moroccan Kitchen"
                sx={{ 
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Playfair Display, serif' }}>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                Immerse yourself in the rich culinary traditions of Morocco. Our carefully curated collection brings the warmth and authenticity of Moroccan cooking to your home.
              </Typography>
              <Typography variant="body1" paragraph>
                Each piece in our collection is handpicked from skilled artisans, ensuring you receive only the finest quality traditional cookware and ingredients.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Featured Products Section */}
      <Container maxWidth="lg">
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ mb: 4, fontFamily: 'Playfair Display, serif', textAlign: 'center' }}>
            Featured Products
          </Typography>
          <Grid container spacing={4}>
            {featuredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 6
                  },
                  transition: 'box-shadow 0.3s ease-in-out'
                }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="overline" display="block" color="primary">
                      {product.category}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2, color: '#c7923e' }}>
                      ${product.price}
                    </Typography>
                    <Button 
                      variant="contained" 
                      sx={{ 
                        mt: 2,
                        backgroundColor: '#c7923e',
                        '&:hover': {
                          backgroundColor: '#a67934'
                        }
                      }}
                      onClick={() => handleBuyOnEtsy(product.etsyUrl)}
                      fullWidth
                    >
                      Buy on Etsy
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Categories Preview */}
      <Box sx={{ mb: 8, px: { xs: 0, md: 0 } }}>
        <Typography variant="h3" sx={{ mb: 4, fontFamily: 'Playfair Display, serif', textAlign: 'center' }}>
          Explore Our Categories
        </Typography>
        <Grid container spacing={0}>
          {['Cookware', 'Spices', 'Tea Sets', 'Tableware'].map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category}>
              <Paper
                sx={{
                  position: 'relative',
                  height: 200,
                  backgroundImage: `url(/images/category-${category.toLowerCase().replace(' ', '-')}.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  cursor: 'pointer',
                  borderRadius: 0,
                  '&:hover': {
                    '& .overlay': {
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    }
                  }
                }}
                onClick={() => router.push('/products')}
              >
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.3s ease-in-out'
                  }}
                >
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {category}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            textAlign: 'center',
            py: 8,
            px: { xs: 2, md: 4 },
            backgroundColor: '#faf6f1',
            borderRadius: 2,
            mb: 4
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Playfair Display, serif' }}>
            Explore Our Full Collection
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Discover our complete range of authentic Moroccan cookware, spices, and accessories. 
            Transform your kitchen with traditional Moroccan craftsmanship.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => router.push('/products')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              backgroundColor: '#c7923e',
              '&:hover': {
                backgroundColor: '#a67934'
              }
            }}
          >
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
} 