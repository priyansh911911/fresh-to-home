import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Inventory, ShoppingCart, People, TrendingUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../utils/AppContext';

function AdminDashboard() {
  const navigate = useNavigate();
  const { products, orders } = useApp();

  const stats = [
    { title: 'Total Products', value: products.length.toString(), icon: <Inventory />, color: '#1976d2' },
    { title: 'Total Orders', value: orders.length.toString(), icon: <ShoppingCart />, color: '#2e7d32' },
    { title: 'In Stock', value: products.filter(p => p.inStock).length.toString(), icon: <People />, color: '#ed6c02' },
    { title: 'Revenue', value: `$${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`, icon: <TrendingUp />, color: '#9c27b0' }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ color: stat.color, mr: 2 }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h4">{stat.value}</Typography>
                  <Typography color="text.secondary">{stat.title}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ mb: 2 }}
                onClick={() => navigate('/admin/products')}
              >
                Manage Products
              </Button>
              <Button 
                variant="outlined" 
                fullWidth
                sx={{ mb: 2 }}
                onClick={() => navigate('/admin/categories')}
              >
                Manage Categories
              </Button>
              <Button 
                variant="outlined" 
                fullWidth
                sx={{ mb: 2 }}
                onClick={() => navigate('/admin/locations')}
              >
                Manage Locations
              </Button>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => navigate('/admin/orders')}
              >
                View Orders
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Activity</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>• New order #1234 received</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>• Product "Fresh Salmon" updated</Typography>
              <Typography variant="body2">• 5 new users registered</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;