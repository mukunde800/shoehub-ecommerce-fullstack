import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import ProductForm from '../../components/admin/ProductForm';
import Loader from '../../components/common/Loader';

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products?limit=1000').then(({ data }) => {
      const p = data.data.find(x => x.id == id);
      setProduct(p);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div>Produit introuvable</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Modifier le produit</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <ProductForm
          product={product}
          onSuccess={() => { toast.success('Modifié'); navigate('/admin/products'); }}
          onCancel={() => navigate('/admin/products')}
        />
      </div>
    </div>
  );
}