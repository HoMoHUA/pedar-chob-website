"use client"

import React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Phone, Mail, MapPin, Send, Instagram, MessageCircle, Clock } from "lucide-react"

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setFormState({ name: "", phone: "", email: "", subject: "", message: "" })
    alert("پیام شما با موفقیت ارسال شد!")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />
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
            تماس با ما
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            با ما در ارتباط باشید
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            سوالی دارید؟ تیم پشتیبانی ما آماده پاسخگویی به شماست
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Info Cards */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-white font-semibold mb-4">اطلاعات تماس</h3>
              <div className="space-y-4">
                <ContactItem
                  icon={<Phone size={18} />}
                  label="تلفن"
                  value="۰۹۱۲-۳۴۵-۶۷۸۹"
                  href="tel:+989123456789"
                />
                <ContactItem
                  icon={<Mail size={18} />}
                  label="ایمیل"
                  value="info@pedarchoob.com"
                  href="mailto:info@pedarchoob.com"
                />
                <ContactItem
                  icon={<MapPin size={18} />}
                  label="آدرس"
                  value="تهران، خیابان ولیعصر، پلاک ۱۲۳"
                />
                <ContactItem
                  icon={<Clock size={18} />}
                  label="ساعت کاری"
                  value="شنبه تا پنج‌شنبه | ۹ صبح تا ۸ شب"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-white font-semibold mb-4">شبکه‌های اجتماعی</h3>
              <div className="flex gap-3">
                <SocialButton
                  href="https://instagram.com"
                  icon={<Instagram size={20} />}
                  label="اینستاگرام"
                />
                <SocialButton
                  href="https://t.me"
                  icon={<Send size={20} />}
                  label="تلگرام"
                />
                <SocialButton
                  href="https://wa.me"
                  icon={<MessageCircle size={20} />}
                  label="واتساپ"
                />
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass-card p-2 rounded-2xl overflow-hidden">
              <div className="aspect-video rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                  alt="نقشه موقعیت فروشگاه"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                  <motion.a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MapPin size={18} />
                    <span>مشاهده در نقشه</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-6">فرم تماس</h3>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <FormInput
                  label="نام و نام خانوادگی"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  label="شماره تماس"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <FormInput
                  label="ایمیل"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">موضوع</label>
                  <select
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                  >
                    <option value="" className="bg-background">انتخاب کنید</option>
                    <option value="consultation" className="bg-background">درخواست مشاوره</option>
                    <option value="order" className="bg-background">سفارش محصول</option>
                    <option value="support" className="bg-background">پشتیبانی</option>
                    <option value="other" className="bg-background">سایر</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-muted-foreground mb-2">پیام</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  placeholder="پیام خود را بنویسید..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>در حال ارسال...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>ارسال پیام</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex items-start gap-3 group">
      <div className="w-10 h-10 glass-light rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="text-white text-sm">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </a>
    )
  }

  return content
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 glass-light py-3 rounded-xl flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      aria-label={label}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </motion.a>
  )
}

function FormInput({
  label,
  name,
  type,
  value,
  onChange,
  required,
}: {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm text-muted-foreground mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
      />
    </div>
  )
}
