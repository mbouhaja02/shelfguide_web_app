'use client';

import { EmptyShelfZone } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SeverityBadge } from '@/components/dashboard/status-badge';
import { MapPin } from 'lucide-react';

interface ZoneListProps {
  zones: EmptyShelfZone[];
  className?: string;
}

export function ZoneList({ zones, className }: ZoneListProps) {
  if (zones.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Aucune zone vide détectée
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Zones détectées ({zones.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {zones.map((zone) => (
          <div
            key={zone.id}
            className="flex items-center justify-between rounded-lg border p-3 text-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs font-mono text-muted-foreground">
                {zone.id.replace('z', '#')}
              </div>
              <div>
                <p className="font-medium">{zone.label || 'Zone non identifiée'}</p>
                <p className="text-xs text-muted-foreground">
                  Confiance {Math.round(zone.confidence * 100)}%
                </p>
              </div>
            </div>
            <SeverityBadge priority={zone.severity} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
