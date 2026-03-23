'use client'

import Link from 'next/link'
import { Scale } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative py-16 px-4 border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-[#c9a84c]" />
              <span className="font-serif text-xl font-bold text-[#f0f4ff]">ClearCase</span>
            </Link>
            <p className="text-[#8892a4] text-sm leading-relaxed max-w-sm mb-6">
              AI-powered legal guidance platform built for India. Get instant answers on divorce, 
              challans, property disputes and more.
            </p>
            <p className="text-[#8892a4] text-xs">
              © 2025 ClearCase. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-[#f0f4ff] mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/chat" className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm">
                  Legal Chat
                </Link>
              </li>
              <li>
                <Link href="/documents" className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm">
                  Documents
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm">
                  Lawyer Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#f0f4ff] mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
