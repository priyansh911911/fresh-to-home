import React, { useState } from 'react';
import { 
  Typography, Box, Button, List, ListItem, ListItemText, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useApp } from '../utils/AppContext';

function AdminLocations() {
  const { locations, addLocation, deleteLocation } = useApp();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', pincode: '', deliveryFee: 0 });

  const handleAdd = () => {
    if (formData.name.trim() && formData.pincode.trim()) {
      addLocation(formData);
      setFormData({ name: '', pincode: '', deliveryFee: 0 });
      setOpen(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>Manage Locations</Typography>
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
          Add Location
        </Button>
      </Box>

      <List>
        {locations.map((location) => (
          <ListItem key={location.id} sx={{ border: 1, borderColor: 'divider', mb: 1, borderRadius: 1 }}>
            <ListItemText 
              primary={location.name} 
              secondary={`Pincode: ${location.pincode} | Delivery Fee: ₹${location.deliveryFee}`}
            />
            <IconButton onClick={() => deleteLocation(location.id)} color="error">
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {locations.length === 0 && (
        <Typography color="text.secondary">No locations added yet.</Typography>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Location</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Location Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mt: 1, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Delivery Fee"
            type="number"
            value={formData.deliveryFee}
            onChange={(e) => setFormData({ ...formData, deliveryFee: parseFloat(e.target.value) || 0 })}
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

export default AdminLocations;