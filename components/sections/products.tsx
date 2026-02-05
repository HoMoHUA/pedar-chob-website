"use client"

import React from "react"

import { useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowLeft, Eye, Heart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "مبل راحتی ویکتوریا",
    category: "مبل راحتی",
    price: "۴۵,۰۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    colors: ["#8B4513", "#2F4F4F", "#800020"],
  },
  {
    id: 2,
    name: "کاناپه مدرن آرتمیس",
    category: "کاناپه",
    price: "۳۸,۵۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
    colors: ["#D2B48C", "#808080", "#000080"],
  },
  {
    id: 3,
    name: "صندلی راحتی کلاسیک",
    category: "صندلی",
    price: "۱۲,۰۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
    colors: ["#F5F5DC", "#A0522D", "#2F4F4F"],
  },
  {
    id: 4,
    name: "مبل ال شکل پرستیژ",
    category: "مبل ال",
    price: "۶۵,۰۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    colors: ["#696969", "#F5F5F5", "#8B0000"],
  },
  {
    id: 5,
    name: "سرویس نشیمن سلطنتی",
    category: "سرویس کامل",
    price: "۸۵,۰۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    colors: ["#DAA520", "#4B0082", "#FFFAF0"],
  },
  {
    id: 6,
    name: "کاناپه تختخواب شو",
    category: "کاناپه تختخواب شو",
    price: "۲۸,۰۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&q=80",
    colors: ["#708090", "#F0E68C", "#8FBC8F"],
  },
]

const categories = ["همه", "مبل راحتی", "کاناپه", "صندلی", "مبل ال", "سرویس کامل"]

export function ProductsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("همه")

  const filteredProducts = activeCategory === "همه" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <section id="products" className="py-24 relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block glass-light px-4 py-1.5 rounded-full text-sm text-white/80 mb-4">
            محصولات ما
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            مجموعه مبلمان لوکس
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            هر قطعه از مبلمان پدر چوب، ترکیبی از هنر، کیفیت و راحتی است
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-white text-primary-foreground"
                  : "glass-light text-white/80 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="#gallery"
            className="inline-flex items-center gap-2 glass-light px-6 py-3 rounded-xl text-white font-medium"
            whileHover={{ scale: 1.02, gap: "12px" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span>مشاهده همه محصولات</span>
            <ArrowLeft size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

function ProductCard({
  product,
  index,
  isInView,
}: {
  product: typeof products[0]
  index: number
  isInView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isLiked, setIsLiked] = useState(false)

  // 3D Parallax Effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="group perspective-1000"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className="glass-card rounded-2xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick Actions */}
          <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              aria-label="افزودن به علاقه‌مندی‌ها"
            >
              <Heart size={18} fill={isLiked ? "#fff" : "none"} />
            </motion.button>
            <motion.button
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="مشاهده سریع"
            >
              <Eye size={18} />
            </motion.button>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-4 right-4 glass-light px-3 py-1 rounded-full text-xs text-white">
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
          
          {/* Colors */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-muted-foreground">رنگ‌ها:</span>
            <div className="flex gap-1">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground">قیمت از</span>
              <p className="text-white font-bold">{product.price} تومان</p>
            </div>
            <motion.button
              className="px-4 py-2 bg-white text-primary-foreground rounded-lg text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              جزئیات
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
