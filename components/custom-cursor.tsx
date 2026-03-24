'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

function CustomCursorInner() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <motion.div
      className="fixed w-2 h-2 bg-[#c9a84c] rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        boxShadow: '0 0 10px rgba(201, 168, 76, 0.5), 0 0 20px rgba(201, 168, 76, 0.3)',
      }}
      animate={{
        x: position.x - 4,
        y: position.y - 4,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    />
  )
}

export const CustomCursor = dynamic(() => Promise.resolve(CustomCursorInner), {
  ssr: false,
})
