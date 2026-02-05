"use client"

import React from "react"

import { useRef, useState, useCallback, useEffect } from "react"
import { useSpring, useMotionValue } from "framer-motion"

interface MagneticOptions {
  strength?: number
  radius?: number
  springConfig?: {
    stiffness?: number
    damping?: number
  }
}

export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const { 
    strength = 0.3, 
    radius = 200,
    springConfig = { stiffness: 150, damping: 15 }
  } = options

  const ref = useRef<T>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    
    if (distance < radius) {
      const factor = 1 - distance / radius
      x.set(distanceX * strength * factor)
      y.set(distanceY * strength * factor)
      setIsHovered(true)
    } else {
      x.set(0)
      y.set(0)
      setIsHovered(false)
    }
  }, [radius, strength, x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }, [x, y])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  return {
    ref,
    style: {
      x: springX,
      y: springY,
    },
    isHovered,
    onMouseLeave: handleMouseLeave,
  }
}

// Hook for parallax tilt effect on cards
interface TiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  springConfig?: {
    stiffness?: number
    damping?: number
  }
}

export function useTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.02,
    springConfig = { stiffness: 300, damping: 30 }
  } = options

  const ref = useRef<T>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scaleValue = useMotionValue(1)
  
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)
  const springScale = useSpring(scaleValue, springConfig)

  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const tiltX = ((mouseY - centerY) / centerY) * -maxTilt
    const tiltY = ((mouseX - centerX) / centerX) * maxTilt
    
    rotateX.set(tiltX)
    rotateY.set(tiltY)
    scaleValue.set(scale)
    setIsHovered(true)
  }, [maxTilt, scale, rotateX, rotateY, scaleValue])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    scaleValue.set(1)
    setIsHovered(false)
  }, [rotateX, rotateY, scaleValue])

  return {
    ref,
    style: {
      rotateX: springRotateX,
      rotateY: springRotateY,
      scale: springScale,
      transformPerspective: perspective,
    },
    isHovered,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }
}

// Hook for smooth cursor following
export function useSmoothCursor() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springX = useSpring(cursorX, { stiffness: 500, damping: 50 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [cursorX, cursorY])

  return {
    x: springX,
    y: springY,
  }
}
