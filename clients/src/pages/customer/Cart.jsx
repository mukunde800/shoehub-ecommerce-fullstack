import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import Loader from '../../components/common/Loader';

export default function Cart() {
  const { cart, updateItem, removeItem, totalPrice, loading } = useCart();

  if (loading) return <Loader fullScreen />;

  if (!cart?.CartItems?.length) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Votre panier est vide</h2>
        <p className="text-gray-500 mb-6">Ajoutez vos chaussures préférées !</p>
        <Link to="/products" className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent-dark inline-block">
          Découvrir les produits
        </Link>
      </div>
    );
  }

  const itemCount = cart.CartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mon panier ({itemCount})</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          {cart.CartItems.map(item => (
            <CartItem key={item.id} item={item} onUpdate={updateItem} onRemove={removeItem} />
          ))}
        </div>
        <CartSummary totalPrice={totalPrice} itemCount={itemCount} />
      </div>
    </div>
  );
}