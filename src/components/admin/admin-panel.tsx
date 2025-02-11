import { useState, useEffect } from "react";
import { ProjectFormModal } from "./project-form-modal";
import { ProjectCard } from "../project-card";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabase";
import { Power } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string;
    href?: string;
    technologies: string[];
    links: {
        github?: string | null;
        demo?: string | null;
    };
}

export function AdminPanel() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                const formattedProjects = data.map(project => ({
                    ...project,
                    links: {
                        github: project.links?.github || null,
                        demo: project.links?.demo || null
                    }
                }));
                setProjects(formattedProjects);
            }
        };

        const getUserEmail = async () => {
            const session = await supabase.auth.getSession();
            setUserEmail(session.data.session?.user?.email || null);
        };

        fetchProjects();
        getUserEmail();

        // Suscripción a cambios en tiempo real
        const channel = supabase
            .channel('projects')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' },
                () => {
                    fetchProjects();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    };

    return (
        <div className="">
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Panel de Administración</h1>
                        <p className="text-muted-foreground">Conectado como: {userEmail}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button onClick={() => setIsAddingProject(true)}>
                            Agregar Proyecto
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleSignOut}
                            className="group relative"
                        >
                            <Power className="h-5 w-5 text-red-500" />
                            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                            bg-black text-white px-2 py-1 rounded text-xs opacity-0 
                            group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Cerrar sesión como {userEmail}
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="relative group">
                            <ProjectCard
                                href={project.href}
                                title={project.title}
                                description={project.description}
                                tags={project.technologies}
                                links={[
                                    ...(project.links.github ? [{
                                        icon: "GitHub",
                                        type: "GitHub",
                                        href: project.links.github
                                    }] : []),
                                    ...(project.links.demo ? [{
                                        icon: "Demo",
                                        type: "Demo",
                                        href: project.links.demo
                                    }] : [])
                                ]}
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={async () => {
                                        if (confirm('¿Estás seguro de eliminar este proyecto?')) {
                                            await supabase
                                                .from('projects')
                                                .delete()
                                                .eq('id', project.id);
                                        }
                                    }}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Project Modal */}
            {isAddingProject && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-background p-6 rounded-lg max-w-2xl w-full mx-4">
                        <ProjectFormModal onClose={() => setIsAddingProject(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}