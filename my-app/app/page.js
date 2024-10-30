'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Paper, 
  Divider, 
  Button,
  Grow,
  Fade,
  Zoom
} from '@mui/material';
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
    image: 'https://images.unsplash.com/photo-1578678809532-6e7da45c07e4',
    category: 'Cookware',
    etsyUrl: 'https://www.etsy.com/listing/your-tagine-listing'
  },
  {
    id: 2,
    name: 'Luxury Tea Set',
    description: 'Complete silver-plated tea service including teapot, tray, and 6 traditional glasses.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61',
    category: 'Tea & Coffee',
    etsyUrl: 'https://www.etsy.com/listing/your-tea-set-listing'
  },
  {
    id: 3,
    name: 'Moroccan Spice Collection',
    description: 'Premium selection of authentic Moroccan spices including Ras el Hanout and Saffron.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b',
    category: 'Spices',
    etsyUrl: 'https://www.etsy.com/listing/your-spice-listing'
  }
];

const categoryImages = [
  {
    name: 'Cookware',
    image: 'https://images.unsplash.com/photo-1578678809532-6e7da45c07e4', // Tagine image
    description: 'Traditional Moroccan Cookware'
  },
  {
    name: 'Spices',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b', // Spices image
    description: 'Authentic Moroccan Spices'
  },
  {
    name: 'Tea Sets',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61', // Tea set image
    description: 'Handcrafted Tea Sets'
  },
  {
    name: 'Tableware',
    image: 'https://images.unsplash.com/photo-1578670812003-60745e2c2ea9', // Ceramic plates image
    description: 'Artisanal Tableware'
  }
];

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({
    story: false,
    products: false,
    categories: false,
    cta: false
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe sections
    ['story', 'products', 'categories', 'cta'].forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  const handleBuyOnEtsy = (etsyUrl) => {
    window.open(etsyUrl, '_blank');
  };

  return (
    <Box maxWidth="100%">
      {/* Hero Section with Enhanced Slider */}
      <Box 
        sx={{ 
          position: 'relative',
          height: '600px',
          mb: 8,
          overflow: 'hidden'
        }}
      >
        {sliderImages.map((slide, index) => (
          <Fade 
            key={index} 
            in={currentSlide === index} 
            timeout={1000}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: currentSlide === index ? 'block' : 'none'
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
          </Fade>
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

      {/* Story Section with Animation */}
      <Box id="story">
        <Grow in={isVisible.story} timeout={1000}>
          <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, mb: 8, backgroundColor: '#faf6f1' }}>
            <Container maxWidth="lg">
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{ 
                      position: 'relative',
                      width: '100%',
                      height: '400px',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: 3
                    }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1596797038530-2c107229654b"
                      alt="Traditional Moroccan Artisan Workshop"
                      fill
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Playfair Display, serif' }}>
                    Our Story
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Immerse yourself in the rich traditions of Moroccan craftsmanship. Our carefully curated collection 
                    brings the authentic artistry of Morocco's finest artisans directly to your kitchen.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Each piece in our collection is handpicked from skilled artisans in Morocco's historic 
                    craft centers, ensuring you receive only the finest quality traditional kitchenware. 
                    Every item tells a story of generations of expertise and cultural heritage.
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Grow>
      </Box>

      {/* Featured Products Section with Animation */}
      <Box id="products">
        <Fade in={isVisible.products} timeout={1500}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 8 }}>
              <Typography variant="h3" sx={{ mb: 4, fontFamily: 'Playfair Display, serif', textAlign: 'center' }}>
                Featured Products
              </Typography>
              <Grid container spacing={4}>
                {featuredProducts.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Zoom in={isVisible.products} style={{ transitionDelay: `${index * 200}ms` }}>
                      <Card sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transform: 'translateY(0)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-10px)',
                          boxShadow: 6
                        }
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
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Fade>
      </Box>

      {/* Categories Preview with Animation */}
      <Box id="categories">
        <Fade in={isVisible.categories} timeout={1000}>
          <Box sx={{ mb: 8, px: { xs: 0, md: 0 } }}>
            <Typography variant="h3" sx={{ mb: 4, fontFamily: 'Playfair Display, serif', textAlign: 'center' }}>
              Explore Our Categories
            </Typography>
            <Grid container spacing={0}>
              {categoryImages.map((category, index) => (
                <Grid item xs={12} sm={6} md={3} key={category.name}>
                  <Zoom in={isVisible.categories} style={{ transitionDelay: `${index * 200}ms` }}>
                    <Paper
                      sx={{
                        position: 'relative',
                        height: 300,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        borderRadius: 0,
                        transform: 'scale(1)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          '& .overlay': {
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          },
                          '& .category-content': {
                            transform: 'translateY(-10px)',
                          }
                        }
                      }}
                      onClick={() => router.push('/products')}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
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
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease-in-out'
                          }}
                        >
                          <Box
                            className="category-content"
                            sx={{
                              textAlign: 'center',
                              transition: 'transform 0.3s ease-in-out',
                              color: 'white'
                            }}
                          >
                            <Typography 
                              variant="h5" 
                              sx={{ 
                                fontWeight: 'bold',
                                mb: 1,
                                fontFamily: 'Playfair Display'
                              }}
                            >
                              {category.name}
                            </Typography>
                            <Typography 
                              variant="body1"
                              sx={{
                                opacity: 0.9
                              }}
                            >
                              {category.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Box>

      {/* Call to Action with Animation */}
      <Box id="cta">
        <Grow in={isVisible.cta} timeout={1000}>
          <Container maxWidth="lg">
            <Box 
              sx={{ 
                textAlign: 'center',
                py: 8,
                px: { xs: 2, md: 4 },
                backgroundColor: '#faf6f1',
                borderRadius: 2,
                mb: 4,
                transform: 'translateY(0)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
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
        </Grow>
      </Box>

      <Footer />
    </Box>
  );
} 