import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://dbgekqsmetysqchidklw.supabase.co',
  'sb_publishable_8QDH9lHvKuNGP-nF1yDx4g_XdvgJheB'
);

const portfolioData = {
  profile: {
    name: "Aravinda K Kambar",
    title: "Software Engineer & AI/ML Developer",
    bio: "Final-year Computer Science undergraduate with two internships and a strong portfolio of full-stack, mobile, and AI/ML projects. Experienced across React/Next.js, React Native, Node.js, Spring Boot, and computer vision model deployment. Comfortable owning a feature end-to-end — from database schema design to UI implementation to production debugging — and building genuinely production-grade personal projects rather than tutorials.",
    gradientColors: ["#ec4899", "#d9cdd8", "#a855f7", "#ec4899"],
    gradientSpeed: 8,
    resumeUrl: "/resume.pdf",
    resumeLabel: "Resume"
  },
  contactLinks: [
    { id: "c-1", label: "+91 8088988532", href: "tel:+918088988532", isExternal: true },
    { id: "c-2", label: "aravindachar2004@gmail.com", href: "mailto:aravindachar2004@gmail.com", isExternal: true },
    { id: "c-3", label: "LinkedIn", href: "https://linkedin.com/in/aravindachar", isExternal: true },
    { id: "c-4", label: "GitHub", href: "https://github.com/aravindachar", isExternal: true }
  ],
  tickerLogos: [
    { id: "t-1", title: "Python", iconKey: "python", href: "https://python.org", color: "#3776AB", enabled: true },
    { id: "t-2", title: ".NET / C#", iconKey: "dotnet", href: "https://dotnet.microsoft.com", color: "#512BD4", enabled: true },
    { id: "t-3", title: "TypeScript", iconKey: "typescript", href: "https://www.typescriptlang.org", color: "#3178C6", enabled: true },
    { id: "t-4", title: "JavaScript", iconKey: "javascript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#F7DF1E", enabled: true },
    { id: "t-5", title: "React & React Native", iconKey: "react", href: "https://react.dev", color: "#61DAFB", enabled: true },
    { id: "t-6", title: "Next.js", iconKey: "nextjs", href: "https://nextjs.org", color: "#FFFFFF", enabled: true },
    { id: "t-7", title: "Tailwind CSS", iconKey: "tailwind", href: "https://tailwindcss.com", color: "#06B6D4", enabled: true },
    { id: "t-8", title: "Redux", iconKey: "redux", href: "https://redux.js.org", color: "#764ABC", enabled: true },
    { id: "t-9", title: "Node.js", iconKey: "nodejs", href: "https://nodejs.org", color: "#5FA04E", enabled: true },
    { id: "t-10", title: "Express.js", iconKey: "express", href: "https://expressjs.com", color: "#FFFFFF", enabled: true },
    { id: "t-11", title: "Spring Boot", iconKey: "springboot", href: "https://spring.io", color: "#6DB33F", enabled: true },
    { id: "t-12", title: "FastAPI", iconKey: "fastapi", href: "https://fastapi.tiangolo.com", color: "#009688", enabled: true },
    { id: "t-13", title: "PostgreSQL", iconKey: "postgresql", href: "https://postgresql.org", color: "#4169E1", enabled: true },
    { id: "t-14", title: "MongoDB", iconKey: "mongodb", href: "https://mongodb.com", color: "#47A248", enabled: true },
    { id: "t-15", title: "Redis", iconKey: "redis", href: "https://redis.io", color: "#DC382D", enabled: true },
    { id: "t-16", title: "SQLite", iconKey: "sqlite", href: "https://sqlite.org", color: "#003B57", enabled: true },
    { id: "t-17", title: "PyTorch", iconKey: "pytorch", href: "https://pytorch.org", color: "#EE4C2C", enabled: true },
    { id: "t-18", title: "TensorFlow", iconKey: "tensorflow", href: "https://tensorflow.org", color: "#FF6F00", enabled: true },
    { id: "t-19", title: "Hugging Face", iconKey: "huggingface", href: "https://huggingface.co", color: "#FFD21E", enabled: true },
    { id: "t-20", title: "Docker", iconKey: "docker", href: "https://docker.com", color: "#2496ED", enabled: true },
    { id: "t-21", title: "Git", iconKey: "git", href: "https://git-scm.com", color: "#F05032", enabled: true },
    { id: "t-22", title: "Linux", iconKey: "linux", href: "https://kernel.org", color: "#FCC624", enabled: true }
  ],
  experiences: [
    {
      id: "exp-1",
      role: "Mobile App Developer Intern",
      company: "Seria Applied Research Pvt Ltd",
      companyUrl: "#",
      period: "Jul 2026 – Oct 2026",
      location: "Bengaluru, IN",
      bullets: [
        "Second internship at Seria as a Mobile App Developer, reporting to the engineering team on-site, building and supporting mobile application features."
      ]
    },
    {
      id: "exp-2",
      role: "Machine Learning Engineer Intern",
      company: "Zemicon Electronics",
      companyUrl: "#",
      period: "2025 – Present",
      location: "Bengaluru, IN",
      bullets: [
        "Optimized and deployed computer vision models (YOLOv8) through quantization and ONNX conversion for production inference.",
        "Debugged model pipeline issues end-to-end and worked independently in a deadline-driven engineering environment."
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "DEVILSTONE – Interactive Fretboard Console & Learning Manager",
      techStack: "Next.js 16 · TypeScript · Prisma · SQLite",
      liveUrl: "https://github.com/aravindachar",
      githubUrl: "https://github.com/aravindachar",
      featured: true,
      bullets: [
        "Built a multi-instrument (guitar, 4-str/5-str bass) fretboard console with register-focused practice modes and a one-click scale layout image exporter.",
        "Engineered a drift-free Web Audio API metronome scheduler (subdivisions, swing, countdown alerts) and a 20-session Academy curriculum with Prisma-backed progress tracking."
      ]
    },
    {
      id: "proj-2",
      title: "Pharmacy Management System – Microservices Backend",
      techStack: "Spring Boot · Java · JWT · Docker",
      githubUrl: "https://github.com/aravindachar",
      liveUrl: "https://github.com/aravindachar",
      featured: true,
      bullets: [
        "Architected a 7-service microservices backend with JWT-based authentication and inter-service REST communication."
      ]
    },
    {
      id: "proj-3",
      title: "Intelligent Substation Maintenance Chatbot",
      techStack: "Python · LangChain · ChromaDB · Gemini API",
      githubUrl: "https://github.com/aravindachar",
      liveUrl: "https://github.com/aravindachar",
      featured: true,
      bullets: [
        "Built a RAG pipeline achieving 90% retrieval accuracy over technical maintenance documentation, integrating LLM APIs into a working application end-to-end.",
        "Designed the prompt orchestration and vector retrieval layer grounding model responses in domain-specific source documents."
      ]
    },
    {
      id: "proj-4",
      title: "Deep Learning Sentiment Classifier API",
      techStack: "TensorFlow · BiLSTM · FastAPI · NLTK",
      githubUrl: "https://github.com/aravindachar",
      liveUrl: "https://github.com/aravindachar",
      featured: true,
      bullets: [
        "Trained a BiLSTM model achieving 82.2% accuracy on IMDb sentiment data; deployed as a production FastAPI REST endpoint with an NLTK preprocessing pipeline."
      ]
    }
  ],
  skills: [
    { id: "skill-1", category: "Languages", variant: "pink", skills: ["JavaScript", "TypeScript", "Python", "Java", "Go", "SQL", "C#"] },
    { id: "skill-2", category: "Frontend / Mobile", variant: "blue", skills: ["React", "Next.js", "React Native (Expo)", "Tailwind CSS", "HTML5", "CSS3"] },
    { id: "skill-3", category: "Backend", variant: "default", skills: ["Node.js", "Express.js", "Spring Boot", "REST APIs", "GraphQL"] },
    { id: "skill-4", category: "Database", variant: "default", skills: ["PostgreSQL (Supabase, RLS)", "Prisma ORM", "SQLite", "MySQL"] },
    { id: "skill-5", category: "AI / ML", variant: "pink", skills: ["LangChain", "ChromaDB", "Gemini API", "TensorFlow (BiLSTM)", "YOLOv8", "ONNX"] },
    { id: "skill-6", category: "Tools", variant: "blue", skills: ["Git/GitHub", "Docker", "Postman", "Web Audio API", "VS Code"] }
  ],
  education: [
    { id: "edu-1", institution: "Presidency University, Bengaluru", degree: "B.Tech, Computer Science & Engineering", status: "Expected Aug 2026" }
  ],
  certifications: [
    { id: "cert-1", name: "NLP & Transformers Specialization — Hugging Face, 2025" },
    { id: "cert-2", name: "Introduction to DevOps — IBM & Coursera, 2024" },
    { id: "cert-3", name: "National Level Technical Fest — Project Showcase, Dec 2024" }
  ],
  settings: {
    showCertifications: false,
    showLetterGlitch: true,
    glitchOpacity: 55,
    showDotPattern: true,
    showRightBadge: true,
    statusText: "Available for SWE & AI/ML Roles",
    statusAvailable: true,
    footerTagline: "Let's build something remarkable.",
    footerCopyright: "Aravinda K Kambar",
    tickerSpeed: 45
  }
};

async function seed() {
  console.log('Seeding Supabase database...');
  const { error } = await supabase.from('portfolio_data').upsert({
    id: 'main',
    content: portfolioData,
    updated_at: new Date().toISOString()
  });

  if (error) {
    console.error('Error seeding data:', error);
  } else {
    console.log('SUCCESS: Portfolio data is now stored and live in your Supabase database!');
  }
}

seed();
