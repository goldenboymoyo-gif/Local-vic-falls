import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Send, ArrowLeft, Bot, User, Sparkles, Loader2 } from 'lucide-react'

const SUGGESTIONS = [
  'Plan an adrenaline-filled day',
  'Best restaurants for dinner tonight',
  'Family-friendly activities',
  'Budget day under $100',
  'What to do in 4 hours',
  'Sunset & nightlife plan',
]

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function AIPlanner() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm your Vic Falls day planner. Tell me what kind of day you're after — budget, time, vibe — and I'll put together a real itinerary with real prices.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai_api_key') || '')
  const [showKeyInput, setShowKeyInput] = useState(!apiKey)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function saveApiKey() {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim())
      setShowKeyInput(false)
    }
  }

  async function sendMessage(text) {
    const content = text || input.trim()
    if (!content || loading) return
    if (!apiKey) {
      setShowKeyInput(true)
      return
    }

    const userMsg = { role: 'user', content }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          apiKey,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessages([...newMessages, { role: 'assistant', content: `Error: ${data.error}` }])
      } else {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }])
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Could not reach the server. Make sure the backend is running.' }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#050816]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm tracking-tight">AI Day Planner</h1>
              <p className="text-white/30 text-[10px]">Powered by OpenAI</p>
            </div>
          </div>
          <button
            onClick={() => setShowKeyInput(true)}
            className="ml-auto text-[10px] text-white/30 hover:text-white/60 transition-colors"
          >
            {apiKey ? 'API key set' : 'Set API key'}
          </button>
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyInput && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/[0.08] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-white font-bold text-lg mb-2">Enter your OpenAI API key</h3>
            <p className="text-white/40 text-sm mb-4">
              Your key is stored in your browser's localStorage and sent directly to our server — never stored permanently.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm mb-4 focus:outline-none focus:border-teal-500"
              onKeyDown={(e) => e.key === 'Enter' && saveApiKey()}
            />
            <div className="flex items-center gap-3">
              <button
                onClick={saveApiKey}
                disabled={!apiKey.trim()}
                className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:from-teal-400 hover:to-emerald-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Save & Start
              </button>
              {apiKey && (
                <button
                  onClick={() => setShowKeyInput(false)}
                  className="text-white/40 text-sm hover:text-white transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-teal-500/15 text-white border border-teal-500/20'
                    : 'bg-white/[0.04] text-white/80 border border-white/[0.06]'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-white/60" />
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
                <span className="text-white/40 text-sm">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="max-w-3xl mx-auto px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="sticky bottom-0 bg-[#050816]/80 backdrop-blur-xl border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-2xl p-1.5 focus-within:border-teal-500/30 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your ideal day..."
              className="flex-1 bg-transparent text-white placeholder-white/30 text-sm px-3 py-2.5 outline-none"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center text-white hover:from-teal-400 hover:to-emerald-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
