// projects.ts - Comprehensive projects data file
export interface ProjectType {
  id: string;
  title: string;
  description: string;
  category: string;
  year: number;
  clientType: string;
  status: "live" | "development" | "maintenance" | "archived";
  link: string;
  logo: string;
  images: string[];
  tech: string[];
  features: string[];
  technologies?: {
    name: string;
    icon: string;
    color: string;
  }[];
  screenshots?: {
    src: string;
    type: "desktop" | "mobile";
    theme: "light" | "dark";
  }[];
}

// Professional Projects Data
export const professionalProjects: ProjectType[] = [
  {
    id: "64college",
    title: "64 College",
    description:
      "An educational institution platform built with Next.js, React, and TypeScript showcasing modern web development practices and clean design principles.",
    category: "Educational",
    year: 2024,
    clientType: "education",
    status: "live",
    link: "https://64college.vercel.app/",
    logo: "/portfolio/64/logo.avif",
    images: [
      "/portfolio/64/home1.avif",
      "/portfolio/64/sset1.avif",
      "/portfolio/64/courses1.avif",
      "/portfolio/64/more1.avif",
      "/portfolio/64/home2.avif",
      "/portfolio/64/contact2.avif",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Nest js",
      "Mongo DB",
      "Vercel",
    ],
    features: [
      "App Router architecture with server components",
      "Advanced TypeScript with strict type safety",
      "Custom UI components with Tailwind CSS",
      "Optimized performance with code splitting",
      "Vercel deployment with edge functions",
    ],
    technologies: [
      { name: "Next.js", icon: "SiNextdotjs", color: "#000000" },
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#38BDF8" },
      { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
      // add mongodb, nestjs
    ],
    screenshots: [
      { src: "/portfolio/64/home1.png", type: "desktop", theme: "dark" },
      { src: "/portfolio/64/sset1.png", type: "desktop", theme: "dark" },
      { src: "/portfolio/64/courses1.png", type: "desktop", theme: "dark" },
      { src: "/portfolio/64/more1.png", type: "desktop", theme: "dark" },
      { src: "/portfolio/64/home2.png", type: "desktop", theme: "light" },
      { src: "/portfolio/64/contact2.png", type: "desktop", theme: "light" },
    ],
  },
  {
    id: "austra",
    title: "Austra Training Institute",
    description:
      "A full-stack training institute platform built with React, Node.js, Express, and MongoDB featuring a custom CMS and secure authentication system.",
    category: "Educational",
    year: 2024,
    clientType: "education",
    status: "live",
    link: "https://austratraininginstitute.co.ke/",
    logo: "/portfolio/austra/logo.png",
    images: [
      "/portfolio/austra/l_home.png",
      "/portfolio/austra/l_about.png",
      "/portfolio/austra/l_portal.png",
      "/portfolio/austra/s_home.png",
      "/portfolio/austra/s_about.png",
      "/portfolio/austra/s_portal.png",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "CMS"],
    features: [
      "Custom CMS for course and student management",
      "Cloudinary integration for media storage",
      "Secure authentication for admin and student portals",
      "Real-time notifications and enrollment system",
      "Dark/light theme support",
    ],
    technologies: [
      { name: "React", icon: "SiReact", color: "#61DAFB" },
      { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
      { name: "Express", icon: "SiExpress", color: "#000000" },
      { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
      { name: "Cloudinary", icon: "SiCloudinary", color: "#3448C5" },
    ],
    screenshots: [
      { src: "/portfolio/austra/l_home.png", type: "desktop", theme: "light" },
      { src: "/portfolio/austra/l_about.png", type: "desktop", theme: "light" },
      {
        src: "/portfolio/austra/l_portal.png",
        type: "desktop",
        theme: "light",
      },
      { src: "/portfolio/austra/s_home.png", type: "mobile", theme: "light" },
      { src: "/portfolio/austra/s_about.png", type: "mobile", theme: "light" },
      { src: "/portfolio/austra/s_portal.png", type: "mobile", theme: "light" },
    ],
  },
    {
    id: "shepherd",
    title: "The Shepherd App",
    description:
      "A full-featured spiritual life companion mobile app built with Flutter, powered by NestJS backend and MongoDB database.",
    category: "Religious",
    year: 2024,
    clientType: "church",
    status: "live",
    link: "https://play.google.com/store/apps/details?id=ke.co.shepherd",
    logo: "/portfolio/shepherd/clean-logo.png",
    images: [
      "/portfolio/shepherd/home.jpg",
      "/portfolio/shepherd/bible.jpg",
      "/portfolio/shepherd/events1.jpg",
      "/portfolio/shepherd/devotion1.jpg",
      "/portfolio/shepherd/login.jpg",
      "/portfolio/shepherd/profile.jpg",
    ],
    tech: ["Flutter", "NestJS", "MongoDB", "Push Notifications"],
    features: [
      "Offline-first Bible reader (SQLite + Hive)",
      "Devotions, highlights, and sermon access",
      "Church events calendar with Google Maps",
      "M-Pesa payment integration for giving",
      "Push notifications for devotionals & announcements",
    ],
    technologies: [
      { name: "Flutter", icon: "SiReact", color: "#02569B" }, // Note: Using React icon as placeholder
      { name: "NestJS", icon: "SiNodedotjs", color: "#E0234E" },
      { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
      { name: "Cloudinary", icon: "SiCloudinary", color: "#3448C5" },
    ],
    screenshots: [
      { src: "/portfolio/shepherd/home.jpg", type: "mobile", theme: "light" },
      { src: "/portfolio/shepherd/bible.jpg", type: "mobile", theme: "light" },
      {
        src: "/portfolio/shepherd/events1.jpg",
        type: "mobile",
        theme: "light",
      },
      {
        src: "/portfolio/shepherd/devotion1.jpg",
        type: "mobile",
        theme: "light",
      },
      { src: "/portfolio/shepherd/login.jpg", type: "mobile", theme: "light" },
      {
        src: "/portfolio/shepherd/profile.jpg",
        type: "mobile",
        theme: "light",
      },
    ],
  },
  {
    id: "melodia",
    title: "Melodia Institute of Music",
    description:
      "A modern music institute website built with Next.js 14, TypeScript, and Tailwind CSS featuring a sleek design and Firebase-powered backend. Server-side rendering for optimal performance and SEO.",
    category: "Educational",
    year: 2025,
    clientType: "education",
    status: "live",
    link: "https://www.melodiainstitute.co.ke/",
    logo: "/portfolio/melodia/logo.png",
    images: [
      "/portfolio/melodia/home1.png",
      "/portfolio/melodia/courses1.png",
      "/portfolio/melodia/about1.png",
      "/portfolio/melodia/contact1.png",
      "/portfolio/melodia/nav2.png",
      "/portfolio/melodia/about2.png",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "SSR", "SEO"],
    features: [
      "Server-side rendering for optimal performance",
      "Firebase integration for secure contact forms",
      "Dynamic course catalog with filtering",
      "Fully responsive mobile-first design",
      "Image optimization with Next.js Image",
    ],
    technologies: [
      { name: "Next.js", icon: "SiNextdotjs", color: "#000000" },
      { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#38BDF8" },
      { name: "Firebase", icon: "SiFirebase", color: "#FFCA28" },
    ],
    screenshots: [
      { src: "/portfolio/melodia/home1.png", type: "desktop", theme: "light" },
      {
        src: "/portfolio/melodia/courses1.png",
        type: "desktop",
        theme: "light",
      },
      { src: "/portfolio/melodia/about1.png", type: "desktop", theme: "light" },
      {
        src: "/portfolio/melodia/contact1.png",
        type: "mobile",
        theme: "light",
      },
      { src: "/portfolio/melodia/nav2.png", type: "mobile", theme: "light" },
      { src: "/portfolio/melodia/about2.png", type: "desktop", theme: "light" },
      { src: "/portfolio/melodia/home1.png", type: "desktop", theme: "dark" },
      {
        src: "/portfolio/melodia/courses1.png",
        type: "desktop",
        theme: "dark",
      },
      { src: "/portfolio/melodia/about1.png", type: "desktop", theme: "dark" },
      { src: "/portfolio/melodia/contact1.png", type: "mobile", theme: "dark" },
      { src: "/portfolio/melodia/nav2.png", type: "mobile", theme: "dark" },
      { src: "/portfolio/melodia/about2.png", type: "desktop", theme: "dark" },
    ],
  },
  {
    id: "jaitah",
    title: "Jaitah Memorial Healthcare Ltd",
    description:
      "A modern healthcare website built with Next.js and Tailwind CSS featuring responsive design, EmailJS integration, and SEO optimization.",
    category: "Healthcare",
    year: 2024,
    clientType: "healthcare",
    status: "live",
    link: "https://jaitahmemorialhealthcareltd.co.ke/",
    logo: "/portfolio/jaitah/logo.png",
    images: [
      "/portfolio/jaitah/home.png",
      "/portfolio/jaitah/services.png",
      "/portfolio/jaitah/s_home.png",
      "/portfolio/jaitah/s_services.png",
    ],
    tech: ["Next.js", "Tailwind CSS", "EmailJS", "SEO", "Responsive Design"],
    features: [
      "Responsive design for all devices",
      "Integrated contact forms with EmailJS",
      "Performance-focused implementation",
      "SEO-optimized structure and metadata",
      "Fast loading with optimized images",
    ],
    technologies: [
      { name: "Next.js", icon: "SiNextdotjs", color: "#000000" },
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#38BDF8" },
      { name: "EmailJS", icon: "FaEnvelope", color: "#D44638" },
    ],
    screenshots: [
      { src: "/portfolio/jaitah/home.png", type: "desktop", theme: "light" },
      {
        src: "/portfolio/jaitah/services.png",
        type: "desktop",
        theme: "light",
      },
      { src: "/portfolio/jaitah/s_home.png", type: "mobile", theme: "light" },
      {
        src: "/portfolio/jaitah/s_services.png",
        type: "mobile",
        theme: "light",
      },
    ],
  },
  {
    id: "aussiz",
    title: "Aussiz Education and Training",
    description:
      "A comprehensive WordPress site for IELTS and PTE training institute with custom theme, multilingual support, and course management.",
    category: "Educational",
    year: 2024,
    clientType: "education",
    status: "live",
    link: "https://aussizeducationandtraining.net/",
    logo: "/portfolio/aussiz/logo.png",
    images: [
      "/portfolio/aussiz/home.png",
      "/portfolio/aussiz/s_home.png",
      "/portfolio/aussiz/s_caregiving.png",
    ],
    tech: ["WordPress", "Custom Theme", "Multilingual", "Plugin Development"],
    features: [
      "Custom WordPress theme development",
      "Plugin integration for course management",
      "Multilingual support for international students",
      "Custom contact forms and inquiry system",
      "Responsive design for all devices",
    ],
    technologies: [
      { name: "WordPress", icon: "SiWordpress", color: "#21759B" },
    ],
    screenshots: [
      { src: "/portfolio/aussiz/home.png", type: "desktop", theme: "light" },
      { src: "/portfolio/aussiz/s_home.png", type: "mobile", theme: "light" },
      {
        src: "/portfolio/aussiz/s_caregiving.png",
        type: "mobile",
        theme: "light",
      },
    ],
  },
];

// Filtering functions
export const filterProjects = (filter: string) => {
  if (filter === "all") return professionalProjects;

  return professionalProjects.filter(
    (project) =>
      project.tech.some((tech) =>
        tech.toLowerCase().includes(filter.toLowerCase()),
      ) ||
      project.category.toLowerCase().includes(filter.toLowerCase()) ||
      project.clientType.toLowerCase().includes(filter.toLowerCase()),
  );
};

export const getProjectById = (id: string) => {
  return professionalProjects.find((project) => project.id === id);
};

export const getProjectsByCategory = (category: string) => {
  return professionalProjects.filter(
    (project) => project.category.toLowerCase() === category.toLowerCase(),
  );
};

export const getProjectsByYear = (year: number) => {
  return professionalProjects.filter((project) => project.year === year);
};

export const getFeaturedProjects = () => {
  return professionalProjects.slice(0, 4); // First 4 projects as featured
};

// Export as default for your current component
export const projects = professionalProjects;

// Tech stack icons mapping (optional helper)
export const techIcons: Record<string, { icon: string; color: string }> = {
  "Next.js": { icon: "SiNextdotjs", color: "#000000" },
  TypeScript: { icon: "SiTypescript", color: "#3178C6" },
  "Tailwind CSS": { icon: "SiTailwindcss", color: "#38BDF8" },
  Firebase: { icon: "SiFirebase", color: "#FFCA28" },
  React: { icon: "SiReact", color: "#61DAFB" },
  "Node.js": { icon: "SiNodedotjs", color: "#339933" },
  Express: { icon: "SiExpress", color: "#000000" },
  MongoDB: { icon: "SiMongodb", color: "#47A248" },
  Cloudinary: { icon: "SiCloudinary", color: "#3448C5" },
  WordPress: { icon: "SiWordpress", color: "#21759B" },
  Flutter: { icon: "SiReact", color: "#02569B" }, // Placeholder
  NestJS: { icon: "SiNodedotjs", color: "#E0234E" },
  EmailJS: { icon: "FaEnvelope", color: "#D44638" },
};

// Categories for filtering
export const projectCategories = [
  "All",
  "Educational Website",
  "Educational Platform",
  "Full-Stack Platform",
  "Healthcare Website",
  "WordPress Site",
  "Mobile App",
];

// Tech stack options for filtering
export const techStackOptions = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "Firebase",
  "WordPress",
  "Flutter",
];
