"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Sparkles } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Direct transforms for smoother, lag-free scroll performance
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.03])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden will-change-transform pt-24"
    >
      {/* Full Screen Background Image - GPU accelerated */}
      <motion.div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{ scale: imageScale }}
      >
        <Image
          src="/images/hero-furniture.jpg"
          alt="مبلمان لوکس پدر چوب"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2B4C]/70 via-[#1A2B4C]/60 to-[#1A2B4C]/90" />
        {/* Additional vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(26,43,76,0.4)_100%)]" />
      </motion.div>

      {/* Subtle Background Effects - optimized for performance */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Static gradient orbs - no animation for better performance */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-2xl opacity-40" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/3 rounded-full blur-2xl opacity-30" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content - GPU accelerated for smooth scrolling */}
      <motion.div
        className="relative z-[2] max-w-5xl mx-auto px-6 text-center will-change-transform"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 glass-light px-4 py-2 rounded-full mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Sparkles size={16} className="text-white/80" />
          <span className="text-sm text-white/80">بیش از ۲۰ سال تجربه در صنعت مبلمان</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="block text-balance">شوروم دیجیتال</span>
          <span className="block text-gradient mt-2">پدر چوب</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          تجربه‌ای منحصربه‌فرد از مبلمان لوکس، طراحی سفارشی و کیفیت برتر.
          هر قطعه، داستانی از هنر و مهارت است.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.a
            href="#products"
            className="group relative px-8 py-4 bg-white text-primary-foreground rounded-xl font-semibold overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="relative z-10">مشاهده محصولات</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-l from-white to-gray-100"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          
          <motion.a
            href="#contact"
            className="glass-light px-8 py-4 rounded-xl font-semibold text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            درخواست مشاوره رایگان
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <StatItem value="۲۰+" label="سال تجربه" />
          <StatItem value="۵۰۰+" label="پروژه موفق" />
          <StatItem value="۱۰۰%" label="رضایت مشتری" />
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.a
          href="#features"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-white transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs">اسکرول کنید</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
