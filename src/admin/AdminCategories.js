import React, { useState } from 'react';
import { 
  Typography, Box, Button, List, ListItem, ListItemText, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useApp } from '../utils/AppContext';

function AdminCategories() {
  const { categories, addCategory, deleteCategory } = useApp();
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const handleAdd = () => {
    if (categoryName.trim()) {
      addCategory(categoryName.trim());
      setCategoryName('');
      setOpen(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>Manage Categories</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => setOpen(true)}
          size="small"
          sx={{ 
            fontSize: '0.75rem',
            padding: '4px 8px',
            minHeight: '32px'
          }}
        >
          Add Category
        </Button>
      </Box>

      <List>
        {categories.map((category) => (
          <ListItem key={category.id} sx={{ border: 1, borderColor: 'divider', mb: 1, borderRadius: 1 }}>
            <ListItemText primary={category.name} />
            <IconButton onClick={() => deleteCategory(category.id)} color="error">
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {categories.length === 0 && (
        <Typography color="text.secondary">No categories added yet.</Typography>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminCategories;