import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { cartApi } from '../api/cartApi';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) return setCart(null);
    setLoading(true);
    try {
      const { data } = await cartApi.get();
      setCart(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchCart(); }, [user]);

  const addItem = async (payload) => {
    if (!user) {
      toast.error('Connectez-vous pour ajouter au panier');
      return;
    }
    const { data } = await cartApi.add(payload);
    setCart(data);
    toast.success('Ajouté au panier ✅');
  };

  const updateItem = async (itemId, quantity) => {
    const { data } = await cartApi.updateItem(itemId, quantity);
    setCart(data);
  };

  const removeItem = async (itemId) => {
    const { data } = await cartApi.removeItem(itemId);
    setCart(data);
    toast.success('Retiré du panier');
  };

  const clearCart = async () => {
    await cartApi.clear();
    setCart(null);
  };

  const totalPrice = cart?.CartItems?.reduce((sum, i) => {
    const price = parseFloat(i.Product.discountPrice || i.Product.price);
    return sum + price * i.quantity;
  }, 0) || 0;

  const count = cart?.CartItems?.reduce((s, i) => s + i.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{
      cart, loading, addItem, updateItem, removeItem,
      clearCart, totalPrice, count, fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);