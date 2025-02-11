"use client"
import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import { Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAtom } from 'jotai';
import { deleteModeProjAtom } from '@/atoms/deleteMode';
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteButtonModalProps {
  className?: string;
}

export function DeleteButtonModal({ className }: DeleteButtonModalProps) {
  const [isDeleteMode, setIsDeleteMode] = useAtom(deleteModeProjAtom);
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [projectToDelete, setProjectToDelete] = React.useState<string | null>(null);

  // Manejar la tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDeleteMode(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [setIsDeleteMode]);

  const handleDeleteProject = async (id: string) => {
    setProjectToDelete(id);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (projectToDelete) {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectToDelete);

      if (error) {
        console.error('Error al eliminar:', error);
      }
      setShowConfirmDialog(false);
      setProjectToDelete(null);
    }
  };

  return (
    <>
      <div className={className}>
        <motion.button
          onClick={() => setIsDeleteMode(!isDeleteMode)}
          className={cn(
            "relative group p-3 rounded-full border-2 transition-colors",
            isDeleteMode
              ? "border-red-500 bg-red-500/10"
              : "border-[#00838d]/20 hover:border-[#00838d]"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash2 className={cn(
            "w-5 h-5 transition-colors",
            isDeleteMode
              ? "text-red-500"
              : "text-[#00838d]/60 group-hover:text-[#00838d]"
          )} />
        </motion.button>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El proyecto será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
