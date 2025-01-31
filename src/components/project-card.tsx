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
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export function ProjectCard({
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
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
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
              onClick={(e) => {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }}
              className="text-xs text-[#00838d] hover:underline mt-1"
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
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links
              ?.filter(link => link.href)
              .map((link, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <Link href={link.href} target="_blank">
                    <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                      {link.icon}
                      {link.type}
                    </Badge>
                  </Link>
                </motion.div>
              ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
