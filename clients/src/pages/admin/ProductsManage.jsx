import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import ProductForm from '../../components/admin/ProductForm';
import Button from '../../components/common/Button';

export default function ProductsManage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, product: null });

  const fetch = () => {
    setLoading(true);
    api.get('/products?limit=100')
      .then(({ data }) => setProducts(data.data))
      .finally(() => setLoading(false));
  };

  useEffect(fetch, []);

  const remove = async (id) => {
    if (!confirm('Désactiver ce produit ?')) return;
    await api.delete(`/products/${id}`);
    toast.success('Produit désactivé');
    fetch();
  };

  const columns = [
    {
      key: 'image', label: 'Image',
      render: r => (
        <img src={r.images?.[0]} alt="" className="w-12 h-12 object-cover rounded" />
      ),
    },
    { key: 'name', label: 'Nom' },
    { key: 'category', label: 'Catégorie', render: r => r.Category?.name },
    { key: 'price', label: 'Prix', render: r => `${r.price} DH` },
    { key: 'stock', label: 'Stock' },
    {
      key: 'actions', label: 'Actions',
      render: r => (
        <div className="flex gap-2">
          <button onClick={() => setModal({ open: true, product: r })}
            className="p-1.5 text-blue-500 hover:bg-blue-50 rounded">
            <Edit2 size={16} />
          </button>
          <button onClick={() => remove(r.id)}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Produits</h1>
        <Button variant="accent" onClick={() => setModal({ open: true, product: null })}>
          <span className="flex items-center gap-2"><Plus size={16} /> Nouveau</span>
        </Button>
      </div>

      <DataTable columns={columns} data={products} loading={loading} />

      <Modal isOpen={modal.open} onClose={() => setModal({ open: false, product: null })}
        title={modal.product ? 'Modifier le produit' : 'Nouveau produit'} size="lg">
        <ProductForm product={modal.product}
          onSuccess={() => { setModal({ open: false, product: null }); fetch(); toast.success('Enregistré'); }}
          onCancel={() => setModal({ open: false, product: null })} />
      </Modal>
    </div>
  );
}