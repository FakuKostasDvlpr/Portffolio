import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Edit2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  href?: string;
  technologies: string[];
  links: {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
}

interface EditProjectFormModalProps {
  project: Project;
  onEdit: (project: Project) => Promise<void>;
}

export function EditProjectFormModal({ project, onEdit }: EditProjectFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(project);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onEdit(formData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Proyecto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium">
              Título
            </label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium">
              Descripción
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="href" className="text-sm font-medium">
              URL del Proyecto
            </label>
            <Input
              id="href"
              value={formData.href || ''}
              onChange={(e) => setFormData({ ...formData, href: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="technologies" className="text-sm font-medium">
              Tecnologías (separadas por coma)
            </label>
            <Input
              id="technologies"
              value={formData.technologies.join(', ')}
              onChange={(e) => setFormData({ 
                ...formData, 
                technologies: e.target.value.split(',').map(tech => tech.trim()) 
              })}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 