"use client"

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Music, Shield, Zap, Smartphone, ArrowRight } from "lucide-react";
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const { role } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (role) router.push('/dashboard');
  }, [role, router]);

  return (
    <div className="min-h-screen bg-[#15151A] overflow-x-hidden">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg music-gradient flex items-center justify-center">
            <Music className="w-5 h-5 text-background" />
          </div>
          <span className="text-2xl font-headline font-bold tracking-tight">Harmony Vault</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Log in</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">Join Free</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full music-gradient opacity-5 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Zap className="w-3 h-3 fill-current" />
            <span>The ultimate musician's vault is now live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight mb-8 tracking-tighter">
            Every chord, every setlist. <br />
            <span className="text-transparent bg-clip-text music-gradient">Available everywhere.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            A secure, offline-first repository for professional musicians. Manage your charts, performance notes, and media assets with zero friction.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="music-gradient text-background hover:opacity-90 h-14 px-8 text-lg font-bold">
                Get Started for Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-medium border-white/10 bg-white/5">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Offline-First",
            desc: "Never worry about venue Wi-Fi again. Your entire library is synced and ready for offline use.",
            icon: Shield
          },
          {
            title: "Smart Transposer",
            desc: "AI-powered chord transposition with intelligent voicing suggestions for any instrument.",
            icon: Zap
          },
          {
            title: "PWA Ready",
            desc: "Install Harmony Vault on any device. It feels like a native app on your phone, tablet, or laptop.",
            icon: Smartphone
          }
        ].map((feature, i) => (
          <div key={i} className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:music-gradient transition-colors">
              <feature.icon className="w-6 h-6 text-primary group-hover:text-background" />
            </div>
            <h3 className="text-xl font-headline font-bold mb-4">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg music-gradient flex items-center justify-center">
              <Music className="w-4 h-4 text-background" />
            </div>
            <span className="font-headline font-bold">Harmony Vault</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 Harmony Vault. Designed for the stage.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}