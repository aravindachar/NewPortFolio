import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { usePortfolio } from '@/context/PortfolioContext';
import { renderIconByKey } from '@/lib/iconsMap';
import { getSupabaseConfig, saveSupabaseConfig } from '@/lib/supabase';
import type { ContactLink, ExperienceItem, ProjectItem, SkillCategory, CertificationItem } from '@/types/portfolio';
import { cn } from '@/lib/utils';

type TabType =
  | 'identity'
  | 'bio'
  | 'contacts'
  | 'ticker'
  | 'experiences'
  | 'projects'
  | 'skills'
  | 'education'
  | 'visuals';

export function AdminDashboardPage() {
  const { logout, changePassword } = useAuth();
  const {
    data,
    saveStatus,
    errorMessage,
    updateProfile,
    updateContactLinks,
    updateTickerLogos,
    updateExperiences,
    updateProjects,
    updateSkills,
    updateEducation,
    updateCertifications,
    updateSettings,
    saveChanges,
    resetToDefaults,
    exportBackup,
    importBackup
  } = usePortfolio();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('identity');

  // Supabase state
  const [supabaseUrl, setSupabaseUrl] = useState(() => getSupabaseConfig().url);
  const [supabaseKey, setSupabaseKey] = useState(() => getSupabaseConfig().anonKey);
  const [dbConfigSaved, setDbConfigSaved] = useState(false);

  // New passcode state
  const [newPass, setNewPass] = useState('');
  const [passChanged, setPassChanged] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleSaveAll = async () => {
    await saveChanges();
  };

  const handleSaveDbConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig({ url: supabaseUrl.trim(), anonKey: supabaseKey.trim() });
    setDbConfigSaved(true);
    setTimeout(() => setDbConfigSaved(false), 3000);
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.trim()) {
      changePassword(newPass.trim());
      setNewPass('');
      setPassChanged(true);
      setTimeout(() => setPassChanged(false), 3000);
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        await importBackup(json);
        alert('Portfolio backup successfully imported!');
      } catch {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'identity', label: 'Identity & Hero', icon: '👤' },
    { id: 'bio', label: 'Bio & Narrative', icon: '📝' },
    { id: 'contacts', label: 'Contacts & Socials', icon: '🔗' },
    { id: 'ticker', label: 'Tech Ticker', icon: '💻' },
    { id: 'experiences', label: 'Experiences', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'skills', label: 'Technical Skills', icon: '⚡' },
    { id: 'education', label: 'Education & Certs', icon: '🎓' },
    { id: 'visuals', label: 'Visuals & Settings', icon: '🎨' }
  ];

  return (
    <div className="min-h-screen min-h-[100dvh] bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#262626] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-pink-500 animate-pulse"></span>
              <h1 className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
                Portfolio Control Center
              </h1>
            </div>
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#8E8E93] hover:text-white px-2.5 py-1 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
            >
              View Live Site ↗
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={exportBackup}
              type="button"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all cursor-pointer"
              title="Download JSON Backup"
            >
              Export JSON ↓
            </button>

            <button
              onClick={handleSaveAll}
              type="button"
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-md flex items-center gap-1.5",
                saveStatus === 'saved'
                  ? "bg-emerald-500 text-black"
                  : saveStatus === 'saving'
                  ? "bg-amber-400 text-black animate-pulse"
                  : "bg-white text-black hover:bg-zinc-200 active:scale-95"
              )}
            >
              <span>{saveStatus === 'saved' ? '✓ Saved!' : saveStatus === 'saving' ? 'Saving...' : 'Save All Changes'}</span>
            </button>

            <button
              onClick={handleLogout}
              type="button"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-all cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* Error notification if any */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center justify-between">
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Tabs */}
          <nav className="lg:col-span-3 flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 lg:sticky lg:top-20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all text-left whitespace-nowrap cursor-pointer",
                  activeTab === tab.id
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-[#A1A1AA] hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Content Area: Active Tab Panel */}
          <main className="lg:col-span-9 bg-[#0c0c0e]/80 border border-[#262626] rounded-2xl p-6 sm:p-8 backdrop-blur-xl space-y-8">
            
            {/* TAB 1: IDENTITY & HERO */}
            {activeTab === 'identity' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Identity & Hero Section
                  </h2>
                  <p className="text-xs text-[#8E8E93]">
                    Configure your display name, subtitle, and gradient animation settings.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1AA] mb-1.5">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={data.profile.name}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1AA] mb-1.5">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      value={data.profile.title}
                      onChange={(e) => updateProfile({ title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1AA] mb-1.5">
                      Resume Button Label
                    </label>
                    <input
                      type="text"
                      value={data.profile.resumeLabel || "Resume"}
                      onChange={(e) => updateProfile({ resumeLabel: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1AA] mb-1.5">
                      Resume URL (Leave "#" for print PDF dialog)
                    </label>
                    <input
                      type="text"
                      value={data.profile.resumeUrl || "#"}
                      onChange={(e) => updateProfile({ resumeUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-white/10">
                  <label className="block text-xs font-mono uppercase text-[#A1A1AA]">
                    Gradient Animation Speed ({data.profile.gradientSpeed || 8}s)
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={20}
                    step={1}
                    value={data.profile.gradientSpeed || 8}
                    onChange={(e) => updateProfile({ gradientSpeed: Number(e.target.value) })}
                    className="w-full accent-pink-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: BIO & ABOUT */}
            {activeTab === 'bio' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    About & Bio Narrative
                  </h2>
                  <p className="text-xs text-[#8E8E93]">
                    Write your bio description. It automatically features cursor proximity weight variation.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A1A1AA] mb-1.5">
                    Bio Text
                  </label>
                  <textarea
                    rows={8}
                    value={data.profile.bio}
                    onChange={(e) => updateProfile({ bio: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm leading-relaxed focus:border-pink-500 focus:outline-hidden resize-y font-sans"
                    placeholder="Enter your summary..."
                  />
                </div>
              </div>
            )}

            {/* TAB 3: CONTACTS & SOCIALS */}
            {activeTab === 'contacts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Contact & Social Links
                    </h2>
                    <p className="text-xs text-[#8E8E93]">
                      Links rendered in the left sidebar and footer card.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newLink: ContactLink = {
                        id: `c-${Date.now()}`,
                        label: 'New Link',
                        href: 'https://',
                        isExternal: true
                      };
                      updateContactLinks([...data.contactLinks, newLink]);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 cursor-pointer"
                  >
                    + Add Link
                  </button>
                </div>

                <div className="space-y-3">
                  {data.contactLinks.map((link, idx) => (
                    <div key={link.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3.5 rounded-xl bg-black/40 border border-white/10 items-center">
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => {
                            const updated = [...data.contactLinks];
                            updated[idx].label = e.target.value;
                            updateContactLinks(updated);
                          }}
                          placeholder="Label (e.g. LinkedIn)"
                          className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                        />
                      </div>
                      <div className="sm:col-span-6">
                        <input
                          type="text"
                          value={link.href}
                          onChange={(e) => {
                            const updated = [...data.contactLinks];
                            updated[idx].href = e.target.value;
                            updateContactLinks(updated);
                          }}
                          placeholder="URL (e.g. mailto: or https://)"
                          className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden font-mono"
                        />
                      </div>
                      <div className="sm:col-span-2 flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            updateContactLinks(data.contactLinks.filter((c) => c.id !== link.id));
                          }}
                          className="text-xs text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        >
                          ✕ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: TECH TICKER */}
            {activeTab === 'ticker' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Core Technologies & Architecture Ticker
                  </h2>
                  <p className="text-xs text-[#8E8E93]">
                    Toggle technology logos to appear in the seamless infinite ticker marquee.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {data.tickerLogos.map((logo, idx) => (
                    <button
                      key={logo.id}
                      type="button"
                      onClick={() => {
                        const updated = [...data.tickerLogos];
                        updated[idx].enabled = !updated[idx].enabled;
                        updateTickerLogos(updated);
                      }}
                      className={cn(
                        "flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer",
                        logo.enabled
                          ? "bg-white/10 border-white/30 text-white shadow-xs"
                          : "bg-black/30 border-white/5 text-zinc-600 opacity-50 hover:opacity-80"
                      )}
                    >
                      <span className="text-lg">
                        {renderIconByKey(logo.iconKey, `text-[${logo.color}]`)}
                      </span>
                      <span className="truncate">{logo.title}</span>
                      <span className="ml-auto text-2xs font-mono">{logo.enabled ? '✓' : ''}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#A1A1AA]">
                    Ticker Marquee Speed: {data.settings.tickerSpeed || 45}s
                  </span>
                  <input
                    type="range"
                    min={15}
                    max={90}
                    step={5}
                    value={data.settings.tickerSpeed || 45}
                    onChange={(e) => updateSettings({ tickerSpeed: Number(e.target.value) })}
                    className="w-48 accent-pink-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: EXPERIENCES */}
            {activeTab === 'experiences' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Experience Cards
                    </h2>
                    <p className="text-xs text-[#8E8E93]">
                      Add, edit, or remove your professional positions and internships.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newExp: ExperienceItem = {
                        id: `exp-${Date.now()}`,
                        role: 'Software Engineer',
                        company: 'Company Name',
                        companyUrl: '#',
                        period: '2026 – Present',
                        location: 'Bengaluru, IN',
                        bullets: ['Added a production feature end-to-end.']
                      };
                      updateExperiences([...data.experiences, newExp]);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 cursor-pointer"
                  >
                    + Add Experience
                  </button>
                </div>

                <div className="space-y-6">
                  {data.experiences.map((exp, expIdx) => (
                    <div key={exp.id} className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/5">
                        <span className="text-xs font-mono text-pink-400 font-semibold">
                          Experience #{expIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            updateExperiences(data.experiences.filter((e) => e.id !== exp.id));
                          }}
                          className="text-xs text-red-400 hover:text-red-300 cursor-pointer"
                        >
                          ✕ Delete
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Role</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => {
                              const updated = [...data.experiences];
                              updated[expIdx].role = e.target.value;
                              updateExperiences(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...data.experiences];
                              updated[expIdx].company = e.target.value;
                              updateExperiences(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Period</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => {
                              const updated = [...data.experiences];
                              updated[expIdx].period = e.target.value;
                              updateExperiences(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => {
                              const updated = [...data.experiences];
                              updated[expIdx].location = e.target.value;
                              updateExperiences(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                          />
                        </div>
                      </div>

                      {/* Bullets */}
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between">
                          <label className="text-2xs font-mono uppercase text-[#A1A1AA]">Bullet Points</label>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...data.experiences];
                              updated[expIdx].bullets.push('New key achievement or responsibility');
                              updateExperiences(updated);
                            }}
                            className="text-2xs text-pink-400 hover:text-pink-300 cursor-pointer"
                          >
                            + Add Bullet
                          </button>
                        </div>
                        {exp.bullets.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={b}
                              onChange={(e) => {
                                const updated = [...data.experiences];
                                updated[expIdx].bullets[bIdx] = e.target.value;
                                updateExperiences(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...data.experiences];
                                updated[expIdx].bullets.splice(bIdx, 1);
                                updateExperiences(updated);
                              }}
                              className="text-xs text-red-400 p-1"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Projects & Demos
                    </h2>
                    <p className="text-xs text-[#8E8E93]">
                      Add, edit, or remove your showcase projects with active redirect links.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newProj: ProjectItem = {
                        id: `proj-${Date.now()}`,
                        title: 'New Featured Project',
                        techStack: 'React · TypeScript · Tailwind CSS',
                        bullets: ['Engineered a high-performance interactive application.'],
                        githubUrl: 'https://github.com/aravindachar',
                        liveUrl: 'https://github.com/aravindachar',
                        featured: true
                      };
                      updateProjects([...data.projects, newProj]);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 cursor-pointer"
                  >
                    + Add Project
                  </button>
                </div>

                <div className="space-y-6">
                  {data.projects.map((proj, pIdx) => (
                    <div key={proj.id} className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/5">
                        <span className="text-xs font-mono text-pink-400 font-semibold">
                          Project #{pIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            updateProjects(data.projects.filter((p) => p.id !== proj.id));
                          }}
                          className="text-xs text-red-400 hover:text-red-300 cursor-pointer"
                        >
                          ✕ Delete
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...data.projects];
                              updated[pIdx].title = e.target.value;
                              updateProjects(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Tech Stack Subtitle</label>
                          <input
                            type="text"
                            value={proj.techStack}
                            onChange={(e) => {
                              const updated = [...data.projects];
                              updated[pIdx].techStack = e.target.value;
                              updateProjects(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Live Demo / Primary URL</label>
                            <input
                              type="text"
                              value={proj.liveUrl || ''}
                              onChange={(e) => {
                                const updated = [...data.projects];
                                updated[pIdx].liveUrl = e.target.value;
                                updateProjects(updated);
                              }}
                              placeholder="https://..."
                              className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">GitHub Repo URL</label>
                            <input
                              type="text"
                              value={proj.githubUrl || ''}
                              onChange={(e) => {
                                const updated = [...data.projects];
                                updated[pIdx].githubUrl = e.target.value;
                                updateProjects(updated);
                              }}
                              placeholder="https://github.com/..."
                              className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden font-mono"
                            />
                          </div>
                        </div>

                        {/* Bullets */}
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between">
                            <label className="text-2xs font-mono uppercase text-[#A1A1AA]">Description Bullets</label>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...data.projects];
                                updated[pIdx].bullets.push('Architected feature with optimized performance.');
                                updateProjects(updated);
                              }}
                              className="text-2xs text-pink-400 hover:text-pink-300 cursor-pointer"
                            >
                              + Add Bullet
                            </button>
                          </div>
                          {proj.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={b}
                                onChange={(e) => {
                                  const updated = [...data.projects];
                                  updated[pIdx].bullets[bIdx] = e.target.value;
                                  updateProjects(updated);
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...data.projects];
                                  updated[pIdx].bullets.splice(bIdx, 1);
                                  updateProjects(updated);
                                }}
                                className="text-xs text-red-400 p-1"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: TECHNICAL SKILLS */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Technical Skills Matrix
                    </h2>
                    <p className="text-xs text-[#8E8E93]">
                      Manage skill categories and choose PixelCard shimmer color variants.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newCat: SkillCategory = {
                        id: `skill-${Date.now()}`,
                        category: 'New Category',
                        variant: 'default',
                        skills: ['Skill 1', 'Skill 2']
                      };
                      updateSkills([...data.skills, newCat]);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 cursor-pointer"
                  >
                    + Add Category
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {data.skills.map((cat, catIdx) => (
                    <div key={cat.id} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3.5">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={cat.category}
                          onChange={(e) => {
                            const updated = [...data.skills];
                            updated[catIdx].category = e.target.value;
                            updateSkills(updated);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-black/80 border border-white/10 text-white font-bold text-sm focus:border-pink-500 focus:outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateSkills(data.skills.filter((s) => s.id !== cat.id));
                          }}
                          className="text-xs text-red-400 p-1"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Variant Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-2xs font-mono text-[#A1A1AA]">Theme:</span>
                        {(['pink', 'blue', 'default'] as const).map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => {
                              const updated = [...data.skills];
                              updated[catIdx].variant = v;
                              updateSkills(updated);
                            }}
                            className={cn(
                              "px-2 py-0.5 rounded text-2xs font-mono uppercase cursor-pointer transition-all",
                              cat.variant === v
                                ? "bg-white text-black font-bold"
                                : "bg-white/5 text-zinc-500 hover:text-white"
                            )}
                          >
                            {v}
                          </button>
                        ))}
                      </div>

                      {/* Skills tags list */}
                      <div>
                        <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1.5">
                          Skills List (Comma separated)
                        </label>
                        <input
                          type="text"
                          value={cat.skills.join(', ')}
                          onChange={(e) => {
                            const updated = [...data.skills];
                            updated[catIdx].skills = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                            updateSkills(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                          placeholder="e.g. Python, Docker, PyTorch"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: EDUCATION & CERTS */}
            {activeTab === 'education' && (
              <div className="space-y-8">
                {/* Education */}
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Education
                  </h2>
                  {data.education.map((edu, idx) => (
                    <div key={edu.id} className="p-4 rounded-xl bg-black/40 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Institution</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...data.education];
                            updated[idx].institution = e.target.value;
                            updateEducation(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = [...data.education];
                            updated[idx].degree = e.target.value;
                            updateEducation(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Status / Year</label>
                        <input
                          type="text"
                          value={edu.status}
                          onChange={(e) => {
                            const updated = [...data.education];
                            updated[idx].status = e.target.value;
                            updateEducation(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Certifications & Toggle */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        Certifications & Achievements
                      </h2>
                      <p className="text-xs text-[#8E8E93]">
                        Show or hide the Certifications section on the live website.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => updateSettings({ showCertifications: !data.settings.showCertifications })}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                        data.settings.showCertifications
                          ? "bg-emerald-500 text-black"
                          : "bg-white/10 text-[#8E8E93] hover:text-white"
                      )}
                    >
                      {data.settings.showCertifications ? '✓ Visible on Website' : 'Hidden'}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.certifications.map((cert, cIdx) => (
                      <div key={cert.id} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => {
                            const updated = [...data.certifications];
                            updated[cIdx].name = e.target.value;
                            updateCertifications(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateCertifications(data.certifications.filter((c) => c.id !== cert.id));
                          }}
                          className="text-xs text-red-400 p-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newCert: CertificationItem = {
                          id: `cert-${Date.now()}`,
                          name: 'New Certification or Award'
                        };
                        updateCertifications([...data.certifications, newCert]);
                      }}
                      className="text-xs text-pink-400 hover:text-pink-300 font-medium cursor-pointer"
                    >
                      + Add Certification
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 9: VISUALS & SETTINGS */}
            {activeTab === 'visuals' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Visual Effects & Footer Settings
                  </h2>
                  <p className="text-xs text-[#8E8E93]">
                    Configure global background animations, availability status badge, and credentials.
                  </p>
                </div>

                {/* Visual Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">LetterGlitch Canvas Effect</span>
                      <button
                        type="button"
                        onClick={() => updateSettings({ showLetterGlitch: !data.settings.showLetterGlitch })}
                        className={cn(
                          "px-2.5 py-1 rounded text-2xs font-mono uppercase cursor-pointer",
                          data.settings.showLetterGlitch ? "bg-pink-500 text-white" : "bg-white/10 text-zinc-500"
                        )}
                      >
                        {data.settings.showLetterGlitch ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                    {data.settings.showLetterGlitch && (
                      <div>
                        <label className="block text-2xs font-mono text-[#A1A1AA] mb-1">
                          Glitch Opacity: {data.settings.glitchOpacity || 55}%
                        </label>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          step={5}
                          value={data.settings.glitchOpacity || 55}
                          onChange={(e) => updateSettings({ glitchOpacity: Number(e.target.value) })}
                          className="w-full accent-pink-500"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-white block">Subtle Dot Pattern</span>
                      <span className="text-2xs text-[#8E8E93]">Overlay grid pattern</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateSettings({ showDotPattern: !data.settings.showDotPattern })}
                      className={cn(
                        "px-2.5 py-1 rounded text-2xs font-mono uppercase cursor-pointer",
                        data.settings.showDotPattern ? "bg-pink-500 text-white" : "bg-white/10 text-zinc-500"
                      )}
                    >
                      {data.settings.showDotPattern ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>

                {/* Footer Status Badge */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                  <span className="text-xs font-semibold text-white block">Availability Status Badge</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Status Text</label>
                      <input
                        type="text"
                        value={data.settings.statusText || ''}
                        onChange={(e) => updateSettings({ statusText: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Indicator Color</label>
                      <button
                        type="button"
                        onClick={() => updateSettings({ statusAvailable: !data.settings.statusAvailable })}
                        className={cn(
                          "w-full py-2 px-3 rounded-lg text-xs font-medium cursor-pointer border text-left",
                          data.settings.statusAvailable
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        )}
                      >
                        {data.settings.statusAvailable ? '🟢 Green (Available)' : '🟡 Amber (Busy / Open to Discuss)'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Supabase Free Database Connection */}
                <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>🗄️ Supabase Free Database Connection (Optional)</span>
                    </h3>
                    <p className="text-xs text-[#8E8E93] pt-0.5">
                      Connect your free Supabase project to sync updates live across devices.
                    </p>
                  </div>

                  <form onSubmit={handleSaveDbConfig} className="space-y-3">
                    <div>
                      <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Project URL</label>
                      <input
                        type="text"
                        value={supabaseUrl}
                        onChange={(e) => setSupabaseUrl(e.target.value)}
                        placeholder="https://your-project.supabase.co"
                        className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs font-mono focus:border-pink-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-mono uppercase text-[#A1A1AA] mb-1">Anon / Public Key</label>
                      <input
                        type="password"
                        value={supabaseKey}
                        onChange={(e) => setSupabaseKey(e.target.value)}
                        placeholder="eyJhbGciOi..."
                        className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs font-mono focus:border-pink-500 focus:outline-hidden"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 cursor-pointer"
                      >
                        {dbConfigSaved ? '✓ Config Saved!' : 'Save Supabase Credentials'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Passcode Change & Backup Utilities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                    <span className="text-xs font-semibold text-white block">Change Admin Passcode</span>
                    <form onSubmit={handleChangePasscode} className="space-y-2">
                      <input
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="New passcode"
                        className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-hidden"
                      />
                      <button
                        type="submit"
                        className="w-full py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/15 text-white cursor-pointer"
                      >
                        {passChanged ? '✓ Passcode Updated!' : 'Update Passcode'}
                      </button>
                    </form>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                    <span className="text-xs font-semibold text-white block">Backup & Reset</span>
                    <div className="flex flex-col gap-2">
                      <label className="w-full py-1.5 px-3 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/15 text-white cursor-pointer text-center">
                        Import JSON Backup ↑
                        <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Are you sure you want to restore default portfolio settings?')) {
                            resetToDefaults();
                          }
                        }}
                        className="w-full py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 border border-red-500/20 cursor-pointer"
                      >
                        Reset to Original Defaults
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
