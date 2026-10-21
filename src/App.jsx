import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import HeartCursor from './components/HeartCursor';
import LockScreen from './components/LockScreen';
import IntroEnvelope from './components/IntroEnvelope';
import LoveLetter from './components/LoveLetter';
import PhotoGallery from './components/PhotoGallery';
import MediaCarousel from './components/MediaCarousel';
import MemoriesTimeline from './components/MemoriesTimeline';
import ReasonsGrid from './components/ReasonsGrid';
import { BalloonsSection } from './components/BalloonsSection';
import ProposalSection from './components/ProposalSection';

const CONFIG = {
  secretCode: "18072026",
  babeName: "Neelu",
  date: "Made with all my love for Neelu · 21 Oct 2026",
  letterMl: `പ്രണയത്തിനും സൗഹൃദത്തിനും അപ്പുറം, മനുഷ്യന് നിർവചിക്കാനാകാത്ത ചില ബന്ധങ്ങൾ ഈ ലോകത്തിൽ ഇപ്പോഴും ബാക്കിയുണ്ട്. അമലും ചാരുവും പ്രണയത്തിലായിരുന്നു എന്ന് പറയാനാകില്ല… അവർ പ്രണയത്തിലാണെന്ന് എവിടെയും പറയുന്നുമില്ല. പക്ഷേ ചില ബന്ധങ്ങൾ അങ്ങനെയാണ് — പേരിടാനാകാതെ, നിർവചിക്കാനാകാതെ, എന്നിരുന്നാലും ഹൃദയത്തിൽ ഏറ്റവും ആഴത്തിൽ തങ്ങി നിൽക്കുന്നവ.

എല്ലാ മനുഷ്യരും മറ്റുള്ളവരാൽ പരിഗണിക്കപ്പെടാനും സ്നേഹിക്കപ്പെടാനും ആഗ്രഹിക്കുന്നവരാണ്. ഒരു ചെറിയ കരുതൽ പോലും പലപ്പോഴും ഒരു മനുഷ്യന്റെ മനസിനെ ശാന്തമാക്കും. അത് ഇല്ലാത്തിടത്തോളം, എത്ര സന്തോഷങ്ങൾ ചുറ്റുമുണ്ടായാലും ഉള്ളിൽ ഒരു ശൂന്യത ബാക്കിയാകും.

If I get reborn in another life, I will find you and I will make you mine. നീലു, എനിക്ക് നീ അത്രമേൽ പ്രിയപ്പെട്ടതാണ്... എന്നും എന്റെ ഹൃദയത്തിൽ നീ മാത്രം. 💕`,
  letterEn: `Beyond love and friendship, there are some bonds in this world that human words can never define. One cannot say Amal and Charu were in love… nor is it mentioned anywhere that they are in love. But some relationships are just like that — nameless, indefinable, yet residing in the deepest corners of the heart.

Every human yearns to be cared for and loved by someone. Even the smallest care and warmth can bring calm and peace to a human soul. As long as that is missing, no matter how many joys surround us, an emptiness remains inside.

If I get reborn in another life, I will find you, and I will make you mine. Neelu, my babe... you are that deeply held bond in my heart. 💕`,
  memories: [
    {
      when: "The Day You Came Into My Life",
      text: "I didn’t realize it right then, but that was the day my whole world turned beautiful."
    },
    {
      when: "Our First Long Late-Night Conversation",
      text: "Hours slipped away like seconds. That was the night my heart chose you."
    },
    {
      when: "Every Hug & Warm Moment We Share",
      text: "Whenever I’m in your arms, everything else fades away and I just feel at peace."
    }
  ],
  reasons: [
    "Your smile makes my worst days vanish",
    "You always listen and understand me",
    "The way you make me feel safe & cherished",
    "You feel like home to my heart",
    "Your laugh is my absolute favorite sound",
    "You believe in me when I doubt myself",
    "You are my babe, my best friend, & my soulmate",
    "Simply because you're Neelu — my everything"
  ],
  question: "Neelu, will you stay with me forever, my babe? 💕",
  yesText: "Then it's a forever promise, Neelu! I'll love you today, tomorrow, and every single day after. 💖✨💍",
  noTexts: [
    "Are you sure, Neelu? 🥺",
    "Think again, my babe…",
    "Pretty please with a kiss? 💕",
    "There is only one answer 😄"
  ]
};

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const letterRef = useRef(null);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    setTimeout(() => {
      letterRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Animated Love Icon Cursor */}
      <HeartCursor />

      {/* Background Floating Hearts */}
      <FloatingHearts />

      {/* Lock Screen */}
      <AnimatePresence>
        {!isUnlocked && (
          <LockScreen
            secretCode={CONFIG.secretCode}
            onUnlock={() => setIsUnlocked(true)}
          />
        )}
      </AnimatePresence>

      {/* Main Experience */}
      {isUnlocked && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '680px',
            margin: '0 auto',
            padding: '20px 20px 80px'
          }}
        >
          {/* Top Intro with 3D Envelope */}
          <IntroEnvelope onOpen={handleOpenEnvelope} />

          {/* Unfolded Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={letterRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <LoveLetter letterMl={CONFIG.letterMl} letterEn={CONFIG.letterEn} />
                <PhotoGallery />
                <MediaCarousel />
                <MemoriesTimeline memories={CONFIG.memories} />
                <ReasonsGrid reasons={CONFIG.reasons} />
                <BalloonsSection />
                <ProposalSection
                  question={CONFIG.question}
                  yesText={CONFIG.yesText}
                  noTexts={CONFIG.noTexts}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      )}
    </div>
  );
}
