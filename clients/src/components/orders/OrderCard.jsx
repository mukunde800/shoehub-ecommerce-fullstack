import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import OrderStatus from './OrderStatus';

export default function OrderCard({ order }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-bold">{order.orderNumber}</p>
          <p className="text-xs text-gray-500">
            {new Date(order.createdAt).toLocaleDateString('fr-FR', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </p>
        </div>
        <OrderStatus status={order.status} />
      </div>
      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
        <Package size={16} /> {order.OrderItems?.length || 0} article(s)
      </div>
      <div className="flex items-center justify-between border-t pt-3">
        <p className="font-bold text-primary">{order.totalAmount} DH</p>
        <Link to={`/my-orders/${order.id}`} className="text-sm text-accent hover:underline">
          Voir le détail →
        </Link>
      </div>
    </div>
  );
}