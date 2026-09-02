import { useRef } from 'react';
import { DotPattern } from '@/components/ui/dot-pattern';
import LetterGlitch from '@/components/ui/LetterGlitch';
import GradientText from '@/components/ui/GradientText';
import LogoLoop from '@/components/ui/LogoLoop';
import type { LogoItem } from '@/components/ui/LogoLoop';
import VariableProximity from '@/components/ui/VariableProximity';
import PixelCard from '@/components/ui/PixelCard';
import { usePortfolio } from '@/context/PortfolioContext';
import { renderIconByKey } from '@/lib/iconsMap';
import { cn } from '@/lib/utils';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';

export function PortfolioPage() {
  const { data } = usePortfolio();
  const { profile, contactLinks, tickerLogos, experiences, projects, skills, education, certifications, settings } = data;

  const bioContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Convert active tickerLogos to LogoLoop format
  const activeLogos: LogoItem[] = tickerLogos
    .filter((logo) => logo.enabled)
    .map((logo) => ({
      node: renderIconByKey(logo.iconKey, `hover:text-white transition-colors text-[${logo.color}]`),
      title: logo.title,
      href: logo.href
    }));

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-black text-white font-sans selection:bg-white selection:text-black antialiased overflow-x-hidden w-full">
      
      {/* Full-Screen LetterGlitch Background Effect */}
      {settings.showLetterGlitch && (
        <div
          className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500"
          style={{ opacity: (settings.glitchOpacity ?? 55) / 100 }}
        >
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
      )}

      {/* Subtle Dot Pattern Overlay */}
      {settings.showDotPattern && (
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
      )}

      {/* Floating Yellow Asterisk Badge on the Right */}
      {settings.showRightBadge && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-[#E2F952] text-black flex items-center justify-center font-bold text-lg shadow-lg select-none">
            ✦
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        
        {/* Top Header */}
        <header className="pb-4 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-1 sm:space-y-2 max-w-3xl">
              <h1 className="leading-tight">
                <GradientText
                  colors={profile.gradientColors?.length ? profile.gradientColors : ["#ec4899", "#d9cdd8", "#a855f7", "#ec4899"]}
                  animationSpeed={profile.gradientSpeed || 8}
                  showBorder={false}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight !m-0 !p-0 !bg-transparent text-left inline-flex leading-[1.15]"
                >
                  {profile.name}
                </GradientText>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg font-medium text-[#8E8E93] tracking-wide">
                {profile.title}
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

              <a
                href={profile.resumeUrl && profile.resumeUrl !== '#' ? profile.resumeUrl : '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-gray-200 transition-all shadow-xs cursor-pointer select-none no-underline active:scale-95"
                title="View Resume"
              >
                <span>{profile.resumeLabel || "Resume"}</span>
                <span className="text-xs">↗</span>
              </a>
            </nav>
          </div>

          {/* LogoLoop Component - Dynamic Resume Skills Ticker */}
          {activeLogos.length > 0 && (
            <div className="w-full pt-8 sm:pt-10">
              <div className="text-2xs uppercase tracking-widest text-[#71717A] font-mono mb-3 font-semibold">
                Core Technologies & Architecture Stack
              </div>
              <div className="w-full overflow-hidden rounded-xl border border-[#262626]/80 bg-black/40 backdrop-blur-xs py-2 px-1">
                <LogoLoop
                  logos={activeLogos}
                  speed={settings.tickerSpeed || 45}
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
          )}
        </header>

        {/* Two Column Layout: Left Sticky Sidebar + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-start pt-10 sm:pt-12">
          
          {/* Left Column: Fixed / Sticky Bio with VariableProximity & Interactive Contact Links */}
          <aside id="about" className="lg:col-span-4 space-y-6 sm:space-y-8 lg:sticky lg:top-12">
            <div ref={bioContainerRef} className="cursor-default">
              <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
                <VariableProximity
                  label={profile.bio}
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
              {contactLinks.map((link) => (
                <div key={link.id} className="py-2">
                  <a
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between px-3.5 py-2.5 -mx-3.5 rounded-xl text-sm text-[#F3F4F6] sm:text-[#D1D5DB] hover:text-white bg-white/[0.03] sm:bg-transparent hover:bg-white/[0.08] border border-white/5 sm:border-transparent hover:border-white/10 transition-all duration-200"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform font-medium">{link.label}</span>
                    <span className="text-xs text-pink-400 sm:text-[#8E8E93] group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">↗</span>
                  </a>
                </div>
              ))}
            </div>
          </aside>

          {/* Right Column: Experience, Projects, Skills, Education, Certifications */}
          <main className="lg:col-span-8 space-y-12 sm:space-y-16">
            
            {/* Section: Experience */}
            {experiences.length > 0 && (
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
                          <a
                            href={exp.companyUrl || "#"}
                            target={exp.companyUrl && exp.companyUrl !== '#' ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1"
                          >
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
            )}

            {/* Section: Projects with Interactive Redirect Links */}
            {projects.length > 0 && (
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
                            <h3 className="text-lg sm:text-xl font-bold text-pink-400 sm:text-white sm:group-hover:text-pink-400 tracking-tight leading-snug no-underline transition-colors duration-200">
                              {proj.title}
                            </h3>
                            <span className="text-xs text-pink-400 sm:text-[#8E8E93] sm:group-hover:text-pink-400 sm:group-hover:translate-x-1 sm:group-hover:-translate-y-1 transition-all duration-200 mt-1">
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
            )}

            {/* Section: Technical Skills with Interactive PixelCards */}
            {skills.length > 0 && (
              <section id="skills" className="border-t border-[#262626] pt-8">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-white mb-8">
                  Technical Skills
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {skills.map((group) => (
                    <PixelCard
                      key={group.id}
                      variant={group.variant || "default"}
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
                  ))}
                </div>
              </section>
            )}

            {/* Section: Education */}
            {education.length > 0 && (
              <section id="education" className="border-t border-[#262626] pt-8">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-white mb-8">
                  Education
                </h2>

                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
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
            )}

            {/* Section: Certifications & Achievements (Dynamic Toggle) */}
            {settings.showCertifications && certifications.length > 0 && (
              <section className="border-t border-[#262626] pt-8">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-white mb-6">
                  Certifications & Achievements:
                </h2>
                <div className="space-y-3.5">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-start gap-2.5 text-sm sm:text-base text-[#F3F4F6] leading-relaxed">
                      <span className="text-white text-xs select-none mt-1.5">•</span>
                      <p>{cert.name}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </main>

        </div>

        {/* Standout Floating Footer Card with Dynamic Actions & Settings */}
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
                  {settings.statusText && (
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className={cn(
                          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                          settings.statusAvailable ? "bg-emerald-400" : "bg-amber-400"
                        )}></span>
                        <span className={cn(
                          "relative inline-flex rounded-full h-2.5 w-2.5",
                          settings.statusAvailable ? "bg-emerald-500" : "bg-amber-500"
                        )}></span>
                      </span>
                      <span className={cn(
                        "text-xs font-mono font-medium",
                        settings.statusAvailable ? "text-emerald-400" : "text-amber-400"
                      )}>
                        {settings.statusText}
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {settings.footerTagline || "Let's build something remarkable."}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8E8E93]">
                    Bengaluru, Karnataka, India • {contactLinks.find(c => c.href.startsWith('mailto:'))?.label || 'aravindachar2004@gmail.com'}
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
                  <p>© {new Date().getFullYear()} {settings.footerCopyright || profile.name}. All rights reserved.</p>
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

export default PortfolioPage;
