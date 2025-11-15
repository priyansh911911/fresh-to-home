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
        <Typography variant="h4">Manage Products</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
            <TableCell>In Stock</TableCell>
            <TableCell>Enabled</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity || 0}</TableCell>
                <TableCell>{product.inStock ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Switch
                    checked={product.enabled !== false}
                    onChange={(e) => updateProduct(product.id, { ...product, enabled: e.target.checked })}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(product)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)} color="error">
                    <Delete />
                  </IconButton>
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