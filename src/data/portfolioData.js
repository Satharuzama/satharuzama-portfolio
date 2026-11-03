// ============================================================
// portfolioData.js — ALL content for the portfolio lives here.
// Components only read from this file.
// ============================================================

export const personalInfo = {
  name: "Shek Sataruzama",
  brandName: "Shek Sataruzama",
  role: "Aspiring Java Full Stack Developer",
  city: "Bengaluru, India",
  timezone: "Asia/Kolkata", // IANA timezone used by the live clock in the HUD
  email: "shakesatharuzama@gmail.com",
  phone: "7601091393",
  availability: "Open to internships & entry-level developer roles",
}

export const academy = {
  name: "TAP Academy",
  url: "https://thetapacademy.com/",
}

export const socialLinks = {
  github: "https://github.com/Satharuzama/",
  linkedin: "https://www.linkedin.com/in/shek-satharuzama",
  instagram: "https://www.instagram.com/satharuzama/",
}

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
]

export const heroContent = {
  eyebrow: "DEVELOPER PORTFOLIO / 2026",
  intro:
    "I'm a BCA graduate and aspiring Java Full Stack Developer, currently training at TAP Academy in Bengaluru. I build responsive web applications using React, JavaScript, HTML, and CSS while strengthening my Java, SQL, and problem-solving skills.",
  statusLines: [
    "Learning Java & DSA",
  ],
  ctaPrimary: { label: "View projects", href: "#projects" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
}

export const aboutContent = {
  label: "01 / About",
  heading: "Curious by nature. Building through practice.",
  paragraph:
    "I'm a developer focused on turning ideas into functional, user-friendly web applications. My foundation in computer applications has introduced me to programming, databases, and software development.\n\nCurrently, I'm developing my skills in Java Full Stack Development at TAP Academy, Bengaluru. I enjoy working on practical projects, understanding how applications work behind the scenes, and improving my problem-solving abilities.",
}

export const skillGroups = [
  { title: "Languages", items: ["Java", "JavaScript", "Python"] },
  { title: "Frontend", items: ["HTML5", "CSS3", "React.js"] },
  { title: "Database", items: ["MySQL", "SQL"] },
  { title: "Developer Tools", items: ["Git", "GitHub", "VS Code", "npm"] },
  { title: "AI-Assisted Development", items: ["Claude", "ChatGPT"] },
]

export const projects = [
  {
    id: "project-1",
    number: "01",
    title: "E-Commerce Web Application",
    description:
      "A React-based e-commerce application designed to provide an intuitive shopping experience, with product browsing, cart management, and a responsive user interface.",
    tags: ["React.js", "JavaScript", "React Router"],
    year: "2026",
    liveUrl: "https://satharuzama.github.io/ecommerce/",
    githubUrl: "",
    imageName: "ecommerce-preview",
    imageAlt:
      "E-Commerce Web Application showing product listings, prices, ratings, and shopping cart functionality.",
  },
  {
    id: "project-2",
    number: "02",
    title: "To-Do List Application",
    description:
      "A lightweight task management application built with HTML, CSS, and JavaScript, allowing users to create, organize, complete, and remove daily tasks.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    year: "2026",
    liveUrl: "",
    githubUrl: "",
  },
]

export const experience = [
  {
    period: "2026 — Present",
    role: "Java Full Stack Development Training",
    org: "TAP Academy",
    description:
      "Pursuing Java Full Stack Development training, focusing on Java programming, SQL, frontend technologies, and practical application development.",
  },
  {
    period: "2023 — 2026",
    role: "Bachelor of Computer Applications (BCA)",
    org: "SDHR Degree College, Tirupati",
    description:
      "Completed my Bachelor of Computer Applications, gaining foundational knowledge in programming, database management, software engineering, and web development.",
  },
  {
    period: "2021 — 2023",
    role: "Intermediate (MPC)",
    org: "Sri Chaitanya Junior College",
    description:
      "Completed Intermediate education in Mathematics, Physics, and Chemistry.",
  },
  {
    period: "2021",
    role: "High School",
    org: "Prashanth English Medium High School",
    description:
      "Completed secondary school education (Class 10).",
  },
]

export const contactContent = {
  label: "04 / Contact",
  heading: "Let's build something.",
  note: "I'm open to internships, entry-level developer opportunities, and collaborations. Have an opportunity or an idea? Feel free to reach out.",
}

export const footerContent = {
  tagline: "Designed and developed with React, creativity, and AI-assisted tools.",
}

// EmailJS — values come from .env.local (variables must start with VITE_)
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
}
