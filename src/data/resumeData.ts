import type { ResumeData } from '../types/resume';

export const resumeData: ResumeData = {
  name: "Aravinda K Kambar",
  title: "Software Engineer & AI/ML Developer",
  bio: "Final-year Computer Science undergraduate with two internships and a strong portfolio of full-stack, mobile, and AI/ML projects. Experienced across React/Next.js, React Native, Node.js, Spring Boot, and computer vision model deployment. Comfortable owning a feature end-to-end — from database schema design to UI implementation to production debugging — and building genuinely production-grade personal projects rather than tutorials.",
  contactLinks: [
    {
      label: "+91 8088988532",
      href: "tel:+918088988532",
      isExternal: true
    },
    {
      label: "aravindachar2004@gmail.com",
      href: "mailto:aravindachar2004@gmail.com",
      isExternal: true
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/aravindachar",
      isExternal: true
    },
    {
      label: "GitHub",
      href: "https://github.com/aravindachar",
      isExternal: true
    }
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
      bullets: [
        "Architected a 7-service microservices backend with JWT-based authentication and inter-service REST communication."
      ]
    },
    {
      id: "proj-3",
      title: "Intelligent Substation Maintenance Chatbot",
      techStack: "Python · LangChain · ChromaDB · Gemini API",
      githubUrl: "https://github.com/aravindachar",
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
      bullets: [
        "Trained a BiLSTM model achieving 82.2% accuracy on IMDb sentiment data; deployed as a production FastAPI REST endpoint with an NLTK preprocessing pipeline."
      ]
    }
  ],
  skills: [
    {
      category: "Languages",
      skills: ["JavaScript", "TypeScript", "Python", "Java", "Go", "SQL", "C#"]
    },
    {
      category: "Frontend / Mobile",
      skills: ["React", "Next.js", "React Native (Expo)", "Tailwind CSS", "HTML5", "CSS3"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "Spring Boot", "REST APIs", "GraphQL"]
    },
    {
      category: "Database",
      skills: ["PostgreSQL (Supabase, RLS)", "Prisma ORM", "SQLite", "MySQL"]
    },
    {
      category: "AI / ML",
      skills: ["LangChain", "ChromaDB", "Gemini API", "TensorFlow (BiLSTM)", "YOLOv8", "ONNX"]
    },
    {
      category: "Tools",
      skills: ["Git/GitHub", "Docker", "Postman", "Web Audio API", "VS Code"]
    }
  ],
  education: [
    {
      institution: "Presidency University, Bengaluru",
      degree: "B.Tech, Computer Science & Engineering",
      status: "Expected Aug 2026"
    }
  ],
  certifications: [
    {
      name: "NLP & Transformers Specialization — Hugging Face, 2025"
    },
    {
      name: "Introduction to DevOps — IBM & Coursera, 2024"
    },
    {
      name: "National Level Technical Fest — Project Showcase, Dec 2024"
    }
  ]
};
