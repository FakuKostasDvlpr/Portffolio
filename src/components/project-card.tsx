"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Github, ExternalLink, Pencil } from 'lucide-react';
import { useAtom } from 'jotai';
import { deleteModeProjAtom } from '@/atoms/deleteMode';
import { EditProjectFormModal } from "@/components/admin/edit-project-form-modal";
import { isAdminModeAtom } from '@/atoms/adminMode';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  href?: string;
  technologies: string[];
  links: any[];
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates?: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[] ;
  className?: string;
}

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  href?: string;
  tags: string[];
  links: any[];
  dates?: string;
  image?: string;
  video?: string;
  link?: string;
  className?: string;
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (project: Project) => Promise<void>;
  project?: Project;
}

function AdminControls({ project, onEdit, onDelete, id, title }: { 
  project?: Project; 
  onEdit?: (project: Project) => Promise<void>; 
  onDelete?: (id: string) => Promise<void>; 
  id: string;
  title: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    document.body.removeAttribute('data-scroll-locked');
    return () => {
      document.body.removeAttribute('data-scroll-locked');
    };
  }, []);

  const handleOpenChange = (open: boolean) => {
    setShowDeleteDialog(open);
    document.body.removeAttribute('data-scroll-locked');
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(id);
      toast.success(`Proyecto "${title}" eliminado`, {
        duration: 3000,
        description: "El proyecto ha sido eliminado correctamente",
        position: "top-center"
      });
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="absolute top-4 right-4 flex gap-4 z-10">
        {project && onEdit && (
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="p-2 rounded-full hover:bg-[#00838d]/10 bg-background/80"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <EditProjectFormModal project={project} onEdit={onEdit}>
              <Pencil className="w-4 h-4 text-[#00838d]" />
            </EditProjectFormModal>
          </motion.button>
        )}
        {onDelete && (
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowDeleteDialog(true);
            }}
            className="p-2 rounded-full hover:bg-red-500/10 bg-background/80"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </motion.button>
        )}
      </div>

      <AlertDialog 
        open={showDeleteDialog} 
        onOpenChange={handleOpenChange}
      >
        <AlertDialogContent onOpenAutoFocus={(e) => {
          e.preventDefault();
          document.body.removeAttribute('data-scroll-locked');
        }}>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente el proyecto &quot;{title}&quot;.
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => document.body.removeAttribute('data-scroll-locked')}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function ProjectCard({
  id,
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
  onDelete,
  onEdit,
  project
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteMode] = useAtom(deleteModeProjAtom);
  const [isAdmin] = useAtom(isAdminModeAtom);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const renderIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'demo':
      case 'live':
        return <ExternalLink className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      animate={isDeleteMode ? {
        rotate: [-1, 1],
        transition: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.2
        }
      } : {}}
    >
      <Card
        className={cn(
          "cursor-pointer",
          "flex flex-col overflow-hidden border relative",
          "hover:border-[#00838d] hover:shadow-lg hover:z-50",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0",
          "hover:after:-z-10 hover:after:bg-white/50 dark:hover:after:bg-[#00838d]/10 hover:after:w-[999px] hover:after:h-[999px] hover:after:backdrop-blur-sm",
          "transition-all duration-300 ease-out h-full",
          "hover:scale-105",
          "dark:bg-zinc-900/50 dark:hover:border-[#00838d]/50",
          className
        )}
      >
        {isAdmin && (
          <AdminControls 
            project={project} 
            onEdit={onEdit} 
            onDelete={onDelete} 
            id={id}
            title={title}
          />
        )}
        <Link
          href={href || "#"}
          className={cn("block cursor-pointer")}
        >
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
            />
          )}
          {image && (
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-40 w-full overflow-hidden object-cover object-top"
            />
          )}
        </Link>
        <CardHeader className="px-2">
          <div className="space-y-1">
            <CardTitle className="mt-1 hover:underline mb-2 text-base"><a target="_blank" href={href}>{title}</a></CardTitle>
            <time className="font-sans text-xs">{dates}</time>
            <div className="hidden font-sans text-xs underline print:visible">
              {link?.replace("https://", "").replace("www.", "").replace("/", "")}
            </div>
            <div className="relative">
              <AnimatePresence initial={false}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: isExpanded ? "auto" : "4.5em" }}
                  exit={{ height: "4.5em" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <Markdown 
                    className={cn(
                      "prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:text-zinc-300",
                      !isExpanded && "line-clamp-3"
                    )}
                  >
                    {description}
                  </Markdown>
                </motion.div>
              </AnimatePresence>
              <motion.button
                onClick={handleExpandClick}
                className={cn(
                  "text-xs text-[#00838d] hover:underline mt-1",
                  isDeleteMode && "pointer-events-none opacity-50"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? "Ver menos" : "Ver más"}
              </motion.button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-auto flex flex-col px-2">
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags?.map((tag) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge
                    className="px-1 py-0 text-[10px]"
                    variant="secondary"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="px-2 pb-2">
          <div className="flex flex-wrap gap-2 mt-2">
            {Array.isArray(links) && links.map((link, idx) => (
              <Link 
                key={idx}
                href={link.href}
                target="_blank"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Badge variant="outline" className="flex items-center gap-1">
                  {renderIcon(link.type)}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
