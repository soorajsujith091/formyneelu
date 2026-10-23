import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize2, X, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

const MEDIA_ITEMS = [
  // Photos
  { type: 'image', src: '/images/WhatsApp Image 2026-10-21 at 4.06.41 PM.jpeg', title: 'My Babe Neelu 💕', caption: 'The sweetest smile that brightens my whole day' },
  { type: 'image', src: '/images/WhatsApp Image 2026-10-21 at 4.06.40 PM.jpeg', title: 'You & Me Together 💑', caption: 'Every second with you is my favorite memory' },
  { type: 'image', src: '/images/WhatsApp Image 2026-10-21 at 4.06.42 PM.jpeg', title: 'Our Sweetest Smile 🥰', caption: 'Laughter and happiness in your eyes' },
  { type: 'image', src: '/images/WhatsApp Image 2026-10-21 at 4.06.42 PM (1).jpeg', title: 'Cherished Moment ✨', caption: 'Moments that stay in the heart forever' },
  { type: 'image', src: '/images/WhatsApp Image 2026-10-21 at 4.06.43 PM.jpeg', title: 'Forever by Your Side 💖', caption: 'Always and forever yours, my babe' },

  // Videos
  { type: 'video', src: '/videos/copy_2E6F22D4-4132-42EB-A19B-29F7C160F204.mp4', title: 'A Love Story 🎬', caption: 'Special video memory with Neelu' },
  { type: 'video', src: '/videos/copy_02102332-4EE6-4EEA-9CA0-41EC23EE9A66.mp4', title: 'A Sweet Memory 💕', caption: 'Special clips of pure happiness' },
  { type: 'video', src: '/videos/copy_0671F0E6-A214-4B6A-B01E-2DA5BBB7705E.mp4', title: 'Little Wonders ✨', caption: 'Little seconds of love caught on camera' },
  { type: 'video', src: '/videos/copy_30DDDF93-9241-433D-8AD8-0F8F0883401D.mp4', title: 'Laughs & Hugs 😊', caption: 'Making ordinary moments feel magic' },
  { type: 'video', src: '/videos/copy_32A694B9-9DF8-4BAD-B120-006AB1717E0A.mp4', title: 'Precious Times ⏳', caption: 'Time stands still whenever I am with you' },
  { type: 'video', src: '/videos/copy_497697F5-C6CA-44DE-B57A-C634E10C1FFA.mp4', title: 'Heartfelt Gaze 💕', caption: 'The way you look at me melts my heart' },
  { type: 'video', src: '/videos/copy_5A11FAC9-9328-4024-A684-C219FC805E60.mp4', title: 'Together Forever 💑', caption: 'Our bond that words could never hold' },
  { type: 'video', src: '/videos/copy_621B2700-4A85-4F08-9C97-BA9600B5717E.mp4', title: 'Pure Joy 🥰', caption: 'Endless laughter and happiness' },
  { type: 'video', src: '/videos/copy_869B542B-DC66-42BD-84F0-11B195F3D9EC.mp4', title: 'Unforgettable Day 🌹', caption: 'Memories etched forever in my soul' },
  { type: 'video', src: '/videos/copy_8EF66814-727A-4888-A90A-8F9F10986E27.mp4', title: 'Sweet Little Things 💭', caption: 'All the reasons why you mean the world' },
  { type: 'video', src: '/videos/copy_CE7E9D45-8C68-4E94-91B8-D4D8C3EF051D.mp4', title: 'My Favorite Human 💖', caption: 'Just being with you feels like home' },
  { type: 'video', src: '/videos/copy_D35D4FEA-45E5-47C0-83AD-E83EFB094BEF.mp4', title: 'Forever Love 💍', caption: 'Promise to cherish you in every lifetime' }
];

export default function MediaCarousel() {
  const [filter, setFilter] = useState('all'); // 'all' | 'image' | 'video'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [lightboxItem, setLightboxItem] = useState(null);

  const videoRef = useRef(null);
  const thumbnailsRef = useRef(null);

  const filteredItems = MEDIA_ITEMS.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const currentItem = filteredItems[currentIndex] || filteredItems[0];

  // Pause previous video when slide changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay with sound restricted, fallback to muted
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().catch(() => {});
            }
          });
      }
    }

    // Scroll active thumbnail into view
    if (thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.children[currentIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentIndex, filter]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = filteredItems.length - 1;
      if (next >= filteredItems.length) next = 0;
      return next;
    });
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
    })
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
      {/* Top Badge */}
      <div
        style={{
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
        }}
      >
        Our Gallery of Memories 🎞️
      </div>

      <h2
        style={{
          fontSize: 'clamp(2.2rem, 8vw, 3.2rem)',
          marginBottom: '8px',
          fontFamily: "'Dancing Script', cursive, Georgia, serif",
          color: 'var(--accent)'
        }}
      >
        Moments Captured With You 💕
      </h2>

      <p
        style={{
          color: 'var(--soft)',
          fontStyle: 'italic',
          fontSize: '1.05rem',
          marginBottom: '26px'
        }}
      >
        Swipe through all our favorite photos & video clips together
      </p>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.75)',
          padding: '4px',
          borderRadius: '999px',
          border: '1px solid var(--line)',
          marginBottom: '24px',
          backdropFilter: 'blur(8px)',
          fontFamily: "'Outfit', sans-serif"
        }}
      >
        {[
          { key: 'all', label: `All Memories (${MEDIA_ITEMS.length})` },
          { key: 'image', label: `Photos (${MEDIA_ITEMS.filter((m) => m.type === 'image').length})` },
          { key: 'video', label: `Videos (${MEDIA_ITEMS.filter((m) => m.type === 'video').length})` }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: '6px 16px',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: filter === tab.key ? 'linear-gradient(135deg, var(--accent), #db2777)' : 'transparent',
              color: filter === tab.key ? '#fff' : 'var(--soft)',
              boxShadow: filter === tab.key ? '0 4px 12px var(--accent-glow)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Carousel Card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '640px',
          background: 'var(--card)',
          border: '1px solid var(--card-border)',
          borderRadius: '26px',
          boxShadow: 'var(--polaroid-shadow)',
          backdropFilter: 'blur(12px)',
          padding: '16px',
          overflow: 'hidden'
        }}
      >
        {/* Navigation Indicator Badge */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            backdropFilter: 'blur(6px)',
            fontFamily: "'Outfit', sans-serif"
          }}
        >
          {currentIndex + 1} / {filteredItems.length}
        </div>

        {/* Media Frame with Swipe gestures */}
        <div
          style={{
            width: '100%',
            height: '420px',
            borderRadius: '20px',
            overflow: 'hidden',
            background: '#0a0a0a',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex + filter}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (offset.x > 80 || velocity.x > 400) {
                  paginate(-1); // swipe right -> previous
                } else if (offset.x < -80 || velocity.x < -400) {
                  paginate(1); // swipe left -> next
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                cursor: 'grab'
              }}
            >
              {currentItem.type === 'image' ? (
                <div
                  style={{ width: '100%', height: '100%', position: 'relative', cursor: 'zoom-in' }}
                  onClick={() => setLightboxItem(currentItem)}
                >
                  <img
                    src={currentItem.src}
                    alt={currentItem.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                  {/* Tap to expand hint */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(0,0,0,0.5)',
                      color: '#fff',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Maximize2 size={12} />
                    <span>Zoom</span>
                  </div>
                </div>
              ) : (
                <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000' }}>
                  <video
                    ref={videoRef}
                    src={currentItem.src}
                    playsInline
                    loop
                    controls
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                  {/* Quick Mute Overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(0, 0, 0, 0.65)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(4px)',
                      zIndex: 10
                    }}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav Arrow: Left */}
          <button
            onClick={() => paginate(-1)}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.85)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              color: 'var(--accent)',
              transition: 'transform 0.2s'
            }}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Nav Arrow: Right */}
          <button
            onClick={() => paginate(1)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.85)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              color: 'var(--accent)',
              transition: 'transform 0.2s'
            }}
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Media Details */}
        <div style={{ padding: '16px 12px 10px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
            {currentItem.type === 'video' ? (
              <VideoIcon size={18} color="var(--accent)" />
            ) : (
              <ImageIcon size={18} color="var(--accent)" />
            )}
            <h3 style={{ fontSize: '1.7rem', color: 'var(--accent)', margin: 0 }}>
              {currentItem.title}
            </h3>
          </div>
          <p style={{ color: 'var(--soft)', fontStyle: 'italic', fontSize: '0.96rem', margin: 0 }}>
            "{currentItem.caption}"
          </p>
        </div>

        {/* Thumbnail Navigation Strip */}
        <div
          ref={thumbnailsRef}
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            padding: '12px 6px 4px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {filteredItems.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                style={{
                  minWidth: '60px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isActive ? '2.5px solid var(--accent)' : '1px solid var(--line)',
                  transform: isActive ? 'scale(1.05)' : 'scale(0.95)',
                  boxShadow: isActive ? '0 4px 12px var(--accent-glow)' : 'none',
                  transition: 'all 0.25s',
                  position: 'relative',
                  flexShrink: 0,
                  background: '#1a1a1a'
                }}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <video
                      src={item.src}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      muted
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Play size={14} fill="#fff" color="#fff" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(0,0,0,0.88)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              cursor: 'zoom-out'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '640px',
                width: '100%',
                background: '#fff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
              }}
            >
              <img
                src={lightboxItem.src}
                alt={lightboxItem.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '75vh',
                  display: 'block',
                  objectFit: 'contain',
                  background: '#111'
                }}
              />
              <div
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#fff'
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--accent)', margin: 0 }}>
                    {lightboxItem.title}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--soft)', fontSize: '0.95rem' }}>
                    {lightboxItem.caption}
                  </p>
                </div>
                <button
                  onClick={() => setLightboxItem(null)}
                  style={{
                    background: 'rgba(225,29,72,0.1)',
                    borderRadius: '50%',
                    padding: '8px',
                    color: 'var(--accent)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
