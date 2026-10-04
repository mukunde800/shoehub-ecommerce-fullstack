import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import OrderCard from '../../components/orders/OrderCard';
import Loader from '../../components/common/Loader';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/my-orders')
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mes commandes</h1>
      {!orders.length ? (
        <div className="text-center py-16 bg-white rounded-xl">
          <p className="text-gray-500 mb-4">Aucune commande pour l'instant.</p>
          <Link to="/products" className="text-accent hover:underline">Découvrir les produits →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(o => <OrderCard key={o.id} order={o} />)}
        </div>
      )}
    </div>
  );
}