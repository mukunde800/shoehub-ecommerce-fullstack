import { X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, totalPrice, removeItem } = useCart();
  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-50 transition ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <ShoppingBag size={20} /> Panier
          </h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {!cart?.CartItems?.length ? (
            <p className="text-center py-12 text-gray-500">Votre panier est vide</p>
          ) : (
            cart.CartItems.map(item => (
              <div key={item.id} className="flex gap-3 border-b pb-3">
                <img src={item.Product.images?.[0]} alt="" className="w-16 h-16 object-cover rounded" />
                <div className="flex-1 text-sm">
                  <p className="font-medium truncate">{item.Product.name}</p>
                  <p className="text-gray-500">x{item.quantity}</p>
                  <p className="font-bold mt-1">
                    {(item.Product.discountPrice || item.Product.price) * item.quantity} DH
                  </p>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-500 self-start">
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>
        {cart?.CartItems?.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span><span>{totalPrice} DH</span>
            </div>
            <Link to="/cart" onClick={onClose}
              className="block text-center bg-primary text-white py-2.5 rounded-lg">
              Voir le panier
            </Link>
            <Link to="/checkout" onClick={onClose}
              className="block text-center bg-accent text-white py-2.5 rounded-lg">
              Commander
            </Link>
          </div>
        )}
      </div>
    </>
  );
}