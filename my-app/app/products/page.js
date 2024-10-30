'use client';

import { useState, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Box,
  Drawer,
  Slider,
  Divider,
  useMediaQuery,
  IconButton,
  Pagination,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import { useTheme } from '@mui/material/styles';
import Footer from '../components/Footer';

// Static product data
const staticProducts = [
  {
    listing_id: 1,
    title: 'Traditional Moroccan Tagine',
    description: 'Handcrafted clay cooking pot perfect for slow-cooking stews, meats, and vegetables. Authentic Moroccan design with intricate patterns.',
    price: { amount: 4999, divisor: 100 },
    url: 'https://www.etsy.com',
    images: [{ url_570xN: 'https://images.unsplash.com/photo-1578678809532-6e7da45c07e4' }]
  },
  {
    listing_id: 2,
    title: 'Moroccan Tea Set',
    description: 'Complete silver-plated tea service including teapot, tray, and 6 traditional glasses. Perfect for serving authentic Moroccan mint tea.',
    price: { amount: 8999, divisor: 100 },
    url: 'https://www.etsy.com',
    images: [{ url_570xN: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61' }]
  },
  {
    listing_id: 3,
    title: 'Handmade Ceramic Plates Set',
    description: 'Set of 4 hand-painted ceramic plates with traditional Moroccan patterns. Perfect for serving or as decorative pieces.',
    price: { amount: 6999, divisor: 100 },
    url: 'https://www.etsy.com',
    images: [{ url_570xN: 'https://images.unsplash.com/photo-1578670812003-60745e2c2ea9' }]
  },
  {
    listing_id: 4,
    title: 'Moroccan Spice Collection',
    description: 'Premium selection of authentic Moroccan spices including Ras el Hanout, Saffron, and other traditional blends.',
    price: { amount: 3499, divisor: 100 },
    url: 'https://www.etsy.com',
    images: [{ url_570xN: 'https://images.unsplash.com/photo-1596797038530-2c107229654b' }]
  },
  {
    listing_id: 5,
    title: 'Copper Tea Kettle',
    description: 'Hand-beaten copper kettle with traditional Moroccan design. Perfect for preparing authentic Moroccan mint tea.',
    price: { amount: 5999, divisor: 100 },
    url: 'https://www.etsy.com',
    images: [{ url_570xN: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b' }]
  },
  {
    listing_id: 6,
    title: 'Moroccan Serving Tagine',
    description: 'Decorative serving tagine with intricate hand-painted designs. Perfect for presenting traditional Moroccan dishes.',
    price: { amount: 7999, divisor: 100 },
    url: 'https://www.etsy.com',
    images: [{ url_570xN: 'https://images.unsplash.com/photo-1547637589-f54c34f5d7a4' }]
  }
];

export default function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const productsPerPage = 6;

  useEffect(() => {
    setProducts(staticProducts);
    setLoading(false);
  }, []);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleBuyOnEtsy = (etsyUrl) => {
    window.open(etsyUrl, '_blank');
  };

  // Filter products based on search and price
  const filteredProducts = products.filter(product => {
    const price = product.price.amount / product.price.divisor;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    const matchesSearch = searchQuery === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPrice && matchesSearch;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.price.amount / a.price.divisor;
    const priceB = b.price.amount / b.price.divisor;
    
    switch (sortBy) {
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  const filterContent = (
    <Box sx={{ p: 2, width: isMobile ? 'auto' : 250 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ px: 2 }}>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={150}
          marks={[
            { value: 0, label: '$0' },
            { value: 150, label: '$150' }
          ]}
        />
      </Box>
    </Box>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', position: 'relative' }}>
          {isMobile ? (
            <>
              <IconButton 
                onClick={() => setMobileOpen(true)}
                sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: '#c7923e', color: 'white', 
                  '&:hover': { bgcolor: '#a67934' } }}
              >
                <FilterListIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
              >
                {filterContent}
              </Drawer>
            </>
          ) : (
            <Box sx={{ width: 250, flexShrink: 0, ml: 4 }}>
              {filterContent}
            </Box>
          )}

          <Box sx={{ 
            flexGrow: 1, 
            px: { xs: 2, md: 6 },
            ml: { xs: 0, md: 4 }
          }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ 
                pl: 2,
                fontFamily: 'Berlin Sans FB, Arial',
                color: '#c7923e',
                fontWeight: 700
              }}
            >
              MoroccanKitchenCo Products
            </Typography>

            {/* Search and Sort Controls */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              mb: 4,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' }
            }}>
              <TextField
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ flexGrow: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select
                  labelId="sort-select-label"
                  value={sortBy}
                  label="Sort By"
                  onChange={handleSortChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <SortIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="price-asc">Price: Low to High</MenuItem>
                  <MenuItem value="price-desc">Price: High to Low</MenuItem>
                  <MenuItem value="name-asc">Name: A to Z</MenuItem>
                  <MenuItem value="name-desc">Name: Z to A</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Results Count */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, pl: 2 }}>
              Showing {sortedProducts.length} results
            </Typography>

            {/* Products Grid */}
            <Grid container spacing={3}>
              {paginatedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.listing_id}>
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
                      height="200"
                      image={product.images[0]?.url_570xN}
                      alt={product.title}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                        {product.description.substring(0, 100)}...
                      </Typography>
                      <Box>
                        <Typography variant="h6" sx={{ color: '#c7923e' }}>
                          ${(product.price.amount / product.price.divisor).toFixed(2)}
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
                          onClick={() => handleBuyOnEtsy(product.url)}
                          fullWidth
                        >
                          Buy on Etsy
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 6,
                mb: 4
              }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#2b2b2b',
                    },
                    '& .Mui-selected': {
                      backgroundColor: '#c7923e !important',
                      color: 'white',
                    }
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
} 