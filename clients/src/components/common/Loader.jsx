export default function Loader({ fullScreen }) {
  const cls = fullScreen
    ? 'min-h-screen flex items-center justify-center'
    : 'flex items-center justify-center py-12';
  return (
    <div className={cls}>
      <div className="w-10 h-10 border-4 border-gray-200 border-t-accent rounded-full animate-spin" />
    </div>
  );
}