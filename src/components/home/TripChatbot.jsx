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
  { id: 'adventure', label: 'Adventure', emoji: '⚡', keywords: ['adventure', 'adrenaline', 'rafting', 'bungee', 'jump', 'swing', 'helicopter', 'zip', 'extreme', 'thrill', 'action'], filter: l => l.pillar === 'Adventure' },
  { id: 'food', label: 'Food & Drink', emoji: '🍽️', keywords: ['food', 'eat', 'drink', 'restaurant', 'dinner', 'lunch', 'breakfast', 'cafe', 'bar', 'tapas', 'oxtail', 'sundowner', 'meal', 'hungry', 'tasty'], filter: l => l.pillar === 'Eat & Drink' },
  { id: 'culture', label: 'Culture', emoji: '🎭', keywords: ['culture', 'village', 'heritage', 'history', 'tour', 'local', 'community', 'traditional', 'museum', 'art', 'craft', 'story'], filter: l => l.pillar === 'Culture' },
  { id: 'stay', label: 'Where to Stay', emoji: '🏨', keywords: ['stay', 'hotel', 'lodge', 'accommodation', 'sleep', 'room', 'bed', 'camp', 'hostel', 'guest house'], filter: l => l.pillar === 'Stay' },
  { id: 'popular', label: 'Most Popular', emoji: '⭐', keywords: ['popular', 'best', 'top', 'rated', 'favourite', 'favorite', 'must', 'do', 'recommend'], filter: l => l.rating >= 4.7 },
]

const quickReplies = [
  { text: 'Show me adventures', catId: 'adventure' },
  { text: 'Where can I eat?', catId: 'food' },
  { text: 'Best rated places', catId: 'popular' },
]

function matchCategory(input) {
  const lower = input.toLowerCase()
  for (const cat of categories) {
    if (cat.keywords.some(kw => lower.includes(kw))) return cat
  }
  return null
}

function getSuggestions(categoryId) {
  const cat = categories.find(c => c.id === categoryId)
  if (!cat) return []
  return allListings.filter(cat.filter).sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4)
}

function searchListings(query) {
  const lower = query.toLowerCase()
  return allListings
    .filter(l => {
      const searchable = `${l.name} ${l.category || ''} ${l.description || ''} ${l.shortDesc || ''}`.toLowerCase()
      return searchable.includes(lower)
    })
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4)
}

export default function TripChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
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
        setMessages([{ role: 'bot', text: "Hey! I'm your Vic Falls trip planner. What are you into?" }])
        setIsTyping(false)
      }, 600)
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const addBotMessage = (text, suggestions) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text, suggestions }])
      setIsTyping(false)
    }, 500)
  }

  const handleCategoryClick = (catId) => {
    const cat = categories.find(c => c.id === catId)
    setMessages(prev => [...prev, { role: 'user', text: `${cat.emoji} ${cat.label}` }])
    const suggestions = getSuggestions(catId)
    addBotMessage(`Here are my top ${cat.label} picks:`, suggestions)
  }

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text }])

    const matched = matchCategory(text)
    if (matched) {
      const suggestions = getSuggestions(matched.id)
      addBotMessage(`Great choice! Here are some ${matched.label.toLowerCase()} options:`, suggestions)
      return
    }

    const results = searchListings(text)
    if (results.length > 0) {
      addBotMessage(`I found ${results.length} ${results.length === 1 ? 'option' : 'options'} for "${text}":`, results)
    } else {
      addBotMessage(
        `I couldn't find anything specific for "${text}", but here are some popular picks you might love:`,
        getSuggestions('popular')
      )
    }
  }

  const handleQuickReply = (text, catId) => {
    setMessages(prev => [...prev, { role: 'user', text }])
    const suggestions = getSuggestions(catId)
    addBotMessage(`Here you go:`, suggestions)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setMessages([])
      setInput('')
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
        style={{ height: '540px', maxHeight: 'calc(100vh - 4rem)' }}
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

                    {/* Category buttons — only on first bot message */}
                    {i === 0 && (
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
                    )}

                    {/* Quick reply chips — after first message */}
                    {i === 1 && !msg.suggestions && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {quickReplies.map(qr => (
                          <button
                            key={qr.text}
                            onClick={() => handleQuickReply(qr.text, qr.catId)}
                            className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium bg-[var(--color-primary)]/5 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
                          >
                            {qr.text}
                          </button>
                        ))}
                      </div>
                    )}

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

        {/* Input area */}
        <div className="border-t border-[var(--color-border-light)] p-3 shrink-0">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-light)] text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-primary)]/40 focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0 hover:bg-[var(--color-primary-dark)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-center mt-2">
            <Link
              to="/search"
              className="text-[10px] text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              Browse all experiences →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
