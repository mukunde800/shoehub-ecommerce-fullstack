import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Checkout() {
  const { cart, totalPrice, fetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    shippingAddress: user?.address || '',
    shippingCity: user?.city || '',
    shippingPostalCode: user?.postalCode || '',
    shippingCountry: user?.country || 'Maroc',
    paymentMethod: 'cod',
    notes: '',
  });

  if (!cart?.CartItems?.length) {
    navigate('/cart');
    return null;
  }

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/orders', form);
      toast.success('Commande passée !');
      await fetchCart();
      navigate(`/my-orders/${data.id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Finaliser la commande</h1>
      <form onSubmit={submit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-bold text-lg mb-4">Adresse de livraison</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Adresse" value={form.shippingAddress}
                onChange={e => setForm({ ...form, shippingAddress: e.target.value })} required
                className="md:col-span-2" />
              <Input label="Ville" value={form.shippingCity}
                onChange={e => setForm({ ...form, shippingCity: e.target.value })} required />
              <Input label="Code postal" value={form.shippingPostalCode}
                onChange={e => setForm({ ...form, shippingPostalCode: e.target.value })} />
              <Input label="Pays" value={form.shippingCountry}
                onChange={e => setForm({ ...form, shippingCountry: e.target.value })} required />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-bold text-lg mb-4">Paiement</h2>
            <div className="space-y-3">
              {[
                { v: 'cod', l: 'Paiement à la livraison' },
                { v: 'card', l: 'Carte bancaire (bientôt)' },
              ].map(opt => (
                <label key={opt.v} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-accent">
                  <input type="radio" name="pay" value={opt.v}
                    checked={form.paymentMethod === opt.v}
                    onChange={() => setForm({ ...form, paymentMethod: opt.v })} />
                  <span>{opt.l}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="block font-medium mb-2">Notes (optionnel)</label>
            <textarea rows={3} value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-20">
          <h2 className="font-bold text-lg mb-4">Votre commande</h2>
          <div className="space-y-2 text-sm mb-4 max-h-60 overflow-y-auto">
            {cart.CartItems.map(i => (
              <div key={i.id} className="flex justify-between">
                <span className="truncate">{i.Product.name} ×{i.quantity}</span>
                <span>{(i.Product.discountPrice || i.Product.price) * i.quantity} DH</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-lg mb-4">
            <span>Total</span><span>{totalPrice} DH</span>
          </div>
          <Button type="submit" loading={loading} variant="accent" className="w-full">
            Confirmer la commande
          </Button>
        </div>
      </form>
    </div>
  );
}