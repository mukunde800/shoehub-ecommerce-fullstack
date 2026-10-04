import { Link } from 'react-router-dom';
import { Mail, Phone, Globe, Share2, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">
            Shoe<span className="text-accent">Hub</span>
          </h3>
          <p className="text-gray-300 text-sm">
            Votre destination pour les meilleures chaussures.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"
              className="p-2 bg-white/10 rounded-full hover:bg-accent transition">
              <Globe size={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
              className="p-2 bg-white/10 rounded-full hover:bg-accent transition">
              <Share2 size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"
              className="p-2 bg-white/10 rounded-full hover:bg-accent transition">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Boutique</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/products" className="hover:text-accent">Tous les produits</Link></li>
            <li><Link to="/products?sort=createdAt" className="hover:text-accent">Nouveautés</Link></li>
            <li><Link to="/products?sort=rating" className="hover:text-accent">Top ventes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Aide</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/about" className="hover:text-accent">À propos</Link></li>
            <li><a href="#" className="hover:text-accent">Livraison</a></li>
            <li><a href="#" className="hover:text-accent">Retours</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2"><Mail size={14} /> contact@shoehub.com</li>
            <li className="flex items-center gap-2"><Phone size={14} /> +212 600 000 000</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ShoeHub. Tous droits réservés.
      </div>
    </footer>
  );
}