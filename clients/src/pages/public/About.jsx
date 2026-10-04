import { Target, Users, Award, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">À propos de ShoeHub</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Depuis 2020, nous aidons les passionnés de mode à trouver la paire parfaite.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <img src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800"
          alt="Store" className="rounded-2xl shadow-lg" />
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Notre mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Offrir à chaque client une expérience d'achat unique, avec une sélection
            rigoureuse des meilleures marques et un service client irréprochable.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Nous croyons que des chaussures de qualité ne devraient pas coûter une fortune.
            C'est pourquoi nous travaillons directement avec les fabricants.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Users, value: '50K+', label: 'Clients satisfaits' },
          { icon: Award, value: '500+', label: 'Marques partenaires' },
          { icon: Target, value: '1M+', label: 'Commandes livrées' },
          { icon: Heart, value: '4.9/5', label: 'Note moyenne' },
        ].map(({ icon: Icon, value, label }) => (
          <div key={label} className="text-center p-6 bg-white rounded-xl shadow-sm">
            <Icon size={32} className="mx-auto text-accent mb-3" />
            <p className="text-3xl font-bold mb-1">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}