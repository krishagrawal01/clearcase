'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { AnimatedCounter } from '@/components/animated-counter'

const stats = [
  { value: 10000, suffix: '+', label: 'Queries Resolved' },
  { value: 500, suffix: '+', label: 'Lawyers Onboarded' },
  { value: 20, suffix: '+', label: 'Legal Categories' },
]

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="stats" className="relative py-16 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative p-8 md:p-12 rounded-2xl bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(201,168,76,0.2)]"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="relative text-center">
                {/* Divider */}
                {index > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px bg-gradient-to-b from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />
                )}
                
                <div className="font-serif text-4xl md:text-5xl font-bold text-[#c9a84c] mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <div className="text-[#8892a4] text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
