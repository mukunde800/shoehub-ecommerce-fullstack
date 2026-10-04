import { useEffect, useState } from 'react';
import { Package, ShoppingBag, Users, DollarSign } from 'lucide-react';
import api from '../../api/axios';
import StatsCard from '../../components/admin/StatsCard';
import DataTable from '../../components/admin/DataTable';
import OrderStatus from '../../components/orders/OrderStatus';
import Loader from '../../components/common/Loader';

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/users/stats'), api.get('/orders')])
      .then(([s, o]) => { setStats(s.data); setOrders(o.data.slice(0, 5)); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const columns = [
    { key: 'orderNumber', label: 'N° commande' },
    { key: 'customer', label: 'Client',
      render: r => `${r.User?.firstName} ${r.User?.lastName}` },
    { key: 'totalAmount', label: 'Total', render: r => `${r.totalAmount} DH` },
    { key: 'status', label: 'Statut', render: r => <OrderStatus status={r.status} /> },
    { key: 'createdAt', label: 'Date',
      render: r => new Date(r.createdAt).toLocaleDateString('fr-FR') },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard icon={Package} label="Produits" value={stats.products || 0} color="bg-blue-500" />
        <StatsCard icon={ShoppingBag} label="Commandes" value={stats.orders || 0} color="bg-orange-500" />
        <StatsCard icon={Users} label="Utilisateurs" value={stats.users || 0} color="bg-green-500" />
        <StatsCard icon={DollarSign} label="Revenus" value={`${stats.revenue || 0} DH`} color="bg-purple-500" />
      </div>

      <h2 className="font-bold text-lg mb-3">Commandes récentes</h2>
      <DataTable columns={columns} data={orders} />
    </div>
  );
}