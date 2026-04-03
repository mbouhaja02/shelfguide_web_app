'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === 'brand_manager') {
      router.replace('/brand-manager');
    } else {
      router.replace('/chef-rayon');
    }
  }, [user, router]);

  return null;
}
