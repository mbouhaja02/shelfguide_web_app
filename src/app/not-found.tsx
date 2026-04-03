import { EmptyState } from '@/components/dashboard/empty-state';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <EmptyState
        icon={FileQuestion}
        title="Page introuvable"
        description="La page que vous recherchez n'existe pas ou a été déplacée."
        action={
          <Link href="/">
            <Button>Retour à l&apos;accueil</Button>
          </Link>
        }
      />
    </div>
  );
}
