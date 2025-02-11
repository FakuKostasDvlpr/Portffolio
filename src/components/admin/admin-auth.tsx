"use client"
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase';
import { AdminPanel } from "./admin-panel";
import { config } from '@/lib/config';
import { Toast } from "@/components/ui/toast";
import { useAtom } from 'jotai';
import { isAdminModeAtom } from '@/atoms/adminMode';

interface AdminAuthProps {
  children: React.ReactNode;
}

export function AdminAuth({ children }: AdminAuthProps) {
  const [isAdmin, setIsAdmin] = useAtom(isAdminModeAtom);
  const [error, setError] = useState("");
  const [pin, setPin] = useState("");
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const [showUnauthorizedToast, setShowUnauthorizedToast] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const cleanup = () => {
      document.body.removeAttribute('data-scroll-locked');
    };

    cleanup();

    return cleanup;
  }, []);

  useEffect(() => {
    console.log('PIN env:', process.env.NEXT_PUBLIC_ADMIN_PIN);
  }, []);

  // Verificar el estado de autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email === "costasfacundotealdi@gmail.com") {
        setIsAdmin(true);
      }
    };
    checkAuth();

    // Suscribirse a cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.email === "costasfacundotealdi@gmail.com") {
        setIsAdmin(true);
        setIsOpen(false);
      } else if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setIsAdmin]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    document.body.removeAttribute('data-scroll-locked');
  };

  const handlePinCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const inputPin = String(pin);
      const correctPin = String(process.env.NEXT_PUBLIC_ADMIN_SECURITY_PIN);

      if (inputPin === correctPin) {
        setShowGoogleLogin(true);
        setPin("");
        setError("");
      } else {
        setError("PIN incorrecto");
        setPin("");
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error en la autenticación');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error:', error);
      setError('Error al iniciar sesión con Google');
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <div onDoubleClick={() => {
          setIsOpen(true);
          document.body.removeAttribute('data-scroll-locked');
        }} className="cursor-pointer">
          {children}
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          onClick={() => document.body.removeAttribute('data-scroll-locked')}
        />
        <Dialog.Content 
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-background p-6 rounded-lg shadow-lg z-50"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            document.body.removeAttribute('data-scroll-locked');
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            document.body.removeAttribute('data-scroll-locked');
          }}
        >
          <Dialog.Title className="text-lg font-bold mb-4">
            Acceso Administrador
          </Dialog.Title>
          
          {!showGoogleLogin ? (
            <form onSubmit={handlePinCheck} className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Ingresa el PIN de seguridad
                </label>
                <Input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 4) {
                      setPin(value);
                    }
                  }}
                  placeholder="****"
                  className="mt-1 text-center tracking-widest text-xl"
                />
              </div>
              <Button type="submit" className="w-full">
                Verificar
              </Button>
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            </form>
          ) : (
            <div className="space-y-4">
              <Button 
                onClick={handleGoogleLogin}
                className="w-full"
              >
                Continuar con Google
              </Button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 