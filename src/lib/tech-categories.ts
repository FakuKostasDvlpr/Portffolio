export const techCategories = {
  frontend: {
    label: "Frontend",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Vue", "Angular", "TypeScript", "Tailwind", "Bootstrap"]
  },
  backend: {
    label: "Backend",
    technologies: ["Node.js", "Express", "Python", "Django", "PHP", "Laravel", "Java", "Spring", "C#", ".NET"]
  },
  database: {
    label: "Base de datos",
    technologies: ["MongoDB", "MySQL", "PostgreSQL", "SQLite", "Firebase", "Supabase"]
  },
  webstore: {
    label: "E-commerce",
    technologies: ["Shopify", "WooCommerce", "Magento", "PrestaShop", "Webflow"]
  },
  tools: {
    label: "Herramientas",
    technologies: ["Git", "Docker", "AWS", "Vercel", "Netlify", "Heroku"]
  }
};

export const getTechCategory = (tech: string): string => {
  const lowercaseTech = tech.toLowerCase();
  
  for (const [category, data] of Object.entries(techCategories)) {
    if (data.technologies.some(t => t.toLowerCase() === lowercaseTech)) {
      return data.label;
    }
  }
  
  return "Otros";
}; 