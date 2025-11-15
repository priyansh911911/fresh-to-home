import React, { useState } from 'react';
import { 
  Typography, Box, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Chip, IconButton, Menu, MenuItem
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useApp } from '../utils/AppContext';

function AdminOrders() {
  const { orders, updateOrderStatus } = useApp();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleMenuClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = (status) => {
    updateOrderStatus(selectedOrder.id, status);
    handleMenuClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>Order Management</Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Customer</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">#{order.id}</Typography>
                    <Typography variant="caption" sx={{ display: { sm: 'none' } }}>
                      {order.customer} • {order.date}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{order.customer}</TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>
                  <Chip 
                    label={order.status} 
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuClick(e, order)} size="small">
                    <MoreVert fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleUpdateStatus('processing')}>Mark as Processing</MenuItem>
        <MenuItem onClick={() => handleUpdateStatus('delivered')}>Mark as Delivered</MenuItem>
        <MenuItem onClick={() => handleUpdateStatus('cancelled')}>Cancel Order</MenuItem>
      </Menu>
    </Box>
  );
}

export default AdminOrders;