import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const getStoredData = (key, defaultValue = []) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(() => getStoredData('products'));
  const [cart, setCart] = useState(() => getStoredData('cart'));
  const [orders, setOrders] = useState(() => getStoredData('orders'));
  const [categories, setCategories] = useState(() => getStoredData('categories'));
  const [locations, setLocations] = useState(() => getStoredData('locations'));

  useEffect(() => saveToStorage('products', products), [products]);
  useEffect(() => saveToStorage('cart', cart), [cart]);
  useEffect(() => saveToStorage('orders', orders), [orders]);
  useEffect(() => saveToStorage('categories', categories), [categories]);
  useEffect(() => saveToStorage('locations', locations), [locations]);

  const addToCart = (product, variation = null) => {
    if (product.quantity <= 0) return;
    
    const cartId = variation ? `${product.id}-${variation.name}` : product.id;
    const price = variation ? variation.price : product.price;
    const name = variation ? `${product.name} (${variation.name})` : product.name;
    
    const existing = cart.find(item => item.cartId === cartId);
    if (existing) {
      setCart(cart.map(item => 
        item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { 
        ...product, 
        cartId,
        name,
        price,
        variation: variation?.name,
        quantity: 1 
      }]);
    }
    
    // Reduce product quantity
    setProducts(products.map(p => 
      p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
    ));
  };

  const updateCart = (cartId, quantity) => {
    const cartItem = cart.find(item => item.cartId === cartId);
    if (!cartItem) return;
    
    const quantityDiff = cartItem.quantity - quantity;
    
    if (quantity <= 0) {
      setCart(cart.filter(item => item.cartId !== cartId));
      // Restore full quantity to product stock
      setProducts(products.map(p => 
        p.id === cartItem.id ? { ...p, quantity: p.quantity + cartItem.quantity } : p
      ));
    } else {
      setCart(cart.map(item => 
        item.cartId === cartId ? { ...item, quantity } : item
      ));
      // Restore difference to product stock
      if (quantityDiff > 0) {
        setProducts(products.map(p => 
          p.id === cartItem.id ? { ...p, quantity: p.quantity + quantityDiff } : p
        ));
      }
    }
  };

  const addProduct = (product) => {
    const newProduct = { 
      ...product, 
      id: Date.now(),
      variations: product.variations || [{ name: 'Full', price: product.price }]
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...updatedProduct, id } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addOrder = (order) => {
    const newOrder = { ...order, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    setOrders([...orders, newOrder]);
  };

  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  const addCategory = (category) => {
    setCategories([...categories, { id: Date.now(), name: category }]);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const addLocation = (location) => {
    setLocations([...locations, { id: Date.now(), ...location }]);
  };

  const deleteLocation = (id) => {
    setLocations(locations.filter(l => l.id !== id));
  };

  return (
    <AppContext.Provider value={{
      products, cart, orders, categories, locations,
      addToCart, updateCart, setCart,
      addProduct, updateProduct, deleteProduct,
      addOrder, updateOrderStatus,
      addCategory, deleteCategory,
      addLocation, deleteLocation
    }}>
      {children}
    </AppContext.Provider>
  );
};