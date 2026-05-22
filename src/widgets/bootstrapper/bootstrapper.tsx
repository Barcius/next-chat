'use client';
import { setCurrentUser } from '@/src/entities/user/model/userActions';
import { getLoggedInUser } from '@/src/features/auth/api/authApi';
import { useEffect } from 'react';

export default function Bootstrapper() {
  useEffect(() => {
    (async () => {
      try {
        const user = await getLoggedInUser();
        if (user) setCurrentUser(user);
      } catch {}
    })();
  }, []);

  return null;
}
