import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, X, Send, Compass, ArrowRight } from 'lucide-react'
import { adventures, eatDrink, cultureListings, stayListings } from '../../data/listings'

const allListings = [
  ...adventures.map(a => ({ ...a, pillar: 'Adventure' })),
  ...eatDrink.map(e => ({ ...e, pillar: 'Eat & Drink' })),
  ...cultureListings.map(c => ({ ...c, pillar: 'Culture' })),
  ...stayListings.map(s => ({ ...s, pillar: 'Stay' })),
]

const categories = [
  { id: 'adventure', label: 'Adventure', emoji: '⚡', filter: l => l.pillar === 'Adventure' },
  { id: 'food', label: 'Food & Drink', emoji: '🍽️', filter: l => l.pillar === 'Eat & Drink' },
  { id: 'culture', label: 'Culture', emoji: '🎭', filter: l => l.pillar === 'Culture' },
  { id: 'stay', label: 'Where to Stay', emoji: '🏨', filter: l => l.pillar === 'Stay' },
  { id: 'popular', label: 'Most Popular', emoji: '⭐', filter: l => l.rating >= 4.7 },
]

const greetings = [
  "Hey! I'm your Vic Falls trip planner. What are you into?",
  "What sounds good to you?",
]

function getSuggestions(categoryId) {
  const cat = categories.find(c => c.id === categoryId)
  if (!cat) return []
  return allListings.filter(cat.filter).sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4)
}

export default function TripChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [step, setStep] = useState('greeting')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages([{ role: 'bot', text: greetings[0] }])
        setIsTyping(false)
        setStep('choose-category')
      }, 600)
    }
  }, [isOpen])

  const handleCategoryClick = (catId) => {
    const cat = categories.find(c => c.id === catId)
    setMessages(prev => [...prev, { role: 'user', text: `${cat.emoji} ${cat.label}` }])
    setIsTyping(true)
    setStep('showing')

    setTimeout(() => {
      const suggestions = getSuggestions(catId)
      setMessages(prev => [...prev, {
        role: 'bot',
        text: `Here are my top ${cat.label} picks:`,
        suggestions,
      }])
      setIsTyping(false)
    }, 500)
  }

  const handleReset = () => {
    setMessages(prev => [...prev, { role: 'user', text: 'Show me something else' }])
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: "What else are you into?" }])
      setIsTyping(false)
      setStep('choose-category')
    }, 400)
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setMessages([])
      setStep('greeting')
    }, 300)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open trip planner"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-[var(--color-border-light)] flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ height: '520px', maxHeight: 'calc(100vh - 4rem)' }}
      >
        {/* Header */}
        <div className="bg-[var(--color-primary)] px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Trip Planner</h3>
              <p className="text-white/70 text-xs">Ask me anything about Vic Falls</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-white/70 hover:text-white transition-colors" aria-label="Close chat">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i}>
              {msg.role === 'bot' ? (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[var(--color-ink)] leading-relaxed">{msg.text}</p>

                    {/* Category buttons */}
                    {msg.text.includes('What are you into') || msg.text.includes('What else') ? (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {categories.map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink-light)] hover:bg-[var(--color-surface-warm)] hover:border-[var(--color-primary)]/30 transition-all"
                          >
                            <span>{cat.emoji}</span>
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    ) : null}

                    {/* Suggestion cards */}
                    {msg.suggestions && (
                      <div className="space-y-2 mt-3">
                        {msg.suggestions.map(item => (
                          <Link
                            key={item.id}
                            to={`/business/${item.slug}`}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--color-surface)] hover:bg-white hover:shadow-sm border border-transparent hover:border-[var(--color-border-light)] transition-all group"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-[var(--color-ink)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-[10px] text-[var(--color-ink-muted)] mt-0.5">
                                {item.price} · {item.category}
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[var(--color-ink-muted)] group-hover:text-[var(--color-primary)] shrink-0 transition-colors" />
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Reset button */}
                    {msg.suggestions && (
                      <button
                        onClick={handleReset}
                        className="mt-3 text-xs text-[var(--color-primary)] font-medium hover:underline"
                      >
                        ← Show me something else
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="bg-[var(--color-primary)] text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-md max-w-[80%]">
                    {msg.text}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                <Compass className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              </div>
              <div className="bg-[var(--color-surface)] rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[var(--color-ink-muted)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-[var(--color-ink-muted)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-[var(--color-ink-muted)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick link to search */}
        <div className="border-t border-[var(--color-border-light)] px-4 py-3 shrink-0">
          <Link
            to="/search"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-surface-warm)] text-sm font-medium text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
          >
            Browse all experiences
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </>
  )
}
