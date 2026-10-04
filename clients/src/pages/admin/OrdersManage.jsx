import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import DataTable from '../../components/admin/DataTable';
import OrderStatus from '../../components/orders/OrderStatus';

export default function OrdersManage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/orders').then(({ data }) => setOrders(data)).finally(() => setLoading(false));
  }, []);

  const filtered = filter ? orders.filter(o => o.status === filter) : orders;

  const columns = [
    { key: 'orderNumber', label: 'N°' },
    { key: 'customer', label: 'Client',
      render: r => `${r.User?.firstName} ${r.User?.lastName}` },
    { key: 'email', label: 'Email', render: r => r.User?.email },
    { key: 'total', label: 'Total', render: r => `${r.totalAmount} DH` },
    { key: 'status', label: 'Statut', render: r => <OrderStatus status={r.status} /> },
    { key: 'date', label: 'Date',
      render: r => new Date(r.createdAt).toLocaleDateString('fr-FR') },
    { key: 'actions', label: 'Actions',
      render: r => (
        <Link to={`/admin/orders/${r.id}`}
          className="inline-flex items-center gap-1 text-accent hover:underline text-sm">
          <Eye size={14} /> Voir
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Commandes ({orders.length})</h1>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm">
          <option value="">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmée</option>
          <option value="shipped">Expédiée</option>
          <option value="delivered">Livrée</option>
          <option value="cancelled">Annulée</option>
        </select>
      </div>
      <DataTable columns={columns} data={filtered} loading={loading} />
    </div>
  );
}