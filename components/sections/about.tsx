"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Award, Users, Clock, Target } from "lucide-react"

const stats = [
  { icon: Clock, value: "۲۰+", label: "سال تجربه" },
  { icon: Users, value: "۵۰۰+", label: "مشتری راضی" },
  { icon: Award, value: "۱۵+", label: "جایزه کیفیت" },
  { icon: Target, value: "۱۰۰۰+", label: "پروژه موفق" },
]

const timeline = [
  {
    year: "۱۳۸۲",
    title: "آغاز فعالیت",
    description: "شروع کار با یک کارگاه کوچک و تیم ۳ نفره",
  },
  {
    year: "۱۳۸۸",
    title: "گسترش کارگاه",
    description: "افتتاح کارگاه بزرگ‌تر و استخدام استادکاران حرفه‌ای",
  },
  {
    year: "۱۳۹۵",
    title: "شوروم اول",
    description: "افتتاح اولین شوروم نمایشی در تهران",
  },
  {
    year: "۱۴۰۲",
    title: "شوروم دیجیتال",
    description: "راه‌اندازی شوروم دیجیتال و فروشگاه آنلاین",
  },
]

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative rounded-3xl overflow-hidden glass-card"
              style={{ y: imageY }}
            >
              <img
                src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&q=80"
                alt="کارگاه پدر چوب"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              
              {/* Floating card */}
              <motion.div
                className="absolute bottom-6 right-6 left-6 glass p-4 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="text-white font-semibold mb-1">کارگاه تولید</p>
                <p className="text-muted-foreground text-sm">
                  بیش از ۲۰۰۰ متر مربع فضای تولید مجهز
                </p>
              </motion.div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 glass-light rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 glass-light rounded-2xl -z-10" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block glass-light px-4 py-1.5 rounded-full text-sm text-white/80 mb-4">
              درباره ما
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-balance">
              داستان پدر چوب
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                پدر چوب با بیش از دو دهه تجربه در صنعت مبلمان، همواره بر کیفیت، 
                خلاقیت و رضایت مشتری تمرکز داشته است. ما با افتخار، مبلمانی تولید 
                می‌کنیم که نه تنها زیبا، بلکه ماندگار است.
              </p>
              <p>
                تیم ما شامل استادکاران حرفه‌ای، طراحان خلاق و متخصصان دکوراسیون 
                داخلی است که با هم‌افزایی، بهترین تجربه را برای مشتریان فراهم می‌کنند.
              </p>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.slice(0, 2).map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    className="glass-card p-4 rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 glass-light rounded-xl flex items-center justify-center">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">مسیر رشد ما</h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 right-0 left-0 h-px bg-gradient-to-l from-transparent via-white/20 to-transparent hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  {/* Dot */}
                  <div className="w-4 h-4 bg-white rounded-full mx-auto mb-4 relative z-10 hidden md:block">
                    <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30" />
                  </div>
                  
                  <div className="glass-card p-6 rounded-2xl">
                    <span className="inline-block glass-light px-3 py-1 rounded-full text-xs text-white/80 mb-3">
                      {item.year}
                    </span>
                    <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Full Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="glass-card p-6 rounded-2xl text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 glass-light rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} className="text-white" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
