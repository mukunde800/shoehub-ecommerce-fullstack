export default function ProductFilters({ categories, filters, onFilterChange, onReset }) {
  const set = (key, value) => onFilterChange({ ...filters, [key]: value, page: 1 });

  return (
    <aside className="space-y-6 bg-white p-5 rounded-xl shadow-sm h-fit">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Filtres</h3>
        <button onClick={onReset} className="text-xs text-accent hover:underline">Réinitialiser</button>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-sm">Catégories</h4>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="cat" checked={!filters.categoryId}
              onChange={() => set('categoryId', '')} />
            Toutes
          </label>
          {categories.map(c => (
            <label key={c.id} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="cat" checked={filters.categoryId == c.id}
                onChange={() => set('categoryId', c.id)} />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-sm">Prix (DH)</h4>
        <div className="flex gap-2">
          <input type="number" placeholder="Min" value={filters.minPrice || ''}
            onChange={e => set('minPrice', e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm" />
          <input type="number" placeholder="Max" value={filters.maxPrice || ''}
            onChange={e => set('maxPrice', e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm" />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-sm">Taille</h4>
        <div className="flex flex-wrap gap-2">
          {[38, 39, 40, 41, 42, 43, 44, 45].map(s => (
            <button key={s} onClick={() => set('size', filters.size == s ? '' : s)}
              className={`w-9 h-9 border rounded text-sm ${
                filters.size == s ? 'bg-primary text-white' : 'hover:border-primary'
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-sm">Trier par</h4>
        <select value={`${filters.sort}|${filters.order}`}
          onChange={e => {
            const [sort, order] = e.target.value.split('|');
            onFilterChange({ ...filters, sort, order, page: 1 });
          }}
          className="w-full border rounded px-3 py-2 text-sm">
          <option value="createdAt|DESC">Plus récents</option>
          <option value="price|ASC">Prix croissant</option>
          <option value="price|DESC">Prix décroissant</option>
          <option value="rating|DESC">Mieux notés</option>
        </select>
      </div>
    </aside>
  );
}