"use client"
import { Button } from "@/components/ui/button";
import { Power } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

export function LogoutButton() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await supabase.auth.getSession();
      const email = session.data.session?.user?.email;
      if (email === "costasfacundotealdi@gmail.com") {
        setIsAdmin(true);
        setUserEmail(email);
      }
    };
    checkAuth();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (!isAdmin) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSignOut}
      className="group relative"
    >
      <Power className="h-5 w-5 text-red-500" />
      <span className="absolute bottom-full mb-2 right-0 
                     bg-black text-white px-2 py-1 rounded text-xs opacity-0 
                     group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Cerrar sesión 
      </span>
    </Button>
  );
} 