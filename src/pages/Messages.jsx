import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { Search, Phone, Video, MoreVertical, Check, CheckCheck, ChevronLeft, MessageCircle } from 'lucide-react'

const conversations = [
  { id: 1, name: 'Vic Falls Electrical', avatar: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=100&h=100&fit=crop&q=80', lastMessage: 'Sure, I\'ll be there at 10 AM.', time: '2 min ago', unread: 2, online: true },
  { id: 2, name: 'Mosi Plumbing', avatar: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=100&h=100&fit=crop&q=80', lastMessage: 'The pipe has been fixed.', time: '1 hour ago', unread: 0, online: false },
  { id: 3, name: 'Wild Horizon Photo', avatar: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=100&h=100&fit=crop&q=80', lastMessage: 'Great, see you Saturday!', time: '3 hours ago', unread: 0, online: true },
  { id: 4, name: 'Zambezi Carpentry', avatar: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=100&h=100&fit=crop&q=80', lastMessage: 'The quote is ready.', time: '1 day ago', unread: 1, online: false },
  { id: 5, name: 'Batau Medical Centre', avatar: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=100&h=100&fit=crop&q=80', lastMessage: 'Your appointment is confirmed.', time: '2 days ago', unread: 0, online: true },
]

const chatMessages = [
  { id: 1, from: 'them', content: 'Hi! I\'d like to confirm our appointment for tomorrow.', time: '10:30 AM' },
  { id: 2, from: 'me', content: 'Sure, what time works best?', time: '10:32 AM' },
  { id: 3, from: 'them', content: '10 AM works great. I\'ll be there.', time: '10:33 AM' },
  { id: 4, from: 'them', content: 'Also, could you send me the address?', time: '10:34 AM' },
  { id: 5, from: 'me', content: 'Sure, I\'ll be there at 10 AM.', time: '10:35 AM', read: true },
]

export default function Messages() {
  const { conversationId } = useParams()
  const [activeChat, setActiveChat] = useState(conversationId || null)
  const [message, setMessage] = useState('')

  const activeConversation = conversations.find(c => c.id === Number(activeChat))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen pt-16 flex"
    >
      {/* Conversation List */}
      <div className={`w-full lg:w-80 border-r border-gray-100 bg-white ${activeChat ? 'hidden lg:flex' : 'flex'} flex-col`}>
        <div className="p-4 border-b border-gray-100">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Home
          </Link>
          <h1 className="text-lg font-bold">Messages</h1>
          <div className="mt-3 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search messages..." className="flex-1 bg-transparent border-none outline-none text-sm" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveChat(conv.id)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors ${
                Number(activeChat) === conv.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <img src={conv.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
                {conv.online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm truncate">{conv.name}</h3>
                  <span className="text-xs text-gray-400 flex-shrink-0">{conv.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white font-medium">{conv.unread}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col bg-gray-50 ${!activeChat ? 'hidden lg:flex' : 'flex'}`}>
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
              <div className="flex items-center gap-3">
                <button className="lg:hidden" onClick={() => setActiveChat(null)}>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <img src={activeConversation.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h3 className="font-medium text-sm">{activeConversation.name}</h3>
                  <p className="text-xs text-green-600">{activeConversation.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <Phone className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <Video className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] lg:max-w-[60%] ${msg.from === 'me' ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-900'} rounded-2xl px-4 py-3`}>
                    <p className="text-sm">{msg.content}</p>
                    <div className={`flex items-center gap-1 mt-1 ${msg.from === 'me' ? 'justify-end' : ''}`}>
                      <span className={`text-xs ${msg.from === 'me' ? 'text-white/60' : 'text-gray-400'}`}>{msg.time}</span>
                      {msg.from === 'me' && (msg.read ? <CheckCheck className="w-3 h-3 text-blue-400" /> : <Check className="w-3 h-3 text-white/60" />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400"
                />
                <button className="px-5 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-1">Your messages</h3>
              <p className="text-sm text-gray-500">Select a conversation to start chatting.</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
