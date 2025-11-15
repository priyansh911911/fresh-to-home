import React, { useState } from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../utils/AppContext';

function Home() {
  const navigate = useNavigate();
  const { products, locations } = useApp();
  const [selectedLocation, setSelectedLocation] = useState('');

  const categories = [...new Set(products.filter(p => p.enabled !== false).map(p => p.category))].map(category => {
    const product = products.find(p => p.category === category && p.enabled !== false);
    return {
      name: category,
      image: product?.image || 'https://via.placeholder.com/300x200',
      desc: `Fresh ${category.toLowerCase()}`
    };
  });

  return (
    <Box>
      <Typography 
        variant="h3" 
        gutterBottom 
        align="center" 
        sx={{ 
          mb: 2, 
          color: '#333', 
          fontWeight: 'bold',
          textShadow: '0 4px 8px rgba(255,255,255,0.5)'
        }}
      >
        Fresh Food Delivered to Your Door
      </Typography>
      

      
      {categories.length > 0 ? (
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.name}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    background: 'rgba(255, 255, 255, 0.2)'
                  }
                }} 
                onClick={() => navigate('/products')}
              >
                <CardMedia component="img" height="200" image={category.image} alt={category.name} />
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)' }}>
                    {category.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center" color="text.secondary">
          No products available. Add products in the admin panel.
        </Typography>
      )}

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button 
          variant="contained" 
          size="large" 
          sx={{
            background: 'rgba(46, 125, 50, 0.3)',
            backdropFilter: 'blur(3px)',
            border: '1px solid rgba(46, 125, 50, 0.5)',
            borderRadius: '25px',
            color: '#333',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            '&:hover': {
              background: 'rgba(0, 255, 157, 0.5)',
              transform: 'scale(1.05)'
            }
          }}
          onClick={() => navigate('/products')}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
}

export default Home;