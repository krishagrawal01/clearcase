'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Heart, FileText, Car, Briefcase, ArrowRight, Users, FileCheck, MapPin, Gavel } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Divorce & Separation',
    description: 'Complete guidance under Hindu Marriage Act & Special Marriage Act. Understand alimony, custody & property rights.',
    stat: '2,500+',
    statLabel: 'Cases Guided',
    gradient: 'from-[#c9a84c] to-[#e8d48a]',
    href: '/chat?topic=divorce',
    iconBg: 'bg-[#c9a84c]/10',
  },
  {
    icon: FileText,
    title: 'Document Checker',
    description: 'Never be caught unprepared. Get exact document checklists for passport, license, property and government services.',
    stat: '50+',
    statLabel: 'Document Types',
    gradient: 'from-[#6366f1] to-[#818cf8]',
    href: '/documents',
    iconBg: 'bg-[#6366f1]/10',
  },
  {
    icon: Car,
    title: 'Challan & Traffic',
    description: 'Find the fastest, cheapest way to resolve any traffic challan. Get state-specific fine details and payment options.',
    stat: '29',
    statLabel: 'States Covered',
    gradient: 'from-[#14b8a6] to-[#5eead4]',
    href: '/chat?topic=challan',
    iconBg: 'bg-[#14b8a6]/10',
  },
  {
    icon: Briefcase,
    title: 'Lawyer Suite',
    description: 'Professional tools for advocates — client management, IPC section finder, and AI-powered case analysis.',
    stat: '500+',
    statLabel: 'Lawyers Trust Us',
    gradient: 'from-[#f97316] to-[#fb923c]',
    href: '/dashboard',
    iconBg: 'bg-[#f97316]/10',
  },
]

const additionalFeatures = [
  { icon: Users, label: 'Family Law', value: '15+ Topics' },
  { icon: FileCheck, label: 'Property Disputes', value: 'Complete Guide' },
  { icon: MapPin, label: 'All Indian States', value: 'Supported' },
  { icon: Gavel, label: 'IPC Sections', value: '500+ Indexed' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="relative py-24 md:py-32 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] mb-6">
            <span className="text-[#c9a84c] text-sm font-medium">Comprehensive Legal Tools</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f4ff] mb-4">
            Everything You Need
          </h2>
          <p className="text-[#8892a4] text-lg max-w-2xl mx-auto">
            Powerful legal tools designed specifically for modern India
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <Link href={feature.href}>
                <div className="relative p-8 rounded-2xl bg-[#0a1628] border border-[rgba(255,255,255,0.06)] transition-all duration-300 hover:border-[rgba(201,168,76,0.3)] hover:shadow-xl hover:shadow-[rgba(201,168,76,0.05)] h-full">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgba(201,168,76,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Header with icon and stat */}
                  <div className="relative flex items-start justify-between mb-6">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient}`}>
                      <feature.icon className="w-7 h-7 text-[#050d1f]" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#c9a84c]">{feature.stat}</div>
                      <div className="text-xs text-[#8892a4]">{feature.statLabel}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="relative font-serif text-xl md:text-2xl font-bold text-[#f0f4ff] mb-3">
                    {feature.title}
                  </h3>
                  <p className="relative text-[#8892a4] leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Learn more link */}
                  <div className="relative inline-flex items-center gap-2 text-[#c9a84c] font-medium text-sm group/link">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {additionalFeatures.map((item, index) => (
            <div
              key={item.label}
              className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-center"
            >
              <item.icon className="w-5 h-5 text-[#c9a84c] mx-auto mb-2" />
              <div className="text-[#f0f4ff] font-semibold text-sm mb-1">{item.value}</div>
              <div className="text-[#8892a4] text-xs">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
