'use client';

import React, { Suspense } from 'react';
import BadgeCreator from '@/components/badge/BadgeCreator';
import ModernNavbar from '@/components/ui/ModernNavbar';
import RegistrationModal from '@/components/ui/RegistrationModal';

export default function BadgePage() {
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);

  return (
    <main className="relative min-h-screen w-full bg-neutral-950 text-white selection:bg-amber-500 selection:text-black">
      {/* Sticky Navigation Bar */}
      <ModernNavbar onOpenRegister={() => setIsRegisterOpen(true)} />

      {/* Main Hacker Pass Creator Studio */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center font-mono text-amber-400">
            Loading Hacker Pass Studio...
          </div>
        }
      >
        <BadgeCreator />
      </Suspense>

      {/* Registration Modal if user clicks Register from Navbar */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </main>
  );
}
