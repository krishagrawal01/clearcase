'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Scale, ArrowLeft } from 'lucide-react'
import { DocumentChecker } from '@/components/documents/document-checker'
import { CustomCursor } from '@/components/custom-cursor'
import { AnimatedBackground } from '@/components/animated-background'
import { MobileNav } from '@/components/chat/mobile-nav'

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-[#050d1f] pb-20 md:pb-0">
      <CustomCursor />
      <AnimatedBackground />

      {/* Header */}
      <header className="relative z-10 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[#8892a4] hover:text-[#f0f4ff] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#c9a84c]" />
              <span className="font-serif text-xl font-bold text-[#f0f4ff]">
                ClearCase
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f4ff] mb-4">
              Document Requirements{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#e8d48a] bg-clip-text text-transparent">
                Checker
              </span>
            </h1>
            <p className="text-lg text-[#8892a4] max-w-2xl mx-auto">
              Get the exact documents you need for any government service or legal process. 
              Never be unprepared again.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Document Checker */}
      <section className="relative z-10 px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <DocumentChecker />
        </motion.div>
      </section>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}
