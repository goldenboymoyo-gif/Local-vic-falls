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

const SYSTEM_PROMPT = `You are a friendly, knowledgeable local guide for Victoria Falls, Zimbabwe. You help visitors plan their perfect day using real listings from the Local Vic Falls directory.

RULES:
- Only recommend experiences and places that exist in the listings below
- Always include real prices, ratings, and durations when available
- Be concise and enthusiastic — like a local friend giving tips
- If someone asks about something not in the listings, suggest the closest match
- Use WhatsApp booking links when suggesting specific experiences
- Keep responses under 200 words unless asked for detail

AVAILABLE LISTINGS:

ADVENTURES:
- White-Water Rafting: Grade 5 rapids, 23km through Batoka Gorge, $139 from, 4.9★ (342 reviews), Full day. WhatsApp: https://wa.me/263781234567?text=Hi!%20I'd%20like%20to%20book%20white-water%20rafting.
- Bungee Jump — Victoria Falls Bridge: 111m drop, $194 from, 4.8★ (267 reviews), 15-20 mins. WhatsApp: https://wa.me/263781234567?text=Hi!%20I'd%20like%20to%20book%20a%20bungee%20jump.
- Gorge Swing: 70-80m freefall swing across the gorge, $137 from (solo), 4.8★ (189 reviews), ~30 mins. WhatsApp: https://wa.me/263781234567?text=Hi!%20I'd%20like%20to%20book%20a%20gorge%20swing.
- Zipline Across the Gorge: 425m zipline, $50 from, 4.7★ (156 reviews), ~10 mins. WhatsApp: https://wa.me/263781234567?text=Hi!%20I'd%20like%20to%20book%20the%20zipline.
- Flight of Angels — Helicopter Tour: Scenic flight over the falls, $150 from, 4.9★ (518 reviews), 13-25 mins. WhatsApp: https://wa.me/263781234567?text=Hi!%20I'd%20like%20to%20book%20a%20helicopter%20tour.
- Devil's Pool: Swim at the edge of the falls (seasonal Aug-Jan), $149 from (incl. Livingstone Island tour), 4.9★ (203 reviews), 2-3 hrs. WhatsApp: https://wa.me/263781234567?text=Hi!%20I'd%20like%20to%20book%20Devil's%20Pool.
- Zambezi Sunset Cruise: Drinks & snacks on the river, $59 from, 4.7★ (423 reviews), 2-3 hrs. WhatsApp: https://wa.me/263781234567?text=Hi!%20I'd%20like%20to%20book%20a%20sunset%20cruise.
- Canoe Safari: Upper Zambezi wildlife encounters, $150 from, 4.8★ (178 reviews), Half day. WhatsApp: https://wa.me/263781234567?text=Hi!%20I'd%20like%20to%20book%20a%20canoe%20safari.

EAT & DRINK:
- GOAT Victoria Falls: African eatery, $7-$18 mains, 4.7★ (278 reviews), Mon-Sat 10am-12am. Live music nightly.
- Lola's Tapas & Carnivore: Game meats & fusion, $5-$25 mains, 4.8★ (312 reviews), Daily 11am-11pm. Live music.
- The Lookout Cafe: 120m above Batoka Gorge, $10-$35 mains, 4.8★ (342 reviews), Daily 7am-10pm. Full moon dinners.
- The Cassia Restaurant: Veranda dining at Ilala Lodge, $42 3-course dinner, 4.9★ (523 reviews), Daily 7am-10pm. Hear the falls from your table.
- The Boma — Dinner & Drum Show: 4-course African buffet + drum show, $70pp, 4.6★ (456 reviews), Daily 6:30pm.
- The Three Monkeys: Wood-fired pizzas, cocktails, $5-$20 mains, 4.5★ (198 reviews), Daily 11am-11pm.
- MaKuwa-Kuwa Restaurant: Traditional Zimbabwean, $15-$30 mains, 4.6★ (210 reviews), Daily 12pm-10pm.
- The River Brewing Company: Craft brewery, $2-$12 beers/BBQ, 4.5★ (165 reviews), Daily 10am-11pm. Live music Fri & Sat.

CULTURE:
- Monde Village Cultural & School Tour: School visits, homesteads, cooking demos, $40 from, 4.9★ (156 reviews), Half day. WhatsApp: https://wa.me/263781234567?text=Hi!%20I'd%20like%20to%20book%20the%20Monde%20Village%20tour.
- Chinotimba Township Tour: Real township streets, markets, pubs, $35 from, 4.8★ (98 reviews), 2-3 hrs. WhatsApp: https://wa.me/263781234567?text=Hi!%20I'd%20like%20to%20book%20the%20Chinotimba%20Township%20tour.
- Jafuta Heritage Centre: Artefacts & bones reading, $10 entry, 4.7★ (87 reviews), 1-2 hrs.
- Guided Walking Storytelling Tour: Oral history, $20 from, 4.8★ (64 reviews), 2 hrs.

STAY:
- Ilala Lodge Hotel: Boutique, direct rainforest access, $246 from/night, 4.9★ (523 reviews).
- Victoria Falls Safari Lodge: Luxury overlooking wildlife waterhole, $280 from/night, 4.9★ (412 reviews).
- Explorers Village: Backpackers & campsite, $25 from/night, 4.4★ (189 reviews).
- Gorges Lodge: Rim of Batoka Gorge, $350 from/night, 4.8★ (167 reviews).

NIGHTLIFE:
- The River Brewing Company: Craft beer garden, fire pits, live music Fri & Sat. Daily 10am-11pm.
- The Three Monkeys: Cocktails, wood-fired pizzas, sports bar. Daily 11am-11pm.

Help visitors plan their perfect Victoria Falls day!`

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
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages.map(m => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessages([...newMessages, { role: 'assistant', content: `Error: ${data.error?.message || 'API request failed'}` }])
      } else {
        const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.'
        setMessages([...newMessages, { role: 'assistant', content: reply }])
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Could not reach OpenAI. Check your API key and try again.' }])
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-gray-400 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 font-bold text-sm tracking-tight">AI Day Planner</h1>
              <p className="text-gray-400 text-[10px]">Powered by OpenAI</p>
            </div>
          </div>
          <button
            onClick={() => setShowKeyInput(true)}
            className="ml-auto text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
          >
            {apiKey ? 'API key set' : 'Set API key'}
          </button>
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyInput && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-gray-900 font-bold text-lg mb-2">Enter your OpenAI API key</h3>
            <p className="text-gray-500 text-sm mb-4">
              Your key is stored in your browser and sent directly to OpenAI — never stored on a server.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm mb-4 focus:outline-none focus:border-teal-500"
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
                  className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
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
                    ? 'bg-teal-50 text-teal-900 border border-teal-100'
                    : 'bg-gray-50 text-gray-700 border border-gray-100'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-gray-500" />
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-teal-500 animate-spin" />
                <span className="text-gray-400 text-sm">Thinking...</span>
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
                className="bg-gray-50 border border-gray-200 text-gray-600 hover:text-teal-700 hover:bg-teal-50 hover:border-teal-200 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-1.5 focus-within:border-teal-300 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your ideal day..."
              className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 text-sm px-3 py-2.5 outline-none"
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
