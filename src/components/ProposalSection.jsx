import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { balloons } from 'balloons-js';
import { Heart, Sparkles } from 'lucide-react';

export default function ProposalSection({
  badge = "A Wish From My Heart 💭",
  question,
  yesBtnText = "I'll never forget you, promise! ♥",
  yesText,
  noTexts
}) {
  const [noIndex, setNoIndex] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [accepted, setAccepted] = useState(false);

  const handleNoClick = () => {
    setNoIndex((prev) => Math.min(prev + 1, noTexts.length - 1));
    setYesScale((prev) => Math.min(prev + 0.22, 2.4));
  };

  const handleYesClick = () => {
    setAccepted(true);

    try {
      balloons();
    } catch (e) {}

    // Multi-stage grand confetti celebration
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#e11d48', '#ec4899', '#f43f5e', '#fb7185', '#ffd1dc'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Extra center heart explosion
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      style={{
        padding: '60px 0 90px',
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
        marginBottom: '16px'
      }}>
        {badge}
      </div>

      <h2 style={{
        fontSize: 'clamp(2.3rem, 8.5vw, 3.4rem)',
        marginBottom: '28px',
        lineHeight: 1.25,
        maxWidth: '560px'
      }}>
        {question}
      </h2>

      {!accepted ? (
        <div style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
          minHeight: '80px'
        }}>
          <motion.button
            animate={{ scale: yesScale }}
            whileHover={{ y: -3, boxShadow: '0 14px 34px var(--accent-glow)' }}
            whileTap={{ scale: yesScale * 0.95 }}
            onClick={handleYesClick}
            style={{
              padding: '16px 36px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, var(--accent), #db2777)',
              color: '#fff',
              fontSize: '1.15rem',
              fontWeight: 700,
              boxShadow: '0 10px 28px var(--accent-glow)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>{yesBtnText}</span>
            <Sparkles size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNoClick}
            style={{
              padding: '14px 28px',
              borderRadius: '999px',
              background: 'transparent',
              border: '1.5px solid var(--line)',
              color: 'var(--soft)',
              fontSize: '1.05rem',
              fontWeight: 600
            }}
          >
            {noTexts[noIndex]}
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{
            marginTop: '20px',
            background: 'var(--card)',
            border: '2px solid var(--accent)',
            borderRadius: '26px',
            padding: '28px 32px',
            maxWidth: '560px',
            boxShadow: '0 20px 50px var(--accent-glow)',
            backdropFilter: 'blur(12px)'
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🫂💖✨</div>
          <p style={{
            fontSize: '1.35rem',
            fontWeight: 600,
            color: 'var(--accent)',
            lineHeight: 1.6
          }}>
            {yesText}
          </p>
        </motion.div>
      )}
    </motion.section>
  );
}
