'use client';

import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, height: '100%', bgcolor: 'white' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', color: '#2b2b2b' }}>
          Menu
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.path} 
            component={Link} 
            href={item.path}
            onClick={handleDrawerToggle}
            sx={{
              color: '#2b2b2b',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.05)'
              }
            }}
          >
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{
                fontSize: '1.1rem',
                fontFamily: 'Playfair Display'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ height: 90, display: 'flex', justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Image
                src="/images/logo/logo.png"
                alt="Moroccan Kitchen Co Logo"
                width={isMobile ? 50 : 60}
                height={isMobile ? 50 : 60}
                style={{ objectFit: 'contain' }}
              />
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                sx={{ 
                  fontFamily: 'Playfair Display',
                  color: '#2b2b2b',
                  fontWeight: 600,
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Moroccan Kitchen Co
              </Typography>
            </Box>
          </Link>

          {/* Mobile Menu Icon */}
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                color: '#2b2b2b',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            /* Desktop Navigation */
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item) => (
                <Button 
                  key={item.path}
                  color="inherit" 
                  component={Link} 
                  href={item.path}
                  sx={{ 
                    color: '#2b2b2b',
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.05)'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>
        <NavBar />
        <Box sx={{ pt: '90px' }}>{children}</Box>
      </body>
    </html>
  );
}
