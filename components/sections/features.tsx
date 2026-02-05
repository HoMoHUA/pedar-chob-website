"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Gem, Palette, Truck, Shield, Wrench, HeartHandshake } from "lucide-react"

const features = [
  {
    icon: Gem,
    title: "کیفیت برتر",
    description: "استفاده از بهترین متریال‌ها و چوب‌های مرغوب برای ساخت مبلمانی ماندگار",
  },
  {
    icon: Palette,
    title: "طراحی سفارشی",
    description: "امکان سفارشی‌سازی کامل بر اساس سلیقه و فضای منزل شما",
  },
  {
    icon: Truck,
    title: "حمل و نصب رایگان",
    description: "ارسال رایگان به سراسر کشور و نصب حرفه‌ای توسط تیم متخصص",
  },
  {
    icon: Shield,
    title: "گارانتی ۵ ساله",
    description: "تضمین کیفیت با گارانتی ۵ ساله و خدمات پس از فروش",
  },
  {
    icon: Wrench,
    title: "تعمیر و نگهداری",
    description: "خدمات تعمیر و نوسازی مبلمان قدیمی با بهترین کیفیت",
  },
  {
    icon: HeartHandshake,
    title: "مشاوره تخصصی",
    description: "مشاوره رایگان توسط کارشناسان مجرب دکوراسیون داخلی",
  },
]

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="features" className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block glass-light px-4 py-1.5 rounded-full text-sm text-white/80 mb-4">
            چرا پدر چوب؟
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            ویژگی‌های منحصر به فرد ما
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            با انتخاب پدر چوب، از خدماتی بهره‌مند می‌شوید که تفاوت را در هر جزئیات احساس خواهید کرد
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  feature,
  index,
  isInView,
}: {
  feature: typeof features[0]
  index: number
  isInView: boolean
}) {
  const Icon = feature.icon

  return (
    <motion.div
      className="group glass-card rounded-2xl p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Hover gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-14 h-14 rounded-xl glass-light flex items-center justify-center mb-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon size={24} className="text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}
