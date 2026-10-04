import { useState, useEffect } from 'react';
import { Star, Send } from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function ProductReviews({ productId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(false);

  const fetch = () => api.get(`/reviews/product/${productId}`).then(({ data }) => setReviews(data));
  useEffect(() => { if (productId) fetch(); }, [productId]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/reviews', { productId, ...form });
      toast.success('Avis publié');
      setForm({ rating: 5, comment: '' });
      fetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Avis ({reviews.length})</h3>

      {user ? (
        <form onSubmit={submit} className="bg-gray-50 p-4 rounded-xl space-y-3">
          <div>
            <label className="text-sm font-medium">Note</label>
            <div className="flex gap-1 mt-1">
              {[1,2,3,4,5].map(n => (
                <button key={n} type="button" onClick={() => setForm(f => ({ ...f, rating: n }))}>
                  <Star size={22} className={n <= form.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                </button>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Partagez votre expérience..."
            value={form.comment}
            onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <button disabled={loading} className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg">
            <Send size={16} /> {loading ? 'Envoi...' : 'Publier'}
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-500">Connectez-vous pour laisser un avis.</p>
      )}

      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{r.User?.firstName} {r.User?.lastName}</p>
                <div className="flex gap-1 mt-1">
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} size={14}
                      className={n <= r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString('fr-FR')}</p>
            </div>
            <p className="text-gray-700 mt-2 text-sm">{r.comment}</p>
          </div>
        ))}
        {!reviews.length && <p className="text-gray-500 text-sm">Aucun avis pour l'instant.</p>}
      </div>
    </div>
  );
}