"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, ListMusic, FileText, Settings, LogOut, LayoutDashboard, CloudOff, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useState, useEffect } from "react";

export function Navigation() {
  const pathname = usePathname();
  const { role, logout } = useStore();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
  }, []);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Songs", icon: Music, href: "/library" },
    { label: "Setlists", icon: ListMusic, href: "/setlists" },
    { label: "Notes", icon: FileText, href: "/notes" },
  ];

  if (role === 'admin') {
    navItems.push({ label: "Manage", icon: Settings, href: "/admin" });
  }

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border hidden md:flex flex-col z-40">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg music-gradient flex items-center justify-center">
            <Music className="w-5 h-5 text-background" />
          </div>
          <span className="text-xl font-headline font-bold tracking-tight">HARMONY</span>
        </div>

        <div className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-11 px-3",
                  pathname === item.href ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-border">
        {!isOnline && (
          <div className="flex items-center gap-2 px-2 py-3 text-xs text-accent mb-4 bg-accent/10 rounded-md">
            <CloudOff className="w-4 h-4" />
            <span>Offline Mode Active</span>
          </div>
        )}
        
        <div className="flex items-center justify-between gap-2">
           <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
              {role === 'admin' ? 'AD' : 'US'}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium capitalize">{role}</span>
              <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">Musician</span>
            </div>
           </div>
           <Button variant="ghost" size="icon" onClick={logout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="w-4 h-4" />
           </Button>
        </div>
      </div>
    </nav>
  );
}