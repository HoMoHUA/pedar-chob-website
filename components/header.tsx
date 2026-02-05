"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
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
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  const blurAmount = useTransform(scrollY, [0, 100], [8, 20])
  const bgOpacity = useTransform(scrollY, [0, 100], [0.4, 0.8])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: `blur(${blurAmount.get()}px) saturate(180%)`,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <motion.div
        className="absolute inset-0 border-b"
        style={{
          backgroundColor: `rgba(26, 43, 76, ${bgOpacity.get()})`,
          borderColor: "rgba(255, 255, 255, 0.1)",
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-12 h-12 rounded-xl glass-light flex items-center justify-center">
                <span className="text-2xl font-bold text-white">پ</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">پدر چوب</h1>
                <p className="text-xs text-muted-foreground">مبلمان لوکس</p>
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
              className="glass-light px-5 py-2.5 rounded-xl flex items-center gap-2 text-white text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Phone size={16} />
              <span>تماس بگیرید</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden glass-light p-2.5 rounded-xl text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full right-0 left-0 glass border-t border-white/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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
                className="glass-light mt-4 px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-white font-medium"
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
    </motion.header>
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
