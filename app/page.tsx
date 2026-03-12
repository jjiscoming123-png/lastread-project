'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import ReadReceipt from '../components/ReadReceipt'

/* ── Chat conversation data ── */
const chatMessages = [
  { text: "hey", time: "10:42 PM" },
  { text: "you there?", time: "10:44 PM" },
  { text: "saw you were online lol", time: "10:51 PM" },
  { text: "is everything okay?", time: "11:23 PM" },
  { text: "...", time: "11:47 PM" },
  { text: "nvm", time: "2:14 AM" },
]

/* ── Read receipts graveyard ── */
const readTimestamps = [
  "Read 2:47 AM", "Read Yesterday", "Read 11:32 PM",
  "Read 3 weeks ago", "Read Tuesday", "Read Dec 14",
  "Read 4:18 AM", "Read 2 months ago", "Read Just now",
  "Read Sep 3, 2024", "Read 6:00 AM", "Read Last year",
]

/* ── Manifesto lines ── */
const manifestoLines = [
  "The blue checkmark that ended more relationships than distance ever could.",
  "Online 3 min ago. Still typing nothing.",
  "You composed the perfect message. They composed the perfect silence.",
  "Read at 2:47 AM — awake enough to see it, unbothered enough to ignore it.",
  "The three dots appeared. Then vanished. Taking your dignity with them.",
]

/* ── Hook: animate on scroll ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ── Typing indicator component ── */
function TypingIndicator({ show }: { show: boolean }) {
  return (
    <div
      className="flex items-center gap-2 transition-all duration-700"
      style={{ opacity: show ? 1 : 0, height: show ? 40 : 0 }}
    >
      <div className="bubble-other flex items-center gap-1.5 px-5 py-3">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  )
}

/* ── Chat message bubble ── */
function ChatBubble({
  msg,
  index,
  visible,
}: {
  msg: (typeof chatMessages)[0]
  index: number
  visible: boolean
}) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setShow(true), index * 600 + 200)
    return () => clearTimeout(t)
  }, [visible, index])

  return (
    <div
      className="flex flex-col items-end gap-1 transition-all duration-500"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateX(0)' : 'translateX(24px)',
      }}
    >
      <div className="bubble bubble-self">{msg.text}</div>
      <div className="flex items-center gap-1 pr-1">
        <span className="text-[10px] text-muted">{msg.time}</span>
        <ReadReceipt className="text-read w-4 h-auto" />
      </div>
    </div>
  )
}

/* ── Live counter ── */
function ReadCounter() {
  const [count, setCount] = useState(0)
  const target = 8_417_329
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let current = 0
        const step = Math.ceil(target / 80)
        const interval = setInterval(() => {
          current += step + Math.floor(Math.random() * step * 0.4)
          if (current >= target) { current = target; clearInterval(interval) }
          setCount(current)
        }, 30)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* keep counting up after reaching target */
  useEffect(() => {
    if (count < target) return
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 7) + 1)
    }, 800)
    return () => clearInterval(interval)
  }, [count])

  return (
    <div ref={ref} className="text-center">
      <div className="label mb-4">Right now</div>
      <div className="font-mono text-5xl md:text-7xl font-bold text-foreground tracking-tight">
        {count.toLocaleString()}
      </div>
      <div className="text-muted text-lg mt-3">messages sitting on read</div>
    </div>
  )
}

/* ════════════════════ MAIN PAGE ════════════════════ */
export default function Home() {
  /* Hero animations */
  const [heroReady, setHeroReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setHeroReady(true), 100); return () => clearTimeout(t) }, [])

  /* Chat section */
  const chat = useReveal(0.2)
  const [typingPhase, setTypingPhase] = useState(0) // 0=hidden, 1=show, 2=hide
  useEffect(() => {
    if (!chat.visible) return
    const showDelay = chatMessages.length * 600 + 1200
    const t1 = setTimeout(() => setTypingPhase(1), showDelay)
    const t2 = setTimeout(() => setTypingPhase(2), showDelay + 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [chat.visible])

  /* Manifesto section */
  const manifesto = useReveal(0.15)

  /* Graveyard section */
  const graveyard = useReveal(0.1)

  /* Closer section */
  const closer = useReveal(0.2)

  return (
    <main className="noise min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-breathe"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 text-center max-w-4xl">
          <div
            className="label mb-6 transition-all duration-1000"
            style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? 'none' : 'translateY(16px)' }}
          >
            The universal fear
          </div>

          <h1
            className="display-xl mb-6 transition-all duration-1000 delay-200"
            style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? 'none' : 'translateY(32px)',
              transitionDelay: '0.2s',
            }}
          >
            <span className="text-accent">$</span>LASTREAD
          </h1>

          <p
            className="text-muted text-xl md:text-2xl max-w-lg mx-auto leading-relaxed transition-all duration-1000"
            style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? 'none' : 'translateY(24px)', transitionDelay: '0.5s' }}
          >
            They saw it. They all saw it. Nobody replied.
          </p>

          {/* Floating read receipt */}
          <div
            className="mt-12 flex items-center justify-center gap-2 transition-all duration-1000"
            style={{ opacity: heroReady ? 1 : 0, transitionDelay: '0.9s' }}
          >
            <ReadReceipt className="text-read w-6 h-auto" />
            <span className="text-read text-sm font-mono">Read 2:47 AM</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000"
          style={{ opacity: heroReady ? 0.4 : 0, transitionDelay: '1.4s' }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-muted" />
          <span className="text-[10px] text-muted uppercase tracking-[0.2em]">scroll</span>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="section-divider mx-auto w-3/4 max-w-3xl" />

      {/* ── THE CHAT ── */}
      <section className="py-28 md:py-40 px-6" ref={chat.ref}>
        <div className="max-w-md mx-auto">
          <div className="label mb-8 text-center" style={{ opacity: chat.visible ? 1 : 0, transition: 'opacity 0.8s' }}>
            A familiar scene
          </div>

          {/* Phone mockup */}
          <div
            className="rounded-[28px] border border-border bg-surface p-5 animate-pulse-glow"
            style={{ opacity: chat.visible ? 1 : 0, transition: 'opacity 0.8s 0.2s' }}
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center">
                <span className="text-lg">👤</span>
              </div>
              <div>
                <div className="text-sm font-semibold">them</div>
                <div className="text-[11px] text-muted">Online</div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-3 min-h-[320px]">
              {chatMessages.map((msg, i) => (
                <ChatBubble key={i} msg={msg} index={i} visible={chat.visible} />
              ))}

              {/* Typing indicator */}
              <div className="mt-2">
                <TypingIndicator show={typingPhase === 1} />
              </div>

              {/* Status after typing vanishes */}
              {typingPhase === 2 && (
                <div className="text-center mt-4 animate-fade-in">
                  <span className="text-[11px] text-muted font-mono">Online 3 min ago</span>
                </div>
              )}
            </div>
          </div>

          {/* Caption below phone */}
          <p
            className="text-center text-muted text-sm mt-8 transition-all duration-1000"
            style={{
              opacity: typingPhase === 2 ? 1 : 0,
              transform: typingPhase === 2 ? 'none' : 'translateY(12px)',
            }}
          >
            They were typing. Then they stopped.<br />
            <span className="text-read">Taking your dignity with them.</span>
          </p>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="section-divider mx-auto w-3/4 max-w-3xl" />

      {/* ── THE COUNTER ── */}
      <section className="py-28 md:py-40 px-6">
        <ReadCounter />
      </section>

      {/* ── DIVIDER ── */}
      <div className="section-divider mx-auto w-3/4 max-w-3xl" />

      {/* ── MANIFESTO ── */}
      <section className="py-28 md:py-40 px-6" ref={manifesto.ref}>
        <div className="max-w-2xl mx-auto space-y-16">
          {manifestoLines.map((line, i) => (
            <p
              key={i}
              className="display-md text-center transition-all duration-1000"
              style={{
                opacity: manifesto.visible ? 1 : 0,
                transform: manifesto.visible ? 'none' : 'translateY(40px)',
                transitionDelay: `${i * 0.25}s`,
                color: i === manifestoLines.length - 1 ? 'var(--color-read)' : undefined,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="section-divider mx-auto w-3/4 max-w-3xl" />

      {/* ── GRAVEYARD OF READS ── */}
      <section className="py-28 md:py-40 px-6" ref={graveyard.ref}>
        <div className="max-w-3xl mx-auto">
          <div className="label mb-4 text-center" style={{ opacity: graveyard.visible ? 1 : 0, transition: 'opacity 0.8s' }}>
            Graveyard
          </div>
          <h2
            className="display-lg text-center mb-16 transition-all duration-1000"
            style={{ opacity: graveyard.visible ? 1 : 0, transform: graveyard.visible ? 'none' : 'translateY(24px)', transitionDelay: '0.15s' }}
          >
            Where conversations go to die
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {readTimestamps.map((ts, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-surface p-5 flex items-center gap-2 transition-all duration-700"
                style={{
                  opacity: graveyard.visible ? 1 : 0,
                  transform: graveyard.visible ? 'none' : 'translateY(20px)',
                  transitionDelay: `${0.3 + i * 0.08}s`,
                }}
              >
                <ReadReceipt className="text-read w-4 h-auto shrink-0" />
                <span className="text-sm font-mono text-muted">{ts}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="section-divider mx-auto w-3/4 max-w-3xl" />

      {/* ── CLOSER ── */}
      <section className="py-40 md:py-56 px-6" ref={closer.ref}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="display-xl mb-8 transition-all duration-1000"
            style={{ opacity: closer.visible ? 1 : 0, transform: closer.visible ? 'none' : 'translateY(32px)' }}
          >
            <span className="text-accent">$</span>LASTREAD
          </h2>
          <p
            className="text-xl md:text-2xl text-muted max-w-md mx-auto transition-all duration-1000"
            style={{ opacity: closer.visible ? 1 : 0, transitionDelay: '0.3s' }}
          >
            Some messages deserve a reply.<br />
            <span className="text-read">None of yours did.</span>
          </p>
          <div
            className="mt-12 flex items-center justify-center gap-2 transition-all duration-1000"
            style={{ opacity: closer.visible ? 1 : 0, transitionDelay: '0.6s' }}
          >
            <ReadReceipt className="text-read w-5 h-auto" />
            <ReadReceipt className="text-read w-5 h-auto" />
            <ReadReceipt className="text-read w-5 h-auto" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm text-muted font-mono">$LASTREAD</span>
          <div className="flex items-center gap-1">
            <ReadReceipt className="text-read w-3.5 h-auto" />
            <span className="text-[10px] text-muted">seen</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
