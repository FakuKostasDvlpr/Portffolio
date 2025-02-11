"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { supabase } from '@/lib/supabase';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { techCategories, getTechCategory } from '@/lib/tech-categories';
import { cn } from '@/lib/utils';

interface ProjectFormModalProps {
  onClose?: () => void;
}

type ProjectFormData = {
  title: string;
  description: string;
  href: string;
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
  };
};

const initialFormData: ProjectFormData = {
  title: "",
  description: "",
  href: "",
  technologies: [],
  links: {
    github: "",
    demo: "",
  },
};

export function ProjectFormModal({ onClose }: ProjectFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [techInput, setTechInput] = useState("");
  const [recentTechs, setRecentTechs] = useState<string[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const longPressTimeout = useRef<NodeJS.Timeout>();
  const [selectedForDeletion, setSelectedForDeletion] = useState<string | null>(null);

  useEffect(() => {
    // Cargar tecnologías recientes del localStorage
    const saved = localStorage.getItem('recentTechnologies');
    if (saved) {
      setRecentTechs(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...formData,
          links: {
            github: formData.links.github || null,
            demo: formData.links.demo || null,
          }
        }])
        .select()

      if (error) throw error;
      
      setIsOpen(false);
      setFormData(initialFormData);
      
      const event = new CustomEvent('projectAdded', { detail: data?.[0] });
      window.dispatchEvent(event);

      if (onClose) onClose();
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
    }
  };

  const toggleTechnology = (tech: string) => {
    setFormData(prev => {
      const exists = prev.technologies.includes(tech);
      return {
        ...prev,
        technologies: exists 
          ? prev.technologies.filter(t => t !== tech)
          : [...prev.technologies, tech]
      };
    });

    // Actualizar recientes solo si se está añadiendo
    if (!formData.technologies.includes(tech)) {
      const updatedRecent = [tech, ...recentTechs.filter(t => t !== tech)].slice(0, 5);
      setRecentTechs(updatedRecent);
      localStorage.setItem('recentTechnologies', JSON.stringify(updatedRecent));
    }
  };

  const addCustomTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      toggleTechnology(techInput.trim());
      setTechInput("");
    }
  };

  // Agregar estas funciones para manejar el long press
  const handleLongPressStart = (projectId: string) => {
    longPressTimeout.current = setTimeout(() => {
      setIsDeleteMode(true);
      setSelectedForDeletion(projectId);
    }, 800); // 800ms de presión para activar
  };

  const handleLongPressEnd = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      // Disparar evento de proyecto eliminado
      const event = new CustomEvent('projectDeleted', { detail: { id: projectId } });
      window.dispatchEvent(event);

      setIsDeleteMode(false);
      setSelectedForDeletion(null);
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
    }
  };

  // Agregar un efecto para limpiar el timeout
  useEffect(() => {
    return () => {
      if (longPressTimeout.current) {
        clearTimeout(longPressTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className=" flex text-center items-center justify-center mx-auto w-12 h-12 mb-5 rounded-full border-2 border-[#00838d]/20 group-hover:border-[#00838d] transition-colors">
          <Plus className="w-5 h-5 text-[#00838d]/60 group-hover:text-[#00838d] transition-colors" />
          
        </div>
        
        <span className=" -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          Agregar Proyecto
        </span>
      </motion.button>

      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <DialogPrimitive.Content
            className="fixed left-[50%] top-[50%] z-[101] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-background/95 p-6 shadow-lg backdrop-blur-md"
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Nuevo Proyecto</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Título del Proyecto
                  </label>
                  <Input
                    placeholder="Ej: Mi Proyecto Increíble"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Descripción
                  </label>
                  <Textarea
                    placeholder="Describe tu proyecto..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                    className="min-h-[120px]"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    URL del Proyecto
                  </label>
                  <Input
                    placeholder="https://..."
                    value={formData.href}
                    onChange={(e) => setFormData(prev => ({...prev, href: e.target.value}))}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Enlaces
                  </label>
                  <div className="space-y-3">
                    <Input
                      placeholder="GitHub URL"
                      value={formData.links.github}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        links: { ...prev.links, github: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="Demo URL"
                      value={formData.links.demo}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        links: { ...prev.links, demo: e.target.value }
                      }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-sm font-medium">Tecnologías</label>
                  
                  {/* Input para tecnología personalizada */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Agregar tecnología personalizada..."
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTechnology())}
                    />
                    <Button 
                      type="button" 
                      onClick={addCustomTechnology}
                      variant="outline"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Tecnologías seleccionadas */}
                  {formData.technologies.length > 0 && (
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <h4 className="text-sm font-medium mb-3">Tecnologías seleccionadas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="bg-[#00838d] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                          >
                            <span>{tech}</span>
                            <button
                              onClick={() => toggleTechnology(tech)}
                              className="hover:text-white/80 transition-colors"
                              type="button"
                            >
                              ×
                            </button>
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categorías de tecnologías */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(techCategories).map(([key, category]) => (
                      <div key={key} className="p-4 border rounded-lg">
                        <h4 className="text-sm font-medium mb-3">{category.label}</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.technologies.map((tech) => {
                            const isSelected = formData.technologies.includes(tech);
                            return (
                              <button
                                key={tech}
                                onClick={() => toggleTechnology(tech)}
                                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                  isSelected 
                                    ? 'bg-[#00838d] text-white' 
                                    : 'bg-muted hover:bg-muted/80'
                                }`}
                                type="button"
                              >
                                {tech}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tecnologías recientes */}
                  {recentTechs.length > 0 && (
                    <div className="p-4 border rounded-lg">
                      <h4 className="text-sm font-medium mb-3">Recientes</h4>
                      <div className="flex flex-wrap gap-2">
                        {recentTechs.map((tech) => {
                          const isSelected = formData.technologies.includes(tech);
                          return (
                            <button
                              key={tech}
                              onClick={() => toggleTechnology(tech)}
                              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                isSelected 
                                  ? 'bg-[#00838d] text-white' 
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                              type="button"
                            >
                              {tech}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  Guardar Proyecto
                </Button>
              </div>
            </form>

            <DialogPrimitive.Close className="absolute top-4 right-4 opacity-70 hover:opacity-100">
              ✕
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
} 