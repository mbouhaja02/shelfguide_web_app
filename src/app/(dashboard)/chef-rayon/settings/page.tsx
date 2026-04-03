'use client';

import { Bell, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-[22px] font-semibold tracking-tight">Paramètres</h1>

      <div className="rounded-2xl border border-[#e2e9f2] bg-white overflow-hidden">
        <div className="flex items-center gap-2 border-b border-[#f0f3f7] px-5 py-3.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#f0f3f7]">
            <Bell className="h-3.5 w-3.5 text-primary" />
          </div>
          <h3 className="text-[14px] font-semibold">Notifications</h3>
        </div>
        <div className="p-5 space-y-0 divide-y divide-[#f0f3f7]">
          <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-[13px] font-medium">Alertes critiques</p>
              <p className="text-[11px] text-muted-foreground">Recevoir les alertes pour les anomalies critiques</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[#2d9cdb]" />
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-[13px] font-medium">Résumé quotidien</p>
              <p className="text-[11px] text-muted-foreground">Recevoir un résumé des audits chaque matin</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[#2d9cdb]" />
          </div>
          <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-[13px] font-medium">Actions en retard</p>
              <p className="text-[11px] text-muted-foreground">Être notifié quand une action dépasse son échéance</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[#2d9cdb]" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e2e9f2] bg-white overflow-hidden">
        <div className="flex items-center gap-2 border-b border-[#f0f3f7] px-5 py-3.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#f0f3f7]">
            <Globe className="h-3.5 w-3.5 text-primary" />
          </div>
          <h3 className="text-[14px] font-semibold">Préférences</h3>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-[13px] font-medium">Langue</label>
            <select className="mt-1 block w-full h-9 rounded-2xl border border-[#e2e9f2] bg-white px-3 text-[13px]">
              <option>Français</option>
              <option>English</option>
            </select>
          </div>
          <div>
            <label className="text-[13px] font-medium">Fuseau horaire</label>
            <select className="mt-1 block w-full h-9 rounded-2xl border border-[#e2e9f2] bg-white px-3 text-[13px]">
              <option>Africa/Casablanca (UTC+1)</option>
              <option>Europe/Paris (UTC+2)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="h-9 rounded-xl bg-[#2d9cdb] px-5 text-[13px] font-medium text-white hover:bg-[#2589c0] transition-all">
          Enregistrer
        </button>
        <button className="h-9 rounded-2xl border border-[#e2e9f2] bg-white px-4 text-[13px] font-medium hover:bg-[#f8fafb] transition-colors">
          Annuler
        </button>
      </div>
    </div>
  );
}
