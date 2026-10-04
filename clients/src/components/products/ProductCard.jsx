import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const price = parseFloat(product.discountPrice || product.price);
  const hasDiscount = !!product.discountPrice;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <Link to={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img src={product.images?.[0] || '/placeholder.jpg'} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{Math.round((1 - product.discountPrice / product.price) * 100)}%
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
            Rupture de stock
          </div>
        )}
      </Link>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.Category?.name}</p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-semibold text-primary truncate hover:text-accent">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-500">
            {product.rating?.toFixed(1)} ({product.numReviews})
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-primary">{price} DH</span>
            {hasDiscount && (
              <span className="ml-2 text-sm text-gray-400 line-through">{product.price} DH</span>
            )}
          </div>
          <button
            onClick={() => addItem({ productId: product.id, quantity: 1 })}
            disabled={product.stock === 0}
            className="p-2 bg-primary text-white rounded-lg hover:bg-accent transition disabled:opacity-50"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}