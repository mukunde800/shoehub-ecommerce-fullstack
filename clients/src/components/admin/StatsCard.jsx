export default function StatsCard({ icon: Icon, label, value, color = 'bg-blue-500' }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}