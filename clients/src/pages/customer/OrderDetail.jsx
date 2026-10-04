import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, MapPin, CreditCard } from 'lucide-react';
import api from '../../api/axios';
import OrderStatus from '../../components/orders/OrderStatus';
import Loader from '../../components/common/Loader';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(({ data }) => setOrder(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader fullScreen />;
  if (!order) return <div className="text-center py-20">Commande introuvable</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/my-orders" className="text-sm text-accent hover:underline">← Mes commandes</Link>
      <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString('fr-FR', { dateStyle: 'long' })}
            </p>
          </div>
          <OrderStatus status={order.status} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="flex gap-3">
            <MapPin className="text-accent flex-shrink-0" size={20} />
            <div className="text-sm">
              <p className="font-medium mb-1">Livraison</p>
              <p className="text-gray-600">{order.shippingAddress}</p>
              <p className="text-gray-600">{order.shippingCity} {order.shippingPostalCode}</p>
              <p className="text-gray-600">{order.shippingCountry}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CreditCard className="text-accent flex-shrink-0" size={20} />
            <div className="text-sm">
              <p className="font-medium mb-1">Paiement</p>
              <p className="text-gray-600">{order.paymentMethod}</p>
              <p className="text-gray-600">Statut: {order.paymentStatus}</p>
            </div>
          </div>
        </div>

        <h2 className="font-bold mb-3 flex items-center gap-2">
          <Package size={18} /> Articles
        </h2>
        <div className="space-y-3 mb-6">
          {order.OrderItems?.map(item => (
            <div key={item.id} className="flex gap-3 items-center border-b pb-3">
              {item.productImage && (
                <img src={item.productImage} alt="" className="w-16 h-16 rounded object-cover" />
              )}
              <div className="flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-500">
                  {item.size && `Taille ${item.size}`} ×{item.quantity}
                </p>
              </div>
              <p className="font-bold">{item.price * item.quantity} DH</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 flex justify-between font-bold text-lg">
          <span>Total</span><span className="text-accent">{order.totalAmount} DH</span>
        </div>
      </div>
    </div>
  );
}