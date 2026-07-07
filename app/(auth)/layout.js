// Auth Layout - Clean, centered layout for login/register/forgot-password pages
// No sidebar or navbar — just a branded background with centered form

export const metadata = {
  title: 'Sign In | 75 Days Hard English',
};

export default function AuthLayout({ children }) {
  return (
    // Full screen with gradient background — matches brand colors
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-primary-950/20 to-secondary-950/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
