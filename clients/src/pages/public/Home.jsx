import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RefreshCw, Headphones } from 'lucide-react';
import api from '../../api/axios';
import ProductGrid from '../../components/products/ProductGrid';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/products/featured'),
      api.get('/categories'),
    ]).then(([p, c]) => {
      setFeatured(p.data);
      setCategories(c.data);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-accent font-medium mb-3">NOUVELLE COLLECTION 2025</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Trouvez votre <span className="text-accent">style</span> parfait
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Des chaussures pour chaque occasion. Qualité, confort et style au meilleur prix.
            </p>
            <div className="flex gap-4">
              <Link to="/products"
                className="bg-accent hover:bg-accent-dark px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition">
                Découvrir <ArrowRight size={18} />
              </Link>
              <Link to="/about"
                className="border border-white/30 hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition">
                En savoir plus
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
              alt="Shoes" className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, title: 'Livraison gratuite', desc: 'Dès 500 DH' },
            { icon: Shield, title: 'Paiement sécurisé', desc: '100% sécurisé' },
            { icon: RefreshCw, title: 'Retours 30j', desc: 'Satisfait ou remboursé' },
            { icon: Headphones, title: 'Support 24/7', desc: 'Toujours disponible' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white p-5 rounded-xl shadow-sm flex items-start gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Icon size={20} className="text-accent" />
              </div>
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Nos catégories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 4).map(c => (
            <Link key={c.id} to={`/products?categoryId=${c.id}`}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              {c.image ? (
                <img src={c.image} alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <p className="text-white font-bold text-lg">{c.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Produits vedettes</h2>
            <p className="text-gray-500 mt-1">Notre sélection du moment</p>
          </div>
          <Link to="/products" className="text-accent hover:underline flex items-center gap-1">
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid products={featured} loading={loading} />
      </section>
    </div>
  );
}