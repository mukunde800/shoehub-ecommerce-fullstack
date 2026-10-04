import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <p className="text-2xl font-semibold mt-4 mb-2">Page introuvable</p>
      <p className="text-gray-500 mb-8">La page que vous cherchez n'existe pas.</p>
      <Link to="/" className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent-dark">
        Retour à l'accueil
      </Link>
    </div>
  );
}