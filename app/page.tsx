'use client'

import { useState, useEffect, useRef } from 'react'
import ReadReceipt from '@/components/ReadReceipt'

/* ── Scroll reveal hook ── */
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

/* ── Typing indicator ── */
function TypingIndicator({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <div className="flex items-start animate-fade-in">
      <div className="bubble-other flex items-center gap-1.5 px-5 py-3">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  )
}

/* ════════════════════ MAIN PAGE ════════════════════ */
export default function Home() {
  /* Hero entrance */
  const [heroReady, setHeroReady] = useState(false)
  useEffect(() => { setHeroReady(true) }, [])

  /* Chat replay */
  const chat = useReveal(0.2)
  const [msgCount, setMsgCount] = useState(0)
  const [typingPhase, setTypingPhase] = useState<'none' | 'typing' | 'gone'>('none')

  const messages = [
    { text: "hey", time: "10:42 PM" },
    { text: "you there?", time: "10:44 PM" },
    { text: "saw you were online lol", time: "10:51 PM" },
    { text: "is everything okay?", time: "11:23 PM" },
    { text: "...", time: "11:47 PM" },
    { text: "nvm", time: "2:14 AM" },
  ]

  useEffect(() => {
    if (!chat.visible) return
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i <= messages.length) setMsgCount(i)
      else if (i === messages.length + 2) setTypingPhase('typing')
      else if (i === messages.length + 5) { setTypingPhase('gone'); clearInterval(interval) }
    }, 700)
    return () => clearInterval(interval)
  }, [chat.visible, messages.length])

  /* Other sections */
  const act1 = useReveal(0.15)
  const act2 = useReveal(0.15)
  const graveyard = useReveal(0.1)
  const act3 = useReveal(0.15)
  const closer = useReveal(0.2)

  return (
    <main className="noise min-h-screen">

      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full animate-breathe"
          style={{ background: 'radial-gradient(circle, rgba(52,183,241,0.07) 0%, transparent 70%)' }} />

        <div className="relative z-10 text-center max-w-4xl">
          <div className={`label mb-6 transition-all duration-1000 ${heroReady ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            The universal fear
          </div>

          <h1 className={`display-xl mb-6 transition-all duration-1000 delay-200 ${heroReady ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <span className="text-accent">$</span>LASTREAD
          </h1>

          <p className={`text-muted text-xl md:text-2xl max-w-lg mx-auto leading-relaxed transition-all duration-1000 delay-500 ${heroReady ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            They saw it. They all saw it.<br />Nobody replied.
          </p>

          <div className={`mt-10 inline-flex items-center gap-2 transition-all duration-1000 delay-700 ${heroReady ? 'opacity-100' : 'opacity-0'}`}>
            <ReadReceipt className="text-read w-5 h-auto" />
            <span className="text-read text-sm font-mono">Read 2:47 AM</span>
          </div>
        </div>

        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${heroReady ? 'opacity-30' : 'opacity-0'}`}>
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-muted" />
          <span className="text-[10px] text-muted uppercase tracking-[0.2em]">scroll</span>
        </div>
      </section>

      <div className="section-divider mx-auto w-3/4 max-w-3xl" />

      {/* ━━━ ACT I — THE SETUP ━━━ */}
      <section className="py-24 md:py-36 px-6" ref={act1.ref}>
        <div className="max-w-2xl mx-auto text-center">
          <div className={`label mb-4 transition-all duration-700 ${act1.visible ? 'opacity-100' : 'opacity-0'}`}>Act I</div>
          <h2 className={`display-lg mb-10 transition-all duration-1000 ${act1.visible ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            It starts with a message
          </h2>
          <div className="space-y-8">
            {[
              "You type it out. Delete it. Retype it. You read it back three times. You hit send.",
              "The single checkmark appears. Delivered.",
              "Then the second checkmark turns blue.",
              "They saw it.",
            ].map((line, i) => (
              <p key={i}
                className={`body-lg transition-all duration-1000 ${act1.visible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${0.3 + i * 0.25}s` }}
              >
                {i === 3 ? <span className="text-read font-semibold text-lg">{line}</span> : line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto w-3/4 max-w-3xl" />

      {/* ━━━ THE CHAT ━━━ */}
      <section className="py-24 md:py-36 px-6" ref={chat.ref}>
        <div className="max-w-sm mx-auto">
          <div className={`label mb-8 text-center transition-all duration-700 ${chat.visible ? 'opacity-100' : 'opacity-0'}`}>
            A familiar scene
          </div>

          <div className={`rounded-[24px] border border-border bg-surface p-4 transition-all duration-700 ${chat.visible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Header */}
            <div className="flex items-center gap-3 pb-3 mb-3 border-b border-border">
              <div className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center text-base">👤</div>
              <div>
                <div className="text-sm font-semibold">them</div>
                <div className="text-[11px] text-muted">Online</div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-2.5 min-h-[280px]">
              {messages.slice(0, msgCount).map((msg, i) => (
                <div key={i} className="flex flex-col items-end gap-0.5 animate-fade-in"
                  style={{ animationDuration: '0.4s' }}>
                  <div className="bubble bubble-self">{msg.text}</div>
                  <div className="flex items-center gap-1 pr-1">
                    <span className="text-[10px] text-muted">{msg.time}</span>
                    <ReadReceipt className="text-read w-3.5 h-auto" />
                  </div>
                </div>
              ))}

              <TypingIndicator show={typingPhase === 'typing'} />

              {typingPhase === 'gone' && (
                <div className="text-center mt-4 animate-fade-in">
                  <span className="text-[11px] text-muted font-mono">Online 3 min ago</span>
                </div>
              )}
            </div>
          </div>

          {typingPhase === 'gone' && (
            <p className="text-center text-muted text-sm mt-6 animate-fade-in">
              They were typing. Then they stopped.
            </p>
          )}
        </div>
      </section>

      <div className="section-divider mx-auto w-3/4 max-w-3xl" />

      {/* ━━━ ACT II — THE WAIT ━━━ */}
      <section className="py-24 md:py-36 px-6" ref={act2.ref}>
        <div className="max-w-2xl mx-auto text-center">
          <div className={`label mb-4 transition-all duration-700 ${act2.visible ? 'opacity-100' : 'opacity-0'}`}>Act II</div>
          <h2 className={`display-lg mb-10 transition-all duration-1000 ${act2.visible ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            The wait
          </h2>
          <div className="space-y-12">
            {[
              "You check your phone. Nothing.",
              "You lock it. Unlock it. Check again. Still nothing.",
              "You open their profile. Last seen 2 minutes ago.",
              "They're alive. They're online. They chose silence.",
              "The blue checkmarks stare back at you — proof that you were seen, acknowledged, and discarded.",
            ].map((line, i) => (
              <p key={i}
                className={`${i === 4 ? 'display-md text-read' : 'body-lg'} transition-all duration-1000 ${act2.visible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${0.2 + i * 0.2}s` }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto w-3/4 max-w-3xl" />

      {/* ━━━ GRAVEYARD ━━━ */}
      <section className="py-24 md:py-36 px-6" ref={graveyard.ref}>
        <div className="max-w-3xl mx-auto">
          <div className={`label mb-4 text-center transition-all duration-700 ${graveyard.visible ? 'opacity-100' : 'opacity-0'}`}>
            Graveyard
          </div>
          <h2 className={`display-lg text-center mb-12 transition-all duration-1000 ${graveyard.visible ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            Where conversations go to die
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Read 2:47 AM", "Read Yesterday", "Read 11:32 PM",
              "Read 3 weeks ago", "Read Tuesday", "Read Dec 14",
              "Read 4:18 AM", "Read 2 months ago", "Read Just now",
              "Read Sep 3, 2024", "Read 6:00 AM", "Read Last year",
            ].map((ts, i) => (
              <div key={i}
                className={`rounded-xl border border-border bg-surface p-4 flex items-center gap-2 transition-all duration-700 ${graveyard.visible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${0.2 + i * 0.06}s` }}
              >
                <ReadReceipt className="text-read w-3.5 h-auto shrink-0" />
                <span className="text-xs font-mono text-muted">{ts}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto w-3/4 max-w-3xl" />

      {/* ━━━ ACT III — THE TRUTH ━━━ */}
      <section className="py-24 md:py-36 px-6" ref={act3.ref}>
        <div className="max-w-2xl mx-auto text-center">
          <div className={`label mb-4 transition-all duration-700 ${act3.visible ? 'opacity-100' : 'opacity-0'}`}>Act III</div>
          <h2 className={`display-lg mb-10 transition-all duration-1000 ${act3.visible ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            The truth no one says out loud
          </h2>
          <div className="space-y-12">
            {[
              "Being left on read isn't about a message. It's about being told, without words, that you don't matter enough for a reply.",
              "It's the modern rejection letter — except there's no letter. Just silence and a blue checkmark.",
              "7.8 billion people on earth. Every single one of them knows this feeling.",
              "Every single one of them has been the sender. And the leaver.",
            ].map((line, i) => (
              <p key={i}
                className={`${i >= 2 ? 'display-md' : 'body-lg'} transition-all duration-1000 ${act3.visible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${0.2 + i * 0.25}s`, color: i === 3 ? 'var(--color-read)' : undefined }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto w-3/4 max-w-3xl" />

      {/* ━━━ CLOSER ━━━ */}
      <section className="py-32 md:py-48 px-6" ref={closer.ref}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`display-xl mb-8 transition-all duration-1000 ${closer.visible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <span className="text-accent">$</span>LASTREAD
          </h2>
          <p className={`text-xl md:text-2xl text-muted max-w-md mx-auto transition-all duration-1000 delay-300 ${closer.visible ? 'opacity-100' : 'opacity-0'}`}>
            Some messages deserve a reply.<br />
            <span className="text-read">None of yours did.</span>
          </p>
          <div className={`mt-10 flex items-center justify-center gap-3 transition-all duration-1000 delay-500 ${closer.visible ? 'opacity-100' : 'opacity-0'}`}>
            <ReadReceipt className="text-read w-5 h-auto" />
            <ReadReceipt className="text-read w-5 h-auto" />
            <ReadReceipt className="text-read w-5 h-auto" />
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
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
