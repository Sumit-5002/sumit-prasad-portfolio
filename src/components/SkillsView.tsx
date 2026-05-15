import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, Database, Layout, Terminal, 
  Cpu, Globe, Cloud, Shield, 
  Settings, Zap, Sparkles, Binary
} from 'lucide-react';
import { cn } from '../lib/utils';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
    icon: <Layout size={20} />,
    color: 'text-blue-500',
    skills: [
      { name: 'React.js', level: 95, icon: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Next.js', level: 90, icon: 'https://cdn.simpleicons.org/nextdotjs' },
      { name: 'Tailwind CSS', level: 95, icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
      { name: 'TypeScript', level: 85, icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
      { name: 'Framer Motion', level: 80, icon: 'https://cdn.simpleicons.org/framer/0055FF' },
    ]
  },
  {
    title: 'Backend & Systems',
    icon: <Terminal size={20} />,
    color: 'text-green-500',
    skills: [
      { name: 'Node.js', level: 85, icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
      { name: 'Python', level: 90, icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'FastAPI', level: 80, icon: 'https://cdn.simpleicons.org/fastapi/05998B' },
      { name: 'PostgreSQL', level: 85, icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'MongoDB', level: 80, icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: <Cloud size={20} />,
    color: 'text-purple-500',
    skills: [
      { name: 'GCP', level: 75, icon: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
      { name: 'Firebase', level: 85, icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
      { name: 'Docker', level: 65, icon: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'Vercel', level: 90, icon: 'https://cdn.simpleicons.org/vercel' },
      { name: 'GitHub', level: 95, icon: 'https://cdn.simpleicons.org/github' },
    ]
  },
  {
    title: 'Security & AI',
    icon: <Shield size={20} />,
    color: 'text-red-500',
    skills: [
      { name: 'Cybersecurity', level: 85, icon: 'https://cdn.simpleicons.org/hackthebox/9FEF00' },
      { name: 'Gemini AI', level: 90, icon: 'https://cdn.simpleicons.org/googlegemini/8E75E9' },
      { name: 'TensorFlow', level: 75, icon: 'https://cdn.simpleicons.org/tensorflow/FF6F00' },
      { name: 'OpenCV', level: 80, icon: 'https://cdn.simpleicons.org/opencv/5C3EE8' },
    ]
  }
];

export function SkillsView() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Sparkles className="text-yellow-500" />
          Technical Arsenal
        </h2>
        <p className="opacity-60 max-w-2xl">
          A comprehensive overview of my technological stack and proficiency levels. 
          Constantly evolving and exploring new horizons in software architecture.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILL_CATEGORIES.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-xl p-6 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
               {React.cloneElement(category.icon as any, { size: 120 })}
            </div>

            <div className="flex items-center gap-3 mb-6 relative">
              <div className={cn("p-2 rounded-lg bg-current/10", category.color)}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold">{category.title}</h3>
            </div>

            <div className="space-y-5 relative">
              {category.skills.map((skill, sIdx) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500",
                        ['Next.js', 'Vercel', 'GitHub'].includes(skill.name) && "dark:invert"
                      )}>
                         <img 
                           src={skill.icon} 
                           alt={skill.name} 
                           className="w-full h-full object-contain"
                           onError={(e) => {
                             (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + skill.name;
                           }}
                         />
                      </div>
                      {skill.name}
                    </span>
                    <span className="opacity-40 text-[10px] font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-[var(--vscode-bg)] rounded-full overflow-hidden border border-[var(--vscode-border)]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: (idx * 0.1) + (sIdx * 0.1) }}
                      className={cn("h-full rounded-full bg-gradient-to-r", 
                        idx === 0 ? "from-blue-600 to-blue-400" :
                        idx === 1 ? "from-green-600 to-green-400" :
                        idx === 2 ? "from-purple-600 to-purple-400" :
                        "from-red-600 to-red-400"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="pt-12 flex flex-col items-center gap-4 text-center border-t border-[var(--vscode-border)]"
      >
        <div className="flex gap-4">
           {['Frontend', 'Backend', 'Cloud', 'AI'].map(tag => (
             <span key={tag} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-wider">
               {tag}
             </span>
           ))}
        </div>
        <p className="text-xs opacity-40 italic">
          "The best way to predict the future is to invent it."
        </p>
      </motion.div>
    </div>
  );
}
