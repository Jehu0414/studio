"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Music } from "lucide-react";
import { useStore } from "@/lib/store";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useStore();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login('user');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#15151A] p-6">
      <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-border">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl music-gradient flex items-center justify-center mx-auto mb-4">
            <Music className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-2xl font-headline font-bold mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join the professional musician network</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" required className="bg-background"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" required className="bg-background"/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="musician@example.com" required className="bg-background"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required className="bg-background"/>
          </div>
          <Button type="submit" className="w-full music-gradient text-background font-bold h-11 mt-4">
            Get Started
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account? <a href="/login" className="text-primary font-medium">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}