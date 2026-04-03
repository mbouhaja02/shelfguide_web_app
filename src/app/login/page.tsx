'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { LogIn, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('yassine.elamrani@marjane.ma');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const ok = await login(email, password);
      if (ok) {
        router.push('/');
      } else {
        setError('Identifiants incorrects');
      }
    } catch {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-[#f8f9fb]" />
      <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-[120px]" />
      <div className="absolute bottom-0 -right-40 h-[500px] w-[500px] rounded-full bg-violet-200/40 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-100/30 blur-[100px]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 w-full max-w-[420px] animate-fade-in">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl overflow-hidden shadow-xl shadow-indigo-500/20">
            <img src="/logo.jpeg" alt="ShelfGuide" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-[28px] font-bold tracking-tight text-foreground">ShelfGuide</h1>
          <p className="text-sm text-muted-foreground mt-1.5">Plateforme de supervision merchandising pour le retail au Maroc</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-xl p-7 shadow-xl shadow-black/[0.04]">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">Connexion</h2>
            <p className="text-[13px] text-muted-foreground mt-1">Accédez à votre espace de supervision</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="w-full h-10 rounded-lg border border-border bg-white px-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-medium text-foreground">Mot de passe</label>
                <button type="button" className="text-[12px] text-primary hover:text-primary/80 font-medium transition-colors">
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-10 rounded-lg border border-border bg-white px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                />
                <button
                  type="button"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-muted-foreground/60 hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2">
                <p className="text-[13px] text-red-600 font-medium">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo accounts */}
        <div className="mt-5 rounded-xl border border-border/50 bg-white/60 backdrop-blur-sm p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">Comptes de démonstration</p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => { setEmail('yassine.elamrani@marjane.ma'); }}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-indigo-50/60 transition-colors group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 text-[11px] font-bold group-hover:bg-blue-100 transition-colors">YE</div>
              <div>
                <p className="text-[13px] font-medium text-foreground">Yassine El Amrani · Chef de rayon</p>
                <p className="text-[11px] text-muted-foreground">Marjane · Casablanca / Rabat / Meknès</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => { setEmail('salma.bennani@noordelice.ma'); }}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-violet-50/60 transition-colors group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600 text-[11px] font-bold group-hover:bg-violet-100 transition-colors">SB</div>
              <div>
                <p className="text-[13px] font-medium text-foreground">Salma Bennani · Brand Manager</p>
                <p className="text-[11px] text-muted-foreground">Noor Délice · 12 magasins au Maroc</p>
              </div>
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-muted-foreground/50 mt-6">
          © 2026 ShelfGuide · v1.0
        </p>
      </div>
    </div>
  );
}
