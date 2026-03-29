"use client"

import { useStore } from "@/lib/store";
import { Navigation } from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Search, Filter, Music, ChevronRight, ListMusic, FileText } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function LibraryPage() {
  const { assets, isLoaded } = useStore();
  const [search, setSearch] = useState("");

  if (!isLoaded) return null;

  const filtered = assets.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) || 
    a.artist?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:ml-64 p-6 lg:p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-headline font-bold mb-6">Music Library</h1>
          
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                className="pl-10 h-11 bg-card border-border" 
                placeholder="Search songs, setlists, notes..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="h-11 px-4 rounded-md border border-border bg-card flex items-center gap-2 text-sm hover:bg-muted transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </header>

        <div className="grid gap-4">
          {filtered.length > 0 ? (
            filtered.map(asset => (
              <Link key={asset.id} href={`/library/${asset.id}`}>
                <div className="flex items-center gap-6 p-5 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary flex items-center justify-center shrink-0">
                    {asset.mediaUrl ? (
                      <img src={asset.mediaUrl} alt={asset.title} className="w-full h-full object-cover" />
                    ) : (
                      asset.type === 'song' ? <Music className="w-6 h-6 text-primary" /> : <FileText className="w-6 h-6 text-accent" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-headline font-bold truncate group-hover:text-primary transition-colors">{asset.title}</h3>
                      <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4 bg-muted border-none uppercase tracking-tighter">{asset.type}</Badge>
                    </div>
                    {asset.artist && <p className="text-sm text-muted-foreground mb-2">{asset.artist}</p>}
                    <div className="flex flex-wrap gap-1">
                      {asset.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-muted-foreground">#{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">
                      {new Date(asset.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-20 border border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground">No assets found for "{search}"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}