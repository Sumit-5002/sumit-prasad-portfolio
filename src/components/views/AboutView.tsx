import * as React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, FileText, Award, Cloud, Zap, Mail, Target, Code2, GitBranch } from 'lucide-react';

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 22 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring' as const, stiffness: 320, damping: 18, delay: i * 0.08 },
  }),
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { icon: Award, text: 'Health Hackathon Top 60/600+', color: 'text-yellow-500' },
  { icon: Cloud, text: 'NPTEL Cloud Top 5%', color: 'text-blue-500' },
  { icon: Zap, text: '100+ GCP Badges', color: 'text-orange-500' },
];

const targeting = [
  { icon: Target, label: 'Google SWE', color: 'text-blue-400' },
  { icon: Code2, label: 'Open Source', color: 'text-green-400' },
  { icon: GitBranch, label: 'Cloud Native', color: 'text-purple-400' },
];

// Floating decorative glyphs
const GLYPHS = ['</>', '{}', '//', '[ ]', '&&'];
const GLYPH_POSITIONS = [
  { top: '8%', left: '3%', delay: 0, duration: 3.2 },
  { top: '18%', right: '5%', delay: 0.7, duration: 2.8 },
  { top: '42%', left: '1%', delay: 1.4, duration: 3.6 },
  { top: '55%', right: '2%', delay: 0.3, duration: 2.5 },
  { top: '72%', left: '4%', delay: 1.1, duration: 3.0 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.3em]">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

function FloatingGlyph({ glyph, style, duration, delay }: { glyph: string; style: React.CSSProperties; duration: number; delay: number }) {
  return (
    <motion.span
      className="absolute font-mono text-xs select-none pointer-events-none text-blue-400/10 dark:text-blue-300/8"
      style={style}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {glyph}
    </motion.span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AboutView({ onOpenFile }: { onOpenFile?: (file: { id: string; name: string }) => void }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const avatarScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.88]);
  const avatarOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.7]);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-3xl mx-auto py-14 px-6 font-sans text-[var(--vscode-text)] relative">

        {/* ── Floating decorative glyphs ── */}
        {GLYPHS.map((g, i) => (
          <FloatingGlyph
            key={i}
            glyph={g}
            style={GLYPH_POSITIONS[i] as React.CSSProperties}
            duration={GLYPH_POSITIONS[i].duration}
            delay={GLYPH_POSITIONS[i].delay}
          />
        ))}

        {/* ── Hero ── */}
        <header className="flex flex-col md:flex-row items-center gap-8 mb-14">
          <motion.div
            style={{ scale: avatarScale, opacity: avatarOpacity }}
            className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue-500/30 shrink-0 shadow-xl ring-4 ring-black/5 dark:ring-white/5"
          >
            <motion.img
              src="/image.png"
              alt="Sumit Prasad"
              width={112}
              height={112}
              loading="lazy"
              fetchPriority="high"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </motion.div>

          <div className="text-center md:text-left flex-1 space-y-2">
            {/* Name — word-split stagger */}
            <h1 className="text-4xl font-bold tracking-tight flex flex-wrap items-center justify-center md:justify-start gap-x-2">
              <WordReveal text="Sumit Prasad" />
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.85 }}
                className="inline-block w-[3px] h-[36px] bg-blue-500 align-middle ml-0.5 rounded-sm"
              />
            </h1>

            <motion.p
              className="text-lg opacity-80 dark:opacity-75"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.5, ease: 'easeOut' }}
            >
              B.Tech CSE @ VIT Bhopal · CGPA 8.83
            </motion.p>

            <motion.p
              className="text-sm font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
            >
              Core Member @ FYI Club · Creator of SwiftCheck
            </motion.p>

            <motion.p
              className="text-base font-medium opacity-70 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              "I build things that matter. Targeting Google SWE."
            </motion.p>
          </div>
        </header>

        {/* ── Stat badges ── */}
        <section className="flex flex-wrap gap-3 mb-12" aria-label="Achievements">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={badgeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 bg-[var(--vscode-sidebar)] px-4 py-2 rounded-full border border-[var(--vscode-border)] text-sm cursor-default"
            >
              <stat.icon size={16} className={stat.color} />
              <span className="font-medium">{stat.text}</span>
            </motion.div>
          ))}
        </section>

        {/* ── About Me ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 space-y-5"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            About Me
          </h2>
          <motion.p
            className="text-[15px] leading-7 opacity-85"
            variants={sectionVariants}
          >
            I'm a passionate developer and relentless builder focused on distributed systems and
            high-scale applications. As an open source contributor and project maintainer for{' '}
            <span className="text-blue-400 font-semibold">ACWoC '26</span>, I love collaborating
            on impactful software architectures.
          </motion.p>
          <motion.p
            className="text-[15px] leading-7 opacity-85"
            variants={sectionVariants}
          >
            Currently diving deep into Cloud Native ecosystems while aiming for a SWE career at
            Google. I believe in code that is as clean as a well-organized VS Code instance.
          </motion.p>
        </motion.section>

        {/* ── "What I'm Targeting" sticky-note card ── */}
        <motion.section
          initial={{ opacity: 0, rotate: -2, y: 30 }}
          whileInView={{ opacity: 1, rotate: 0, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.05 }}
          whileHover={{ rotate: 0.5, scale: 1.01, y: -3 }}
          className="mb-12 bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] border-l-4 border-l-blue-500 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-5">
            What I'm Targeting
          </h3>
          <div className="flex flex-wrap gap-4">
            {targeting.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={badgeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-2.5 bg-[var(--vscode-bg)] border border-[var(--vscode-border)] px-4 py-2.5 rounded-lg"
              >
                <item.icon size={15} className={item.color} />
                <span className="text-sm font-semibold">{item.label}</span>
              </motion.div>
            ))}
          </div>

        </motion.section>

        {/* ── Footer / links ── */}
        <motion.footer
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="flex items-center gap-4 border-t border-[var(--vscode-border)] pt-8"
        >
          <motion.button
            aria-label="View Resume"
            onClick={() => onOpenFile?.({ id: 'resume', name: 'resume.tsx' })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 bg-[#0e639c] hover:bg-[#1177bb] text-white px-6 py-2.5 rounded-sm text-sm font-semibold transition-colors"
          >
            <FileText size={16} /> Resume
          </motion.button>

          <div className="flex gap-2 ml-1">
            {[
              { label: 'GitHub Profile', icon: Github, href: 'https://github.com/Sumit-5002/' },
              { label: 'LinkedIn Profile', icon: Linkedin, href: 'https://www.linkedin.com/in/sumit-prasad-bce2005/' },
              { label: 'Email Me', icon: Mail, href: 'mailto:sumitboy2005@gmail.com' },
            ].map(({ label, icon: Icon, href }) => (
              <motion.button
                key={label}
                aria-label={label}
                onClick={() => {
                  if (href.startsWith('mailto')) window.location.href = href;
                  else window.open(href, '_blank');
                }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 hover:bg-[var(--vscode-sidebar)] rounded-full border border-[var(--vscode-border)] transition-colors grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
              >
                <Icon size={20} />
              </motion.button>
            ))}
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
