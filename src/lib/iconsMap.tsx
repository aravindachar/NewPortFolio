import type { JSX } from 'react';
import {
  SiPython,
  SiDotnet,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiSpringboot,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiSqlite,
  SiPytorch,
  SiTensorflow,
  SiHuggingface,
  SiDocker,
  SiGit,
  SiLinux,
  SiGmail,
  SiGo,
  SiRust,
  SiGraphql,
  SiPrisma,
  SiSupabase,
  SiGooglecloud,
  SiKubernetes
} from 'react-icons/si';
import { FaGithub, FaLinkedin, FaCode, FaAws } from 'react-icons/fa6';

export const AVAILABLE_ICONS: Record<string, { label: string; component: (props: { className?: string }) => JSX.Element; defaultColor: string }> = {
  python: { label: "Python", component: (props) => <SiPython {...props} />, defaultColor: "#3776AB" },
  dotnet: { label: ".NET / C#", component: (props) => <SiDotnet {...props} />, defaultColor: "#512BD4" },
  typescript: { label: "TypeScript", component: (props) => <SiTypescript {...props} />, defaultColor: "#3178C6" },
  javascript: { label: "JavaScript", component: (props) => <SiJavascript {...props} />, defaultColor: "#F7DF1E" },
  react: { label: "React & React Native", component: (props) => <SiReact {...props} />, defaultColor: "#61DAFB" },
  nextjs: { label: "Next.js", component: (props) => <SiNextdotjs {...props} />, defaultColor: "#FFFFFF" },
  tailwind: { label: "Tailwind CSS", component: (props) => <SiTailwindcss {...props} />, defaultColor: "#06B6D4" },
  redux: { label: "Redux", component: (props) => <SiRedux {...props} />, defaultColor: "#764ABC" },
  nodejs: { label: "Node.js", component: (props) => <SiNodedotjs {...props} />, defaultColor: "#5FA04E" },
  express: { label: "Express.js", component: (props) => <SiExpress {...props} />, defaultColor: "#FFFFFF" },
  springboot: { label: "Spring Boot", component: (props) => <SiSpringboot {...props} />, defaultColor: "#6DB33F" },
  fastapi: { label: "FastAPI", component: (props) => <SiFastapi {...props} />, defaultColor: "#009688" },
  postgresql: { label: "PostgreSQL", component: (props) => <SiPostgresql {...props} />, defaultColor: "#4169E1" },
  mongodb: { label: "MongoDB", component: (props) => <SiMongodb {...props} />, defaultColor: "#47A248" },
  redis: { label: "Redis", component: (props) => <SiRedis {...props} />, defaultColor: "#DC382D" },
  sqlite: { label: "SQLite", component: (props) => <SiSqlite {...props} />, defaultColor: "#003B57" },
  pytorch: { label: "PyTorch", component: (props) => <SiPytorch {...props} />, defaultColor: "#EE4C2C" },
  tensorflow: { label: "TensorFlow", component: (props) => <SiTensorflow {...props} />, defaultColor: "#FF6F00" },
  huggingface: { label: "Hugging Face", component: (props) => <SiHuggingface {...props} />, defaultColor: "#FFD21E" },
  docker: { label: "Docker", component: (props) => <SiDocker {...props} />, defaultColor: "#2496ED" },
  git: { label: "Git", component: (props) => <SiGit {...props} />, defaultColor: "#F05032" },
  linux: { label: "Linux", component: (props) => <SiLinux {...props} />, defaultColor: "#FCC624" },
  go: { label: "Go", component: (props) => <SiGo {...props} />, defaultColor: "#00ADD8" },
  rust: { label: "Rust", component: (props) => <SiRust {...props} />, defaultColor: "#DEA584" },
  graphql: { label: "GraphQL", component: (props) => <SiGraphql {...props} />, defaultColor: "#E10098" },
  prisma: { label: "Prisma", component: (props) => <SiPrisma {...props} />, defaultColor: "#2D3748" },
  supabase: { label: "Supabase", component: (props) => <SiSupabase {...props} />, defaultColor: "#3ECF8E" },
  aws: { label: "AWS", component: (props) => <FaAws {...props} />, defaultColor: "#FF9900" },
  gcp: { label: "Google Cloud", component: (props) => <SiGooglecloud {...props} />, defaultColor: "#4285F4" },
  kubernetes: { label: "Kubernetes", component: (props) => <SiKubernetes {...props} />, defaultColor: "#326CE5" },
  github: { label: "GitHub", component: (props) => <FaGithub {...props} />, defaultColor: "#FFFFFF" },
  linkedin: { label: "LinkedIn", component: (props) => <FaLinkedin {...props} />, defaultColor: "#0A66C2" },
  gmail: { label: "Gmail", component: (props) => <SiGmail {...props} />, defaultColor: "#EA4335" },
  code: { label: "Custom Code", component: (props) => <FaCode {...props} />, defaultColor: "#FFFFFF" }
};

export function renderIconByKey(key: string, className?: string) {
  const iconDef = AVAILABLE_ICONS[key.toLowerCase()];
  if (iconDef) {
    const Component = iconDef.component;
    return <Component className={className} />;
  }
  return <FaCode className={className} />;
}
