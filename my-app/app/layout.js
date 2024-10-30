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
  ListItemIcon,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Link from 'next/link';
import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';

const navItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'Products', path: '/products', icon: <StoreIcon /> },
  { label: 'About', path: '/about', icon: <InfoIcon /> },
  { label: 'Contact', path: '/contact', icon: <ContactMailIcon /> }
];

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

// Add Berlin Sans FB font
const berlinSansFB = {
  fontFamily: 'Berlin Sans FB',
  src: `url('/fonts/BRLNSR.woff2') format('woff2')`
};

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
            <ListItemIcon sx={{ color: '#c7923e', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
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
                alt="MoroccanKitchenCo Logo"
                width={isMobile ? 50 : 60}
                height={isMobile ? 50 : 60}
                style={{ objectFit: 'contain' }}
              />
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                sx={{ 
                  fontFamily: 'Berlin Sans FB, Arial',
                  color: '#c7923e',
                  fontWeight: 700,
                  display: { xs: 'none', sm: 'block' },
                  letterSpacing: '-0.5px'
                }}
              >
                MoroccanKitchenCo
              </Typography>
            </Box>
          </Link>

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
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item) => (
                <Button 
                  key={item.path}
                  color="inherit" 
                  component={Link} 
                  href={item.path}
                  startIcon={item.icon}
                  sx={{ 
                    color: '#2b2b2b',
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.05)'
                    },
                    '& .MuiSvgIcon-root': {
                      color: '#c7923e'
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

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
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
    <html lang="en" className={playfairDisplay.className}>
      <head>
        <style jsx global>{`
          @font-face {
            font-family: 'Berlin Sans FB';
            src: url('/fonts/BRLNSR.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      </head>
      <body style={{ margin: 0 }}>
        <NavBar />
        <Box sx={{ pt: '90px' }}>{children}</Box>
      </body>
    </html>
  );
}
