import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut, LayoutDashboard, Package } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          Shoe<span className="text-accent">Hub</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/products" className={({isActive}) => isActive ? 'text-accent font-medium' : 'hover:text-accent'}>Produits</NavLink>
          <NavLink to="/about" className="hover:text-accent">À propos</NavLink>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/products" className="p-2 hover:bg-gray-100 rounded-full"><Search size={20} /></Link>

          {user && (
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          )}

          {user ? (
            <div className="relative">
              <button onClick={() => setOpen(!open)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {user.firstName?.[0]?.toUpperCase()}
                </div>
              </button>
              {open && (
                <>
                  <div className="fixed inset-0" onClick={() => setOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-lg py-2 border">
                    <div className="px-4 py-2 border-b">
                      <p className="font-medium text-sm">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/profile" onClick={()=>setOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                      <User size={16} /> Mon profil
                    </Link>
                    <Link to="/my-orders" onClick={()=>setOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                      <Package size={16} /> Mes commandes
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={()=>setOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-accent">
                        <LayoutDashboard size={16} /> Admin
                      </Link>
                    )}
                    <button onClick={() => { logout(); setOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-red-500 border-t">
                      <LogOut size={16} /> Déconnexion
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm hover:text-accent">Connexion</Link>
              <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-accent transition">
                Inscription
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}