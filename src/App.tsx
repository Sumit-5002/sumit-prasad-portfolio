/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { TitleBar } from './components/layout/TitleBar';
import { ActivityBar } from './components/layout/ActivityBar';
import { StatusBar } from './components/layout/StatusBar';
import { Explorer } from './components/layout/Explorer';
import { Terminal } from './components/layout/Terminal';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { CodeView } from './components/ui/CodeView';
import { CommandPalette } from './components/ui/CommandPalette';
import { FileCode, X, Layout, Code, Eye, Lock, Search, Blocks, ChartBar, Bell, Info, CheckCircle2, Music } from 'lucide-react';
import { cn } from './lib/utils';
import { Tab } from './types';
import { FILE_CONTENT } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AboutView } from './components/views/AboutView';
import { ClickEffect } from './components/ui/ClickEffect';

// --- LAZY VIEWS ---
const ProjectsView = React.lazy(() => import('./components/views/ProjectsView').then(m => ({ default: m.ProjectsView })));
const ContactView = React.lazy(() => import('./components/views/ContactView').then(m => ({ default: m.ContactView })));
const SkillsView = React.lazy(() => import('./components/views/SkillsView').then(m => ({ default: m.SkillsView })));
const ExperienceView = React.lazy(() => import('./components/views/ExperienceView').then(m => ({ default: m.ExperienceView })));
const StatsView = React.lazy(() => import('./components/views/StatsView').then(m => ({ default: m.StatsView })));
const ResumeView = React.lazy(() => import('./components/views/ResumeView').then(m => ({ default: m.ResumeView })));
const MusicView = React.lazy(() => import('./components/views/MusicView').then(m => ({ default: m.MusicView })));
const VisitorDashboard = React.lazy(() => import('./components/views/VisitorDashboard').then(m => ({ default: m.VisitorDashboard })));
const AdminView = React.lazy(() => import('./components/views/AdminView').then(m => ({ default: m.AdminView })));
const SettingsView = React.lazy(() => import('./components/views/SettingsView').then(m => ({ default: m.SettingsView })));
const ComingSoonView = React.lazy(() => import('./components/ui/ComingSoonView').then(m => ({ default: m.ComingSoonView })));

// Route ↔ Tab mapping
const ROUTE_TO_TAB: Record<string, { id: string; name: string }> = {
  '/': { id: 'about', name: 'about.tsx' },
  '/projects': { id: 'projects', name: 'projects.json' },
  '/skills': { id: 'skills', name: 'skills.ts' },
  '/experience': { id: 'experience', name: 'experience.ts' },
  '/contact': { id: 'contact', name: 'contact.ts' },
  '/stats': { id: 'stats', name: 'stats.json' },
  '/resume': { id: 'resume', name: 'resume.tsx' },
  '/music': { id: 'music', name: 'music.tsx' },
  '/settings': { id: 'settings', name: 'settings.json' },
  '/admin': { id: 'admin', name: 'admin.ts' },
  '/visitors': { id: 'visitors', name: 'visitors.json' },
};

const TAB_TO_ROUTE: Record<string, string> = {
  about: '/',
  projects: '/projects',
  skills: '/skills',
  experience: '/experience',
  contact: '/contact',
  stats: '/stats',
  resume: '/resume',
  music: '/music',
  settings: '/settings',
  admin: '/admin',
  visitors: '/visitors',
};

// Track visit once across StrictMode mounts
let hasTrackedVisit = false;

const MELTDOWN_CODES = Array.from({ length: 80 }).map(() => ({
  left: `${Math.random() * 100}%`,
  duration: Math.random() * 2 + 1,
  delay: Math.random() * 2,
  text: Array.from({ length: 5 }).map(() => `0x${Math.random().toString(16).substr(2, 4).toUpperCase()} `).join('')
}));

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarWidth, setSidebarWidth] = React.useState(200);
  const [terminalHeight, setTerminalHeight] = React.useState(160);
  const [isTerminalOpen, setIsTerminalOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isActivityBarOpen, setIsActivityBarOpen] = React.useState(false);
  const [isStatusBarOpen, setIsStatusBarOpen] = React.useState(true);
  const [activeActionTab, setActiveActionTab] = React.useState('files');
  const [viewMode, setViewMode] = React.useState<'code' | 'preview'>('preview');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isTerminalTyping, setIsTerminalTyping] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<{ id: string, text: string, type: 'info' | 'success' }[]>([]);
  const [openTabs, setOpenTabs] = React.useState<Tab[]>([
    { id: 'about', name: 'about.tsx' }
  ]);
  const [activeTabId, setActiveTabId] = React.useState('about');
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMelting, setIsMelting] = React.useState(false);

  // --- SETTINGS CONFIG ---
  const [config, setConfig] = React.useState({
    accentColor: '#007acc',
    fontSize: '14px',
    glassmorphism: true,
    animations: true
  });

  const updateConfig = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  React.useEffect(() => {
    document.documentElement.style.setProperty('--vscode-statusbar', config.accentColor);
    document.documentElement.style.setProperty('--font-size-base', config.fontSize);
  }, [config]);

  // --- GLOBAL MUSIC STATE ---
  // ... (keeping existing music state)
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const playlist = [
    { name: 'Lofi Study Beats', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', cover: 'blue' },
    { name: 'Cloud Synthwave', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', cover: 'purple' },
    { name: 'Midnight Code', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', cover: 'green' }
  ];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed (waiting for user interaction)"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };
  // -------------------------

  const addNotification = (text: string, type: 'info' | 'success' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const hasInitialNotificationShown = React.useRef(false);

  // Sync URL → open correct tab on load / back-forward navigation
  React.useEffect(() => {
    const tab = ROUTE_TO_TAB[location.pathname];
    if (tab) {
      if (tab.id === 'admin') setIsAdmin(true);
      setOpenTabs(prev => prev.find(t => t.id === tab.id) ? prev : [...prev, tab]);
      setActiveTabId(tab.id);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Initial welcome
    let welcomeTimeout: NodeJS.Timeout;
    if (!hasInitialNotificationShown.current) {
      welcomeTimeout = setTimeout(() => {
        addNotification("Development workspace initialized", "success");
        hasInitialNotificationShown.current = true;
      }, 2000);
    }

    // Track visit - Deferred for performance
    if (!hasTrackedVisit) {
      const trackVisit = () => {
        fetch('/api/visit', { method: 'POST' }).catch(() => { });
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => trackVisit(), { timeout: 10000 });
      } else {
        setTimeout(trackVisit, 5000);
      }
      hasTrackedVisit = true;
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('keydown', handleKeyDown);
      if (welcomeTimeout) clearTimeout(welcomeTimeout);
    };
  }, []);

  // Update audio source when track changes
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrackIndex].url;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrackIndex]);

  // Resize handlers
  const sidebarResizeRef = React.useRef<boolean>(false);
  const terminalResizeRef = React.useRef<boolean>(false);

  const startSidebarResize = (e: React.MouseEvent) => {
    sidebarResizeRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResize);
    document.body.style.cursor = 'col-resize';
  };

  const startTerminalResize = (e: React.MouseEvent) => {
    terminalResizeRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResize);
    document.body.style.cursor = 'row-resize';
  };

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (sidebarResizeRef.current) {
      const newWidth = e.clientX - (isActivityBarOpen ? 43 : 0);
      if (newWidth > 150 && newWidth < 600) setSidebarWidth(newWidth);
    }
    if (terminalResizeRef.current) {
      const newHeight = window.innerHeight - e.clientY - 28; // Status bar height
      if (newHeight > 100 && newHeight < 600) setTerminalHeight(newHeight);
    }
  }, []);

  const stopResize = () => {
    sidebarResizeRef.current = false;
    terminalResizeRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResize);
    document.body.style.cursor = 'default';
  };

  const handleFileClick = (file: { id: string; name: string }) => {
    if (isMobile) {
      setOpenTabs([file]);
    } else if (!openTabs.find(tab => tab.id === file.id)) {
      setOpenTabs(prev => [...prev, file]);
    }
    setActiveTabId(file.id);
    setMobileMenuOpen(false);
    // Sync URL
    const route = TAB_TO_ROUTE[file.id];
    if (route && location.pathname !== route) {
      navigate(route);
    }
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(tab => tab.id !== id);
    setOpenTabs(newTabs);
    if (activeTabId === id && newTabs.length > 0) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    } else if (newTabs.length === 0) {
      setActiveTabId('');
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <ClickEffect />
      <div className="flex flex-col h-[100dvh] w-screen overflow-hidden selection:bg-[var(--color-vscode-selection)] bg-[var(--vscode-bg)] pb-[env(safe-area-inset-bottom)]">
        <TitleBar
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isActivityBarOpen={isActivityBarOpen}
          onToggleActivityBar={() => setIsActivityBarOpen(!isActivityBarOpen)}
          isTerminalOpen={isTerminalOpen}
          onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
          isStatusBarOpen={isStatusBarOpen}
          onToggleStatusBar={() => setIsStatusBarOpen(!isStatusBarOpen)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onSecretClick={() => handleFileClick({ id: 'admin', name: 'admin.ts' })}
        />

        <div className="flex-1 flex overflow-hidden relative">
          {isActivityBarOpen && (
            <ActivityBar
              activeFileId={activeTabId}
              activeActionTab={activeActionTab}
              onActionTabChange={(tab) => {
                setActiveActionTab(tab);
                setIsSidebarOpen(true);
              }}
              onSecretClick={() => {
                handleFileClick({ id: 'admin', name: 'admin.ts' });
                setIsSidebarOpen(true);
                setActiveActionTab('secret');
              }}
              onSettingsClick={() => {
                handleFileClick({ id: 'settings', name: 'settings.json' });
                setIsSidebarOpen(true);
              }}
              onProfileClick={() => {
                handleFileClick({ id: 'profile', name: 'profile.json' });
                setIsSidebarOpen(true);
              }}
              onMusicClick={() => {
                handleFileClick({ id: 'music', name: 'music.tsx' });
                setIsSidebarOpen(true);
                setActiveActionTab('music');
              }}
            />
          )}

          <audio ref={audioRef} className="hidden" />

          {/* Sidebar - Desktop */}
          <div
            className={cn(
              "hidden md:flex flex-col border-r border-[var(--vscode-border)] shrink-0 group relative transition-all duration-300",
              (!isSidebarOpen) && "w-0 overflow-hidden border-none"
            )}
            style={{ width: isSidebarOpen ? `${sidebarWidth}px` : 0 }}
          >
            {activeActionTab === 'files' && <Explorer onFileClick={handleFileClick} activeFileId={activeTabId} />}
            {activeActionTab === 'search' && (
              <div className="flex-1 flex flex-col p-4 bg-[var(--vscode-sidebar)] h-full">
                <div className="text-[11px] font-bold uppercase tracking-wider mb-4 opacity-70 flex justify-between items-center">
                  <span>Search</span>
                  <span className="text-[9px] bg-blue-500/20 text-blue-500 px-1.5 py-0.5 rounded">BETA</span>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      aria-label="Search files"
                      className="w-full bg-[var(--vscode-bg)] border border-[var(--vscode-border)] px-2 py-1 text-xs outline-none focus:border-blue-500 rounded-sm"
                    />
                  </div>
                  <div className="text-[10px] opacity-40 uppercase font-bold">Files to include</div>
                  <input
                    type="text"
                    placeholder="e.g. *.ts"
                    aria-label="Files to include"
                    className="w-full bg-[var(--vscode-bg)] border border-[var(--vscode-border)] px-2 py-1 text-xs outline-none focus:border-blue-500 rounded-sm"
                  />
                  <div className="mt-8 flex flex-col items-center justify-center gap-2 opacity-30 text-center">
                    <Search size={32} />
                    <span className="text-[10px]">Neural Search Engine: Coming Soon</span>
                  </div>
                </div>
              </div>
            )}
            {activeActionTab === 'extensions' && (
              <div className="flex-1 flex flex-col p-4 bg-[var(--vscode-sidebar)] h-full">
                <div className="text-[11px] font-bold uppercase tracking-wider mb-4 opacity-70 flex justify-between items-center">
                  <span>Extensions</span>
                  <span className="text-[9px] bg-yellow-500/20 text-yellow-500 px-1.5 py-0.5 rounded">WIP</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-[var(--vscode-bg)] border border-[var(--vscode-border)] p-2 rounded flex gap-2 items-center">
                    <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center text-blue-500">
                      <Blocks size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">Marketplace</div>
                      <div className="text-[10px] opacity-60">Connecting...</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleFileClick({ id: 'coming-soon', name: 'marketplace.extensions' })}
                    className="mt-8 flex flex-col items-center justify-center gap-2 opacity-30 text-center hover:opacity-100 transition-opacity w-full group"
                  >
                    <Blocks size={32} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px]">Click to explore Marketplace</span>
                  </button>
                </div>
              </div>
            )}
            {activeActionTab === 'music' && (
              <div className="flex-1 flex flex-col p-4 bg-[var(--vscode-sidebar)] h-full">
                <div className="text-[11px] font-bold uppercase tracking-wider mb-4 opacity-70">
                  Music Library
                </div>
                <div className="mt-4 space-y-2">
                  {playlist.map((track, idx) => (
                    <div
                      key={track.name}
                      onClick={() => {
                        setCurrentTrackIndex(idx);
                        if (!isPlaying) togglePlay();
                      }}
                      className={cn(
                        "p-2.5 hover:bg-white/5 rounded-md cursor-pointer text-xs transition-all flex items-center gap-3 group",
                        currentTrackIndex === idx ? "bg-blue-500/10 text-blue-400 opacity-100" : "opacity-60 hover:opacity-100"
                      )}
                    >
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        currentTrackIndex === idx ? "bg-blue-500 animate-pulse" : "bg-white/20"
                      )} />
                      <span className="truncate">{track.name}</span>
                      {currentTrackIndex === idx && isPlaying && (
                        <div className="ml-auto flex gap-0.5 items-end h-3">
                          <div className="w-0.5 h-full bg-blue-500 animate-[bounce_1s_infinite]" />
                          <div className="w-0.5 h-2 bg-blue-500 animate-[bounce_0.8s_infinite]" />
                          <div className="w-0.5 h-full bg-blue-500 animate-[bounce_1.2s_infinite]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeActionTab === 'secret' && (
              <div className="flex-1 flex flex-col p-4 bg-[var(--vscode-sidebar)] h-full">
                <div className="text-[11px] font-bold uppercase tracking-wider mb-4 opacity-70 text-yellow-500">
                  Security Console
                </div>
                <div className="mt-4 space-y-4">
                  <div className="p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-sm">
                    <p className="text-[10px] font-mono text-yellow-500/80 leading-relaxed">
                      SYSTEM_READY<br />
                      ENCRYPTION: AES-256<br />
                      STATUS: MONITORING
                    </p>
                  </div>
                  <div className="space-y-1">
                    {['Security Logs', 'Traffic Analysis', 'Access Control'].map(l => (
                      <div key={l} className="text-[10px] opacity-40 hover:opacity-100 cursor-pointer py-1 px-2 hover:bg-white/5 rounded transition-all">
                        {'>'} {l}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div
              onMouseDown={startSidebarResize}
              className="absolute top-0 right-[-2px] w-[4px] h-full cursor-col-resize z-50 hover:bg-blue-500/50 transition-colors"
            />
          </div>

          {/* Sidebar - Mobile Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/40 z-[90] md:hidden"
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed top-9 left-0 bottom-0 w-[240px] bg-[var(--vscode-sidebar)] z-[100] border-r border-[var(--vscode-border)] md:hidden"
                >
                  <Explorer onFileClick={handleFileClick} activeFileId={activeTabId} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tab Bar */}
            <div className="h-9 bg-[var(--vscode-sidebar)] flex overflow-x-auto no-scrollbar shrink-0 border-b border-[var(--vscode-border)] shadow-sm relative z-20">
              {openTabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => handleFileClick(tab)}
                  className={cn(
                    "group flex items-center gap-2 px-3 h-full border-r border-[var(--vscode-border)] cursor-pointer text-[11px] transition-all relative min-w-[100px] sm:min-w-[120px] max-w-[200px]",
                    activeTabId === tab.id
                      ? "bg-[var(--vscode-bg)] border-t-2 border-t-blue-500 opacity-100 z-10"
                      : "bg-[var(--vscode-tab-inactive)] opacity-40 hover:opacity-100"
                  )}
                >
                  <FileCode size={13} className={cn(activeTabId === tab.id ? "text-blue-400" : "text-vscode-text")} />
                  <span className="truncate flex-1">{tab.name}</span>
                  <X
                    size={14}
                    onClick={(e) => closeTab(e, tab.id)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-vscode-border/50 rounded shrink-0"
                  />
                </div>
              ))}
            </div>

            {/* Editor Area */}
            <main className="flex-1 overflow-hidden flex flex-col relative text-[var(--vscode-text)]">
              <div className="flex-1 flex overflow-hidden">
                {/* Code Panel */}
                {viewMode === 'code' && activeTabId && (
                  <div className="h-full w-full overflow-hidden bg-[var(--vscode-bg)]">
                    <CodeView
                      code={FILE_CONTENT[activeTabId as keyof typeof FILE_CONTENT] || '// Content coming soon...'}
                      fileName={openTabs.find(t => t.id === activeTabId)?.name}
                    />
                  </div>
                )}

                {/* Preview Panel */}
                {viewMode === 'preview' && activeTabId && (
                  <div className="h-full w-full overflow-auto bg-[var(--vscode-bg)] transition-all custom-scrollbar">
                    <div className="min-h-full w-full bg-gradient-to-br from-blue-500/[0.03] via-transparent to-purple-500/[0.03]">
                      <AnimatePresence mode="wait">
                        {activeTabId === 'about' && (
                          <motion.div
                            key="about"
                            className="h-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            <AboutView onOpenFile={handleFileClick} />
                          </motion.div>
                        )}
                        {activeTabId === 'projects' && (
                          <motion.div
                            key="projects"
                            className="h-full"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                          >
                            <React.Suspense fallback={<div className="h-full flex items-center justify-center opacity-20 text-[10px]">Loading...</div>}>
                              <ProjectsView />
                            </React.Suspense>
                          </motion.div>
                        )}
                        {activeTabId === 'skills' && (
                          <motion.div
                            key="skills"
                            className="h-full"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                          >
                            <React.Suspense fallback={<div className="h-full flex items-center justify-center opacity-20 text-[10px]">Loading...</div>}>
                              <SkillsView />
                            </React.Suspense>
                          </motion.div>
                        )}
                        {activeTabId === 'experience' && (
                          <motion.div
                            key="experience"
                            className="h-full"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                          >
                            <React.Suspense fallback={<div className="h-full flex items-center justify-center opacity-20 text-[10px]">Loading...</div>}>
                              <ExperienceView />
                            </React.Suspense>
                          </motion.div>
                        )}
                        {activeTabId === 'stats' && (
                          <motion.div
                            key="stats"
                            className="h-full"
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(10px)' }}
                          >
                            <React.Suspense fallback={<div className="h-full flex items-center justify-center opacity-20 text-[10px]">Loading...</div>}>
                              <StatsView />
                            </React.Suspense>
                          </motion.div>
                        )}
                        {activeTabId === 'contact' && (
                          <motion.div
                            key="contact"
                            className="h-full"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                          >
                            <React.Suspense fallback={<div className="h-full flex items-center justify-center opacity-20 text-[10px]">Loading...</div>}>
                              <ContactView />
                            </React.Suspense>
                          </motion.div>
                        )}
                        {activeTabId === 'admin' && (
                          <motion.div
                            key="admin"
                            className="h-full"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                          >
                            <React.Suspense fallback={<div className="h-full flex items-center justify-center opacity-20 text-[10px]">Loading...</div>}>
                              <AdminView />
                            </React.Suspense>
                          </motion.div>
                        )}
                        {activeTabId === 'visitors' && (
                          <motion.div
                            key="visitors"
                            className="h-full"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <React.Suspense fallback={<div className="h-full flex items-center justify-center opacity-20 text-[10px]">Loading...</div>}>
                              <VisitorDashboard />
                            </React.Suspense>
                          </motion.div>
                        )}
                        {activeTabId === 'resume' && (
                          <motion.div
                            key="resume"
                            className="h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <React.Suspense fallback={<div className="h-full flex items-center justify-center opacity-20 text-[10px]">Loading...</div>}>
                              <ResumeView />
                            </React.Suspense>
                          </motion.div>
                        )}
                        {activeTabId === 'music' && (
                          <motion.div
                            key="music"
                            className="h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <React.Suspense fallback={<div className="h-full flex items-center justify-center opacity-20 text-[10px]">Loading...</div>}>
                              <MusicView
                                isPlaying={isPlaying}
                                togglePlay={togglePlay}
                                currentTrack={playlist[currentTrackIndex]}
                                nextTrack={nextTrack}
                              />
                            </React.Suspense>
                          </motion.div>
                        )}
                        {activeTabId === 'coming-soon' && (
                          <motion.div
                            key="coming-soon"
                            className="h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <React.Suspense fallback={<div className="h-full flex items-center justify-center opacity-20 text-[10px]">Loading...</div>}>
                              <ComingSoonView 
                                title="Extension Marketplace" 
                                description="We are building a curated gallery of VS Code extensions to enhance your portfolio experience. Stay tuned for the release!" 
                              />
                            </React.Suspense>
                          </motion.div>
                        )}
                        {activeTabId === 'settings' && (
                          <motion.div
                            key="settings"
                            className="h-full"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <React.Suspense fallback={<div className="h-full flex items-center justify-center opacity-20 text-[10px]">Loading...</div>}>
                              <SettingsView
                                config={config}
                                updateConfig={updateConfig}
                              />
                            </React.Suspense>
                          </motion.div>
                        )}
                        {activeTabId === 'profile' && (
                          <motion.div
                            key="config"
                            className="h-full flex items-center justify-center p-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <div className="max-w-md w-full bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] p-8 rounded-xl text-center space-y-4">
                              <div className="p-3 bg-blue-500/10 rounded-full w-fit mx-auto text-blue-500">
                                <FileCode size={32} />
                              </div>
                              <h3 className="text-xl font-bold uppercase tracking-tight">{activeTabId}.json</h3>
                              <p className="text-sm opacity-50">Configuration files are best viewed in Code Mode.</p>
                              <button
                                onClick={() => setViewMode('code')}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all active:scale-95"
                              >
                                Switch to Code View
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {!activeTabId && (
                  <div className="flex-1 h-full flex items-center justify-center opacity-20 select-none">
                    <div className="text-center">
                      <FileCode size={80} strokeWidth={1} className="mb-4 mx-auto" />
                      <p className="text-xl font-medium tracking-tight">Select a file to start building</p>
                    </div>
                  </div>
                )}
              </div>
            </main>

            {/* Terminal Panel */}
            <div className="hidden md:flex shrink-0 flex-col">
              {isTerminalOpen ? (
                <div className="relative">
                  <div
                    onMouseDown={startTerminalResize}
                    className="absolute top-[-2px] left-0 w-full h-[4px] cursor-row-resize z-50 hover:bg-blue-500/50 transition-colors"
                  />
                  <Terminal
                    height={terminalHeight}
                    onClose={() => setIsTerminalOpen(false)}
                    onOpenFile={(id, name) => handleFileClick({ id, name })}
                    onTyping={setIsTerminalTyping}
                    onMeltdown={() => {
                      setIsMelting(true);
                      setTimeout(() => setIsMelting(false), 5000);
                    }}
                  />
                </div>
              ) : (
                <div className="h-6 flex items-center px-4 bg-[var(--vscode-bg)] border-t border-[var(--vscode-border)]">
                  <button
                    onClick={() => setIsTerminalOpen(true)}
                    className="text-[10px] uppercase font-bold text-vscode-text opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Terminal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {isStatusBarOpen && (
          <StatusBar
            isTyping={isTerminalTyping}
            onClickStats={() => handleFileClick({ id: 'visitors', name: 'visitors.json' })}
            nowPlaying={playlist[currentTrackIndex].name}
            isPlaying={isPlaying}
          />
        )}

        <AnimatePresence>
          {isMelting && (
            <motion.div
              key="meltdown-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] pointer-events-none bg-red-950/40 backdrop-blur-[4px] flex items-center justify-center overflow-hidden"
            >
              {/* Flicker Layer */}
              <motion.div
                animate={{ opacity: [0, 1, 0.4, 1, 0.2, 1] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="absolute inset-0 bg-red-600/10 pointer-events-none"
              />

              <div className="absolute inset-0 overflow-hidden opacity-50">
                {MELTDOWN_CODES.map((code, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -200 }}
                    animate={{ y: ['-10vh', '110vh'] }}
                    transition={{
                      duration: code.duration,
                      repeat: Infinity,
                      ease: "linear",
                      delay: code.delay
                    }}
                    className="text-red-500 font-mono text-[10px] absolute whitespace-nowrap shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                    style={{ left: code.left }}
                  >
                    {code.text}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-black/90 border-4 border-red-600 p-12 text-red-600 font-mono text-center space-y-4 shadow-[0_0_100px_rgba(220,38,38,0.5)] relative z-10"
              >
                <h1 className="text-6xl font-black italic tracking-tighter">KERNEL PANIC</h1>
                <p className="text-xl font-bold animate-pulse">CRITICAL_SYSTEM_FAILURE: DATA_LOSS_IMMINENT</p>
                <div className="h-1 w-full bg-red-950 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: ['0%', '100%'] }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-red-600"
                  />
                </div>
                <p className="text-[10px] opacity-50 uppercase tracking-[0.5em]">Attempting emergency recovery...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onFileSelect={(id) => {
          const files = [
            { id: 'about', name: 'about.tsx' },
            { id: 'projects', name: 'projects.json' },
            { id: 'skills', name: 'skills.ts' },
            { id: 'experience', name: 'experience.ts' },
            { id: 'visitor-stats', name: 'stats.json' }
          ];
          const file = files.find(f => f.id === id);
          if (file) handleFileClick(file);
        }}
      />

      {/* Notification Toast System */}
      <div className="fixed bottom-12 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
              className="pointer-events-auto bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] shadow-2xl rounded-sm p-3 flex items-center gap-3 min-w-[280px]"
            >
              <div className={cn(
                "w-1 h-8 rounded-full",
                n.type === 'success' ? "bg-green-500" : "bg-blue-500"
              )} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  {n.type === 'success' ? <CheckCircle2 size={12} className="text-green-500" /> : <Info size={12} className="text-blue-500" />}
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">System</span>
                </div>
                <div className="text-xs text-white/90">{n.text}</div>
              </div>
              <button
                aria-label="Close notification"
                onClick={() => setNotifications(prev => prev.filter(notif => notif.id !== n.id))}
                className="opacity-30 hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
