import { useRef } from 'react';
import { resumeData } from './data/resumeData';
import { DotPattern } from '@/components/ui/dot-pattern';
import LetterGlitch from '@/components/ui/LetterGlitch';
import GradientText from '@/components/ui/GradientText';
import LogoLoop from '@/components/ui/LogoLoop';
import type { LogoItem } from '@/components/ui/LogoLoop';
import VariableProximity from '@/components/ui/VariableProximity';
import PixelCard from '@/components/ui/PixelCard';
import { cn } from '@/lib/utils';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiDotnet,
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
  SiGmail
} from 'react-icons/si';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

const techLogos: LogoItem[] = [
  { node: <SiPython className="text-[#3776AB] hover:text-white transition-colors" />, title: "Python", href: "https://python.org" },
  { node: <SiDotnet className="text-[#512BD4] hover:text-white transition-colors" />, title: ".NET / C#", href: "https://dotnet.microsoft.com" },
  { node: <SiTypescript className="text-[#3178C6] hover:text-white transition-colors" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiJavascript className="text-[#F7DF1E] hover:text-white transition-colors" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiReact className="text-[#61DAFB] hover:text-white transition-colors" />, title: "React & React Native", href: "https://react.dev" },
  { node: <SiNextdotjs className="text-white hover:text-gray-300 transition-colors" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTailwindcss className="text-[#06B6D4] hover:text-white transition-colors" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiRedux className="text-[#764ABC] hover:text-white transition-colors" />, title: "Redux", href: "https://redux.js.org" },
  { node: <SiNodedotjs className="text-[#5FA04E] hover:text-white transition-colors" />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiExpress className="text-white hover:text-gray-300 transition-colors" />, title: "Express.js", href: "https://expressjs.com" },
  { node: <SiSpringboot className="text-[#6DB33F] hover:text-white transition-colors" />, title: "Spring Boot", href: "https://spring.io" },
  { node: <SiFastapi className="text-[#009688] hover:text-white transition-colors" />, title: "FastAPI", href: "https://fastapi.tiangolo.com" },
  { node: <SiPostgresql className="text-[#4169E1] hover:text-white transition-colors" />, title: "PostgreSQL", href: "https://postgresql.org" },
  { node: <SiMongodb className="text-[#47A248] hover:text-white transition-colors" />, title: "MongoDB", href: "https://mongodb.com" },
  { node: <SiRedis className="text-[#DC382D] hover:text-white transition-colors" />, title: "Redis", href: "https://redis.io" },
  { node: <SiSqlite className="text-[#003B57] hover:text-white transition-colors" />, title: "SQLite", href: "https://sqlite.org" },
  { node: <SiPytorch className="text-[#EE4C2C] hover:text-white transition-colors" />, title: "PyTorch", href: "https://pytorch.org" },
  { node: <SiTensorflow className="text-[#FF6F00] hover:text-white transition-colors" />, title: "TensorFlow", href: "https://tensorflow.org" },
  { node: <SiHuggingface className="text-[#FFD21E] hover:text-white transition-colors" />, title: "Hugging Face", href: "https://huggingface.co" },
  { node: <SiDocker className="text-[#2496ED] hover:text-white transition-colors" />, title: "Docker", href: "https://docker.com" },
  { node: <SiGit className="text-[#F05032] hover:text-white transition-colors" />, title: "Git", href: "https://git-scm.com" },
  { node: <SiLinux className="text-[#FCC624] hover:text-white transition-colors" />, title: "Linux", href: "https://kernel.org" }
];

export function App() {
  const {
    name,
    title,
    bio,
    contactLinks,
    experiences,
    projects,
    skills,
    education
  } = resumeData;

  const bioContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-black text-white font-sans selection:bg-white selection:text-black antialiased overflow-x-hidden w-full">
      
      {/* Full-Screen LetterGlitch Background Effect */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-55">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
          speed={65}
          colors={["#241a2f", "#251233", "#464646"]}
          showOuterVignette
        />
      </div>

      {/* Subtle Dot Pattern Overlay */}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "fill-white/10 opacity-20 fixed inset-0 h-full w-full pointer-events-none z-0",
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent_80%)]",
        )}
      />

      {/* Floating Yellow Asterisk Badge on the Right (hidden on small screens) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex items-center justify-center pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-[#E2F952] text-black flex items-center justify-center font-bold text-lg shadow-lg select-none">
          ✦
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        
        {/* Top Header */}
        <header className="pb-4 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-1 sm:space-y-2 max-w-3xl">
              <h1 className="leading-tight">
                <GradientText
                  colors={["#ec4899", "#d9cdd8", "#a855f7", "#ec4899"]}
                  animationSpeed={8}
                  showBorder={false}
                  className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight !m-0 !p-0 !bg-transparent text-left inline-flex"
                >
                  {name}
                </GradientText>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg font-medium text-[#8E8E93] tracking-wide">
                {title}
              </p>
            </div>

            {/* Top-Right Action Group */}
            <nav className="flex items-center gap-2.5 sm:gap-3 shrink-0 pt-1">
              <button
                onClick={scrollToAbout}
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all shadow-xs cursor-pointer select-none"
              >
                <span>About</span>
                <span className="text-2xs text-[#8E8E93]">↓</span>
              </button>

              <button
                onClick={handlePrint}
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-gray-200 transition-all shadow-xs cursor-pointer select-none"
                title="Print / Save PDF Resume"
              >
                <span>Resume</span>
                <span className="text-xs">↗</span>
              </button>
            </nav>
          </div>

          {/* LogoLoop Component - Comprehensive Resume Skills Ticker */}
          <div className="w-full pt-8 sm:pt-10">
            <div className="text-2xs uppercase tracking-widest text-[#71717A] font-mono mb-3 font-semibold">
              Core Technologies & Architecture Stack
            </div>
            <div className="w-full overflow-hidden rounded-xl border border-[#262626]/80 bg-black/40 backdrop-blur-xs py-2 px-1">
              <LogoLoop
                logos={techLogos}
                speed={45}
                direction="left"
                logoHeight={24}
                gap={36}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#000000"
                ariaLabel="Technical Stack & Tools"
              />
            </div>
          </div>
        </header>

        {/* Two Column Layout: Left Sticky Sidebar + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-start pt-10 sm:pt-12">
          
          {/* Left Column: Fixed / Sticky Bio with VariableProximity & Interactive Contact Links */}
          <aside id="about" className="lg:col-span-4 space-y-6 sm:space-y-8 lg:sticky lg:top-12">
            <div ref={bioContainerRef} className="cursor-default">
              <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
                <VariableProximity
                  label={bio}
                  fromFontVariationSettings="'wght' 350, 'opsz' 14"
                  toFontVariationSettings="'wght' 800, 'opsz' 40"
                  containerRef={bioContainerRef}
                  radius={85}
                  falloff="linear"
                  className="text-[#D1D5DB] text-sm sm:text-base inline leading-relaxed"
                />
              </p>
            </div>

            {/* Interactive Contact Links with Micro-Animations & Glow */}
            <div className="border-t border-[#262626] divide-y divide-[#262626]">
              {contactLinks.map((link, idx) => (
                <div key={idx} className="py-2.5">
                  <a
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between px-3 py-2 -mx-3 rounded-lg text-sm text-[#D1D5DB] hover:text-white hover:bg-white/[0.07] border border-transparent hover:border-white/10 transition-all duration-200"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform font-medium">{link.label}</span>
                    <span className="text-xs text-[#8E8E93] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">↗</span>
                  </a>
                </div>
              ))}
            </div>
          </aside>

          {/* Right Column: Experience, Projects, Skills, Education, Certifications */}
          <main className="lg:col-span-8 space-y-12 sm:space-y-16">
            
            {/* Section: Experience */}
            <section id="experience" className="border-t border-[#262626] lg:border-t-0 pt-8 lg:pt-0">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-white mb-8">
                Experience
              </h2>

              <div className="space-y-10 sm:space-y-12">
                {experiences.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className={`grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 ${
                      idx !== 0 ? "border-t border-[#262626] pt-8" : ""
                    }`}
                  >
                    {/* Role & Company Column */}
                    <div className="md:col-span-5 space-y-1.5">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="text-sm sm:text-base text-[#8E8E93] hover:text-white transition-colors">
                        <a href={exp.companyUrl || "#"} className="inline-flex items-center gap-1">
                          <span>{exp.company}</span>
                          <span className="text-xs">↗</span>
                        </a>
                      </div>
                      <div className="text-xs sm:text-sm text-[#8E8E93] pt-0.5">
                        {exp.period}
                      </div>
                      <div className="text-xs sm:text-sm text-[#8E8E93]">
                        {exp.location}
                      </div>
                    </div>

                    {/* Bullet Points Column */}
                    <div className="md:col-span-7 space-y-3">
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#F3F4F6] leading-relaxed">
                          <span className="text-white text-xs select-none mt-1.5">•</span>
                          <p>{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Projects with Interactive Redirect Links */}
            <section id="projects" className="border-t border-[#262626] pt-8">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-white mb-8">
                Projects
              </h2>

              <div className="space-y-10 sm:space-y-12">
                {projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className={`grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 ${
                      idx !== 0 ? "border-t border-[#262626] pt-8" : ""
                    }`}
                  >
                    {/* Title & Tech Column with Clickable Link */}
                    <div className="md:col-span-5 space-y-1.5">
                      {proj.liveUrl || proj.githubUrl ? (
                        <a
                          href={proj.liveUrl || proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-start gap-1.5 no-underline"
                          title={`Open ${proj.title}`}
                        >
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-pink-400 tracking-tight leading-snug no-underline transition-colors duration-200">
                            {proj.title}
                          </h3>
                          <span className="text-xs text-[#8E8E93] group-hover:text-pink-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 mt-1">
                            ↗
                          </span>
                        </a>
                      ) : (
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                          {proj.title}
                        </h3>
                      )}
                      <div className="text-xs sm:text-sm text-[#8E8E93] font-mono leading-relaxed pt-1">
                        {proj.techStack}
                      </div>
                    </div>

                    {/* Bullets Column */}
                    <div className="md:col-span-7 space-y-3">
                      {proj.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#F3F4F6] leading-relaxed">
                          <span className="text-white text-xs select-none mt-1.5">•</span>
                          <p>{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Technical Skills with Interactive PixelCards */}
            <section id="skills" className="border-t border-[#262626] pt-8">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-white mb-8">
                Technical Skills
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {skills.map((group, idx) => {
                  const variant = idx === 0 ? "pink" : idx === 1 ? "blue" : idx === 4 ? "pink" : idx === 5 ? "blue" : "default";
                  return (
                    <PixelCard
                      key={idx}
                      variant={variant}
                      gap={7}
                      speed={35}
                      className="w-full !min-h-[190px] !h-auto !aspect-auto p-4 sm:p-5 rounded-xl border border-[#262626] bg-[#0c0c0e]/75 backdrop-blur-xs transition-all hover:border-white/30"
                    >
                      <div className="relative z-10 w-full flex flex-col justify-between h-full space-y-3.5">
                        <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                            {group.category}
                          </h3>
                          <span className="text-2xs font-mono text-[#8E8E93] bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
                            {group.skills.length}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {group.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/15 text-[#D1D5DB] hover:text-white border border-white/5 hover:border-white/20 transition-all cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </PixelCard>
                  );
                })}
              </div>
            </section>

            {/* Section: Education */}
            <section id="education" className="border-t border-[#262626] pt-8">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-white mb-8">
                Education
              </h2>

              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                    <div className="text-sm sm:text-base font-normal text-white">
                      {edu.institution}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-sm sm:text-base font-normal text-white">
                        {edu.degree}
                      </div>
                      <div className="text-sm text-[#8E8E93]">
                        {edu.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Certifications & Achievements (Hidden for now) */}
            {/* 
            <section className="border-t border-[#262626] pt-8">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-white mb-6">
                Certifications & Achievements:
              </h2>
              <div className="space-y-3.5">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#F3F4F6] leading-relaxed">
                    <span className="text-white text-xs select-none mt-1.5">•</span>
                    <p>{cert.name}</p>
                  </div>
                ))}
              </div>
            </section>
            */}

          </main>

        </div>

        {/* Standout Floating Footer Card with Reduced Opacity & Animated Action Buttons */}
        <footer className="mt-20 sm:mt-24 mb-10 w-full">
          <PixelCard
            variant="default"
            gap={8}
            speed={30}
            className="w-full !min-h-[200px] !h-auto !aspect-auto p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl shadow-2xl transition-all hover:border-white/25"
          >
            <div className="relative z-10 w-full flex flex-col justify-between gap-8">
              
              {/* Top Row: Availability, Name & Animated Social Pill Buttons */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-mono font-medium text-emerald-400">
                      Available for SWE & AI/ML Roles
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Let's build something remarkable.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8E8E93]">
                    Bengaluru, Karnataka, India • aravindachar2004@gmail.com
                  </p>
                </div>

                {/* Animated Social Buttons Group */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <a
                    href="https://github.com/aravindachar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30 transition-all hover:-translate-y-0.5 active:scale-95 shadow-xs cursor-pointer select-none"
                  >
                    <FaGithub className="text-sm" />
                    <span>GitHub</span>
                    <span className="text-2xs text-[#8E8E93]">↗</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/aravindachar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30 transition-all hover:-translate-y-0.5 active:scale-95 shadow-xs cursor-pointer select-none"
                  >
                    <FaLinkedin className="text-sm text-[#0A66C2]" />
                    <span>LinkedIn</span>
                    <span className="text-2xs text-[#8E8E93]">↗</span>
                  </a>

                  <a
                    href="mailto:aravindachar2004@gmail.com"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-gray-200 transition-all hover:-translate-y-0.5 active:scale-95 shadow-md cursor-pointer select-none"
                  >
                    <SiGmail className="text-sm text-[#EA4335]" />
                    <span>Email</span>
                    <span className="text-2xs text-black/60">↗</span>
                  </a>
                </div>
              </div>

              {/* Bottom Row: Copyright, Architecture, Back to Top */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8E93]">
                <div>
                  <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
                </div>

                <div className="text-2xs sm:text-xs text-[#71717A] font-mono">
                  React 19 • TypeScript • Tailwind CSS • Three.js
                </div>

                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer select-none"
                >
                  <span>Back to top</span>
                  <span>↑</span>
                </button>
              </div>

            </div>
          </PixelCard>
        </footer>

      </div>
    </div>
  );
}

export default App;
