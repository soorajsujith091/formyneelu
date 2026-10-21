import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, Sparkles, Smile } from 'lucide-react';

export default function LockScreen({ secretCode, onUnlock }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [showHintPanel, setShowHintPanel] = useState(false);
  const [hintReply, setHintReply] = useState('');
  const [kisses, setKisses] = useState([]);

  const handleUnlock = () => {
    if (code.trim().toLowerCase() === secretCode.toLowerCase()) {
      onUnlock();
    } else {
      setError('Hmm, that’s not it! Try again, my babe 💭');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setCode('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleUnlock();
  };

  const triggerKisses = () => {
    const emojis = ['😘', '💋', '💕', '💖', '🥰', '✨'];
    const newKisses = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: (Math.random() - 0.5) * 180,
      y: (Math.random() - 0.5) * 140 - 50
    }));
    setKisses(newKisses);
    setTimeout(() => setKisses([]), 1400);
  };

  const handleUmma = () => {
    setHintReply('😘 Aww! Scroll to the top of our WhatsApp chat and enter my first message date! You should remember it, my babe! 💬💕');
    triggerKisses();
  };

  const handleNothing = () => {
    setHintReply('😜 oh pinee.. i need anything from you!');
  };

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(16px)',
        background: 'rgba(255, 241, 244, 0.78)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        style={{
          background: 'var(--card)',
          border: '1px solid var(--card-border)',
          borderRadius: '28px',
          padding: '36px 26px',
          maxWidth: '420px',
          width: '100%',
          boxShadow: 'var(--polaroid-shadow)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Kiss animations */}
        <AnimatePresence>
          {kisses.map((k) => (
            <motion.span
              key={k.id}
              initial={{ opacity: 1, scale: 0.6, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.6, x: k.x, y: k.y }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                fontSize: '26px',
                pointerEvents: 'none',
                zIndex: 20
              }}
            >
              {k.emoji}
            </motion.span>
          ))}
        </AnimatePresence>

        <motion.div
          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          style={{
            fontSize: '3.4rem',
            marginBottom: '10px',
            display: 'inline-block'
          }}
        >
          🔒
        </motion.div>

        <div style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, rgba(225,29,72,0.12), rgba(244,114,182,0.18))',
          border: '1px solid var(--line)',
          color: 'var(--accent)',
          padding: '4px 16px',
          borderRadius: '999px',
          fontSize: '0.9rem',
          fontWeight: 600,
          fontFamily: "'Outfit', sans-serif",
          marginBottom: '10px'
        }}>
          A Surprise For Neelu
        </div>

        <h2 style={{ fontSize: '2.4rem', margin: '4px 0 6px', lineHeight: 1.2 }}>
          Only For You, My Babe
        </h2>
        <p style={{ color: 'var(--soft)', fontStyle: 'italic', fontSize: '1rem', marginBottom: '18px' }}>
          Enter our special code to unlock your surprise 💕
        </p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Secret code"
          autoFocus
          style={{
            width: '100%',
            padding: '14px 18px',
            borderRadius: '16px',
            border: '1.5px solid var(--line)',
            background: 'rgba(255,255,255,0.85)',
            color: 'var(--ink)',
            fontSize: '1.15rem',
            textAlign: 'center',
            letterSpacing: '0.15em',
            marginBottom: '14px'
          }}
        />

        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleUnlock}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, var(--accent), #db2777)',
            color: '#fff',
            fontSize: '1.08rem',
            fontWeight: 600,
            boxShadow: '0 8px 24px var(--accent-glow)'
          }}
        >
          Unlock For Neelu 💕
        </motion.button>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: 'var(--accent)', fontSize: '0.95rem', marginTop: '12px' }}
          >
            {error}
          </motion.p>
        )}

        {/* Playful Interactive Hint */}
        <div style={{ marginTop: '16px' }}>
          {!showHintPanel ? (
            <button
              onClick={() => setShowHintPanel(true)}
              style={{
                background: 'none',
                color: 'var(--soft)',
                fontSize: '0.95rem',
                textDecoration: 'underline',
                padding: '6px 12px'
              }}
            >
              Need a hint? 💭
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1.5px dashed var(--line)',
                borderRadius: '20px',
                padding: '18px 16px',
                marginTop: '10px'
              }}
            >
              <p style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: '1.6rem',
                fontWeight: 700,
                color: 'var(--accent)',
                marginBottom: '12px'
              }}>
                Paranju theraam... nth therum? 😉
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleUmma}
                  style={{
                    padding: '8px 22px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, #e11d48, #db2777)',
                    color: '#fff',
                    fontWeight: 600,
                    boxShadow: '0 4px 14px var(--accent-glow)'
                  }}
                >
                  Umma 😘
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNothing}
                  style={{
                    padding: '8px 22px',
                    borderRadius: '999px',
                    background: 'transparent',
                    border: '1.5px solid var(--line)',
                    color: 'var(--soft)',
                    fontWeight: 600
                  }}
                >
                  Nothing 😜
                </motion.button>
              </div>

              {hintReply && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: '14px',
                    padding: '12px 14px',
                    background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.08), rgba(244, 114, 182, 0.14))',
                    border: '1px solid rgba(244, 114, 182, 0.3)',
                    borderRadius: '14px',
                    fontSize: '0.98rem',
                    color: 'var(--ink)',
                    lineHeight: 1.55,
                    fontWeight: 500
                  }}
                >
                  {hintReply}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
