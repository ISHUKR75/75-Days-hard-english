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
    <div className="min-h-screen bg-surface-950">
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
