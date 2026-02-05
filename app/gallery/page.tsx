"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { X, ChevronRight, ChevronLeft, ZoomIn, Filter } from "lucide-react"
import Link from "next/link"

const categories = ["همه", "نشیمن", "اتاق خواب", "پذیرایی", "ویلا", "آپارتمان"]

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80",
    alt: "دکوراسیون نشیمن مدرن",
    category: "نشیمن",
    project: "پروژه ولنجک",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
    alt: "اتاق خواب لوکس",
    category: "اتاق خواب",
    project: "پروژه الهیه",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80",
    alt: "سالن پذیرایی کلاسیک",
    category: "پذیرایی",
    project: "پروژه زعفرانیه",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    alt: "طراحی داخلی مینیمال",
    category: "آپارتمان",
    project: "پروژه سعادت‌آباد",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80",
    alt: "فضای نشیمن راحت",
    category: "نشیمن",
    project: "پروژه نیاوران",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&q=80",
    alt: "مبلمان چوبی طبیعی",
    category: "ویلا",
    project: "ویلای لواسان",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    alt: "اتاق نشیمن با نورپردازی",
    category: "نشیمن",
    project: "پروژه جردن",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    alt: "دکوراسیون ویلایی",
    category: "ویلا",
    project: "ویلای دماوند",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    alt: "سالن پذیرایی مدرن",
    category: "پذیرایی",
    project: "پروژه فرمانیه",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=1200&q=80",
    alt: "اتاق خواب مستر",
    category: "اتاق خواب",
    project: "پروژه پاسداران",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    alt: "آپارتمان لوکس",
    category: "آپارتمان",
    project: "برج آرمیتاژ",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    alt: "ویلای ساحلی",
    category: "ویلا",
    project: "ویلای رامسر",
  },
]

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [selectedCategory, setSelectedCategory] = useState("همه")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages = selectedCategory === "همه"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)

  const goToPrevious = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
  }

  const goToNext = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1)
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
              گالری تصاویر
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
              نمونه کارهای ما
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
              مجموعه‌ای از زیباترین پروژه‌های اجرا شده توسط پدر چوب در سراسر کشور
            </p>
          </motion.div>

          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/" className="hover:text-white transition-colors">خانه</Link>
            <span>/</span>
            <span className="text-white">گالری</span>
          </motion.nav>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-light px-3 py-2 rounded-xl flex items-center gap-2 text-white/80">
              <Filter size={16} />
              <span className="text-sm">فیلتر:</span>
            </div>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === category
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
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 pb-24" ref={containerRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3]"
                  onClick={() => openLightbox(index)}
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="glass-light px-3 py-1 rounded-full text-xs text-white self-start mb-2">
                      {image.category}
                    </div>
                    <h3 className="text-white font-semibold mb-1">{image.alt}</h3>
                    <p className="text-muted-foreground text-sm">{image.project}</p>
                  </div>

                  {/* Zoom Icon */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 glass rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ZoomIn size={24} />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">موردی یافت نشد</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={closeLightbox}
            />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
              <motion.button
                className="absolute -top-16 left-1/2 -translate-x-1/2 md:top-4 md:left-4 md:translate-x-0 w-12 h-12 glass rounded-full flex items-center justify-center text-white"
                onClick={closeLightbox}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="بستن"
              >
                <X size={24} />
              </motion.button>

              <motion.button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white z-20"
                onClick={goToPrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="تصویر قبلی"
              >
                <ChevronRight size={24} />
              </motion.button>

              <motion.button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white z-20"
                onClick={goToNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="تصویر بعدی"
              >
                <ChevronLeft size={24} />
              </motion.button>

              <motion.div
                key={selectedImage}
                className="relative rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <img
                  src={filteredImages[selectedImage].src || "/placeholder.svg"}
                  alt={filteredImages[selectedImage].alt}
                  className="w-full h-auto max-h-[80vh] object-contain mx-auto"
                />
              </motion.div>

              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-block glass-light px-3 py-1 rounded-full text-xs text-white mb-2">
                  {filteredImages[selectedImage].category}
                </div>
                <h3 className="text-white font-semibold">{filteredImages[selectedImage].alt}</h3>
                <p className="text-muted-foreground text-sm">{filteredImages[selectedImage].project}</p>
                <p className="text-muted-foreground text-xs mt-2">
                  {selectedImage + 1} از {filteredImages.length}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
