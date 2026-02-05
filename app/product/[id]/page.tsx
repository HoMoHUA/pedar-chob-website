"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  ArrowRight, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Check,
  Minus,
  Plus
} from "lucide-react"
import Link from "next/link"

// Sample product data
const product = {
  id: 1,
  name: "مبل راحتی ویکتوریا",
  category: "مبل راحتی",
  price: "۴۵,۰۰۰,۰۰۰",
  description: "مبل راحتی ویکتوریا با طراحی کلاسیک و مدرن، ترکیبی بی‌نظیر از زیبایی و راحتی است. این مبل با استفاده از بهترین مواد اولیه و دست‌های هنرمند استادکاران ماهر ساخته شده است.",
  features: [
    "کلاف چوب راش درجه یک",
    "فنر پاکتی با تراکم بالا",
    "اسفنج قالبی با دانسیته ۳۵",
    "پارچه میکروفایبر ضد لک",
    "پایه‌های فلزی استیل",
  ],
  colors: [
    { name: "قهوه‌ای", hex: "#8B4513" },
    { name: "سبز تیره", hex: "#2F4F4F" },
    { name: "زرشکی", hex: "#800020" },
    { name: "کرم", hex: "#F5F5DC" },
  ],
  dimensions: {
    width: "۲۲۰",
    depth: "۹۰",
    height: "۸۵",
  },
  images: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
  ],
  materials: [
    { name: "کلاف", description: "چوب راش خشک شده با رطوبت کمتر از ۱۰٪", icon: "🪵" },
    { name: "فنر", description: "فنر پاکتی مستقل برای راحتی بیشتر", icon: "🔩" },
    { name: "اسفنج", description: "اسفنج قالبی ضد حساسیت", icon: "☁️" },
    { name: "پارچه", description: "پارچه میکروفایبر قابل شستشو", icon: "🧵" },
  ],
}

export default function ProductPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  return (
    <main ref={containerRef} className="relative min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 px-6 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-white transition-colors">خانه</Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-white transition-colors">محصولات</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>
      </div>

      {/* Hero Section - Product Overview */}
      <motion.section
        className="py-8 px-6"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card"
                layoutId="product-image"
              >
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Quick Actions */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <motion.button
                    className="w-10 h-10 glass rounded-full flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsLiked(!isLiked)}
                    aria-label="افزودن به علاقه‌مندی"
                  >
                    <Heart size={18} fill={isLiked ? "#fff" : "none"} />
                  </motion.button>
                  <motion.button
                    className="w-10 h-10 glass rounded-full flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="اشتراک‌گذاری"
                  >
                    <Share2 size={18} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-white" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - تصویر ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="inline-block glass-light px-3 py-1 rounded-full text-xs text-white/80 mb-3">
                  {product.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {product.name}
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="glass-card p-4 rounded-2xl">
                <p className="text-sm text-muted-foreground mb-1">قیمت</p>
                <p className="text-3xl font-bold text-white">{product.price} <span className="text-lg">تومان</span></p>
              </div>

              {/* Color Selection */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">انتخاب رنگ: <span className="text-white">{selectedColor.name}</span></p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color.hex}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor.hex === color.hex ? "border-white scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`انتخاب رنگ ${color.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">تعداد</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center glass-card rounded-xl">
                    <motion.button
                      className="w-10 h-10 flex items-center justify-center text-white"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      whileTap={{ scale: 0.9 }}
                      aria-label="کاهش تعداد"
                    >
                      <Minus size={18} />
                    </motion.button>
                    <span className="w-12 text-center text-white font-semibold">{quantity}</span>
                    <motion.button
                      className="w-10 h-10 flex items-center justify-center text-white"
                      onClick={() => setQuantity(quantity + 1)}
                      whileTap={{ scale: 0.9 }}
                      aria-label="افزایش تعداد"
                    >
                      <Plus size={18} />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <motion.button
                  className="flex-1 py-4 bg-white text-primary-foreground rounded-xl font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  افزودن به سبد خرید
                </motion.button>
                <motion.button
                  className="glass-light px-6 py-4 rounded-xl font-semibold text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  درخواست مشاوره
                </motion.button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-3">
                <div className="glass-card p-3 rounded-xl text-center">
                  <Truck size={20} className="text-white mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">ارسال رایگان</p>
                </div>
                <div className="glass-card p-3 rounded-xl text-center">
                  <Shield size={20} className="text-white mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">گارانتی ۵ ساله</p>
                </div>
                <div className="glass-card p-3 rounded-xl text-center">
                  <RotateCcw size={20} className="text-white mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">۷ روز مرجوعی</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Sticky Section - Features */}
      <StickyFeaturesSection features={product.features} materials={product.materials} />

      {/* Dimensions Section */}
      <DimensionsSection dimensions={product.dimensions} />

      {/* Back to Products */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/#products">
            <motion.span
              className="inline-flex items-center gap-2 glass-light px-6 py-3 rounded-xl text-white"
              whileHover={{ scale: 1.02, gap: "12px" }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowRight size={18} />
              <span>بازگشت به محصولات</span>
            </motion.span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function StickyFeaturesSection({ 
  features, 
  materials 
}: { 
  features: string[]
  materials: typeof product.materials 
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, materials.length - 1])
  const springIndex = useSpring(activeIndex, { stiffness: 100, damping: 20 })

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${materials.length * 100}vh` }}>
      <div className="sticky top-0 min-h-screen flex items-center py-24 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Materials Animation */}
            <div className="relative">
              <motion.div className="glass-card p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-white mb-6">مواد اولیه</h3>
                <div className="space-y-4">
                  {materials.map((material, index) => (
                    <MaterialItem
                      key={material.name}
                      material={material}
                      index={index}
                      springIndex={springIndex}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right - Features List */}
            <div>
              <span className="inline-block glass-light px-4 py-1.5 rounded-full text-sm text-white/80 mb-4">
                ویژگی‌های محصول
              </span>
              <h2 className="text-3xl font-bold text-white mb-8">
                کیفیتی که حس می‌کنید
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-3 glass-card p-4 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                    <span className="text-white">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MaterialItem({
  material,
  index,
  springIndex,
}: {
  material: typeof product.materials[0]
  index: number
  springIndex: ReturnType<typeof useSpring>
}) {
  const opacity = useTransform(
    springIndex,
    [index - 1, index, index + 1],
    [0.3, 1, 0.3]
  )
  const scale = useTransform(
    springIndex,
    [index - 1, index, index + 1],
    [0.95, 1, 0.95]
  )

  return (
    <motion.div
      className="glass-light p-4 rounded-xl"
      style={{ opacity, scale }}
    >
      <div className="flex items-center gap-4">
        <span className="text-2xl">{material.icon}</span>
        <div>
          <p className="text-white font-semibold">{material.name}</p>
          <p className="text-sm text-muted-foreground">{material.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

function DimensionsSection({ dimensions }: { dimensions: typeof product.dimensions }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="glass-card p-8 rounded-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block glass-light px-4 py-1.5 rounded-full text-sm text-white/80 mb-4">
            ابعاد محصول
          </span>
          <h2 className="text-2xl font-bold text-white mb-8">اندازه‌گیری دقیق</h2>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="glass-light p-6 rounded-2xl">
              <p className="text-3xl font-bold text-white mb-1">{dimensions.width}</p>
              <p className="text-sm text-muted-foreground">عرض (سانتی‌متر)</p>
            </div>
            <div className="glass-light p-6 rounded-2xl">
              <p className="text-3xl font-bold text-white mb-1">{dimensions.depth}</p>
              <p className="text-sm text-muted-foreground">عمق (سانتی‌متر)</p>
            </div>
            <div className="glass-light p-6 rounded-2xl">
              <p className="text-3xl font-bold text-white mb-1">{dimensions.height}</p>
              <p className="text-sm text-muted-foreground">ارتفاع (سانتی‌متر)</p>
            </div>
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            * امکان سفارشی‌سازی ابعاد بر اساس نیاز شما وجود دارد
          </p>
        </motion.div>
      </div>
    </section>
  )
}
