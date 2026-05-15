import * as React from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const PROJECTS = [
  {
    id: 'swiftcheck',
    name: 'swiftcheck-fyi.tsx',
    tagline: 'Signature Project · Live QR-based attendance system',
    badge: 'Built by Core Member @ FYI Club · VIT Bhopal · Real-time GCP backend',
    tech: ['Next.js', 'GCP', 'Firebase', 'QR', 'Real-time'],
    status: 'Production',
    statusColor: 'bg-green-600',
    borderColor: 'border-l-orange-500',
    links: { github: '#', demo: 'https://swiftcheck-fyi.vercel.app/' },
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800'
  },
  {
    id: 'gati-rehab',
    name: 'gati-rehab.tsx',
    tagline: 'MediaPipe physiotherapy PWA · Health Hackathon National Finalist',
    badge: '🏆 Top 60 of 600+ teams · Co-organized with Johns Hopkins University',
    tech: ['React', 'MediaPipe', 'PWA', 'TensorFlow.js'],
    status: 'Hackathon Finalist',
    statusColor: 'bg-green-600',
    borderColor: 'border-l-green-500',
    links: { github: '#', demo: 'https://gati.web.app/' },
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800'
  },
  {
    id: 'anyfileforge',
    name: 'anyfileforge.tsx',
    tagline: '50+ tool WebAssembly file processing platform',
    badge: 'Runs 100% in browser — zero server uploads',
    tech: ['Next.js', 'WebAssembly', 'FFmpeg.wasm', 'TypeScript'],
    status: 'Live',
    statusColor: 'bg-blue-600',
    borderColor: 'border-l-blue-500',
    links: { github: '#', demo: 'https://anyfileforge.web.app/' },
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800'
  },
  {
    id: 'phishguard',
    name: 'phishguard.py',
    tagline: 'Cybersecurity platform with Google Gemini API integration',
    badge: 'AI-powered phishing detection',
    tech: ['Python', 'Gemini API', 'FastAPI', 'React'],
    status: 'In Progress',
    statusColor: 'bg-amber-600',
    borderColor: 'border-l-red-500',
    links: { github: '#', demo: 'https://phish-guard-dev.web.app/' },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800'
  }
];

export function ProjectsView() {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 }
        }
      }}
      className="p-8 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -4 }}
      className={cn(
        "bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] border-l-4 p-5 rounded-sm relative group transition-all",
        project.borderColor,
        "hover:border-l-[6px] hover:brightness-110"
      )}
    >
      <div className="relative h-40 mb-4 rounded-sm overflow-hidden border border-[var(--vscode-border)] bg-black/20">
         <img 
           src={project.image} 
           alt={project.name} 
           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
         <div className={cn("absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider", project.statusColor)}>
           {project.status}
         </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Code2 size={18} className="text-blue-400" />
        <h3 className="text-sm font-bold tracking-wide">{project.name}</h3>
      </div>

      <p className="text-sm opacity-90 mb-2 font-medium">
        {project.tagline}
      </p>
      
      <p className="text-xs opacity-60 mb-4 bg-black/10 dark:bg-white/5 p-2 rounded italic">
        {project.badge}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span key={t} className="text-[10px] px-2 py-0.5 bg-[var(--vscode-bg)] border border-[var(--vscode-border)] rounded-sm opacity-80">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {project.links.github && (
          <button 
            onClick={() => window.open(project.links.github, '_blank')}
            className="p-2 hover:bg-white/10 rounded-sm transition-colors opacity-70 hover:opacity-100" 
            title="View Source"
          >
            <Github size={18} />
          </button>
        )}
        {project.links.demo && (
          <button 
            onClick={() => window.open(project.links.demo, '_blank')}
            className="p-2 hover:bg-white/10 rounded-sm transition-colors opacity-70 hover:opacity-100" 
            title="Live Demo"
          >
            <ExternalLink size={18} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
