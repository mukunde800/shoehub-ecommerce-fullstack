import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: brancher endpoint /auth/forgot-password
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      toast.success('Email envoyé si compte existant');
    }, 800);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Mot de passe oublié</h1>
      <p className="text-gray-500 mb-8">Entrez votre email pour recevoir un lien de réinitialisation.</p>

      {sent ? (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg">
          Si un compte existe pour <b>{email}</b>, vous recevrez un email.
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Input type="email" label="Email" value={email}
            onChange={e => setEmail(e.target.value)} required />
          <Button type="submit" loading={loading} variant="accent" className="w-full">
            Envoyer le lien
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-gray-500 mt-6">
        <Link to="/login" className="text-accent hover:underline">Retour à la connexion</Link>
      </p>
    </div>
  );
}