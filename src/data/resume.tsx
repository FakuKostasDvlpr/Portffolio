import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Facundo Costas - Portfolio",
  initials: "FC",
  url: "https://google.com",
  location: "Rosario, SF",
  locationLink: "https://www.google.com/maps/place/rosario",
  description:
    "Desarrollador Frontend enfocado en crear interfaces modernas, eficientes y de alto rendimiento, utilizando mi conocimiento y mejores prácticas.",
  summary:
    "Mi nombre es facu, soy estudiante de ingeniería en sistemas informáticos y desarrollador de aplicaciones web He tenido la oportunidad de trabajar en proyectos relacionados al mundo del desarrollo web, sin embargo, actualmente mis intereses y todo mi enfoque se encuentra en la mejora de mis habilidades y conocimientos dentro del mundo del desarrollo de aplicaciones wweb, en especial aplicaciones orientadas a los sistemas de ventas y react. Soy un apasionado por el mundo de la tecnología y la creación de software, siempre en constante aprendizaje y tratando de estar lo más actualizado posible.",
  avatarUrl: "/me.png",
  skills: [
    "React",
    "Next.js",
    "JavaScript",
    "HTML",
    "CSS",
    "Styled Components",
    "Bootstrap",
    "API RESTful",
    // "NPM",
    "GitHub",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/FakuKostasDvlpr",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/facundo-costas-tealdi/",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "costasfacundotealdi@gmail.com",
        icon: Icons.email,

        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Refindable",
      href: "https://refindable.com/",
      badges: [],
      location: "Remote",
      title: "Desarrollador Web Shopify & WordPress",
      logoUrl: "https://refindable.com/wp-content/uploads/2022/05/cropped-Refindable-favicon-cuadrado-192x192.png",
      start: "Diciembre 2024",
      end: "Actualidad",
      description: "●  Diseño, desarrollo y mantenimiento de sitios web en Shopify y WordPress, creando nuevas secciones, solucionando problemas y colaborando con clientes para implementar mejoras y cumplir sus objetivos digitales."
    },
    {
      company: "BAEK & Co",
      badges: [],
      href: "https://baekyco.com/",
      location: "Presencial",
      title: "Director de proyecto",
      logoUrl: "https://media.licdn.com/dms/image/v2/D4D0BAQGBQjVTWf2qtA/company-logo_200_200/company-logo_200_200/0/1735827400906/baekyco_logo?e=1745452800&v=beta&t=uwcP6SYsWT3JG19nDreAg67BNAgGaLm1WDTLjvZk45E",
      start: "Octubre 2024",
      end: "Diciembre 2024",
      description:
        " Diseño y desarrollo de páginas web desde cero, colaborando con el equipo de marketing para aportar ideas creativas y técnicas.● Trabajo tanto en el frontend como en el backend (PHP), con planes de migración a nuevas tecnologías. ● Participación en reuniones con clientes para ofrecer soluciones y recomendaciones estratégicas que mejoren la experiencia del usuario y optimicen el producto.",
    },
    {
      company: "Sancor Bebe",
      badges: [],
      href: "https://sancorbebeshop.com.ar/",
      location: "Remote",
      title: "Desarrollador web & Shopify",
      logoUrl: "https://cdn.batitienda.com/baticloud/images/brand_593438f2fc7c469bb0b998a51fde1ceb_638254724237105562_0_m.png",
      start: "Julio 2024",
      end: "Noviembre 2024",
      description:
        "  Creación y mantenimiento de la interfaz de usuario con Shopify Liquid: Desarrollo y personalización de secciones de la tienda en línea.Implementación de diseño responsive y aseguramiento de la funcionalidad en dispositivos móviles y desktop.Mantenimiento y optimización de la tienda en Shopify: Supervisión del rendimiento del sitio, actualizaciones y corrección de errores.",
    },
    {
      company: "GMS.SA",
      badges: [],
      href: "http://www.gmssa.com/",
      location: "Presencial",
      title: "Analista Programador C# .NET SQL",
      logoUrl: "http://www.gmssa.com/wp-content/uploads/2021/06/gms-ico.png",
      start: "Mayo 2024",
      end: "Septiembre 2024",
      description:
        " Desarrollador de software con experiencia en la creación de interfaces de usuario utilizando WPF y en la implementación de lógica de negocio y servicios con C#. Especializado en la gestión de bases de datos, consultas SQL, pruebas, tratamiento de errores y optimización del rendimiento. Experto en la implementación y despliegue continuo de aplicaciones, trabajando en estrecha colaboración con equipos multidisciplinares. Hábil en la documentación técnica detallada y en asegurar la calidad del software.",
    },
    {
      company: "Drewolf",
      badges: [],
      href: "https://drewolf.com/",
      location: "Remote",
      title: "Programador Full Stack",
      logoUrl: "https://drewolf.com/wp-content/uploads/2022/08/cropped-favicon-2-32x32.png",
      start: "Agosto 2023",
      end: "Mayo 2024",
      description:
        " Desarrollo de aplicaciones web utilizando React y TypeScript para crear interfaces de usuario eficientes. En el backend, trabajo con C# y MongoDB, desarrollando servicios y API, así como creando y gestionando tablas en MongoDB. También soy responsable de probar la aplicación gestionar los errores encontrados en Jira, garantizando la calidad del producto final.",
    },
  ],
  education: [
    {
      school: "Instituto Padre Elizalde",
      href: "https://elizalde.edu.ar/",
      degree: "Técnico en Informática",
      logoUrl: "https://elizalde.edu.ar/wp-content/uploads/2024/02/cropped-LogoIPE.png",
      start: "2018",
      end: "2023",
    }
  ],
  projects: [
    // {
    //   title: "Asistente Educativo - Vercel AI SDK",
    //   href: "",
    //   dates: "Septiembre 2024 - Octubre 2024",
    //   active: true,
    //   description:
    //     "Asistente educativo con IA, diseñado para apoyar a estudiantes en diversas materias escolares. Responde preguntas, proporciona explicaciones claras y ofrece ejemplos personalizados. Una funcionalidad clave del asistente es la capacidad de subir imágenes para facilitar la comprensión de temas complejos.",
    //   technologies: [
    //     "Next.js",
    //     "React",
    //     "CSS",
    //     "Ui Verse",
    //     "Vercel",
    //   ],
    //   links: [
    //     {
    //       type: "Source",
    //       href: "https://github.com/Benit0Trdlla/Educational-Assistant",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    // },
    // {
    //   title: "Genera y Gestiona Tus Contraseñas",
    //   href: "https://genera-y-gestiona-tus-contrasenas-gray.vercel.app/",
    //   dates: "Septiembre 2024 - Septiembre 2024",
    //   active: true,
    //   description:
    //     "Genera y gestiona tus contraseñas de forma segura. Puedes crearlas automáticamente o personalizarlas con una palabra específica, con longitudes entre 8 y 16 caracteres. Guarda, copia, utiliza y elimina contraseñas fácilmente con una interfaz intuitiva.",
    //   technologies: [
    //     "React",
    //     "CSS",
    //     "Ui Verse",
    //     "Vite",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://genera-y-gestiona-tus-contrasenas-gray.vercel.app/",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/Benit0Trdlla/Passwords",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    // },
    // {
    //   title: "Mi Versión de Linktree",
    //   href: "https://my-linktree-pink.vercel.app/",
    //   dates: "Septiembre 2024 - Septiembre 2024",
    //   active: true,
    //   description:
    //     "Desarrollé mi propia alternativa a Linktree, centrándome en crear una plataforma sencilla y eficaz para gestionar múltiples enlaces. El proyecto incluye funciones personalizables que permiten a los usuarios organizar y compartir sus enlaces de forma clara y atractiva.",
    //   technologies: [
    //     "React",
    //     "CSS",
    //     "Ui Verse",
    //     "Vite",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://my-linktree-pink.vercel.app/",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/Benit0Trdlla/My-Linktree",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    // },
    // {
    //   title: "Clon Web AFIP",
    //   href: "https://clon-afip.vercel.app/",
    //   dates: "Agosto 2024 - Agosto 2024",
    //   active: true,
    //   description:
    //     "Este proyecto consistió en clonar el sitio web de la AFIP, la institución tributaria de Argentina, con el objetivo de practicar y mejorar mis habilidades en React, React Router y Bootstrap. Me aseguré de que tanto el diseño como las funcionalidades fueran lo más fieles posibles al sitio original.",
    //   technologies: [
    //     "React",
    //     "React Router",
    //     "CSS",
    //     "Bootstrap",
    //     "Vite",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://clon-afip.vercel.app/",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/Benit0Trdlla/Clon-AFIP",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    // },
    // {
    //   title: "Perfil de Usuario",
    //   href: "https://todo-teal-two.vercel.app/",
    //   dates: "Julio 2024 - Julio 2024",
    //   active: true,
    //   description:
    //     "Proyecto enfocado en la práctica y mejora de habilidades en maquetación web y el uso de CSS Modules. El objetivo principal fue crear una estructura bien organizada y responsive, asegurando que cada componente mantuviera un estilo encapsulado y fácil de mantener.",
    //   technologies: [
    //     "CSS Modules",
    //     "Next.js",
    //     "React",
    //     "Vercel",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://perfil-de-usuario-two.vercel.app/",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/Benit0Trdlla/Perfil-de-Usuario",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    // },
    // {
    //   title: "ToDo",
    //   href: "https://todo-teal-two.vercel.app/",
    //   dates: "Febrero 2024 - Febrero 2024",
    //   active: true,
    //   description:
    //     "Aplicación destinada a la gestión y almacenamiento de tareas pendientes. Esta herramienta proporciona una organización efectiva y establece objetivos claros para avanzar de manera eficiente en el desarrollo y gestión de proyectos.",
    //   technologies: [
    //     "HTML",
    //     "CSS",
    //     "Javascript",
    //     "React",
    //     "Vite",
    //     "Vercel",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://todo-teal-two.vercel.app/",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/Benit0Trdlla/Todo",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],

    // },
    // {
    //   title: "WeatherApp",
    //   href: "#",
    //   dates: "Febrero 2023 - Febrero 2024",
    //   active: true,
    //   description:
    //     "Aplicación que proporciona información meteorológica detallada para la ciudad consultada. La interfaz muestra datos clave, como el nombre de la ciudad, el país, la temperatura actual y una descripción del clima vigente. Además, la aplicación está integrada con Google Maps para facilitar la ubicación geográfica.",
    //   technologies: [
    //     "HTML",
    //     "CSS",
    //     "Javascript",
    //     "React",
    //     "Vite",
    //     "Vercel",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://weather-app-beige-eight-68.vercel.app/",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/Benit0Trdlla/WeatherApp",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    // },
    // {
    //   title: "CRUD Challenge",
    //   href: "#",
    //   dates: "Enero 2024 - Enero 2024",
    //   active: true,
    //   description:
    //     "Challenge diseñado para practicar tecnologías backend y el manejo de bases de datos relacionales. El desafío consistió en desarrollar un sistema CRUD para la gestión de notas, incorporando funcionalidades de almacenamiento y un filtro para facilitar la búsqueda de las notas guardadas.",
    //   technologies: [
    //     "HTML",
    //     "Javascript",
    //     "CSS",
    //     "Node.js",
    //     "Express",
    //     "MySQL",
    //     "Prisma",
    //   ],
    //   links: [
    //     {
    //       type: "Source",
    //       href: "https://github.com/Benit0Trdlla/CRUD-Challenge",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    // },
    // {
    //   title: "Chatbot del Colegio Salesiano San José N° 2043",
    //   href: "#",
    //   dates: "Julio 2023 - Noviembre 2023",
    //   active: true,
    //   description:
    //     "En mi último año de secundaria desarrollé un chatbot para responder diversas consultas relacionadas con la institución, como la historia del colegio, su administración, las modalidades de carreras técnicas de seis años y detalles sobre la Bienal (Exposición Educativa).",
    //   technologies: [
    //     "HTML",
    //     "CSS",
    //     "Javascript",
    //     "Node.js",
    //     "Express",
    //     "Bootstrap",
    //     "Open AI",
    //     "Python",
    //   ],
    //   links: [
    //     {
    //       type: "Source",
    //       href: "https://github.com/Benit0Trdlla/Chatbot2043",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    // },
    // {
    //   title: "Laburar Podcast Web Page",
    //   href: "#",
    //   dates: "Agosto 2023 - Noviembre 2023",
    //   active: true,
    //   description:
    //     "El sitio web presenta los episodios emitidos de un podcast y ofrece a los usuarios la capacidad de gestionar una lista de favoritos, permitiendo agregar o eliminar capítulos. La funcionalidad de favoritos requiere que los usuarios creen una cuenta, que incluye la opción de personalizar la imagen de perfil.",
    //   technologies: [
    //     "HTML",
    //     "Javascript",
    //     "CSS",
    //     "Node.js",
    //     "Express",
    //     "MySQL",
    //     "Bootstrap",
    //     "EJS (motor de plantillas)",
    //   ],
    //   links: [
    //     {
    //       type: "Source",
    //       href: "https://github.com/NicolasSaldana/Podcast-NodeJS",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    // },
    // {
    //   title: "Detector de Mentiras",
    //   href: "#",
    //   dates: "Abril 2022 - Diciembre 2022",
    //   active: true,
    //   description:
    //     "Proyecto de Arduino integrado con una aplicación web. La aplicación presenta preguntas predeterminadas de manera aleatoria y exhibe los puntajes individuales de los participantes en una pantalla LCD 16x16.",
    //   technologies: [
    //     "HTML",
    //     "Javascript",
    //     "CSS",
    //     "Arduino",
    //     "Firebase",
    //   ], 
    //   links: [
    //     {
    //       type: "Source",
    //       href: "https://github.com/Benit0Trdlla/Arduino",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    // },
  ],
} as const;
