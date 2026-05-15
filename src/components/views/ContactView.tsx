import * as React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ContactView() {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = React.useState<Record<string, boolean>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    const newErrors: Record<string, boolean> = {};
    if (!data.name) newErrors.name = true;
    if (!data.email) newErrors.email = true;
    if (!data.message) newErrors.message = true;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!res.ok) throw new Error('Failed to send');
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-6 font-sans">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="space-y-6"
      >
        <motion.div
           variants={{
             hidden: { opacity: 0, y: 10 },
             visible: { opacity: 1, y: 0 }
           }}
           className="text-center md:text-left"
        >
          <h2 className="text-2xl font-bold">Get in touch</h2>
          <p className="opacity-60 text-sm">Have a question? Drop me a message below.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          <motion.form 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            onSubmit={handleSubmit} 
            className="md:col-span-3 space-y-4"
          >
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase opacity-50 block ml-1">Name</label>
              <div className="relative">
                <input 
                  name="name"
                  className={cn(
                    "w-full bg-[var(--vscode-tab-inactive)] border-[var(--vscode-border)] border rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all",
                    errors.name && "border-red-500 bg-red-500/5 shadow-[0_1px_0_0_rgba(239,68,68,1)]"
                  )}
                  placeholder="John Doe"
                  onFocus={() => setErrors(prev => ({ ...prev, name: false }))}
                />
                {errors.name && <AlertCircle className="absolute right-3 top-2 text-red-500" size={14} />}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase opacity-50 block ml-1">Email</label>
              <div className="relative">
                <input 
                  name="email"
                  type="email"
                  className={cn(
                    "w-full bg-[var(--vscode-tab-inactive)] border-[var(--vscode-border)] border rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all",
                    errors.email && "border-red-500 bg-red-500/5 shadow-[0_1px_0_0_rgba(239,68,68,1)]"
                  )}
                  placeholder="john@example.com"
                  onFocus={() => setErrors(prev => ({ ...prev, email: false }))}
                />
                {errors.email && <AlertCircle className="absolute right-3 top-2 text-red-500" size={14} />}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase opacity-50 block ml-1">Message</label>
              <div className="relative">
                <textarea 
                  name="message"
                  rows={3}
                  className={cn(
                    "w-full bg-[var(--vscode-tab-inactive)] border-[var(--vscode-border)] border rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none transition-all",
                    errors.message && "border-red-500 bg-red-500/5 shadow-[0_1px_0_0_rgba(239,68,68,1)]"
                  )}
                  placeholder="Tell me about your project..."
                  onFocus={() => setErrors(prev => ({ ...prev, message: false }))}
                />
                {errors.message && <AlertCircle className="absolute right-3 top-2 text-red-500" size={14} />}
              </div>
            </div>

            <motion.button 
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-2 rounded-sm text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : <Send size={14} />}
              Send Message
            </motion.button>

            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-500/10 border border-green-500/50 rounded-sm flex items-center gap-3 text-xs text-green-600 dark:text-green-400 font-mono"
              >
                <CheckCircle2 size={16} />
                <span>Message sent. Sumit will respond shortly.</span>
              </motion.div>
            )}
          </motion.form>

          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
               <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Connect</h3>
               <div className="space-y-3">
                  <motion.a 
                    href="mailto:sumitboy2005@gmail.com" 
                    className="flex items-center gap-3 p-3 bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-lg hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
                  >
                    <div className="p-2 bg-blue-500/10 rounded-full text-blue-500">
                      <Mail size={16} />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] opacity-40 font-bold uppercase tracking-tighter">Email</div>
                      <div className="text-xs font-mono truncate">sumitboy2005@gmail.com</div>
                    </div>
                  </motion.a>

                  <motion.a 
                    href="https://github.com/Sumit-5002/" 
                    target="_blank"
                    className="flex items-center gap-3 p-3 bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-lg hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group"
                  >
                    <div className="p-2 bg-purple-500/10 rounded-full text-purple-500">
                      <Github size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] opacity-40 font-bold uppercase tracking-tighter">GitHub</div>
                      <div className="text-xs font-mono">@Sumit-5002</div>
                    </div>
                  </motion.a>

                  <motion.a 
                    href="https://www.linkedin.com/in/sumit-prasad-bce2005/" 
                    target="_blank"
                    className="flex items-center gap-3 p-3 bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-lg hover:border-blue-600/50 hover:bg-blue-600/5 transition-all group"
                  >
                    <div className="p-2 bg-blue-600/10 rounded-full text-blue-600">
                      <Linkedin size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] opacity-40 font-bold uppercase tracking-tighter">LinkedIn</div>
                      <div className="text-xs font-mono">sumit-prasad-bce2005</div>
                    </div>
                  </motion.a>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
