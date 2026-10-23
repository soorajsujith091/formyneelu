import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoveLetter({ letterMl, letterEn }) {
  const [lang, setLang] = useState('ml'); // default Malayalam
  const currentText = lang === 'ml' ? letterMl : letterEn;
  const [displayedText, setDisplayedText] = useState('');
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      setDisplayedText(currentText.slice(0, i));
      i++;
      if (i > currentText.length) {
        clearInterval(interval);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [currentText]);

  // Video Autoplay handling
  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Browser prevented autoplay with audio, fallback to muted autoplay
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch((e) => console.log('Video playback deferred', e));
          }
        });
      }
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
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
        textAlign: 'center'
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
        Straight From The Heart
      </div>

      <h2 style={{ fontSize: 'clamp(2.2rem, 8vw, 3.2rem)', marginBottom: '24px' }}>
        A Love Letter For Neelu
      </h2>

      {/* Autoplay Video Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          width: '100%',
          maxWidth: '640px',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: 'var(--polaroid-shadow)',
          border: '1px solid var(--card-border)',
          background: '#000',
          marginBottom: '30px',
          position: 'relative'
        }}
      >
        <video
          ref={videoRef}
          src="/videos/copy_2E6F22D4-4132-42EB-A19B-29F7C160F204.mp4"
          autoPlay
          loop
          playsInline
          controls
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '520px',
            display: 'block',
            objectFit: 'contain',
            background: '#000'
          }}
        />

        {isMuted && (
          <button
            onClick={toggleMute}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(0, 0, 0, 0.65)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)',
              zIndex: 10
            }}
          >
            <span>🔊</span>
            <span>Tap for sound</span>
          </button>
        )}
      </motion.div>

      {/* Love Letter Card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        style={{
          background: 'var(--card)',
          border: '1px solid var(--card-border)',
          borderRadius: '26px',
          padding: '34px 28px 36px',
          textAlign: 'left',
          width: '100%',
          maxWidth: '640px',
          whiteSpace: 'pre-wrap',
          fontSize: lang === 'ml' ? '1.18rem' : '1.12rem',
          lineHeight: lang === 'ml' ? '2.1' : '1.85',
          fontFamily: lang === 'ml' ? "'Noto Serif Malayalam', 'Lora', Georgia, serif" : "'Lora', Georgia, serif",
          backdropFilter: 'blur(12px)',
          boxShadow: 'var(--polaroid-shadow)',
          position: 'relative',
          minHeight: '280px'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '-18px',
          right: '24px',
          fontSize: '2rem',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))'
        }}>
          💌
        </div>

        {/* Translation Switcher Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--line)'
        }}>
          <span style={{
            fontSize: '0.85rem',
            color: 'var(--soft)',
            fontWeight: 600,
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: '0.04em'
          }}>
            {lang === 'ml' ? '🌸 മലയാളം' : '✨ ENGLISH TRANSLATION'}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLang(lang === 'ml' ? 'en' : 'ml')}
            style={{
              background: 'rgba(225, 29, 72, 0.08)',
              border: '1px solid var(--line)',
              color: 'var(--accent)',
              padding: '5px 14px',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 600,
              fontFamily: "'Outfit', sans-serif",
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: 'none'
            }}
          >
            <span>⇄</span>
            <span>{lang === 'ml' ? 'Translate to English' : 'മലയാളത്തിൽ വായിക്കുക'}</span>
          </motion.button>
        </div>

        {displayedText}

        {displayedText.length < currentText.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{ display: 'inline-block', marginLeft: '4px', color: 'var(--accent)', fontWeight: 'bold' }}
          >
            |
          </motion.span>
        )}
      </motion.div>
    </motion.section>
  );
}
