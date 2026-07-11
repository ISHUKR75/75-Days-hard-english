'use client';
// Main App Layout - Wraps all authenticated/main pages
// Includes the top Navbar and left Sidebar

import { useState } from 'react';
import Navbar       from '@/components/layout/Navbar';
import Sidebar      from '@/components/layout/Sidebar';

// ============================================================
// Main Layout
// ============================================================
export default function MainLayout({ children }) {
  // Track mobile sidebar open/close state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // Full viewport container
    <div className="min-h-screen bg-surface-950 relative isolate overflow-x-clip">
      {/* Ambient animated gradient mesh — premium SaaS backdrop (Linear/Stripe-style),
          fixed + pointer-events-none so it never blocks interaction or scrolls with content */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-5%] w-[36rem] h-[36rem] rounded-full bg-violet-600/10 blur-[120px] animate-mesh-drift-1" />
        <div className="absolute top-[20%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-cyan-500/8 blur-[120px] animate-mesh-drift-2" />
        <div className="absolute bottom-[-15%] left-[20%] w-[34rem] h-[34rem] rounded-full bg-fuchsia-600/8 blur-[130px] animate-mesh-drift-3" />
      </div>

      {/* Top Navbar (fixed, z-50) */}
      <Navbar
        onMobileMenuToggle={() => setMobileMenuOpen((v) => !v)}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Left Sidebar (fixed on desktop, drawer on mobile) */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main content area — offset for navbar (top) and sidebar (left on desktop) */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
