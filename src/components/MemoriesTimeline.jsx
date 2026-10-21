import React from 'react';
import { motion } from 'framer-motion';

export default function MemoriesTimeline({ memories }) {
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
        Our Journey
      </div>

      <h2 style={{ fontSize: 'clamp(2.2rem, 8vw, 3.2rem)', marginBottom: '32px' }}>
        Our Little Moments
      </h2>

      <div style={{
        width: '100%',
        borderLeft: '2px solid var(--line)',
        paddingLeft: '24px',
        textAlign: 'left',
        marginLeft: '12px'
      }}>
        {memories.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ scale: 1.02, x: 4 }}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--card-border)',
              borderRadius: '18px',
              padding: '18px 22px',
              marginBottom: '22px',
              position: 'relative',
              boxShadow: 'var(--polaroid-shadow)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div style={{
              position: 'absolute',
              left: '-36px',
              top: '16px',
              color: 'var(--accent)',
              background: 'var(--bg1)',
              borderRadius: '50%',
              fontSize: '1.2rem',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 10px var(--accent-glow)'
            }}>
              ♥
            </div>

            <b style={{
              color: 'var(--accent)',
              fontSize: '1.12rem',
              display: 'block',
              marginBottom: '6px',
              fontFamily: "'Outfit', sans-serif"
            }}>
              {m.when}
            </b>
            <div style={{ fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.6 }}>
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
