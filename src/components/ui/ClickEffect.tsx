import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export function ClickEffect() {
  const [ripples, setRipples] = React.useState<ClickRipple[]>([]);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't trigger if it's a right click
      if (e.button !== 0) return;

      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Clean up the ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    // Use capturing phase to get the event early
    window.addEventListener('mousedown', handleClick, true);
    return () => window.removeEventListener('mousedown', handleClick, true);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.8, borderWidth: '2px' }}
            animate={{ scale: 3.5, opacity: 0, borderWidth: '0px' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute rounded-full border-blue-400 bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            style={{
              left: ripple.x - 15, // offset by half width/height
              top: ripple.y - 15,
              width: 30,
              height: 30,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
