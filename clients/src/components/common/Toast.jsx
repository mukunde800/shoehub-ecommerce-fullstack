import { Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: 'text-sm',
        success: { iconTheme: { primary: '#f97316', secondary: '#fff' } },
      }}
    />
  );
}