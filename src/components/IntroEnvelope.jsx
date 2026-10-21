import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function IntroEnvelope({ onOpen }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '50px 20px'
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, rgba(225,29,72,0.12), rgba(244,114,182,0.18))',
          border: '1px solid var(--line)',
          color: 'var(--accent)',
          padding: '6px 20px',
          borderRadius: '999px',
          fontSize: '0.95rem',
          fontWeight: 600,
          fontFamily: "'Outfit', sans-serif",
          marginBottom: '16px'
        }}
      >
        ✨ Made Just For You ✨
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: 'clamp(2.8rem, 10vw, 4.4rem)',
          lineHeight: 1.15,
          marginBottom: '8px'
        }}
      >
        For Neelu, My Babe 💕
      </motion.h1>

      <p style={{
        color: 'var(--soft)',
        fontStyle: 'italic',
        fontSize: '1.1rem',
        marginBottom: '26px'
      }}>
        Made with all my heart · 21 Oct 2026
      </p>

      {/* Interactive Envelope with Floating & Heartbeat Animation */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
        animate={{
          scale: [1, 1.08, 1],
          y: [0, -8, 0]
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        onClick={onOpen}
        style={{
          fontSize: '6rem',
          cursor: 'pointer',
          margin: '10px 0 24px',
          filter: 'drop-shadow(0 12px 24px var(--accent-glow))',
          userSelect: 'none'
        }}
      >
        💌
      </motion.div>

      <p style={{
        color: 'var(--soft)',
        fontSize: '1.05rem',
        marginBottom: '28px',
        maxWidth: '380px'
      }}>
        Someone loves you very, very much… tap the envelope to open!
      </p>

      <motion.button
        whileHover={{ scale: 1.06, y: -3 }}
        whileTap={{ scale: 0.96 }}
        onClick={onOpen}
        style={{
          padding: '16px 40px',
          borderRadius: '999px',
          background: 'linear-gradient(135deg, var(--accent), #db2777)',
          color: '#fff',
          fontSize: '1.15rem',
          fontWeight: 600,
          boxShadow: '0 10px 30px var(--accent-glow)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <span>Open My Heart</span>
        <Heart size={20} fill="#fff" />
      </motion.button>
    </motion.section>
  );
}
