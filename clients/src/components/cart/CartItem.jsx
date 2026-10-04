import { Trash2, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartItem({ item, onUpdate, onRemove }) {
  const price = parseFloat(item.Product.discountPrice || item.Product.price);
  return (
    <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm">
      <Link to={`/products/${item.Product.slug}`} className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        <img src={item.Product.images?.[0]} alt="" className="w-full h-full object-cover" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/products/${item.Product.slug}`} className="font-semibold hover:text-accent block truncate">
          {item.Product.name}
        </Link>
        <p className="text-xs text-gray-500 mt-1">
          {item.size && `Taille ${item.size}`} {item.color && `• ${item.color}`}
        </p>
        <div className="flex items-center gap-3 mt-3">
          <button onClick={() => onUpdate(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-1.5 border rounded-lg disabled:opacity-40 hover:bg-gray-50">
            <Minus size={14} />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button onClick={() => onUpdate(item.id, item.quantity + 1)}
            className="p-1.5 border rounded-lg hover:bg-gray-50">
            <Plus size={14} />
          </button>
        </div>
      </div>
      <div className="text-right flex flex-col justify-between">
        <p className="font-bold text-primary">{price * item.quantity} DH</p>
        <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700 self-end">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}