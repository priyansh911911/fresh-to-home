import React, { useState } from 'react';
import { 
  Typography, Box, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Switch
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useApp } from '../utils/AppContext';

function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useApp();
  
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', category: '', inStock: true });

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData(product);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditProduct(null);
    setFormData({ 
      name: '', 
      price: '', 
      category: '', 
      image: '', 
      quantity: 0,
      inStock: true,
      enabled: true,
      variations: [{ name: 'Full', price: '' }]
    });
    setOpen(true);
  };

  const handleSave = () => {
    if (editProduct) {
      updateProduct(editProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>Manage Products</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={handleAdd} 
          size="small"
          sx={{ 
            fontSize: '0.75rem',
            padding: '4px 8px',
            minHeight: '32px'
          }}
        >
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Price</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Category</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Qty</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">{product.name}</Typography>
                    <Typography variant="caption" sx={{ display: { sm: 'none' } }}>
                      ${product.price} • {product.category} • Qty: {product.quantity || 0}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>${product.price}</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{product.category}</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{product.quantity || 0}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ display: { sm: 'none' } }}>
                      {product.inStock ? 'In' : 'Out'}
                    </Typography>
                    <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                    <Switch
                      checked={product.enabled !== false}
                      onChange={(e) => updateProduct(product.id, { ...product, enabled: e.target.checked })}
                      size="small"
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex' }}>
                    <IconButton onClick={() => handleEdit(product)} size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product.id)} color="error" size="small">
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        <DialogTitle>{editProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent sx={{
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(0, 0, 0, 0.3)'
          }
        }}>
          <TextField
            fullWidth
            label="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Image URL"
            value={formData.image || ''}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography>In Stock:</Typography>
            <Switch
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography>Enabled:</Typography>
            <Switch
              checked={formData.enabled !== false}
              onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
            />
          </Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Variations:</Typography>
          {formData.variations?.map((variation, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Size"
                value={variation.name}
                onChange={(e) => {
                  const newVariations = [...formData.variations];
                  newVariations[index].name = e.target.value;
                  setFormData({ ...formData, variations: newVariations });
                }}
              />
              <TextField
                label="Price"
                type="number"
                value={variation.price}
                onChange={(e) => {
                  const newVariations = [...formData.variations];
                  newVariations[index].price = parseFloat(e.target.value);
                  setFormData({ ...formData, variations: newVariations });
                }}
              />
              <Button 
                onClick={() => {
                  const newVariations = formData.variations.filter((_, i) => i !== index);
                  setFormData({ ...formData, variations: newVariations });
                }}
                disabled={formData.variations.length === 1}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button 
            onClick={() => {
              setFormData({ 
                ...formData, 
                variations: [...formData.variations, { name: '', price: '' }]
              });
            }}
            sx={{ mb: 2 }}
          >
            Add Variation
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminProducts;