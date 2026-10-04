export default function DataTable({ columns, data, loading }) {
  if (loading) return <div className="text-center py-12 text-gray-500">Chargement...</div>;
  if (!data?.length) return <div className="text-center py-12 text-gray-500">Aucune donnée</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map(c => (
              <th key={c.key} className="text-left px-4 py-3 font-semibold text-gray-700">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || i} className="border-b last:border-0 hover:bg-gray-50">
              {columns.map(c => (
                <td key={c.key} className="px-4 py-3">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}