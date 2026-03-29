"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Music } from "lucide-react";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useStore();
  const [email, setEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock auth
    if (email.includes('admin')) {
      login('admin');
    } else {
      login('user');
    }
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#15151A] p-6">
      <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-border">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl music-gradient flex items-center justify-center mx-auto mb-4">
            <Music className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-2xl font-headline font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your musician vault</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="musician@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background"
            />
            <p className="text-[10px] text-muted-foreground mt-1">Hint: Use 'admin' in email for admin role</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required className="bg-background"/>
          </div>
          <Button type="submit" className="w-full music-gradient text-background font-bold h-11">
            Log In
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <a href="/register" className="text-primary font-medium">Join now</a>
          </p>
        </div>
      </div>
    </div>
  );
}