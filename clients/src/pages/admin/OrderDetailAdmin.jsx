import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import OrderStatus from '../../components/orders/OrderStatus';
import Loader from '../../components/common/Loader';

export default function OrderDetailAdmin() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetch = () => {
    api.get(`/orders/${id}`).then(({ data }) => setOrder(data)).finally(() => setLoading(false));
  };
  useEffect(fetch, [id]);

  const updateStatus = async (status) => {
    await api.put(`/orders/${id}/status`, { status });
    toast.success('Statut mis à jour');
    fetch();
  };

  if (loading) return <Loader />;
  if (!order) return <div>Introuvable</div>;

  return (
    <div className="max-w-4xl">
      <Link to="/admin/orders" className="text-sm text-accent hover:underline">← Commandes</Link>
      <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString('fr-FR')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <OrderStatus status={order.status} />
            <select value={order.status} onChange={e => updateStatus(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm">
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmée</option>
              <option value="shipped">Expédiée</option>
              <option value="delivered">Livrée</option>
              <option value="cancelled">Annulée</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6 text-sm">
          <div className="border rounded-lg p-4">
            <p className="font-bold mb-2">Client</p>
            <p>{order.User?.firstName} {order.User?.lastName}</p>
            <p className="text-gray-500">{order.User?.email}</p>
            <p className="text-gray-500">{order.User?.phone}</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="font-bold mb-2">Livraison</p>
            <p>{order.shippingAddress}</p>
            <p>{order.shippingCity} {order.shippingPostalCode}</p>
            <p>{order.shippingCountry}</p>
          </div>
        </div>

        <h2 className="font-bold mb-3">Articles</h2>
        <div className="space-y-2 mb-4">
          {order.OrderItems?.map(i => (
            <div key={i.id} className="flex items-center gap-3 border-b pb-2 text-sm">
              {i.productImage && <img src={i.productImage} className="w-12 h-12 object-cover rounded" alt="" />}
              <span className="flex-1">{i.productName} {i.size && `(T${i.size})`} ×{i.quantity}</span>
              <span className="font-medium">{i.price * i.quantity} DH</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total</span><span className="text-accent">{order.totalAmount} DH</span>
        </div>

        {order.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
            <p className="font-medium mb-1">Notes :</p>
            <p className="text-gray-600">{order.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}