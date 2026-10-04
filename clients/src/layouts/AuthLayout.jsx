import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-primary text-white p-12">
        <Link to="/" className="text-3xl font-bold">
          Shoe<span className="text-accent">Hub</span>
        </Link>
        <div>
          <h2 className="text-4xl font-bold mb-4">Bienvenue chez ShoeHub</h2>
          <p className="text-gray-300">Découvrez des milliers de chaussures pour tous les styles.</p>
        </div>
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} ShoeHub</p>
      </div>
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md"><Outlet /></div>
      </div>
    </div>
  );
}