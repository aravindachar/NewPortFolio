/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  PortfolioData,
  ProfileConfig,
  ContactLink,
  TickerLogoItem,
  ExperienceItem,
  ProjectItem,
  SkillCategory,
  EducationItem,
  CertificationItem,
  VisualSettings
} from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultPortfolioData';
import { fetchPortfolioData, savePortfolioData, exportPortfolioJSON } from '../lib/supabase';

interface PortfolioContextType {
  data: PortfolioData;
  loading: boolean;
  isSaving: boolean;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  errorMessage: string;
  updateProfile: (profile: Partial<ProfileConfig>) => void;
  updateContactLinks: (links: ContactLink[]) => void;
  updateTickerLogos: (logos: TickerLogoItem[]) => void;
  updateExperiences: (experiences: ExperienceItem[]) => void;
  updateProjects: (projects: ProjectItem[]) => void;
  updateSkills: (skills: SkillCategory[]) => void;
  updateEducation: (education: EducationItem[]) => void;
  updateCertifications: (certifications: CertificationItem[]) => void;
  updateSettings: (settings: Partial<VisualSettings>) => void;
  saveChanges: () => Promise<boolean>;
  resetToDefaults: () => Promise<void>;
  exportBackup: () => void;
  importBackup: (json: PortfolioData) => Promise<boolean>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Initial load
  useEffect(() => {
    let isMounted = true;
    fetchPortfolioData().then((loadedData) => {
      if (isMounted) {
        setData(loadedData);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const updateProfile = useCallback((profile: Partial<ProfileConfig>) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profile }
    }));
    setSaveStatus('idle');
  }, []);

  const updateContactLinks = useCallback((links: ContactLink[]) => {
    setData((prev) => ({ ...prev, contactLinks: links }));
    setSaveStatus('idle');
  }, []);

  const updateTickerLogos = useCallback((logos: TickerLogoItem[]) => {
    setData((prev) => ({ ...prev, tickerLogos: logos }));
    setSaveStatus('idle');
  }, []);

  const updateExperiences = useCallback((experiences: ExperienceItem[]) => {
    setData((prev) => ({ ...prev, experiences }));
    setSaveStatus('idle');
  }, []);

  const updateProjects = useCallback((projects: ProjectItem[]) => {
    setData((prev) => ({ ...prev, projects }));
    setSaveStatus('idle');
  }, []);

  const updateSkills = useCallback((skills: SkillCategory[]) => {
    setData((prev) => ({ ...prev, skills }));
    setSaveStatus('idle');
  }, []);

  const updateEducation = useCallback((education: EducationItem[]) => {
    setData((prev) => ({ ...prev, education }));
    setSaveStatus('idle');
  }, []);

  const updateCertifications = useCallback((certifications: CertificationItem[]) => {
    setData((prev) => ({ ...prev, certifications }));
    setSaveStatus('idle');
  }, []);

  const updateSettings = useCallback((settings: Partial<VisualSettings>) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settings }
    }));
    setSaveStatus('idle');
  }, []);

  const saveChanges = async (): Promise<boolean> => {
    setIsSaving(true);
    setSaveStatus('saving');
    setErrorMessage('');

    const res = await savePortfolioData(data);
    setIsSaving(false);
    if (res.success) {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
      return true;
    } else {
      setSaveStatus('error');
      setErrorMessage(res.error || 'Failed to save to database');
      return false;
    }
  };

  const resetToDefaults = async () => {
    setData(defaultPortfolioData);
    await savePortfolioData(defaultPortfolioData);
    setSaveStatus('saved');
  };

  const exportBackup = () => {
    exportPortfolioJSON(data);
  };

  const importBackup = async (importedData: PortfolioData): Promise<boolean> => {
    if (importedData && importedData.profile && importedData.projects) {
      setData(importedData);
      await savePortfolioData(importedData);
      setSaveStatus('saved');
      return true;
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        loading,
        isSaving,
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
