'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock, Zap, Scale } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          <span className="text-[#f0f4ff]">Legal Clarity,</span>
          <br />
          <span className="bg-gradient-to-r from-[#c9a84c] via-[#e8d48a] to-[#c9a84c] bg-clip-text text-transparent">
            For Every Indian.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-[#8892a4] max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Instant AI-powered guidance on divorce, challans, property disputes and more. 
          In English or Hindi. Available 24/7.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/chat">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-8 py-4 rounded-xl font-semibold text-[#050d1f] gold-shimmer shadow-lg shadow-[rgba(201,168,76,0.25)] flex items-center justify-center gap-2"
            >
              Get Started Free
              <span className="text-lg">→</span>
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl font-semibold text-[#c9a84c] border border-[#c9a84c] bg-[#0f1e3d] transition-all duration-300 flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-[#c9a84c] hover:via-[#e8d48a] hover:to-[#c9a84c] hover:text-[#050d1f]"
          >
            Watch Demo
            <span className="text-lg">▶</span>
          </motion.button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 md:gap-8 text-[#8892a4] text-sm"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#c9a84c]" />
            <span>100% Private</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#c9a84c]" />
            <span>Instant Answers</span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#c9a84c]" />
            <span>India-specific Law</span>
          </div>
        </motion.div>
      </motion.div>

    </section>
  )
}
