'use client';
import { setCurrentUser } from '@/src/entities/user/model/userActions';
import { getLoggedInUser } from '@/src/features/auth/api/authApi';
import { setRouter } from '@/src/shared/lib/router';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Bootstrapper() {
  const router = useRouter();
  useEffect(() => {
    setRouter(router);
  }, [router]);
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
