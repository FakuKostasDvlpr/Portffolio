"use client"
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "./user-avatar";
import { LogoutButton } from "./logout-button";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function AdminNavControls() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await supabase.auth.getSession();
      const email = session.data.session?.user?.email;
      if (email === "costasfacundotealdi@gmail.com") {
        setIsAdmin(true);
      }
    };
    checkAuth();
  }, []);

  if (!isAdmin) return null;

  return (
    <>
      <Separator orientation="vertical" className="h-full py-2" />
      <LogoutButton />
      <Separator orientation="vertical" className="h-full py-2" />
      <UserAvatar />
    </>
  );
} 