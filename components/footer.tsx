"use client"

import React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Instagram, Send, MessageCircle } from "lucide-react"

const footerLinks = {
  products: [
    { label: "مبل راحتی", href: "#" },
    { label: "مبل کلاسیک", href: "#" },
    { label: "صندلی و میز", href: "#" },
    { label: "سرویس خواب", href: "#" },
  ],
  services: [
    { label: "طراحی سفارشی", href: "#" },
    { label: "مشاوره رایگان", href: "#" },
    { label: "تعمیرات", href: "#" },
    { label: "حمل و نصب", href: "#" },
  ],
  company: [
    { label: "درباره ما", href: "#about" },
    { label: "گالری", href: "#gallery" },
    { label: "وبلاگ", href: "#" },
    { label: "تماس با ما", href: "#contact" },
  ],
}

export function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Top gradient border */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-l from-transparent via-white/20 to-transparent" />
      
      <div className="glass py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block">
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-14 h-14 rounded-xl glass-light flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">پ</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">پدر چوب</h2>
                    <p className="text-sm text-muted-foreground">مبلمان لوکس و سفارشی</p>
                  </div>
                </motion.div>
              </Link>
              
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">
                با بیش از ۲۰ سال تجربه در صنعت مبلمان، پدر چوب افتخار دارد که بهترین کیفیت را با طراحی‌های منحصر به فرد به شما ارائه دهد.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a href="tel:+989123456789" className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group">
                  <span className="w-10 h-10 rounded-lg glass-light flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Phone size={18} />
                  </span>
                  <span dir="ltr">۰۹۱۲-۳۴۵-۶۷۸۹</span>
                </a>
                <a href="mailto:info@pedarchoob.com" className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group">
                  <span className="w-10 h-10 rounded-lg glass-light flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Mail size={18} />
                  </span>
                  <span>info@pedarchoob.com</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-10 h-10 rounded-lg glass-light flex items-center justify-center">
                    <MapPin size={18} />
                  </span>
                  <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h3 className="text-white font-semibold mb-4">محصولات</h3>
              <ul className="space-y-2">
                {footerLinks.products.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">خدمات</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">پدر چوب</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div className="flex items-center gap-2 mt-6">
                <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} label="اینستاگرام" />
                <SocialLink href="https://t.me" icon={<Send size={18} />} label="تلگرام" />
                <SocialLink href="https://wa.me" icon={<MessageCircle size={18} />} label="واتساپ" />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © ۱۴۰۴ پدر چوب. تمامی حقوق محفوظ است.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-white transition-colors">حریم خصوصی</Link>
              <Link href="#" className="hover:text-white transition-colors">شرایط استفاده</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-lg glass-light flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  )
}
