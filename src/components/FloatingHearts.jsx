import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 26,
      duration: 9 + Math.random() * 12,
      delay: Math.random() * 8,
      rotation: -25 + Math.random() * 50
    }));
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          style={{
            position: 'absolute',
            bottom: -50,
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            color: 'var(--accent)',
            opacity: 0.3
          }}
          animate={{
            y: ['0vh', '-120vh'],
            rotate: [0, h.rotation],
            opacity: [0, 0.4, 0.4, 0]
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'linear'
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
