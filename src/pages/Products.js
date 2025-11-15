import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box, Chip, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useApp } from '../utils/AppContext';

function Products() {
  const { products, addToCart, cart, updateCart } = useApp();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const getCartQuantity = (product) => {
    const cartItem = cart.find(item => item.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (product) => {
    if (product.variations && product.variations.length > 1) {
      setSelectedProduct(product);
      setOpen(true);
    } else {
      addToCart(product);
    }
  };

  const handleRemoveFromCart = (product) => {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
      updateCart(cartItem.cartId, cartItem.quantity - 1);
    }
  };

  const handleVariationSelect = (variation) => {
    addToCart(selectedProduct, variation);
    setOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold', mb: 3 }}>
        Our Products
      </Typography>
      
      <Grid container spacing={3}>
        {products.filter(product => product.enabled !== false).map((product) => (
          <Grid item xs={6} sm={6} md={4} key={product.id}>
            <Card sx={{
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                background: 'rgba(255, 255, 255, 0.2)'
              }
            }}>
              <CardMedia component="img" sx={{ height: { xs: 120, sm: 200 } }} image={product.image} alt={product.name} />
              <CardContent>
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Typography variant="h5" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  ₹{product.price}
                </Typography>
                <Typography variant="body2" sx={{ color: product.quantity <= 5 ? '#d32f2f' : '#333' }}>
                  Stock: {product.quantity || 0}
                </Typography>
                <Chip 
                  label={product.category} 
                  size="small" 
                  sx={{ 
                    mt: 1,
                    background: 'rgba(255, 255, 255, 0.5)',
                    color: '#333',
                    border: '1px solid rgba(0, 0, 0, 0.2)'
                  }} 
                />
                <Box sx={{ mt: 2 }}>
                  {getCartQuantity(product) > 0 ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <IconButton 
                        onClick={() => handleRemoveFromCart(product)}
                        sx={{
                          background: 'rgba(46, 125, 50, 0.3)',
                          backdropFilter: 'blur(3px)',
                          border: '1px solid rgba(46, 125, 50, 0.5)'
                        }}
                      >
                        <Remove sx={{ color: '#333' }} />
                      </IconButton>
                      <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
                        {getCartQuantity(product)}
                      </Typography>
                      <IconButton 
                        onClick={() => handleAddToCart(product)}
                        disabled={product.quantity <= 0}
                        sx={{
                          background: 'rgba(46, 125, 50, 0.3)',
                          backdropFilter: 'blur(3px)',
                          border: '1px solid rgba(46, 125, 50, 0.5)'
                        }}
                      >
                        <Add sx={{ color: '#333' }} />
                      </IconButton>
                    </Box>
                  ) : (
                    <Button 
                      variant="contained" 
                      fullWidth 
                      disabled={!product.inStock || product.quantity <= 0}
                      sx={{
                        background: product.inStock ? 'rgba(46, 125, 50, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                        backdropFilter: 'blur(3px)',
                        border: '1px solid rgba(46, 125, 50, 0.5)',
                        borderRadius: '12px',
                        color: '#333',
                        '&:hover': {
                          background: 'rgba(46, 125, 50, 0.5)'
                        }
                      }}
                      onClick={() => handleAddToCart(product)}
                    >
                      {!product.inStock ? 'Out of Stock' : product.quantity <= 0 ? 'No Stock' : 'Add to Cart'}
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Size</DialogTitle>
        <DialogContent>
          <List>
            {selectedProduct?.variations?.map((variation, index) => (
              <ListItem 
                key={index} 
                button 
                onClick={() => handleVariationSelect(variation)}
                sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(3px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  mb: 1
                }}
              >
                <ListItemText 
                  primary={variation.name} 
                  secondary={`$${variation.price}`}
                  sx={{ color: '#333' }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Products;