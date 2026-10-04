import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import api from '../../api/axios';

export default function CategoryForm({ category, onSuccess, onCancel }) {
  const [form, setForm] = useState({ name: '', description: '' });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) setForm({ name: category.name, description: category.description || '' });
  }, [category]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('description', form.description);
    if (image) fd.append('image', image);

    try {
      if (category) await api.put(`/categories/${category.id}`, fd);
      else await api.post('/categories', fd);
      onSuccess();
    } catch {}
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input label="Nom" value={form.name} required
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <div>
        <label className="block text-sm font-medium mb-1.5">Description</label>
        <textarea rows={3} value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2.5 border rounded-lg" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Image</label>
        <input type="file" accept="image/*"
          onChange={e => setImage(e.target.files[0])} className="text-sm" />
      </div>
      <div className="flex gap-2 pt-2">
        <Button type="submit" loading={loading} variant="accent" className="flex-1">
          {category ? 'Modifier' : 'Créer'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
      </div>
    </form>
  );
}