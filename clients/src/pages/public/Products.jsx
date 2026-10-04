import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import api from '../../api/axios';
import ProductGrid from '../../components/products/ProductGrid';
import ProductFilters from '../../components/products/ProductFilters';
import Pagination from '../../components/common/Pagination';
import { useDebounce } from '../../hooks/useDebounce';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    page: 1, limit: 12, search: '', sort: 'createdAt', order: 'DESC',
  });
  const debouncedSearch = useDebounce(filters.search, 400);

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    api.get('/products', { params: { ...filters, search: debouncedSearch } })
      .then(({ data }) => {
        setProducts(data.data);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }, [filters, debouncedSearch]);

  const reset = () => setFilters({
    page: 1, limit: 12, search: '', sort: 'createdAt', order: 'DESC',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Nos chaussures</h1>
          <p className="text-gray-500 text-sm mt-1">{pagination.total || 0} produits</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="search" placeholder="Rechercher..."
              value={filters.search}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value, page: 1 }))}
              className="border rounded-lg pl-10 pr-4 py-2 w-full md:w-72" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden p-2 border rounded-lg">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <ProductFilters
            categories={categories}
            filters={filters}
            onFilterChange={setFilters}
            onReset={reset}
          />
        </div>
        <div className="lg:col-span-3">
          <ProductGrid products={products} loading={loading} />
          <Pagination current={pagination.page} total={pagination.pages}
            onChange={(page) => setFilters(f => ({ ...f, page }))} />
        </div>
      </div>
    </div>
  );
}