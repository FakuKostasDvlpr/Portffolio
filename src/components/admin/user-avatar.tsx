"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

export function UserAvatar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await supabase.auth.getSession();
      const user = session.data.session?.user;
      if (user?.email === "costasfacundotealdi@gmail.com") {
        setIsAdmin(true);
        setUserEmail(user.email);
        setUserAvatar(user.user_metadata.avatar_url);
      }
    };
    checkAuth();
  }, []);

  if (!isAdmin) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar className="size-8 cursor-pointer">
          <AvatarImage src={userAvatar || ''} alt="User" />
          <AvatarFallback>FC</AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{userEmail}</p>
      </TooltipContent>
    </Tooltip>
  );
} 