import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import PixelCard from '@/components/ui/PixelCard';

export function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your passcode');
      return;
    }

    const success = login(password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid passcode. Please try again.');
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-black text-white flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-white selection:text-black">
      <div className="w-full max-w-md">
        <PixelCard
          variant="pink"
          gap={8}
          speed={25}
          className="w-full p-8 sm:p-10 rounded-2xl border border-white/10 bg-[#0c0c0e]/80 backdrop-blur-xl shadow-2xl"
        >
          <div className="relative z-10 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-xl">
                🔒
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Portfolio Admin
              </h1>
              <p className="text-xs sm:text-sm text-[#8E8E93]">
                Enter your master passcode to customize your site
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-2 font-medium">
                  Passcode
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter passcode"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm transition-all"
                  autoFocus
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 active:scale-98 transition-all cursor-pointer shadow-lg"
              >
                Access Dashboard →
              </button>
            </form>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#71717A]">
              <Link to="/" className="hover:text-white transition-colors">
                ← Back to Portfolio
              </Link>
            </div>
          </div>
        </PixelCard>
      </div>
    </div>
  );
}

export default AdminLoginPage;
