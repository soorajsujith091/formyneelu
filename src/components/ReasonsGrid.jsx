import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ReasonsGrid({ reasons }) {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (index) => {
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      style={{
        padding: '50px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%'
      }}
    >
      <div style={{
        display: 'inline-block',
        background: 'linear-gradient(135deg, rgba(225,29,72,0.12), rgba(244,114,182,0.18))',
        border: '1px solid var(--line)',
        color: 'var(--accent)',
        padding: '5px 18px',
        borderRadius: '999px',
        fontSize: '0.9rem',
        fontWeight: 600,
        fontFamily: "'Outfit', sans-serif",
        marginBottom: '12px'
      }}>
        Endless Love
      </div>

      <h2 style={{ fontSize: 'clamp(2.2rem, 8vw, 3.2rem)', marginBottom: '8px' }}>
        Why I Love You, Neelu
      </h2>

      <p style={{
        color: 'var(--soft)',
        fontStyle: 'italic',
        fontSize: '1.05rem',
        marginBottom: '28px'
      }}>
        Tap each heart card to flip and reveal a secret reason 💕
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        width: '100%'
      }}>
        {reasons.map((reason, index) => {
          const isFlipped = !!flipped[index];

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggleFlip(index)}
              style={{
                perspective: '1000px',
                cursor: 'pointer',
                minHeight: '120px'
              }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  borderRadius: '20px'
                }}
              >
                {/* Front Side */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  background: 'var(--card)',
                  border: '1.5px solid var(--card-border)',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  boxShadow: 'var(--polaroid-shadow)',
                  backdropFilter: 'blur(8px)'
                }}>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ fontSize: '2.4rem', color: 'var(--accent)' }}
                  >
                    ♥
                  </motion.span>
                  <span style={{
                    fontSize: '0.8rem',
                    color: 'var(--soft)',
                    marginTop: '6px',
                    fontFamily: "'Outfit', sans-serif"
                  }}>
                    Tap to open
                  </span>
                </div>

                {/* Back Side */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(145deg, #fff, #ffe4ec)',
                  border: '1.5px solid var(--accent)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px 12px',
                  textAlign: 'center',
                  boxShadow: '0 12px 28px var(--accent-glow)',
                  fontSize: '0.98rem',
                  fontWeight: 500,
                  color: '#4a1525',
                  lineHeight: 1.45
                }}>
                  {reason}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
