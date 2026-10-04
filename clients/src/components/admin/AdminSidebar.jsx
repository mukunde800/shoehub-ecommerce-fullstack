import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Tags, ShoppingBag, Users, Home } from 'lucide-react';

const links = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/products', icon: Package, label: 'Produits' },
  { to: '/admin/categories', icon: Tags, label: 'Catégories' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Commandes' },
  { to: '/admin/users', icon: Users, label: 'Utilisateurs' },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-primary text-white p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-8">
        Shoe<span className="text-accent">Hub</span> Admin
      </h2>
      <nav className="space-y-2 flex-1">
        {links.map(({ to, icon: Icon, label, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                isActive ? 'bg-accent' : 'hover:bg-white/10'
              }`}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
      <NavLink to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-sm">
        <Home size={18} /> Retour au site
      </NavLink>
    </aside>
  );
}