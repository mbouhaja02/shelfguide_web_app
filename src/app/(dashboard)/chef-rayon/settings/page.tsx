'use client';

import { Bell, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-[22px] font-semibold tracking-tight">Paramètres</h1>

      <div className="rounded-2xl border border-sky-100/60 bg-white overflow-hidden">
        <div className="flex items-center gap-2 border-b border-sky-50 px-5 py-3.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sky-50">
            <Bell className="h-3.5 w-3.5 text-sky-600" />
          </div>
          <h3 className="text-[14px] font-semibold">Notifications</h3>
        </div>
        <div className="p-5 space-y-0 divide-y divide-sky-50">
          <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-[13px] font-medium">Alertes critiques</p>
              <p className="text-[11px] text-muted-foreground">Recevoir les alertes pour les anomalies critiques</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-sky-500" />
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-[13px] font-medium">Résumé quotidien</p>
              <p className="text-[11px] text-muted-foreground">Recevoir un résumé des audits chaque matin</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-sky-500" />
          </div>
          <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-[13px] font-medium">Actions en retard</p>
              <p className="text-[11px] text-muted-foreground">Être notifié quand une action dépasse son échéance</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-sky-500" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-sky-100/60 bg-white overflow-hidden">
        <div className="flex items-center gap-2 border-b border-sky-50 px-5 py-3.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sky-50">
            <Globe className="h-3.5 w-3.5 text-sky-600" />
          </div>
          <h3 className="text-[14px] font-semibold">Préférences</h3>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-[13px] font-medium">Langue</label>
            <select className="mt-1 block w-full h-9 rounded-2xl border border-sky-100/60 bg-white px-3 text-[13px]">
              <option>Français</option>
              <option>English</option>
            </select>
          </div>
          <div>
            <label className="text-[13px] font-medium">Fuseau horaire</label>
            <select className="mt-1 block w-full h-9 rounded-2xl border border-sky-100/60 bg-white px-3 text-[13px]">
              <option>Africa/Casablanca (UTC+1)</option>
              <option>Europe/Paris (UTC+2)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="h-9 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 text-[13px] font-medium text-white hover:from-sky-600 hover:to-cyan-600 transition-all">
          Enregistrer
        </button>
        <button className="h-9 rounded-2xl border border-sky-100/60 bg-white px-4 text-[13px] font-medium hover:bg-sky-50/50 transition-colors">
          Annuler
        </button>
      </div>
    </div>
  );
}
