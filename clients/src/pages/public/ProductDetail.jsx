import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, Shield, RefreshCw, Minus, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import { useCart } from '../../context/CartContext';
import ProductGallery from '../../components/products/ProductGallery';
import ProductReviews from '../../components/products/ProductReviews';
import Loader from '../../components/common/Loader';

export default function ProductDetail() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [tab, setTab] = useState('description');

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${slug}`)
      .then(({ data }) => {
        setProduct(data);
        if (data.sizes?.length) setSize(data.sizes[0]);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader fullScreen />;
  if (!product) return <div className="text-center py-20">Produit introuvable</div>;

  const price = parseFloat(product.discountPrice || product.price);
  const hasDiscount = !!product.discountPrice;

  const handleAdd = async () => {
    if (product.sizes?.length && !size) return toast.error('Sélectionnez une taille');
    await addItem({ productId: product.id, quantity: qty, size, color: product.colors?.[0] });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-accent">Accueil</Link> /{' '}
        <Link to="/products" className="hover:text-accent">Produits</Link> /{' '}
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p className="text-sm text-accent font-medium mb-2">{product.Category?.name}</p>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.brand}</p>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(n => (
                <Star key={n} size={18}
                  className={n <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating?.toFixed(1)} ({product.numReviews} avis)
            </span>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-bold text-primary">{price} DH</span>
            {hasDiscount && (
              <span className="ml-3 text-xl text-gray-400 line-through">{product.price} DH</span>
            )}
          </div>

          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Taille</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`w-12 h-12 border rounded-lg font-medium ${
                      size === s ? 'bg-primary text-white border-primary' : 'hover:border-primary'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantité</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 border rounded-lg">
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-medium">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-2 border rounded-lg">
                <Plus size={16} />
              </button>
              <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button onClick={handleAdd} disabled={product.stock === 0}
              className="flex-1 bg-accent hover:bg-accent-dark text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50">
              <ShoppingCart size={18} /> Ajouter au panier
            </button>
            <button className="p-3 border rounded-lg hover:border-accent hover:text-accent">
              <Heart size={20} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs text-center">
            {[
              { icon: Truck, label: 'Livraison gratuite' },
              { icon: Shield, label: 'Paiement sécurisé' },
              { icon: RefreshCw, label: 'Retour 30j' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="border rounded-lg p-3">
                <Icon size={18} className="mx-auto mb-1 text-accent" />
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex gap-6 border-b">
          {['description', 'reviews'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`py-3 font-medium border-b-2 -mb-px ${
                tab === t ? 'border-accent text-accent' : 'border-transparent text-gray-500'
              }`}>
              {t === 'description' ? 'Description' : `Avis (${product.numReviews})`}
            </button>
          ))}
        </div>
        <div className="py-6">
          {tab === 'description' ? (
            <p className="text-gray-700 leading-relaxed">{product.description || 'Aucune description.'}</p>
          ) : (
            <ProductReviews productId={product.id} />
          )}
        </div>
      </div>
    </div>
  );
}