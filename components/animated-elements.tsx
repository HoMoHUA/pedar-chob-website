"use client"

import React from "react"

import { useRef, ReactNode } from "react"
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion"

// Fade in on scroll
interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  distance?: number
  once?: boolean
}

export function FadeIn({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up",
  distance = 30,
  once = true
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-50px" })

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  )
}

// Staggered children animation
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

export function StaggerContainer({ 
  children, 
  className = "",
  staggerDelay = 0.1,
  once = true
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ 
  children, 
  className = "" 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// Parallax wrapper
interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
}

export function Parallax({ 
  children, 
  className = "",
  speed = 0.5,
  direction = "up"
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const multiplier = direction === "up" ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

// Scale on scroll
interface ScaleOnScrollProps {
  children: ReactNode
  className?: string
  minScale?: number
  maxScale?: number
}

export function ScaleOnScroll({
  children,
  className = "",
  minScale = 0.8,
  maxScale = 1,
}: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [minScale, maxScale])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ scale, opacity }}>
        {children}
      </motion.div>
    </div>
  )
}

// Reveal text animation
interface RevealTextProps {
  text: string
  className?: string
  delay?: number
}

export function RevealText({ text, className = "", delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const words = text.split(" ")

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.05,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Magnetic button component
interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ 
  children, 
  className = "",
  strength = 0.3
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = "translate(0, 0)"
  }

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

// Scroll progress indicator
interface ScrollProgressProps {
  className?: string
  color?: string
}

export function ScrollProgress({ className = "", color = "white" }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className={`fixed top-0 right-0 left-0 h-1 origin-right z-50 ${className}`}
      style={{
        scaleX: scrollYProgress,
        backgroundColor: color,
      }}
    />
  )
}

// Floating element
interface FloatingProps {
  children: ReactNode
  className?: string
  duration?: number
  distance?: number
}

export function Floating({ 
  children, 
  className = "",
  duration = 3,
  distance = 10
}: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// Blur on scroll
interface BlurOnScrollProps {
  children: ReactNode
  className?: string
  maxBlur?: number
}

export function BlurOnScroll({ 
  children, 
  className = "",
  maxBlur = 10
}: BlurOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const blur = useTransform(scrollYProgress, [0, 1], [0, maxBlur])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{
          filter: blur.get() > 0 ? `blur(${blur.get()}px)` : undefined,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Counter animation
interface AnimatedCounterProps {
  value: number
  className?: string
  duration?: number
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({
  value,
  className = "",
  duration = 2,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
      >
        {isInView && (
          <Counter value={value} duration={duration} />
        )}
      </motion.span>
      {suffix}
    </span>
  )
}

function Counter({ value, duration }: { value: number; duration: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)

  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.span>
    </motion.span>
  )
}
