'use client';
import React, { useEffect } from 'react';
import useUserStore from '@/src/entities/user/model/userStore';
import { setCurrentUser } from '@/src/entities/user/model/userActions';
import { getLoggedInUser, logoutUser } from '@/src/features/auth/api/authApi';
import { usePathname, useRouter } from 'next/navigation';

const HIDDEN_PATHS: (string | null)[] = ['/login', '/register'];

const Navbar: React.FC = () => {
  const router = useRouter();
  const currentUser = useUserStore((s) => s.currentUser);
  const pathname = usePathname();
  useEffect(() => {
    (async () => {
      if (!currentUser) {
        try {
          const user = await getLoggedInUser();
          if (user) setCurrentUser(user);
        } catch {}
      }
    })();
  }, []);
  if (HIDDEN_PATHS.includes(pathname)) return null;

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    router.push('/login');
    router.refresh();
  };

  if (!currentUser) return null;

  return (
    <nav className="flex items-center justify-end gap-2 px-4 py-3 bg-gray-50 border border-gray-200">
      <span className="text-sm font-medium text-gray-700">{currentUser.email}</span>
      <button
        onClick={handleLogout}
        className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
