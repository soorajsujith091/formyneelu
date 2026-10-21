import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Balloons } from "@/components/ui/balloons"
import { Sparkles, Heart } from "lucide-react"

export function BalloonsSection() {
  const defaultBalloonsRef = React.useRef<{ launchAnimation: () => void } | null>(null)
  const textBalloonsRef = React.useRef<{ launchAnimation: () => void } | null>(null)
  const [lastLaunched, setLastLaunched] = React.useState<string | null>(null)

  const launchDefault = () => {
    setLastLaunched("default")
    if (defaultBalloonsRef.current) {
      defaultBalloonsRef.current.launchAnimation()
    }
  }

  const launchLoveBalloons = () => {
    setLastLaunched("love")
    if (textBalloonsRef.current) {
      textBalloonsRef.current.launchAnimation()
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      style={{
        padding: "60px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        position: "relative",
        zIndex: 10
      }}
    >
      {/* Badge matching other sections */}
      <div
        style={{
          display: "inline-block",
          background: "linear-gradient(135deg, rgba(225,29,72,0.12), rgba(244,114,182,0.18))",
          border: "1px solid var(--line)",
          color: "var(--accent)",
          padding: "5px 18px",
          borderRadius: "999px",
          fontSize: "0.9rem",
          fontWeight: 600,
          fontFamily: "'Outfit', sans-serif",
          marginBottom: "12px"
        }}
      >
        Celebrate With Neelu ✨
      </div>

      {/* Title with Dancing Script font */}
      <h2
        style={{
          fontSize: "clamp(2.2rem, 8vw, 3.2rem)",
          marginBottom: "8px",
          fontFamily: "'Dancing Script', cursive, Georgia, serif",
          color: "var(--accent)"
        }}
      >
        Send Love Balloons To Neelu 🎈
      </h2>

      {/* Subtitle */}
      <p
        style={{
          color: "var(--soft)",
          fontStyle: "italic",
          fontSize: "1.05rem",
          marginBottom: "32px",
          maxWidth: "460px"
        }}
      >
        Tap a button below to release colorful celebratory balloons into the sky for my babe 💕
      </p>

      {/* Romantic Glassmorphism Card matching the rest of the site */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
          borderRadius: "26px",
          padding: "38px 28px 34px",
          maxWidth: "600px",
          width: "100%",
          backdropFilter: "blur(12px)",
          boxShadow: "var(--polaroid-shadow)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative"
        }}
      >
        {/* Floating animated balloon icon */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            fontSize: "4.8rem",
            marginBottom: "16px",
            filter: "drop-shadow(0 8px 18px var(--accent-glow))",
            cursor: "pointer",
            userSelect: "none"
          }}
          onClick={launchLoveBalloons}
        >
          🎈
        </motion.div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}
        >
          {/* Primary Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={launchDefault}
            style={{
              padding: "15px 30px",
              borderRadius: "999px",
              background: "linear-gradient(135deg, var(--accent), #db2777)",
              color: "#fff",
              fontSize: "1.08rem",
              fontWeight: 600,
              boxShadow: "0 8px 26px var(--accent-glow)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              border: "none",
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            <Sparkles size={18} />
            <span>Launch Balloons! 🎈</span>
          </motion.button>

          {/* Secondary Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={launchLoveBalloons}
            style={{
              padding: "13px 28px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.85)",
              border: "2px solid var(--accent)",
              color: "var(--accent)",
              fontSize: "1.08rem",
              fontWeight: 600,
              boxShadow: "0 4px 16px rgba(225, 29, 72, 0.12)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            <Heart size={18} fill="var(--accent)" />
            <span>Send "FOR NEELU 💕"</span>
          </motion.button>
        </div>

        {/* Romantic Feedback Note */}
        <AnimatePresence>
          {lastLaunched && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: "22px",
                padding: "10px 22px",
                borderRadius: "999px",
                background: "linear-gradient(135deg, rgba(225,29,72,0.1), rgba(244,114,182,0.15))",
                border: "1px solid var(--line)",
                color: "var(--accent)",
                fontSize: "0.95rem",
                fontWeight: 600,
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {lastLaunched === "love"
                ? "✨ Look up! Letters of love floating in the sky for Neelu! 💖"
                : "🎉 Colorful celebration balloons released into the sky! 🎈"}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Balloons Component Hooks */}
      <Balloons ref={defaultBalloonsRef} type="default" />
      <Balloons
        ref={textBalloonsRef}
        type="text"
        text="NEELU 💕"
        fontSize={130}
        color="#e11d48"
      />
    </motion.section>
  )
}
