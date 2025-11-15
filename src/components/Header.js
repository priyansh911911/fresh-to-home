import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box, Menu, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ShoppingCart, AdminPanelSettings, LocationOn, KeyboardArrowDown, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../utils/AppContext';

function Header() {
  const navigate = useNavigate();
  const { cart, locations } = useApp();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchPincode, setSearchPincode] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLocationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setAnchorEl(null);
  };

  const handleLocationClose = () => {
    setAnchorEl(null);
  };

  const currentLocation = locations.find(l => l.id === selectedLocation);

  const handleSearchPincode = () => {
    const location = locations.find(l => l.pincode === searchPincode);
    if (location) {
      setSearchResult({ serviceable: true, location });
      setSelectedLocation(location.id);
    } else {
      setSearchResult({ serviceable: false, pincode: searchPincode });
    }
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchPincode('');
    setSearchResult(null);
  };

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <Button
            onClick={handleLocationClick}
            sx={{
              color: '#333',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(3px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              textTransform: 'none',
              minWidth: '150px',
              justifyContent: 'flex-start'
            }}
          >
            <LocationOn sx={{ mr: 1, fontSize: 18 }} />
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="caption" sx={{ display: 'block', lineHeight: 1 }}>
                {currentLocation ? currentLocation.name : 'Select Location'}
              </Typography>
              {currentLocation && (
                <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '10px' }}>
                  {currentLocation.pincode}
                </Typography>
              )}
            </Box>
            <KeyboardArrowDown sx={{ ml: 'auto' }} />
          </Button>
        </Box>
        
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold', color: '#333' }} onClick={() => navigate('/')}>
          Fresh To Home
        </Typography>
        <Button 
          sx={{ 
            color: '#333', 
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(3px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            mx: 1
          }} 
          onClick={() => navigate('/products')}
        >
          Products
        </Button>
        <IconButton 
          sx={{ 
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(3px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            mx: 1
          }} 
          onClick={() => navigate('/cart')}
        >
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCart sx={{ color: '#333' }} />
          </Badge>
        </IconButton>
        <IconButton 
          sx={{ 
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(3px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '12px'
          }} 
          onClick={() => navigate('/admin')}
        >
          <AdminPanelSettings sx={{ color: '#333' }} />
        </IconButton>
      </Toolbar>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleLocationClose}
        sx={{
          '& .MuiPaper-root': {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px'
          }
        }}
      >
        {locations.slice(0, 2).map((location) => (
          <MenuItem 
            key={location.id} 
            onClick={() => handleLocationSelect(location.id)}
            sx={{ minWidth: '200px' }}
          >
            <LocationOn sx={{ mr: 1, fontSize: 18 }} />
            <Box>
              <Typography variant="body2">{location.name}</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                {location.pincode}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        <MenuItem onClick={() => setSearchOpen(true)} sx={{ borderTop: '1px solid #e0e0e0' }}>
          <Search sx={{ mr: 1, fontSize: 18 }} />
          <Typography>Search by Pincode</Typography>
        </MenuItem>
      </Menu>

      <Dialog open={searchOpen} onClose={handleSearchClose}>
        <DialogTitle>Search Location by Pincode</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Enter Pincode"
            value={searchPincode}
            onChange={(e) => setSearchPincode(e.target.value)}
            sx={{ mt: 1, mb: 2 }}
          />
          {searchResult && (
            <Box sx={{ mt: 2, p: 2, borderRadius: 1, bgcolor: searchResult.serviceable ? '#e8f5e8' : '#ffebee' }}>
              {searchResult.serviceable ? (
                <Typography color="success.main">
                  ✓ Serviceable! {searchResult.location.name} - {searchResult.location.pincode}
                </Typography>
              ) : (
                <Typography color="error.main">
                  ✗ Sorry, we don't deliver to {searchResult.pincode} yet.
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSearchClose}>Close</Button>
          <Button onClick={handleSearchPincode} variant="contained">Search</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default Header;