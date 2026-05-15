import * as React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, Target, Shield, PieChart } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const ACHIEVEMENTS = [
  {
    title: "Health Hackathon '26 National Finalist",
    subtitle: "Top 60 of 600+ teams, co-organized with Johns Hopkins University",
    icon: Trophy,
    tier: 'gold',
    date: '2026'
  },
  {
    title: "NPTEL Cloud Computing",
    subtitle: "Top 5% nationally",
    icon: Star,
    tier: 'gold',
    date: '2025'
  },
  {
    title: "100+ Google Cloud Arcade Badges",
    subtitle: "Extensive hands-on experience with GCP services",
    icon: Target,
    tier: 'silver',
    date: '2024-2025'
  },
  {
    title: "ACWoC '26 Project Maintainer",
    subtitle: "Selected as open source project maintainer",
    icon: Shield,
    tier: 'silver',
    date: '2025'
  },
  {
    title: "CGPA 8.83",
    subtitle: "VIT Bhopal, B.Tech CSE, Class of 2028",
    icon: PieChart,
    tier: 'bronze',
    date: 'Present'
  }
];

const TIER_COLORS = {
  gold: 'border-yellow-500/50 from-yellow-500/10 to-transparent',
  silver: 'border-slate-400/50 from-slate-400/10 to-transparent',
  bronze: 'border-amber-700/50 from-amber-700/10 to-transparent'
};

const ICON_COLORS = {
  gold: 'text-yellow-500',
  silver: 'text-slate-300',
  bronze: 'text-amber-600'
};

export function AchievementsView() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-8 font-sans">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {ACHIEVEMENTS.map((ach, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0 }
            }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "relative group p-6 rounded-xl border bg-gradient-to-br overflow-hidden shadow-sm",
              TIER_COLORS[ach.tier as keyof typeof TIER_COLORS]
            )}
          >
            {/* Shimmer Effect */}
            <motion.div
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
            />

            <div className="flex items-start gap-4">
              <div className={cn(
                "p-3 rounded-lg bg-[var(--vscode-bg)]/50 border border-[var(--vscode-border)]",
                ICON_COLORS[ach.tier as keyof typeof ICON_COLORS]
              )}>
                <ach.icon size={24} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-lg leading-tight tracking-tight">
                    {ach.title}
                  </h3>
                  <span className="text-[10px] font-mono opacity-40 shrink-0 uppercase tracking-widest bg-black/20 px-1.5 py-0.5 rounded">
                    {ach.date}
                  </span>
                </div>
                <p className="text-sm opacity-60 leading-relaxed italic">
                  {ach.subtitle}
                </p>
              </div>
            </div>

            {/* Visual Flare */}
            <div className={cn(
              "absolute bottom-0 right-0 w-16 h-16 opacity-5 pointer-events-none transition-opacity group-hover:opacity-10",
              ICON_COLORS[ach.tier as keyof typeof ICON_COLORS]
            )}>
              <ach.icon size={64} className="translate-x-4 translate-y-4" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
