export interface ProfileConfig {
  name: string;
  title: string;
  bio: string;
  gradientColors: string[];
  gradientSpeed: number;
  resumeUrl: string;
  resumeLabel: string;
}

export interface ContactLink {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface TickerLogoItem {
  id: string;
  title: string;
  iconKey: string;
  href: string;
  color: string;
  enabled: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl: string;
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
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
  variant: 'pink' | 'blue' | 'default';
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  status: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer?: string;
  year?: string;
}

export interface VisualSettings {
  showCertifications: boolean;
  showLetterGlitch: boolean;
  glitchOpacity: number;
  showDotPattern: boolean;
  showRightBadge: boolean;
  statusText: string;
  statusAvailable: boolean;
  footerTagline: string;
  footerCopyright: string;
  tickerSpeed: number;
}

export interface PortfolioData {
  profile: ProfileConfig;
  contactLinks: ContactLink[];
  tickerLogos: TickerLogoItem[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  education: EducationItem[];
  certifications: CertificationItem[];
  settings: VisualSettings;
}
