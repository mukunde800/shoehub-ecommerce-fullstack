import { useEffect, useState } from 'react';
import { ToggleLeft, ToggleRight, Shield, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import DataTable from '../../components/admin/DataTable';
import { useDebounce } from '../../hooks/useDebounce';

export default function UsersManage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search);

  const fetch = () => {
    setLoading(true);
    api.get('/users', { params: { search: debounced } })
      .then(({ data }) => setUsers(data.data))
      .finally(() => setLoading(false));
  };

  useEffect(fetch, [debounced]);

  const toggleStatus = async (id) => {
    await api.put(`/users/${id}/toggle-status`);
    toast.success('Statut modifié');
    fetch();
  };

  const changeRole = async (id, role) => {
    await api.put(`/users/${id}/role`, { role });
    toast.success('Rôle modifié');
    fetch();
  };

  const columns = [
    { key: 'name', label: 'Nom',
      render: r => `${r.firstName} ${r.lastName}` },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Téléphone', render: r => r.phone || '-' },
    { key: 'role', label: 'Rôle',
      render: r => (
        <select value={r.role} onChange={e => changeRole(r.id, e.target.value)}
          className="border rounded px-2 py-1 text-xs">
          <option value="customer">Client</option>
          <option value="admin">Admin</option>
        </select>
      ),
    },
    { key: 'status', label: 'Statut',
      render: r => (
        <span className={`text-xs px-2 py-1 rounded ${
          r.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {r.isActive ? 'Actif' : 'Inactif'}
        </span>
      ),
    },
    { key: 'actions', label: 'Actions',
      render: r => (
        <button onClick={() => toggleStatus(r.id)}
          className={`p-1.5 rounded ${r.isActive ? 'text-red-500 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'}`}>
          {r.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Utilisateurs ({users.length})</h1>
        <input type="search" placeholder="Rechercher..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm w-72" />
      </div>
      <DataTable columns={columns} data={users} loading={loading} />
    </div>
  );
}