import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import CategoryForm from '../../components/admin/CategoryForm';
import Button from '../../components/common/Button';

export default function CategoriesManage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, category: null });

  const fetch = () => {
    setLoading(true);
    api.get('/categories').then(({ data }) => setCategories(data)).finally(() => setLoading(false));
  };

  useEffect(fetch, []);

  const remove = async (id) => {
    if (!confirm('Désactiver cette catégorie ?')) return;
    await api.delete(`/categories/${id}`);
    toast.success('Désactivée');
    fetch();
  };

  const columns = [
    { key: 'image', label: 'Image',
      render: r => r.image
        ? <img src={r.image} alt="" className="w-12 h-12 rounded object-cover" />
        : <div className="w-12 h-12 bg-gray-200 rounded" /> },
    { key: 'name', label: 'Nom' },
    { key: 'slug', label: 'Slug' },
    { key: 'products', label: 'Produits', render: r => r.Products?.length || 0 },
    { key: 'actions', label: 'Actions',
      render: r => (
        <div className="flex gap-2">
          <button onClick={() => setModal({ open: true, category: r })}
            className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
          <button onClick={() => remove(r.id)}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Catégories</h1>
        <Button variant="accent" onClick={() => setModal({ open: true, category: null })}>
          <span className="flex items-center gap-2"><Plus size={16} /> Nouvelle</span>
        </Button>
      </div>

      <DataTable columns={columns} data={categories} loading={loading} />

      <Modal isOpen={modal.open} onClose={() => setModal({ open: false, category: null })}
        title={modal.category ? 'Modifier' : 'Nouvelle catégorie'}>
        <CategoryForm category={modal.category}
          onSuccess={() => { setModal({ open: false, category: null }); fetch(); toast.success('OK'); }}
          onCancel={() => setModal({ open: false, category: null })} />
      </Modal>
    </div>
  );
}