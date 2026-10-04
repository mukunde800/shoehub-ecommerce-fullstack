import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [tab, setTab] = useState('info');
  const [form, setForm] = useState({
    firstName: user?.firstName || '', lastName: user?.lastName || '',
    phone: user?.phone || '', address: user?.address || '',
    city: user?.city || '', postalCode: user?.postalCode || '',
    country: user?.country || '',
  });
  const [pwd, setPwd] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const saveInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/users/profile', form);
      toast.success('Profil mis à jour');
      setUser?.(data);
    } catch {}
    setLoading(false);
  };

  const changePwd = async (e) => {
    e.preventDefault();
    if (pwd.newPassword !== pwd.confirm) return toast.error('Mots de passe différents');
    setLoading(true);
    try {
      await api.put('/users/change-password', pwd);
      toast.success('Mot de passe modifié');
      setPwd({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mon profil</h1>

      <div className="flex gap-4 border-b mb-6">
        {[
          { k: 'info', l: 'Informations' },
          { k: 'password', l: 'Mot de passe' },
        ].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)}
            className={`py-2 font-medium border-b-2 -mb-px ${
              tab === t.k ? 'border-accent text-accent' : 'border-transparent text-gray-500'
            }`}>
            {t.l}
          </button>
        ))}
      </div>

      {tab === 'info' ? (
        <form onSubmit={saveInfo} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Prénom" value={form.firstName}
              onChange={e => setForm({ ...form, firstName: e.target.value })} />
            <Input label="Nom" value={form.lastName}
              onChange={e => setForm({ ...form, lastName: e.target.value })} />
          </div>
          <Input label="Email" value={user?.email} disabled />
          <Input label="Téléphone" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })} />
          <Input label="Adresse" value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })} />
          <div className="grid md:grid-cols-3 gap-4">
            <Input label="Ville" value={form.city}
              onChange={e => setForm({ ...form, city: e.target.value })} />
            <Input label="Code postal" value={form.postalCode}
              onChange={e => setForm({ ...form, postalCode: e.target.value })} />
            <Input label="Pays" value={form.country}
              onChange={e => setForm({ ...form, country: e.target.value })} />
          </div>
          <Button type="submit" loading={loading} variant="accent">Enregistrer</Button>
        </form>
      ) : (
        <form onSubmit={changePwd} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <Input type="password" label="Mot de passe actuel" value={pwd.currentPassword}
            onChange={e => setPwd({ ...pwd, currentPassword: e.target.value })} required />
          <Input type="password" label="Nouveau mot de passe" value={pwd.newPassword}
            onChange={e => setPwd({ ...pwd, newPassword: e.target.value })} required minLength={6} />
          <Input type="password" label="Confirmer" value={pwd.confirm}
            onChange={e => setPwd({ ...pwd, confirm: e.target.value })} required />
          <Button type="submit" loading={loading} variant="accent">Modifier</Button>
        </form>
      )}
    </div>
  );
}