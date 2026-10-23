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
        minHeight: '100vh',
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'max(50px, env(safe-area-inset-top, 50px)) 20px max(50px, env(safe-area-inset-bottom, 50px))',
        overflow: 'hidden',
        margin: 0
      }}
    >
      {/* Background Couple Photo - Sharp & 100% Visible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/images/WhatsApp Image 2026-10-23 at 11.05.04 PM (1).jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          opacity: 1,
          zIndex: 0
        }}
      />

      {/* Reduced Subtle Dark Vignette for Text Contrast (Leaves Faces Unobstructed) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.08) 32%, rgba(0, 0, 0, 0.12) 65%, rgba(0, 0, 0, 0.6) 100%)',
          zIndex: 0
        }}
      />

      {/* Foreground Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto'
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.92)',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            color: 'var(--accent)',
            padding: '6px 22px',
            borderRadius: '999px',
            fontSize: '0.95rem',
            fontWeight: 700,
            fontFamily: "'Outfit', sans-serif",
            marginBottom: '16px',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)'
          }}
        >
          ✨ Made Just For You ✨
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 'clamp(3rem, 11vw, 4.8rem)',
            lineHeight: 1.15,
            marginBottom: '10px',
            color: '#ffffff',
            textShadow: '0 3px 20px rgba(0, 0, 0, 0.9), 0 0 25px rgba(225, 29, 72, 0.75)'
          }}
        >
          For Neelu, My Babe 💕
        </motion.h1>

        <p style={{
          color: '#ffffff',
          fontWeight: 500,
          fontStyle: 'italic',
          fontSize: '1.08rem',
          marginBottom: '26px',
          background: 'rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          padding: '5px 18px',
          borderRadius: '999px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(8px)',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.85)'
        }}>
          Made with all my heart · 21 Oct 2026
        </p>

        {/* Interactive Envelope with Floating & Heartbeat Animation */}
        <motion.div
          whileHover={{ scale: 1.12, rotate: [0, -3, 3, 0] }}
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
            fontSize: '6.2rem',
            cursor: 'pointer',
            margin: '8px 0 24px',
            filter: 'drop-shadow(0 16px 30px rgba(0, 0, 0, 0.65))',
            userSelect: 'none'
          }}
        >
          💌
        </motion.div>

        <p style={{
          color: '#ffffff',
          fontSize: '1.05rem',
          fontWeight: 500,
          marginBottom: '28px',
          maxWidth: '380px',
          background: 'rgba(0, 0, 0, 0.42)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          padding: '10px 20px',
          borderRadius: '18px',
          boxShadow: '0 4px 18px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(8px)',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)'
        }}>
          Someone loves you very, very much… tap the envelope to open!
        </p>

        <motion.button
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.96 }}
          onClick={onOpen}
          style={{
            padding: '16px 42px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, var(--accent), #db2777)',
            color: '#fff',
            fontSize: '1.18rem',
            fontWeight: 700,
            boxShadow: '0 10px 30px rgba(225, 29, 72, 0.65), 0 4px 15px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span>Open My Heart</span>
          <Heart size={20} fill="#fff" />
        </motion.button>
      </div>
    </motion.section>
  );
}
