'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Scale, ArrowLeft } from 'lucide-react'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { ClientTable } from '@/components/dashboard/client-table'
import { CustomCursor } from '@/components/custom-cursor'
import { AnimatedBackground } from '@/components/animated-background'
import { MobileNav } from '@/components/chat/mobile-nav'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#050d1f] pb-20 md:pb-0">
      <CustomCursor />
      <AnimatedBackground />

      {/* Header */}
      <header className="relative z-10 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
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
                  Lawyer Dashboard
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium text-[#f0f4ff]">Adv. Rahul Sharma</div>
                <div className="text-xs text-[#8892a4]">Bar Council: MH/1234/2020</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8d48a] flex items-center justify-center text-[#050d1f] font-semibold">
                RS
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#f0f4ff] mb-2">
              Welcome back, Rahul
            </h1>
            <p className="text-[#8892a4]">
              Here&apos;s an overview of your practice this month.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-10">
            <StatsCards />
          </div>

          {/* Client Table */}
          <ClientTable />
        </motion.div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}
