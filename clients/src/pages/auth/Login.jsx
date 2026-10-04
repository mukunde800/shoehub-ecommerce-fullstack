import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Bonjour ${user.firstName} !`);
      navigate(user.role === 'admin' ? '/admin' : from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur de connexion');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Connexion</h1>
      <p className="text-gray-500 mb-8">Content de vous revoir !</p>

      <form onSubmit={submit} className="space-y-4">
        <Input type="email" label="Email" placeholder="votre@email.com"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <Input type="password" label="Mot de passe" placeholder="••••••••"
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />

        <Button type="submit" loading={loading} variant="accent" className="w-full">
          Se connecter
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Pas de compte ?{' '}
        <Link to="/register" className="text-accent font-medium hover:underline">S'inscrire</Link>
      </p>
    </div>
  );
}