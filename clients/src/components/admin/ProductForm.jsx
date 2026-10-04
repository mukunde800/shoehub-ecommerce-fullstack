import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import api from '../../api/axios';

export default function ProductForm({ product, onSuccess, onCancel }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '', description: '', price: '', discountPrice: '', stock: '',
    brand: '', categoryId: '', sizes: [], colors: [], isFeatured: false,
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data));
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        discountPrice: product.discountPrice || '',
        stock: product.stock || '',
        brand: product.brand || '',
        categoryId: product.categoryId || '',
        sizes: product.sizes || [],
        colors: product.colors || [],
        isFeatured: product.isFeatured || false,
      });
    }
  }, [product]);

  const toggleArray = (key, value) => {
    setForm(f => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter(v => v !== value) : [...f[key], value],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
        else fd.append(k, v);
      });
      images.forEach(img => fd.append('images', img));

      if (product) await api.put(`/products/${product.id}`, fd);
      else await api.post('/products', fd);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

      <Input label="Nom" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} required />
      <Input label="Marque" value={form.brand}
        onChange={e => setForm({ ...form, brand: e.target.value })} />

      <div>
        <label className="block text-sm font-medium mb-1.5">Description</label>
        <textarea rows={3} value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2.5 border rounded-lg" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Input type="number" label="Prix" value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })} required />
        <Input type="number" label="Prix promo" value={form.discountPrice}
          onChange={e => setForm({ ...form, discountPrice: e.target.value })} />
        <Input type="number" label="Stock" value={form.stock}
          onChange={e => setForm({ ...form, stock: e.target.value })} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Catégorie</label>
        <select value={form.categoryId}
          onChange={e => setForm({ ...form, categoryId: e.target.value })}
          className="w-full px-4 py-2.5 border rounded-lg" required>
          <option value="">-- Sélectionner --</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tailles</label>
        <div className="flex flex-wrap gap-2">
          {[38,39,40,41,42,43,44,45].map(s => (
            <button key={s} type="button" onClick={() => toggleArray('sizes', s)}
              className={`w-10 h-10 border rounded ${form.sizes.includes(s) ? 'bg-primary text-white' : 'hover:border-primary'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Images</label>
        <input type="file" accept="image/*" multiple
          onChange={e => setImages(Array.from(e.target.files))}
          className="w-full text-sm" />
        {images.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((f, i) => (
              <div key={i} className="relative">
                <img src={URL.createObjectURL(f)} alt="" className="w-16 h-16 object-cover rounded" />
              </div>
            ))}
          </div>
        )}
      </div>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={form.isFeatured}
          onChange={e => setForm({ ...form, isFeatured: e.target.checked })} />
        <span className="text-sm">Produit vedette</span>
      </label>

      <div className="flex gap-2 pt-4">
        <Button type="submit" loading={loading} variant="accent" className="flex-1">
          {product ? 'Modifier' : 'Créer'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
      </div>
    </form>
  );
}