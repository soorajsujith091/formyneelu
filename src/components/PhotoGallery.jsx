import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const NEELU_IMG = '/images/WhatsApp Image 2026-10-21 at 4.06.41 PM.jpeg';
const TOGETHER_IMG = '/images/WhatsApp Image 2026-10-21 at 4.06.40 PM.jpeg';

export default function PhotoGallery() {
  const [activePhoto, setActivePhoto] = useState(null);

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
        Our Sweet Moments
      </div>

      <h2 style={{ fontSize: 'clamp(2.2rem, 8vw, 3.2rem)', marginBottom: '8px' }}>
        My Favorite Views In The World
      </h2>

      <p style={{
        color: 'var(--soft)',
        fontStyle: 'italic',
        fontSize: '1.05rem',
        marginBottom: '32px'
      }}>
        My babe & the love of my life 💖
      </p>

      <div style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '28px',
        perspective: '1200px'
      }}>
        {/* Single Photo: Neelu */}
        <motion.div
          whileHover={{
            y: -10,
            rotateZ: -2,
            boxShadow: '0 25px 50px rgba(136, 19, 55, 0.25)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            background: 'var(--card)',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            padding: '16px 16px 24px',
            boxShadow: 'var(--polaroid-shadow)',
            backdropFilter: 'blur(10px)',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-14px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '1.6rem',
            zIndex: 2,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }}>
            📍
          </div>

          <div
            onClick={() => setActivePhoto({ src: NEELU_IMG, title: 'My Babe Neelu 💕' })}
            style={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: '18px',
              overflow: 'hidden',
              background: '#fce7f3',
              cursor: 'zoom-in'
            }}
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={NEELU_IMG}
              alt="My Babe Neelu"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '1.9rem', color: 'var(--accent)', marginBottom: '4px' }}>
              My Babe Neelu 💕
            </h3>
            <p style={{ color: 'var(--soft)', fontStyle: 'italic', fontSize: '0.98rem', lineHeight: 1.5 }}>
              "The smile that instantly brightens up my whole world and makes everything better."
            </p>
          </div>
        </motion.div>

        {/* Together Photo */}
        <motion.div
          whileHover={{
            y: -10,
            rotateZ: 2,
            boxShadow: '0 25px 50px rgba(136, 19, 55, 0.25)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            background: 'var(--card)',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            padding: '16px 16px 24px',
            boxShadow: 'var(--polaroid-shadow)',
            backdropFilter: 'blur(10px)',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-14px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '1.6rem',
            zIndex: 2,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }}>
            📍
          </div>

          <div
            onClick={() => setActivePhoto({ src: TOGETHER_IMG, title: 'You & Me Together 💑' })}
            style={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: '18px',
              overflow: 'hidden',
              background: '#fce7f3',
              cursor: 'zoom-in'
            }}
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={TOGETHER_IMG}
              alt="You & Me Together"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '1.9rem', color: 'var(--accent)', marginBottom: '4px' }}>
              You & Me Together 💑
            </h3>
            <p style={{ color: 'var(--soft)', fontStyle: 'italic', fontSize: '0.98rem', lineHeight: 1.5 }}>
              "Every single second in your arms is my favorite place in the entire universe."
            </p>
          </div>
        </motion.div>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--soft)', opacity: 0.85, marginTop: '16px' }}>
        Tip: Click any photo to zoom in 💕
      </p>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(0,0,0,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              cursor: 'zoom-out'
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '520px',
                width: '100%',
                background: '#fff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
              }}
            >
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '70vh', objectFit: 'contain' }}
              />
              <div style={{
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fff'
              }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--accent)', margin: 0 }}>
                  {activePhoto.title}
                </h3>
                <button
                  onClick={() => setActivePhoto(null)}
                  style={{
                    background: 'rgba(225,29,72,0.1)',
                    borderRadius: '50%',
                    padding: '8px',
                    color: 'var(--accent)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
