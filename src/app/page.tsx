"use client"
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { Waves } from 'lucide-react';

const BLUR_FADE_DELAY = 0.04;

const AnimatedDot = () => (
  <motion.span
    className="inline-block w-2 h-2 rounded-full bg-[#00838d]"
    animate={{ scale: [1, 1.2, 1] }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatDelay: 0.5
    }}
  />
);

const WavingIcon = () => (
  <motion.span
    className="inline-block text-[#00838d]"
    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      repeatDelay: 1,
      ease: "easeInOut"
    }}
  >
    <Waves size={24} />
  </motion.span>
);

const RevealSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Page() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const projectsToShow = showAllProjects ? DATA.projects : DATA.projects.slice(0, 4);

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16 md:space-y-24 px-4 py-8 md:py-16">
      <div className="mx-auto w-full max-w-2xl">
        <RevealSection>
          <section id="hero" className="mb-16 md:mb-24">
            <div className="mx-auto w-full space-y-8">
              <div className="gap-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-col gap-10 flex flex-1 space-y-1.5">
                  <BlurFadeText
                    delay={BLUR_FADE_DELAY}
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    yOffset={8}
                    text={`Hola, Soy Facundo Costas Tealdi`}
                  />
                  <BlurFadeText
                    className="max-w-[600px] md:text-xl"
                    delay={BLUR_FADE_DELAY}
                    text={DATA.description}
                  />
                </div>
                <BlurFade delay={BLUR_FADE_DELAY}>
                  <motion.div
                    whileHover={{ 
                      rotate: [-15, 15],
                      transition: {
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    }}
                    className="cursor-grab hover:cursor-grabbing transform-gpu"
                  >
                    <Avatar className="size-32 border p-3">
                      <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                      <AvatarFallback>{DATA.initials}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                </BlurFade> 
              </div>
            </div>
          </section>
        </RevealSection>
        <RevealSection delay={0.2}>
          <section id="work" className="space-y-6">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h2 className="text-2xl font-bold mb-6">Experiencia laboral</h2>
            </BlurFade>
            <div className="flex flex-col gap-4">
              {DATA.work.map((work, id) => (
                <BlurFade
                  key={work.company}
                  delay={BLUR_FADE_DELAY * 6 + id * 0.05}
                >
                  <ResumeCard
                    key={work.company}
                    logoUrl={work.logoUrl}
                    altText={work.company}
                    title={work.company}
                    subtitle={work.title}
                    href={work.href}
                    period={
                      <div className="flex items-center gap-2">
                        <span>{`${work.start} - ${work.end ?? "Present"}`}</span>
                      </div>
                    }
                    description={work.description.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                    badges={work.badges}
                  />
                </BlurFade>
              ))}
            </div>
          </section>
        </RevealSection>
        <RevealSection delay={0.3}>
          <section id="about" className="space-y-6">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h2 className="text-2xl font-bold mb-4">Sobre Mí</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                {DATA.summary}
              </Markdown>
            </BlurFade>
          </section>
        </RevealSection>
      </div>

      <RevealSection delay={0.4}>
        <section id="projects" className="w-full py-10">
          <div className="space-y-16 w-full max-w-[1400px] mx-auto px-4 md:px-8">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <div className="space-y-6">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    Mis Proyectos
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Mira mis últimos trabajos
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    He trabajado en una variedad de proyectos, desde sitios web simples hasta aplicaciones web complejas. Estos son algunos de mis favoritos.
                  </p>
                </div>
              </div>
            </BlurFade>
            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto">
                {projectsToShow.map((project, id) => (
                  <motion.div
                    key={project.title}
                    initial={id >= 4 ? { opacity: 0, y: 20 } : false}
                    animate={id >= 4 ? { opacity: 1, y: 0 } : false}
                    transition={{ 
                      duration: 0.4,
                      delay: id * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <BlurFade
                      key={project.title}
                      delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                    >
                      <ProjectCard
                        href={project.href}
                        title={project.title}
                        description={project.description}
                        tags={project.technologies}
                        links={project.links}
                      />
                    </BlurFade>
                  </motion.div>
                ))}
              </div>
              
              {DATA.projects.length > 4 && (
                <motion.div 
                  className="flex flex-col items-center gap-2 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-muted-foreground">
                    Mostrando {projectsToShow.length} de {DATA.projects.length} proyectos
                  </p>
                  <button
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    className="group px-4 py-2 rounded-lg bg-transparent border text-[#1b1b1b] dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 flex items-center gap-2"
                  >
                    <span>{showAllProjects ? "Ver menos proyectos" : "Ver más proyectos"}</span>
                    <motion.span
                      animate={{ rotate: showAllProjects ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="inline-block"
                    >
                      ↓
                    </motion.span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </RevealSection>

      <div className="mx-auto w-full max-w-2xl">
        <RevealSection delay={0.5}>
          <section id="skills" className="space-y-6 mb-16 md:mb-24">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-2xl font-bold mb-6">Skills</h2>
            </BlurFade>
            <div className="flex items-center justify-center flex-wrap gap-2">
              {DATA.skills.map((skill, id) => (
                <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                  <Badge key={skill}>{skill}</Badge>
                </BlurFade>
              ))}
            </div>
          </section>
        </RevealSection>
        <RevealSection delay={0.6}>
          <section id="education" className="space-y-6 mb-16 md:mb-24">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-2xl font-bold mb-6">Educación</h2>
            </BlurFade>
            <div className="flex flex-col gap-4">
              {DATA.education.map((education, id) => (
                <BlurFade
                  key={education.school}
                  delay={BLUR_FADE_DELAY * 8 + id * 0.05}
                >
                  <ResumeCard
                    key={education.school}
                    href={education.href}
                    logoUrl={education.logoUrl}
                    altText={education.school}
                    title={education.school}
                    subtitle={education.degree}
                    period={`${education.start} - ${education.end}`}
                  />
                </BlurFade>
              ))}
            </div>
          </section>
        </RevealSection>
        <RevealSection delay={0.7}>
          <section id="contact" className="py-16 md:py-24">
            <BlurFade delay={BLUR_FADE_DELAY * 16}>
              <div className="space-y-6 text-center">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Contacto
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ponte en contacto
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ¿Quieres charlar o tienes una propuesta laboral? Simplemente {" "}
                  <Link
                    href={DATA.contact.social.LinkedIn.url}
                    className="text-blue-500 hover:underline"
                  >
                    envíame un mensaje directo a mi perfil de LinkedIn
                  </Link>{" "}
                  y responderé siempre que pueda.
                </p>
              </div>
            </BlurFade>
          </section>
        </RevealSection>
      </div>
    </main>
  );
}
