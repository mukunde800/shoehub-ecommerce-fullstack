import { Link } from 'react-router-dom';

export default function CartSummary({ totalPrice, itemCount }) {
  const shipping = 0;
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-20">
      <h2 className="font-bold text-xl mb-4">Récapitulatif</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Articles ({itemCount})</span>
          <span>{totalPrice} DH</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Livraison</span>
          <span className="text-green-600">{shipping === 0 ? 'Gratuit' : `${shipping} DH`}</span>
        </div>
        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">{totalPrice + shipping} DH</span>
        </div>
      </div>
      <Link to="/checkout"
        className="block text-center bg-accent text-white py-3 rounded-lg hover:bg-accent-dark transition mt-6 font-medium">
        Passer la commande
      </Link>
    </div>
  );
}