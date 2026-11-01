// ============================================================
// portfolioData.js — ALL content for the portfolio lives here.
// Components only read from this file.
// ============================================================

export const personalInfo = {
  name: "Shek Sataruzama",
  brandName: "Shek Sataruzama",
  role: "Java Full Stack Developer (In Training)",
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
  eyebrow: "PORTFOLIO — 2026",
  intro:
    "I am a BCA graduate training in Java Full Stack Development at TAP Academy, Bengaluru. I have built responsive web applications with React, JavaScript, and HTML/CSS.",
  statusLines: [
    "Building with React",
    "Learning Data Structures & Algorithms",
    "Learning Java Full Stack",
  ],
  ctaPrimary: { label: "View projects", href: "#projects" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
}

export const aboutContent = {
  label: "01 / About",
  heading: "Learning, Building, and Growing as a Developer",
  paragraph:
    "I am a Bachelor of Computer Applications graduate from SDHR Degree College, Tirupati. Currently, I am pursuing Java Full Stack Development training at TAP Academy, Bengaluru. I have experience building responsive web applications using HTML, CSS, JavaScript, and React. I enjoy solving problems, exploring new technologies, and improving my programming skills through practical projects.",
  stats: [
    { value: 10, suffix: "+", label: "Technologies & Tools" },
    { value: 3, suffix: "", label: "Years of BCA Education" },
    { value: 2, suffix: "+", label: "Web Applications Built" },
  ],
}

export const skillGroups = [
  { title: "Programming", items: ["Java", "Python"] },
  { title: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React"] },
  { title: "Database", items: ["MySQL"] },
  { title: "Tools & AI", items: ["VS Code", "Git", "GitHub", "npm", "Claude", "ChatGPT"] },
]

export const projects = [
  {
    id: "project-1",
    number: "01",
    title: "E-Commerce Web Application",
    description:
      "A responsive e-commerce frontend application featuring product browsing, shopping cart functionality, checkout, order management, and order tracking.",
    tags: ["React.js", "JavaScript", "React Router"],
    year: "2026",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: "project-2",
    number: "02",
    title: "To-Do List Application",
    description:
      "A responsive task management application that allows users to add, complete, and delete tasks using JavaScript DOM manipulation and event handling.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    year: "2026",
    liveUrl: "",
    githubUrl: "",
  },
]

export const experience = [
  {
    period: "2026 — Present",
    role: "Java Full Stack Developer (In Training)",
    org: "TAP Academy",
    description:
      "Currently learning full-stack development technologies, including Core and Advanced Java, Spring Boot, React, and MySQL for building web applications.",
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
  note: "Have a role, a project or a question? Send a message — I reply within a day.",
}

export const footerContent = {
  tagline: "Designed & built by hand.",
}

// EmailJS — values come from .env.local (variables must start with VITE_)
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
}
