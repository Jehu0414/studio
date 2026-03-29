"use client"

import { useStore, MusicalAsset } from "@/lib/store";
import { Navigation } from "@/components/Navigation";
import { TransposerTool } from "@/components/TransposerTool";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Heart, Music, Video, FileText, Image as ImageIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function SongDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { assets, isLoaded } = useStore();
  
  const asset = assets.find(a => a.id === id);

  if (!isLoaded) return null;
  if (!asset) return <div className="p-10">Asset not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:ml-64 p-6 lg:p-10">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6 -ml-4 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Button>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                 <Badge variant="secondary" className="bg-primary/10 text-primary capitalize">{asset.type}</Badge>
                 {asset.tags.map(tag => (
                   <Badge key={tag} variant="outline" className="border-border text-muted-foreground">{tag}</Badge>
                 ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">{asset.title}</h1>
              {asset.artist && <p className="text-xl text-muted-foreground">{asset.artist}</p>}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full border-border">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-border">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {asset.chords && (
                <section>
                  <h2 className="text-lg font-headline font-bold mb-4 flex items-center gap-2">
                    <Music className="w-5 h-5 text-primary" />
                    Chords
                  </h2>
                  <div className="p-6 rounded-2xl bg-card border border-border font-mono text-2xl leading-relaxed whitespace-pre-wrap tracking-widest text-primary">
                    {asset.chords}
                  </div>
                </section>
              )}

              {asset.content && (
                <section>
                  <h2 className="text-lg font-headline font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-accent" />
                    Performance Notes
                  </h2>
                  <div className="p-6 rounded-2xl bg-card border border-border text-muted-foreground leading-relaxed">
                    {asset.content}
                  </div>
                </section>
              )}

              {asset.mediaUrl && (
                <section>
                   <h2 className="text-lg font-headline font-bold mb-4 flex items-center gap-2">
                    {asset.mediaType === 'video' ? <Video className="w-5 h-5 text-red-400" /> : <ImageIcon className="w-5 h-5 text-primary" />}
                    Media Viewer
                  </h2>
                  <div className="rounded-2xl overflow-hidden border border-border bg-card aspect-video relative">
                    <img 
                      src={asset.mediaUrl} 
                      alt={asset.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <p className="text-white text-sm font-medium">Offline Preview Enabled</p>
                    </div>
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-8">
              <TransposerTool initialChords={asset.chords} />
              
              <div className="p-6 rounded-2xl bg-secondary border border-border">
                <h3 className="font-headline font-bold mb-4">Quick Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Updated</span>
                    <span>{new Date(asset.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sync Status</span>
                    <span className="text-accent">Available Offline</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}