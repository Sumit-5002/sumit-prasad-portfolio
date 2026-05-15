import * as React from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Trophy, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const EXPERIENCE = [
  {
    type: 'leadership',
    title: 'Core Member',
    company: 'FYI Club · VIT Bhopal',
    period: '2023 - Present',
    location: 'Bhopal, India',
    description: 'Built and lead the development of SwiftCheck, a real-time QR-based attendance system used for club events and workshops.',
    skills: ['React', 'Firebase', 'System Design'],
    color: 'text-orange-500'
  },
  {
    type: 'leadership',
    title: 'Core Technical Member',
    company: 'CloudZone Club · VIT Bhopal',
    period: '2024 - Present',
    location: 'Bhopal, India',
    description: 'Contributing to cloud workshops and GCP-based project development. Actively involved in community-driven tech events.',
    skills: ['Cloud Computing', 'GCP', 'Community'],
    color: 'text-blue-500'
  },
  {
    type: 'education',
    title: 'B.Tech in Computer Science',
    company: 'VIT Bhopal University',
    period: '2024 - 2028',
    location: 'Bhopal, India',
    description: 'Specializing in Computer Science and Engineering. Maintaining a CGPA of 8.83. Focusing on Distributed Systems and High-Scale Architectures.',
    skills: ['Data Structures', 'DBMS', 'OS'],
    color: 'text-green-500'
  }
];

const ACHIEVEMENTS = [
  {
    title: 'Health Hackathon National Finalist',
    organization: 'Johns Hopkins University & Tech Mahindra',
    date: '2024',
    result: 'Top 60 of 600+ teams'
  },
  {
    title: 'ACWoC \'26 Project Maintainer',
    organization: 'Open Source Community',
    date: '2024',
    result: 'Active Contributor'
  },
  {
    title: 'NPTEL Cloud Computing',
    organization: 'IIT Kharagpur',
    date: '2024',
    result: 'Top 5% Elite Silver'
  }
];

export function ExperienceView() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-16 pb-24">
      <div className="space-y-12">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Briefcase className="text-blue-500" />
          Professional Journey
        </h2>

        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--vscode-border)] before:to-transparent">
          {EXPERIENCE.map((item, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Icon / Bullet */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--vscode-border)] bg-[var(--vscode-bg)] text-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                {item.type === 'internship' ? <Briefcase size={18} /> : 
                 item.type === 'leadership' ? <Trophy size={18} /> : 
                 <GraduationCap size={18} />}
              </div>

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar)] shadow-xl hover:shadow-blue-500/5 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={cn("text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-current/10", item.color)}>
                    {item.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] opacity-40 font-mono">
                    <Calendar size={10} />
                    {item.period}
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <div className="text-blue-500 text-sm font-semibold mb-3 flex items-center gap-1.5">
                  {item.company}
                  <div className="w-1 h-1 rounded-full bg-current opacity-30" />
                  <span className="text-xs opacity-60 flex items-center gap-1">
                    <MapPin size={10} />
                    {item.location}
                  </span>
                </div>

                <p className="text-sm opacity-70 mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 bg-[var(--vscode-bg)] border border-[var(--vscode-border)] rounded-sm opacity-80">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8 pt-12 border-t border-[var(--vscode-border)]">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Trophy className="text-yellow-500" />
          Key Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((ach, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="p-6 bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Trophy size={60} />
              </div>
              <div className="text-xs text-blue-400 font-mono mb-2">{ach.date}</div>
              <h3 className="text-lg font-bold mb-1 pr-12">{ach.title}</h3>
              <p className="text-sm opacity-60">{ach.organization}</p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-[10px] font-bold uppercase tracking-wider">
                <Check size={10} />
                {ach.result}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Check({ size = 16, className = "" }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
