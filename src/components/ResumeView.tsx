import * as React from 'react';
import { motion } from 'motion/react';
import { Download, FileText, Calendar } from 'lucide-react';

export function ResumeView() {
  const lastUpdated = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-8 font-sans pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <FileText size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--vscode-text)]">Sumit Prasad</h2>
            <p className="opacity-60 text-sm flex items-center gap-2 text-[var(--vscode-text)]">
              <Calendar size={14} />
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        <button 
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-sm text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Download size={18} />
          Print / Save as PDF
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white text-black p-12 min-h-[1000px] shadow-2xl rounded-sm selection:bg-blue-200"
      >
         <header className="border-b-2 border-black pb-8 mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
           <div>
             <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Sumit Prasad</h1>
             <p className="text-lg font-bold text-blue-600">B.Tech Computer Science @ VIT Bhopal</p>
             <p className="text-sm font-medium opacity-70">Targeting Google Software Engineering Role</p>
           </div>
           <div className="text-left md:text-right text-sm space-y-1 font-medium">
             <p>sumitboy2005@gmail.com</p>
             <p>github.com/Sumit-5002</p>
             <p>linkedin.com/in/sumit-prasad-bce2005</p>
           </div>
         </header>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="md:col-span-2 space-y-8">
             <section>
               <h2 className="text-xl font-bold uppercase tracking-widest border-b-2 border-black pb-2 mb-4">Experience</h2>
               <div className="space-y-6">
                 <div>
                   <div className="flex justify-between items-baseline mb-1">
                     <h3 className="font-bold text-lg">Core Member</h3>
                     <span className="text-sm italic font-bold">2023 - Present</span>
                   </div>
                   <p className="font-bold text-sm mb-2 text-blue-600">FYI Club · VIT Bhopal</p>
                   <ul className="list-disc ml-4 text-sm space-y-1 font-medium">
                     <li>Built and lead the development of **SwiftCheck**, a real-time QR attendance system.</li>
                     <li>Handled scaling for university-wide workshops and club events.</li>
                     <li>Architected backend synchronization using GCP and Firebase.</li>
                   </ul>
                 </div>
                 <div>
                   <div className="flex justify-between items-baseline mb-1">
                     <h3 className="font-bold text-lg">Core Technical Member</h3>
                     <span className="text-sm italic font-bold">2024 - Present</span>
                   </div>
                   <p className="font-bold text-sm mb-2 text-blue-600">CloudZone Club · VIT Bhopal</p>
                   <ul className="list-disc ml-4 text-sm space-y-1 font-medium">
                     <li>Facilitating cloud workshops and Google Cloud Study Jams.</li>
                     <li>Mentoring peers on GCP services and hands-on labs.</li>
                   </ul>
                 </div>
               </div>
             </section>

             <section>
               <h2 className="text-xl font-bold uppercase tracking-widest border-b-2 border-black pb-2 mb-4">Major Projects</h2>
               <div className="space-y-4">
                 <div>
                   <h3 className="font-bold text-md">Gati Rehab (Health Hackathon Finalist)</h3>
                   <p className="text-xs italic mb-1">React, MediaPipe, TensorFlow.js</p>
                   <p className="text-sm font-medium">Built a physiotherapy PWA with pose-estimation tracking. Top 60/600+ national finalists.</p>
                 </div>
                 <div>
                   <h3 className="font-bold text-md">AnyFileForge</h3>
                   <p className="text-xs italic mb-1">Next.js, WebAssembly, FFmpeg.wasm</p>
                   <p className="text-sm font-medium">High-performance browser-based file conversion toolkit with 50+ tools.</p>
                 </div>
               </div>
             </section>
           </div>

           <div className="space-y-8">
             <section>
               <h2 className="text-xl font-bold uppercase tracking-widest border-b-2 border-black pb-2 mb-4">Skills</h2>
               <div className="space-y-4">
                 <div>
                   <h3 className="text-xs font-black uppercase mb-1">Languages</h3>
                   <p className="text-sm font-medium">TypeScript, Python, Java, C++, JavaScript, SQL</p>
                 </div>
                 <div>
                   <h3 className="text-xs font-black uppercase mb-1">Frontend</h3>
                   <p className="text-sm font-medium">Next.js, React, Tailwind, Framer Motion</p>
                 </div>
                 <div>
                   <h3 className="text-xs font-black uppercase mb-1">Backend & Cloud</h3>
                   <p className="text-sm font-medium">Node.js, FastAPI, GCP, Firebase, Docker</p>
                 </div>
               </div>
             </section>

             <section>
               <h2 className="text-xl font-bold uppercase tracking-widest border-b-2 border-black pb-2 mb-4">Education</h2>
               <div>
                 <h3 className="font-bold text-md leading-tight">B.Tech Computer Science</h3>
                 <p className="text-sm font-bold">VIT Bhopal University</p>
                 <p className="text-xs italic font-bold">2024 - 2028</p>
                 <p className="text-lg font-black mt-2 text-blue-600">CGPA: 8.83</p>
               </div>
             </section>

             <section>
               <h2 className="text-xl font-bold uppercase tracking-widest border-b-2 border-black pb-2 mb-4">Honors</h2>
               <ul className="text-sm space-y-2 font-bold">
                 <li className="flex gap-2 leading-tight items-start">
                    <span className="text-blue-600">★</span>
                    NPTEL Cloud Computing Top 5%
                 </li>
                 <li className="flex gap-2 leading-tight items-start">
                    <span className="text-blue-600">★</span>
                    100+ GCP Arcade Badges
                 </li>
               </ul>
             </section>
           </div>
         </div>
         
         <footer className="mt-16 pt-4 border-t border-black/10 text-[10px] text-center opacity-40 font-mono">
            Generated via Sumit's IDE Portfolio Engine v2.0
         </footer>
      </motion.div>
    </div>
  );
}
