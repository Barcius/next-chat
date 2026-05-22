'use client';
import React from 'react';
import useUserStore from '@/src/entities/user/model/userStore';
import { setCurrentUser } from '@/src/entities/user/model/userActions';
import { logoutUser } from '@/src/features/auth/api/authApi';
import { usePathname, useRouter } from 'next/navigation';
import { authPaths } from '@/src/shared/lib/auth/paths';

const Navbar: React.FC = () => {
  const router = useRouter();
  const currentUser = useUserStore((s) => s.currentUser);
  const pathname = usePathname();
  if (authPaths.includes(pathname)) return null;

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="flex items-center justify-end gap-2 px-4 py-3 bg-gray-50 border border-gray-200 h-15">
      {currentUser && (
        <>
          <span className="text-sm font-medium text-gray-700">{currentUser.email}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
