import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeartCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState([]);
  const [clicks, setClicks] = useState([]);
  const lastTrailTime = useRef(0);

  useEffect(() => {
    // Only enable custom cursor follower on fine pointer devices (desktops/laptops with mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setMousePos({ x, y });

      // Create spark trail every 55ms
      const now = Date.now();
      if (now - lastTrailTime.current > 55) {
        lastTrailTime.current = now;
        const emojis = ['💕', '💖', '✨', '🌸', '♥'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const newTrail = {
          id: Math.random(),
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          size: 10 + Math.random() * 12,
          emoji: randomEmoji,
          rotate: -20 + Math.random() * 40
        };

        setTrails((prev) => [...prev.slice(-14), newTrail]);
        setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
        }, 800);
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      const { clientX: x, clientY: y } = e;
      const burstEmojis = ['💖', '💕', '✨', '🥰', '🌹'];
      const newBurst = Array.from({ length: 6 }).map((_, i) => ({
        id: Math.random() + i,
        x,
        y,
        dx: (Math.random() - 0.5) * 60,
        dy: (Math.random() - 0.5) * 60 - 20,
        emoji: burstEmojis[i % burstEmojis.length]
      }));
      setClicks((prev) => [...prev, ...newBurst]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => !newBurst.includes(c)));
      }, 700);
    };

    const handleMouseUp = () => setIsClicking(false);

    // Detect clickable hover
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.onclick ||
        target.classList?.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999999, overflow: 'hidden' }}>
      {/* Click Heart Burst */}
      {clicks.map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 1, scale: 0.5, x: c.x, y: c.y }}
          animate={{
            opacity: 0,
            scale: 1.4,
            x: c.x + c.dx,
            y: c.y + c.dy
          }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            fontSize: '18px',
            userSelect: 'none'
          }}
        >
          {c.emoji}
        </motion.div>
      ))}

      {/* Floating Sparkle Trail */}
      {trails.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0.85, scale: 0.8, x: t.x, y: t.y, rotate: 0 }}
          animate={{
            opacity: 0,
            scale: 0.2,
            y: t.y - 25,
            rotate: t.rotate
          }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            fontSize: `${t.size}px`,
            userSelect: 'none',
            color: 'var(--accent)'
          }}
        >
          {t.emoji}
        </motion.div>
      ))}

      {/* Main Animated Heart Cursor */}
      <motion.div
        animate={{
          x: mousePos.x - 14,
          y: mousePos.y - 14,
          scale: isClicking ? 0.85 : isHovering ? 1.45 : 1,
          rotate: isHovering ? [0, -10, 10, 0] : 0
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 400,
          mass: 0.2
        }}
        style={{
          position: 'absolute',
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          filter: isHovering
            ? 'drop-shadow(0 0 10px rgba(225, 29, 72, 0.8))'
            : 'drop-shadow(0 2px 6px rgba(225, 29, 72, 0.45))'
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="#e11d48"
          stroke="#ffffff"
          strokeWidth="1.5"
          style={{ display: 'block' }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>
    </div>
  );
}
