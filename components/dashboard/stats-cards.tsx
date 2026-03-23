'use client'

import { motion } from 'framer-motion'
import { Users, Briefcase, Brain, Clock } from 'lucide-react'
import { AnimatedCounter } from '@/components/animated-counter'

const stats = [
  {
    icon: Users,
    value: 12,
    label: 'Active Clients',
    trend: '+3 this month',
    gradient: 'from-[#c9a84c] to-[#e8d48a]',
  },
  {
    icon: Briefcase,
    value: 8,
    label: 'Cases This Month',
    trend: '+2 from last month',
    gradient: 'from-[#7b61ff] to-[#a78bfa]',
  },
  {
    icon: Brain,
    value: 47,
    label: 'AI Analyses Done',
    trend: '+12% this month',
    gradient: 'from-[#14b8a6] to-[#5eead4]',
  },
  {
    icon: Clock,
    value: 23,
    label: 'Time Saved',
    suffix: ' hrs',
    trend: 'This month',
    gradient: 'from-[#f97316] to-[#fb923c]',
  },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

export function StatsCards() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          className="relative p-5 md:p-6 rounded-2xl bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[rgba(201,168,76,0.3)]"
        >
          {/* Icon */}
          <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4`}>
            <stat.icon className="w-5 h-5 text-[#050d1f]" />
          </div>

          {/* Value */}
          <div className="font-serif text-3xl md:text-4xl font-bold text-[#f0f4ff] mb-1">
            <AnimatedCounter end={stat.value} suffix={stat.suffix || ''} duration={1.5} />
          </div>

          {/* Label */}
          <div className="text-sm text-[#8892a4] mb-2">{stat.label}</div>

          {/* Trend */}
          <div className="text-xs text-[#c9a84c]">{stat.trend}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}
