import React, { useState } from 'react';
import { Typography, Box, Card, CardContent, Button, IconButton, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useApp } from '../utils/AppContext';

function Cart() {
  const { cart, updateCart, addOrder, setCart, locations } = useApp();
  const [selectedLocation, setSelectedLocation] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = selectedLocation ? locations.find(l => l.id === selectedLocation)?.deliveryFee || 0 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (cart.length > 0 && selectedLocation) {
      const location = locations.find(l => l.id === selectedLocation);
      addOrder({
        customer: 'Customer',
        total: total,
        location: location?.name,
        status: 'pending'
      });
      setCart([]);
      setSelectedLocation('');
      alert('Order placed successfully!');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Card key={item.cartId} sx={{ mb: 2 }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography color="primary">₹{item.price}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton onClick={() => updateCart(item.cartId, item.quantity - 1)}>
                    <Remove />
                  </IconButton>
                  <TextField 
                    value={item.quantity} 
                    size="small" 
                    sx={{ width: 60 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                  <IconButton onClick={() => updateCart(item.cartId, item.quantity + 1)}>
                    <Add />
                  </IconButton>
                  <IconButton onClick={() => updateCart(item.cartId, 0)} color="error">
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
          
          <Box sx={{ mt: 3 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Location</InputLabel>
              <Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.name} - {location.pincode} - ₹{location.deliveryFee} delivery
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body1">Subtotal: ₹{subtotal.toFixed(2)}</Typography>
              <Typography variant="body1">Delivery: ₹{deliveryFee.toFixed(2)}</Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>Total: ₹{total.toFixed(2)}</Typography>
              <Button 
                variant="contained" 
                size="large" 
                sx={{ mt: 2 }} 
                onClick={handleCheckout}
                disabled={!selectedLocation}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Cart;