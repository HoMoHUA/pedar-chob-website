"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Quote, ChevronRight, ChevronLeft, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "محمد رضایی",
    role: "طراح داخلی",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    content: "کیفیت مبلمان پدر چوب فوق‌العاده است. من برای چندین پروژه با آن‌ها همکاری کرده‌ام و همیشه نتیجه بی‌نقص بوده است.",
    rating: 5,
  },
  {
    id: 2,
    name: "سارا احمدی",
    role: "صاحب خانه",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "از لحظه سفارش تا تحویل و نصب، تجربه‌ای عالی داشتم. مبل راحتی که سفارش دادم دقیقاً همان چیزی بود که می‌خواستم.",
    rating: 5,
  },
  {
    id: 3,
    name: "علی محمدی",
    role: "معمار",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "انعطاف‌پذیری در طراحی سفارشی و توجه به جزئیات، پدر چوب را از سایر تولیدکنندگان متمایز می‌کند.",
    rating: 5,
  },
  {
    id: 4,
    name: "مریم کریمی",
    role: "دکوراتور",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "خدمات پس از فروش عالی و گارانتی قوی، اطمینان خاطر فوق‌العاده‌ای به مشتریان می‌دهد. توصیه می‌کنم!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(goToNext, 6000)
    return () => clearInterval(timer)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  return (
    <section className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block glass-light px-4 py-1.5 rounded-full text-sm text-white/80 mb-4">
            نظرات مشتریان
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            چه می‌گویند؟
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            رضایت مشتریان، افتخار ماست
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Main Card */}
          <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-[350px]">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 w-16 h-16 glass-light rounded-2xl flex items-center justify-center opacity-50">
              <Quote size={32} className="text-white" />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="text-center"
              >
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full rounded-full object-cover border-2 border-white/20"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white text-lg md:text-xl leading-relaxed mb-6 max-w-2xl mx-auto text-pretty">
                  &ldquo;{testimonials[currentIndex].content}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <p className="text-white font-semibold">{testimonials[currentIndex].name}</p>
                  <p className="text-muted-foreground text-sm">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute bottom-8 right-8 left-8 flex items-center justify-between">
              <motion.button
                onClick={goToPrevious}
                className="w-12 h-12 glass-light rounded-full flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="نظر قبلی"
              >
                <ChevronRight size={20} />
              </motion.button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1)
                      setCurrentIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-white w-6" : "bg-white/30"
                    }`}
                    aria-label={`نظر ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={goToNext}
                className="w-12 h-12 glass-light rounded-full flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="نظر بعدی"
              >
                <ChevronLeft size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
