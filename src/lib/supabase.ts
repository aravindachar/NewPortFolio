import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { PortfolioData } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultPortfolioData';

const LOCAL_STORAGE_KEY = 'aravinda_portfolio_data_v1';
const SUPABASE_CONFIG_KEY = 'aravinda_supabase_custom_config';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getSupabaseConfig(): SupabaseConfig {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (envUrl && envKey) {
    return { url: envUrl, anonKey: envKey };
  }

  try {
    const saved = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore parse error
  }

  return { url: '', anonKey: '' };
}

export function saveSupabaseConfig(config: SupabaseConfig) {
  try {
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(config));
  } catch {
    // Ignore storage error
  }
}

export function getSupabaseClient(): SupabaseClient | null {
  const config = getSupabaseConfig();
  if (config.url && config.anonKey) {
    try {
      return createClient(config.url, config.anonKey);
    } catch (e) {
      console.warn("Invalid Supabase configuration:", e);
      return null;
    }
  }
  return null;
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('portfolio_data')
        .select('content')
        .eq('id', 'main')
        .single();

      if (!error && data?.content) {
        // Cache to local storage
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.content));
        } catch {
          // Ignore
        }
        return data.content as PortfolioData;
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local data:", err);
    }
  }

  // Fallback to localStorage
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      // Merge with default to ensure no missing keys if new fields are added
      return {
        ...defaultPortfolioData,
        ...parsed,
        profile: { ...defaultPortfolioData.profile, ...(parsed.profile || {}) },
        settings: { ...defaultPortfolioData.settings, ...(parsed.settings || {}) }
      };
    }
  } catch (err) {
    console.warn("Local storage parse failed:", err);
  }

  return defaultPortfolioData;
}

export async function savePortfolioData(data: PortfolioData): Promise<{ success: boolean; error?: string }> {
  // Always save to localStorage first for instant local responsiveness
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to write to localStorage:", e);
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase
        .from('portfolio_data')
        .upsert({ id: 'main', content: data, updated_at: new Date().toISOString() });

      if (error) {
        return { success: false, error: error.message };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, error: msg };
    }
  }

  return { success: true };
}

export function exportPortfolioJSON(data: PortfolioData) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
