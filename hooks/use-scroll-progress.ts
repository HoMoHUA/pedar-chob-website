"use client"

import React from "react"

import { useState, useEffect, useCallback, useRef } from "react"

interface ScrollProgressOptions {
  threshold?: number
  throttleMs?: number
}

export function useScrollProgress(options: ScrollProgressOptions = {}) {
  const { threshold = 0, throttleMs = 16 } = options
  const [progress, setProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const lastScrollTime = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  const calculateProgress = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollTop = window.scrollY
    return Math.min(Math.max(scrollTop / scrollHeight, 0), 1)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      
      // Throttle scroll updates
      if (now - lastScrollTime.current < throttleMs) {
        return
      }
      lastScrollTime.current = now

      const currentProgress = calculateProgress()
      
      if (Math.abs(currentProgress - progress) > threshold) {
        setProgress(currentProgress)
      }

      setIsScrolling(true)

      // Reset isScrolling after scroll ends
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Initial calculation
    setProgress(calculateProgress())

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [calculateProgress, progress, threshold, throttleMs])

  return { progress, isScrolling }
}

export function useElementScrollProgress(elementRef: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height

      // Calculate how much of the element is visible
      const visibleTop = Math.max(0, rect.top)
      const visibleBottom = Math.min(windowHeight, rect.bottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)

      // Calculate progress based on element position
      const totalTravel = windowHeight + elementHeight
      const traveled = windowHeight - rect.top
      const calculatedProgress = Math.min(Math.max(traveled / totalTravel, 0), 1)

      setProgress(calculatedProgress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [elementRef])

  return progress
}
