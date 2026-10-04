import ProductCard from './ProductCard';
import Loader from '../common/Loader';

export default function ProductGrid({ products, loading }) {
  if (loading) return <Loader />;
  if (!products?.length) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg">Aucun produit trouvé</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}