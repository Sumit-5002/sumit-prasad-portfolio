import * as React from 'react';
import { motion } from 'motion/react';
import { Settings, Type, Layout, RefreshCcw, Save, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface SettingsViewProps {
  config: {
    accentColor: string;
    fontSize: string;
    glassmorphism: boolean;
    animations: boolean;
  };
  updateConfig: (key: string, value: any) => void;
}

// ─── VS Code Theme Definitions ─────────────────────────────────────────────

interface VSTheme {
  id: string;
  name: string;
  author: string;
  accentColor: string;
  bg: string;
  sidebar: string;
  tabInactive: string;
  border: string;
  text: string;
  swatch: [string, string, string];
}

const VS_THEMES: VSTheme[] = [
  {
    id: 'vscode-dark',
    name: 'VS Code Dark+',
    author: 'Microsoft',
    accentColor: '#007acc',
    bg: '#1e1e1e',
    sidebar: '#252526',
    tabInactive: '#2d2d2d',
    border: '#3c3c3c',
    text: '#d4d4d4',
    swatch: ['#1e1e1e', '#252526', '#007acc'],
  },
  {
    id: 'dracula',
    name: 'Dracula',
    author: 'Dracula Theme',
    accentColor: '#bd93f9',
    bg: '#282a36',
    sidebar: '#21222c',
    tabInactive: '#343746',
    border: '#44475a',
    text: '#f8f8f2',
    swatch: ['#282a36', '#44475a', '#bd93f9'],
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    author: 'sarah.drasner',
    accentColor: '#7fdbca',
    bg: '#011627',
    sidebar: '#0b2942',
    tabInactive: '#0d3a58',
    border: '#1d3b53',
    text: '#d6deeb',
    swatch: ['#011627', '#1d3b53', '#7fdbca'],
  },
  {
    id: 'nord',
    name: 'Nord',
    author: 'arcticicestudio',
    accentColor: '#88c0d0',
    bg: '#2e3440',
    sidebar: '#3b4252',
    tabInactive: '#434c5e',
    border: '#4c566a',
    text: '#d8dee9',
    swatch: ['#2e3440', '#4c566a', '#88c0d0'],
  },
  {
    id: 'github-dark',
    name: 'GitHub Dark',
    author: 'GitHub',
    accentColor: '#238636',
    bg: '#0d1117',
    sidebar: '#161b22',
    tabInactive: '#1c2128',
    border: '#30363d',
    text: '#c9d1d9',
    swatch: ['#0d1117', '#30363d', '#238636'],
  },
  {
    id: 'solarized',
    name: 'Solarized Dark',
    author: 'Ethan Schoonover',
    accentColor: '#b58900',
    bg: '#002b36',
    sidebar: '#073642',
    tabInactive: '#0a3d4a',
    border: '#1c4b56',
    text: '#839496',
    swatch: ['#002b36', '#073642', '#b58900'],
  },
];

const FONT_SIZES = ['12px', '14px', '16px'];

// ─── Theme Card ───────────────────────────────────────────────────────────────

function ThemeCard({
  theme,
  isActive,
  onSelect,
}: {
  theme: VSTheme;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'relative w-full text-left rounded-lg border p-4 transition-colors group overflow-hidden',
        isActive
          ? 'border-blue-500 bg-blue-500/5'
          : 'border-[var(--vscode-border)] bg-[var(--vscode-bg)] hover:border-blue-500/40 hover:bg-white/[0.02]'
      )}
      aria-pressed={isActive}
      aria-label={`Select ${theme.name} theme`}
    >
      {/* Active checkmark */}
      {isActive && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
        >
          <Check size={11} className="text-white" strokeWidth={3} />
        </motion.span>
      )}

      {/* Swatch strip */}
      <div className="flex gap-1 mb-3 rounded-sm overflow-hidden h-7">
        {theme.swatch.map((color, i) => (
          <div
            key={i}
            className={cn('rounded-sm', i === 0 ? 'flex-[2]' : 'flex-1')}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Name + author */}
      <div className="font-semibold text-[13px] leading-tight mb-0.5 truncate">
        {theme.name}
      </div>
      <div className="text-[10px] opacity-50 truncate">{theme.author}</div>
    </motion.button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SettingsView({ config, updateConfig }: SettingsViewProps) {
  const [isSaving, setIsSaving] = React.useState(false);
  const [activeThemeId, setActiveThemeId] = React.useState('vscode-dark');

  const handleThemeSelect = (theme: VSTheme) => {
    setActiveThemeId(theme.id);
    updateConfig('accentColor', theme.accentColor);

    // Live-update CSS variables for the dark theme only using a dynamic style tag
    let styleEl = document.getElementById('custom-theme-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'custom-theme-style';
      document.head.appendChild(styleEl);
    }
    
    styleEl.innerHTML = `
      .dark {
        --vscode-bg: ${theme.bg};
        --vscode-sidebar: ${theme.sidebar};
        --vscode-tab-inactive: ${theme.tabInactive};
        --vscode-border: ${theme.border};
        --vscode-text: ${theme.text};
        --vscode-statusbar: ${theme.accentColor};
      }
    `;

    // Clean up any previously set inline styles that were breaking the light theme
    const root = document.documentElement;
    root.style.removeProperty('--vscode-bg');
    root.style.removeProperty('--vscode-sidebar');
    root.style.removeProperty('--vscode-tab-inactive');
    root.style.removeProperty('--vscode-border');
    root.style.removeProperty('--vscode-text');
    root.style.removeProperty('--vscode-statusbar');
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  const currentTheme = VS_THEMES.find(t => t.id === activeThemeId) ?? VS_THEMES[0];

  return (
    <div className="h-full overflow-auto custom-scrollbar bg-[var(--vscode-bg)] p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex items-center justify-between border-b border-[var(--vscode-border)] pb-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
              <Settings size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Settings</h1>
              <p className="text-[10px] opacity-40 font-mono mt-0.5">
                Customize your editor appearance. Choose from curated themes that match your style.
              </p>
            </div>
          </div>
          <motion.button
            onClick={handleSave}
            disabled={isSaving}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isSaving ? <RefreshCcw size={14} className="animate-spin" /> : <Save size={14} />}
            {isSaving ? 'Applying...' : 'Save'}
          </motion.button>
        </motion.header>

        {/* ── COLOR THEME grid ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45, ease: 'easeOut' }}
          className="space-y-5"
        >
          <div className="text-[11px] font-bold uppercase tracking-widest opacity-50">
            Color Theme
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {VS_THEMES.map((theme, i) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.35 }}
              >
                <ThemeCard
                  theme={theme}
                  isActive={activeThemeId === theme.id}
                  onSelect={() => handleThemeSelect(theme)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Editor Config ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.45, ease: 'easeOut' }}
          className="space-y-5"
        >
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest opacity-50">
            <Type size={12} /> Editor Config
          </div>

          <div className="bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] p-5 rounded-xl space-y-5">
            {/* Font size */}
            <div className="space-y-3">
              <label className="text-xs font-medium opacity-70">Font Size</label>
              <div className="grid grid-cols-3 gap-2">
                {FONT_SIZES.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => updateConfig('fontSize', size)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={cn(
                      'py-2 rounded-lg text-xs font-semibold border transition-colors',
                      config.fontSize === size
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-[var(--vscode-bg)] border-[var(--vscode-border)] hover:bg-white/5 opacity-60'
                    )}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--vscode-border)] pt-4 space-y-3">
              {/* Glassmorphism toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium">Glassmorphism</div>
                  <div className="text-[10px] opacity-40 mt-0.5">Enable blurred backgrounds</div>
                </div>
                <button
                  onClick={() => updateConfig('glassmorphism', !config.glassmorphism)}
                  title={config.glassmorphism ? 'Disable Glassmorphism' : 'Enable Glassmorphism'}
                  className={cn(
                    'w-10 h-5 rounded-full transition-colors relative',
                    config.glassmorphism ? 'bg-blue-600' : 'bg-gray-700'
                  )}
                >
                  <motion.div
                    animate={{ x: config.glassmorphism ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>

              {/* Animations toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium">Core Animations</div>
                  <div className="text-[10px] opacity-40 mt-0.5">Fluid transitions</div>
                </div>
                <button
                  onClick={() => updateConfig('animations', !config.animations)}
                  title={config.animations ? 'Disable Animations' : 'Enable Animations'}
                  className={cn(
                    'w-10 h-5 rounded-full transition-colors relative',
                    config.animations ? 'bg-blue-600' : 'bg-gray-700'
                  )}
                >
                  <motion.div
                    animate={{ x: config.animations ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Raw config JSON preview ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest opacity-50">
            <Layout size={12} /> Raw Configuration
          </div>
          <div className="bg-[#1e1e1e] p-5 rounded-xl border border-[var(--vscode-border)] font-mono text-xs text-blue-300 overflow-x-auto">
            <pre className="opacity-80 leading-relaxed">
{`{
  "workbench.colorTheme": "${currentTheme.name}",
  "workbench.colorCustomizations": {
    "statusBar.background": "${config.accentColor}"
  },
  "editor.fontSize": "${config.fontSize}",
  "portfolio.glassmorphism": ${config.glassmorphism},
  "portfolio.enableAnimations": ${config.animations}
}`}
            </pre>
          </div>
        </motion.section>

        <footer className="pt-8 text-center opacity-25 text-[10px] italic pb-4">
          All settings persist in your session. Reload resets to defaults.
        </footer>
      </div>
    </div>
  );
}
