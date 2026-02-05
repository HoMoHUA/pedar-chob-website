"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, Instagram, Send } from "lucide-react"

const navLinks = [
  { href: "#home", label: "خانه" },
  { href: "#products", label: "محصولات" },
  { href: "#gallery", label: "گالری" },
  { href: "#about", label: "درباره ما" },
  { href: "#contact", label: "تماس" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Collapse header after scrolling 150px
      if (window.scrollY > 150) {
        setIsCollapsed(true)
      } else {
        setIsCollapsed(false)
        setIsExpanded(false)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Toggle expanded state when collapsed button is clicked
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  // Full header (when not scrolled or when expanded)
  const showFullHeader = !isCollapsed || isExpanded

  return (
    <>
      {/* Full Width Header */}
      <AnimatePresence>
        {showFullHeader && (
          <motion.header
            className="fixed top-0 right-0 left-0 z-50 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <motion.div
              className="max-w-7xl mx-auto glass rounded-2xl border border-white/10"
              layoutId="header-container"
            >
              <div className="relative px-6 py-4">
                <div className="flex items-center justify-between">
                  {/* Logo */}
                  <Link href="/" className="group">
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                        <span className="text-2xl font-bold text-white">پ</span>
                      </div>
                      <div className="hidden sm:block">
                        <h1 className="text-xl font-bold text-white">پدر چوب</h1>
                        <p className="text-xs text-white/60">مبلمان لوکس</p>
                      </div>
                    </motion.div>
                  </Link>

                  {/* Desktop Navigation */}
                  <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                      <MagneticLink key={link.href} href={link.href}>
                        {link.label}
                      </MagneticLink>
                    ))}
                  </nav>

                  {/* CTA & Social */}
                  <div className="hidden lg:flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <SocialIcon href="https://instagram.com" icon={<Instagram size={18} />} />
                      <SocialIcon href="https://t.me" icon={<Send size={18} />} />
                    </div>
                    <motion.a
                      href="tel:+989123456789"
                      className="bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-xl flex items-center gap-2 text-white text-sm font-medium border border-white/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Phone size={16} />
                      <span>تماس بگیرید</span>
                    </motion.a>
                    
                    {/* Close button when expanded */}
                    {isExpanded && (
                      <motion.button
                        className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl text-white border border-white/20"
                        onClick={toggleExpanded}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        aria-label="بستن منو"
                      >
                        <X size={20} />
                      </motion.button>
                    )}
                  </div>

                  {/* Mobile Menu Button */}
                  <div className="lg:hidden flex items-center gap-2">
                    {isExpanded && (
                      <motion.button
                        className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl text-white border border-white/20"
                        onClick={toggleExpanded}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="بستن منو"
                      >
                        <X size={24} />
                      </motion.button>
                    )}
                    <motion.button
                      className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl text-white border border-white/20"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
                    >
                      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    className="lg:hidden border-t border-white/10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  >
                    <nav className="flex flex-col p-6 gap-2">
                      {navLinks.map((link, index) => (
                        <motion.a
                          key={link.href}
                          href={link.href}
                          className="text-white py-3 px-4 rounded-xl hover:bg-white/10 transition-colors text-lg"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </motion.a>
                      ))}
                      <motion.a
                        href="tel:+989123456789"
                        className="bg-white/10 mt-4 px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-white font-medium border border-white/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Phone size={18} />
                        <span>تماس بگیرید</span>
                      </motion.a>
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Collapsed Button (shown after scroll) */}
      <AnimatePresence>
        {isCollapsed && !isExpanded && (
          <motion.button
            className="fixed top-4 left-4 z-50 glass w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 shadow-lg shadow-black/20"
            onClick={toggleExpanded}
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            aria-label="باز کردن منو"
          >
            <Menu size={24} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

function MagneticLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.2, y: y * 0.2 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.a
      href={href}
      className="relative px-4 py-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
      <motion.span
        className="absolute bottom-1 right-4 left-4 h-0.5 bg-white/50 rounded-full origin-right"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  )
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-white/70 hover:text-white transition-colors"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {icon}
    </motion.a>
  )
}
