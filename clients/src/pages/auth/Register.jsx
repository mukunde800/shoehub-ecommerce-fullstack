import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirm: '',
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error('Mots de passe différents');
    setLoading(true);
    try {
      await register({
        firstName: form.firstName, lastName: form.lastName,
        email: form.email, password: form.password,
      });
      toast.success('Compte créé !');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Créer un compte</h1>
      <p className="text-gray-500 mb-8">Rejoignez ShoeHub en quelques secondes.</p>

      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Prénom" value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })} required />
          <Input label="Nom" value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })} required />
        </div>
        <Input type="email" label="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} required />
        <Input type="password" label="Mot de passe" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} />
        <Input type="password" label="Confirmer" value={form.confirm}
          onChange={e => setForm({ ...form, confirm: e.target.value })} required />

        <Button type="submit" loading={loading} variant="accent" className="w-full">
          Créer mon compte
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Déjà inscrit ?{' '}
        <Link to="/login" className="text-accent font-medium hover:underline">Se connecter</Link>
      </p>
    </div>
  );
}