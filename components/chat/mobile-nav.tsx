'use client'

import Link from 'next/link'
import { Scale, MessageCircle, FileText, Briefcase, Home } from 'lucide-react'

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#050d1f]/95 backdrop-blur-xl border-t border-[rgba(255,255,255,0.08)]">
      <div className="flex items-center justify-around py-3">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-[#8892a4] hover:text-[#f0f4ff] transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </Link>
        <Link
          href="/chat"
          className="flex flex-col items-center gap-1 text-[#c9a84c]"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px]">Chat</span>
        </Link>
        <Link
          href="/documents"
          className="flex flex-col items-center gap-1 text-[#8892a4] hover:text-[#f0f4ff] transition-colors"
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px]">Docs</span>
        </Link>
        <Link
          href="/dashboard"
          className="flex flex-col items-center gap-1 text-[#8892a4] hover:text-[#f0f4ff] transition-colors"
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px]">Portal</span>
        </Link>
      </div>
    </nav>
  )
}
