"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin, Send, Instagram, MessageCircle, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

const contactInfo = [
  {
    icon: Phone,
    label: "تلفن تماس",
    value: "۰۹۱۲-۳۴۵-۶۷۸۹",
    href: "tel:+989123456789",
    description: "پاسخگویی ۲۴ ساعته",
  },
  {
    icon: Mail,
    label: "ایمیل",
    value: "info@pedarchoob.com",
    href: "mailto:info@pedarchoob.com",
    description: "پاسخ در کمتر از ۲۴ ساعت",
  },
  {
    icon: MapPin,
    label: "آدرس شوروم",
    value: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
    href: "https://maps.google.com",
    description: "امکان بازدید حضوری",
  },
  {
    icon: Clock,
    label: "ساعت کاری",
    value: "شنبه تا پنج‌شنبه",
    description: "۹ صبح تا ۸ شب",
  },
]

const faqs = [
  {
    question: "مدت زمان تحویل سفارش چقدر است؟",
    answer: "مدت زمان تحویل بسته به نوع محصول و پیچیدگی طراحی بین ۳ تا ۶ هفته متغیر است.",
  },
  {
    question: "آیا امکان سفارشی‌سازی محصولات وجود دارد؟",
    answer: "بله، تمام محصولات قابلیت سفارشی‌سازی در ابعاد، رنگ و جنس پارچه را دارند.",
  },
  {
    question: "هزینه ارسال چقدر است؟",
    answer: "ارسال به سراسر کشور رایگان است و نصب توسط تیم متخصص ما انجام می‌شود.",
  },
  {
    question: "شرایط گارانتی چگونه است؟",
    answer: "تمام محصولات دارای ۵ سال گارانتی کلاف و ۲ سال گارانتی پارچه هستند.",
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", phone: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (isSubmitted) setIsSubmitted(false)
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block glass-light px-4 py-1.5 rounded-full text-sm text-white/80 mb-4">
              تماس با ما
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
              با ما در ارتباط باشید
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
              سوالی دارید؟ تیم پشتیبانی ما آماده پاسخگویی به شماست
            </p>
          </motion.div>

          <motion.nav
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/" className="hover:text-white transition-colors">خانه</Link>
            <span>/</span>
            <span className="text-white">تماس با ما</span>
          </motion.nav>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              const content = (
                <motion.div
                  className="glass-card p-6 rounded-2xl h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 glass-light rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} className="text-white" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{info.label}</p>
                  <p className="text-white font-semibold mb-1">{info.value}</p>
                  <p className="text-xs text-muted-foreground">{info.description}</p>
                </motion.div>
              )

              if (info.href) {
                return (
                  <a key={info.label} href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {content}
                  </a>
                )
              }

              return <div key={info.label}>{content}</div>
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-white mb-2">ارسال پیام</h2>
                <p className="text-muted-foreground text-sm mb-8">
                  فرم زیر را پر کنید تا در اسرع وقت با شما تماس بگیریم
                </p>

                {isSubmitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">پیام شما ارسال شد</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت
                    </p>
                    <motion.button
                      onClick={() => setIsSubmitted(false)}
                      className="glass-light px-6 py-3 rounded-xl text-white"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ارسال پیام جدید
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          نام و نام خانوادگی <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                          placeholder="نام شما"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          شماره تماس <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">ایمیل</label>
                        <input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                          placeholder="email@example.com"
                        />
                      </div>
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
                          <option value="complaint" className="bg-background">شکایات</option>
                          <option value="other" className="bg-background">سایر</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm text-muted-foreground mb-2">
                        پیام <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
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
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Social Links */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-white font-semibold mb-4">شبکه‌های اجتماعی</h3>
                <div className="space-y-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 glass-light p-3 rounded-xl text-white/80 hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Instagram size={20} />
                    </div>
                    <div>
                      <p className="font-medium">اینستاگرام</p>
                      <p className="text-xs text-muted-foreground">@pedarchoob</p>
                    </div>
                  </a>
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 glass-light p-3 rounded-xl text-white/80 hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                      <Send size={20} />
                    </div>
                    <div>
                      <p className="font-medium">تلگرام</p>
                      <p className="text-xs text-muted-foreground">@pedarchoob</p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 glass-light p-3 rounded-xl text-white/80 hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <p className="font-medium">واتساپ</p>
                      <p className="text-xs text-muted-foreground">۰۹۱۲۳۴۵۶۷۸۹</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* FAQ */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-white font-semibold mb-4">سوالات متداول</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <p className="text-white text-sm font-medium mb-1">{faq.question}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
