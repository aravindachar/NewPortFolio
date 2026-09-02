export interface ContactLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  techStack: string;
  bullets: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  status: string;
}

export interface CertificationItem {
  name: string;
  issuer?: string;
  year?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  bio: string;
  contactLinks: ContactLink[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  education: EducationItem[];
  certifications: CertificationItem[];
}
