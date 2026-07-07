// Admin Layout — Protected admin area wrapper
export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
    </div>
  );
}
