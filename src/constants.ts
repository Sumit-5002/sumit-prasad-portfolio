export const FILE_CONTENT: Record<string, string> = {
  'about': `import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, FileText, Award, Cloud, Zap, Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 font-sans text-vscode-text">
      <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500/30 shrink-0 shadow-xl">
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sumit" alt="Profile" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Sumit Prasad</h1>
          <p className="text-lg opacity-80 mb-4">
            B.Tech CSE @ VIT Bhopal · CGPA 8.83 · Class of 2028
          </p>
          <p className="text-xl font-medium text-blue-400">
            "I build things that matter. Targeting Google SWE."
          </p>
        </div>
      </header>

      <section className="flex flex-wrap gap-3 mb-10">
        <div className="flex items-center gap-2 bg-vscode-sidebar px-4 py-2 rounded-full border border-vscode-border text-sm">
          <Award size={16} className="text-yellow-500" />
          <span>Health Hackathon Top 60/600+</span>
        </div>
        <div className="flex items-center gap-2 bg-vscode-sidebar px-4 py-2 rounded-full border border-vscode-border text-sm">
          <Cloud size={16} className="text-blue-500" />
          <span>NPTEL Cloud Top 5%</span>
        </div>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-blue-400">About Me</h2>
        <p className="text-lg leading-relaxed opacity-90">
          I'm a passionate developer focused on distributed systems and high-scale applications. 
          As an open source contributor and project maintainer for **ACWoC '26**, I love collaborating on impactful software. 
        </p>
      </section>

      <footer className="flex gap-4 border-t border-vscode-border pt-8">
         <button className="bg-[#0e639c] hover:bg-[#1177bb] text-white px-6 py-2 rounded-sm text-sm font-semibold transition-all">
           Resume.pdf
         </button>
         <div className="flex gap-2">
            <a href="https://github.com/Sumit-5002/" target="_blank" className="p-2 hover:bg-vscode-sidebar rounded-full transition-colors"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/sumit-prasad-bce2005/" target="_blank" className="p-2 hover:bg-vscode-sidebar rounded-full transition-colors"><Linkedin size={20} /></a>
            <a href="mailto:sumitboy2005@gmail.com" className="p-2 hover:bg-vscode-sidebar rounded-full transition-colors"><Mail size={20} /></a>
         </div>
      </footer>
    </div>
  );
}`,
  'projects': `// Featured Projects Portfolio
const projects = [
  {
    name: "AnyFileForge",
    url: "https://anyfileforge.web.app/",
    tech: ["Next.js", "WebAssembly", "FFmpeg.wasm"],
    description: "50+ tool WebAssembly file processing platform."
  },
  {
    name: "Gati Rehab",
    url: "https://gati.web.app/",
    tech: ["React", "MediaPipe", "TensorFlow.js"],
    description: "MediaPipe physiotherapy PWA for rehabilitation."
  },
  {
    name: "PhishGuard",
    url: "https://phish-guard-dev.web.app/",
    tech: ["Python", "FastAPI", "Gemini API"],
    description: "AI-powered phishing detection platform."
  },
  {
    name: "SwiftCheck",
    url: "https://swiftcheck-fyi.vercel.app/",
    tech: ["Next.js", "Firebase", "GCP"],
    description: "Live QR-based attendance system for FYI Club."
  }
];`,
  'skills': `{
  "languages": ["TypeScript", "Python", "Java", "C++", "JavaScript"],
  "frontend": ["Next.js", "React", "Tailwind CSS", "Framer Motion", "WebAssembly"],
  "backend": ["Node.js", "Express", "FastAPI", "REST APIs"],
  "cloud": ["GCP", "Firebase", "Docker", "Vercel"],
  "tools": ["Git", "GitHub", "Figma", "VS Code"],
  "achievements": ["NPTEL Cloud Computing (Top 5%)", "Health Hackathon Finalist"]
}`,
  'experience': `// Professional & Academic Experience
const experiences = [
  {
    role: "Core Member",
    org: "FYI Club · VIT Bhopal",
    period: "2023 - Present",
    work: "Built and maintain SwiftCheck, a live QR attendance platform."
  },
  {
    role: "Core Technical Member",
    org: "CloudZone Club · VIT Bhopal",
    period: "2024 - Present",
    work: "Contributing to cloud workshops and GCP labs."
  },
  {
    role: "B.Tech CSE",
    org: "VIT Bhopal University",
    period: "2024 - 2028",
    work: "CGPA 8.83 | Distributed Systems focus."
  }
];`,
  'stats': `{
  "github": "Sumit-5002",
  "deployed_projects": 4,
  "top_languages": ["TypeScript", "Python", "React"],
  "contributions": "Active maintainer @ ACWoC '26",
  "cloud_expertise": "100+ GCP Badges"
}`,
  'contact': `// Connect with Sumit Prasad
export const contactInfo = {
  email: "sumitboy2005@gmail.com",
  linkedin: "linkedin.com/in/sumit-prasad-bce2005/",
  github: "github.com/Sumit-5002",
  location: "Bhopal, India",
  available_for: ["Internships", "Collaborations", "Freelance"]
};`,
  'resume': `{
  "name": "Sumit Prasad",
  "role": "Full Stack Developer | Aspiring Google SWE",
  "education": "B.Tech @ VIT Bhopal (CGPA 8.83)",
  "contacts": {
    "email": "sumitboy2005@gmail.com",
    "github": "Sumit-5002"
  },
  "summary": "Building high-scale apps with Next.js, GCP, and AI integration."
}`,
  'music': `// Now Playing: Coding Session
const playlist = [
  "Lo-fi Beats to Code/LeetCode to",
  "Interstellar Theme (Google SWE remix)",
  "Cyberpunk 2077 - Rebel Path"
];`,
  'settings': `{
  "workbench.colorTheme": "VSCode Dark Plus",
  "editor.fontSize": 14,
  "editor.fontFamily": "'Fira Code', monospace",
  "editor.minimap.enabled": true,
  "terminal.integrated.fontSize": 12,
  "sumit.portfolio.version": "2.0.0-gold"
}`,
  'profile': `{
  "username": "Sumit-5002",
  "displayName": "Sumit Prasad",
  "bio": "Building high-scale apps with Next.js, GCP, and AI.",
  "status": "Targeting Google SWE 2028",
  "verified": true,
  "stats": {
    "projects": 4,
    "achievements": 2
  }
}`,
  'visitors': `{
  "status": "LIVE",
  "endpoint": "/api/telemetry/v1",
  "metrics": {
    "total_visits": 1248,
    "unique_locations": 12,
    "avg_session_duration": "4m 22s",
    "top_region": "Bhopal, IN"
  },
  "encryption": "AES-256-GCM"
}`,
  'secret-file': `// TOP SECRET: Restricted Access
// User: sumit_prasad
// Clearance Level: GOOGLE_ADMIN
//
// ENCRYPTED DATA:
// aGlyZSBtZSBhbmQgSSB3aWxsIG1ha2UgZ29vZ2xlIHByb3Vk
//
// (Hint: This is Base64 for Sumit's final message to Google recruiters)`,
};
