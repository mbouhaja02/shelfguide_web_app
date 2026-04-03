'use client';

import { useAuth } from '@/hooks/use-auth';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Mail, Calendar, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
  const roleLabel = user.role === 'chef_rayon' ? 'Chef de rayon' : 'Brand Manager';

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-[22px] font-semibold tracking-tight">Mon profil</h1>

      <div className="rounded-xl border border-border/60 bg-white p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-xl font-bold">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.fullName}</h2>
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700 mt-1">
              {roleLabel}
            </span>
          </div>
        </div>

        <div className="space-y-4 text-[13px]">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground/60" />
            <span className="text-muted-foreground w-32">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="h-4 w-4 text-muted-foreground/60" />
            <span className="text-muted-foreground w-32">Rôle</span>
            <span className="font-medium">{roleLabel}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground/60" />
            <span className="text-muted-foreground w-32">Membre depuis</span>
            <span className="font-medium">{format(new Date(user.createdAt), 'dd MMMM yyyy', { locale: fr })}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground/60" />
            <span className="text-muted-foreground w-32">Dernière connexion</span>
            <span className="font-medium">{format(new Date(user.lastLoginAt), 'dd MMM yyyy à HH:mm', { locale: fr })}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="h-9 rounded-xl border border-border/60 bg-white px-4 text-[13px] font-medium hover:bg-slate-50 transition-colors">
          Modifier le profil
        </button>
        <button className="h-9 rounded-xl border border-border/60 bg-white px-4 text-[13px] font-medium hover:bg-slate-50 transition-colors">
          Changer le mot de passe
        </button>
      </div>
    </div>
  );
}
