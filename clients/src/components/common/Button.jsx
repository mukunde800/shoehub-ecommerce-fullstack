export default function Button({
  children, variant = 'primary', size = 'md',
  loading, className = '', ...props
}) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light',
    accent: 'bg-accent text-white hover:bg-accent-dark',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-6 py-3 text-lg',
  };
  return (
    <button
      className={`rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? '...' : children}
    </button>
  );
}