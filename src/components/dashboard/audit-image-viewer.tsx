'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, Image } from 'lucide-react';

interface AuditImageViewerProps {
  imageUrl: string;
  annotatedImageUrl?: string;
  className?: string;
}

export function AuditImageViewer({ imageUrl, annotatedImageUrl, className }: AuditImageViewerProps) {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <Tabs defaultValue="original">
          <TabsList className="mb-3">
            <TabsTrigger value="original" className="gap-1.5 text-xs">
              <ImageIcon className="h-3.5 w-3.5" />
              Photo originale
            </TabsTrigger>
            {annotatedImageUrl && (
              <TabsTrigger value="annotated" className="gap-1.5 text-xs">
                <Image className="h-3.5 w-3.5" />
                Photo annotée
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="original">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border">
              <div className="text-center text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">Aperçu photo</p>
                <p className="text-xs">{imageUrl}</p>
              </div>
            </div>
          </TabsContent>
          {annotatedImageUrl && (
            <TabsContent value="annotated">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border">
                <div className="text-center text-muted-foreground">
                  <Image className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium">Aperçu annoté</p>
                  <p className="text-xs">{annotatedImageUrl}</p>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
