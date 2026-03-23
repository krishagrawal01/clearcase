'use client'

import { motion } from 'framer-motion'
import { Scale, Plus, ChevronRight, Home, FileText, Users, HelpCircle } from 'lucide-react'
import Link from 'next/link'

const topics = [
  { id: 'divorce', icon: Scale, label: 'Divorce & Separation' },
  { id: 'challan', icon: Home, label: 'Challan & Traffic' },
  { id: 'documents', icon: FileText, label: 'Document Requirements' },
  { id: 'property', icon: Home, label: 'Property Dispute' },
  { id: 'family', icon: Users, label: 'Family Law' },
  { id: 'general', icon: HelpCircle, label: 'General Legal Query' },
]

interface ChatSidebarProps {
  activeTopic: string
  onTopicChange: (topic: string) => void
  onNewChat: () => void
}

export function ChatSidebar({ activeTopic, onTopicChange, onNewChat }: ChatSidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-[270px] h-screen bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border-r border-[rgba(255,255,255,0.08)]">
      {/* Logo */}
      <div className="p-6 border-b border-[rgba(255,255,255,0.08)]">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative">
            <Scale className="w-6 h-6 text-[#c9a84c]" />
            <div className="absolute inset-0 blur-md bg-[#c9a84c] opacity-30" />
          </div>
          <span className="font-serif text-xl font-bold text-[#f0f4ff]">ClearCase</span>
        </Link>
      </div>

      {/* Topics */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="text-xs uppercase tracking-wider text-[#8892a4] mb-3 px-2">
          Legal Topics
        </div>
        <div className="space-y-1">
          {topics.map((topic) => (
            <motion.button
              key={topic.id}
              onClick={() => onTopicChange(topic.id)}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-all duration-200 group ${
                activeTopic === topic.id
                  ? 'bg-[rgba(201,168,76,0.12)] border-l-[3px] border-l-[#c9a84c] text-[#c9a84c]'
                  : 'border-l-[3px] border-l-transparent hover:bg-[rgba(255,255,255,0.05)] text-[#8892a4] hover:text-[#e2e8f0]'
              }`}
            >
              <topic.icon className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                activeTopic === topic.id ? 'text-[#c9a84c]' : ''
              }`} />
              <span className="flex-1 text-[13px] font-medium whitespace-nowrap">{topic.label}</span>
              <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                activeTopic === topic.id ? 'opacity-100' : ''
              }`} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
        <motion.button
          onClick={onNewChat}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-dashed border-[rgba(201,168,76,0.4)] text-[#c9a84c] hover:bg-[rgba(201,168,76,0.05)] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Chat</span>
        </motion.button>
      </div>
    </aside>
  )
}
