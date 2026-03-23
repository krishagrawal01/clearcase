'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Lock } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage('')
    }
  }

  return (
    <div className="p-4 md:p-6 border-t border-[rgba(255,255,255,0.08)]">
      <form onSubmit={handleSubmit}>
        <div className="relative bg-[rgba(255,255,255,0.04)] backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-2xl transition-all duration-300 focus-within:border-[rgba(201,168,76,0.4)] focus-within:shadow-lg focus-within:shadow-[rgba(201,168,76,0.1)]">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your legal situation..."
            disabled={disabled}
            className="w-full bg-transparent px-5 py-4 pr-14 text-[#f0f4ff] placeholder-[#8892a4] focus:outline-none disabled:opacity-50"
          />
          <motion.button
            type="submit"
            disabled={!message.trim() || disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#b8983f] text-[#050d1f] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
      
      {/* Privacy Notice */}
      <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[#8892a4]">
        <Lock className="w-3 h-3" />
        <span>Your conversations are private</span>
      </div>
    </div>
  )
}
