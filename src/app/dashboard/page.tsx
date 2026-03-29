"use client"

import { Navigation } from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Music, ListMusic, FileText, Clock, ChevronRight, Zap } from "lucide-react";
import { useStore } from "@/lib/store";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { assets, isLoaded, role } = useStore();

  if (!isLoaded) return null;

  const stats = [
    { label: "Songs", value: assets.filter(a => a.type === 'song').length, icon: Music },
    { label: "Setlists", value: assets.filter(a => a.type === 'setlist').length, icon: ListMusic },
    { label: "Notes", value: assets.filter(a => a.type === 'note').length, icon: FileText },
  ];

  const recentAssets = [...assets].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:ml-64 p-6 lg:p-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold mb-2">Hello, Musician</h1>
            <p className="text-muted-foreground">Welcome to your Harmony Vault dashboard.</p>
          </div>
          {role === 'admin' && (
            <Link href="/admin">
              <Button className="music-gradient text-background font-bold">
                Manage Content
              </Button>
            </Link>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <Card key={i} className="border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-headline font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Assets
            </h2>
            <div className="grid gap-3">
              {recentAssets.map(asset => (
                <Link key={asset.id} href={`/library/${asset.id}`}>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-card hover:bg-muted border border-border transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        {asset.type === 'song' ? <Music className="w-5 h-5 text-primary" /> : <FileText className="w-5 h-5 text-accent" />}
                      </div>
                      <div>
                        <div className="font-medium">{asset.title}</div>
                        <div className="text-xs text-muted-foreground capitalize">{asset.type} • Updated {new Date(asset.updatedAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-headline font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Pro Tips
            </h2>
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground italic mb-4">
                  "Use the Intelligent Transposer to quickly adapt any song to your singer's vocal range."
                </p>
                <Link href="/library">
                  <Button variant="link" className="text-accent p-0 font-bold h-auto">Open Library →</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}