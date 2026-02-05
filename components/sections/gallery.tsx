"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronLeft, ZoomIn } from "lucide-react"

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
    alt: "دکوراسیون نشیمن مدرن",
    category: "نشیمن",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    alt: "اتاق خواب لوکس",
    category: "اتاق خواب",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
    alt: "سالن پذیرایی کلاسیک",
    category: "پذیرایی",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    alt: "طراحی داخلی مینیمال",
    category: "مینیمال",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
    alt: "فضای نشیمن راحت",
    category: "نشیمن",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80",
    alt: "مبلمان چوبی طبیعی",
    category: "طبیعی",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    alt: "اتاق نشیمن با نورپردازی",
    category: "نورپردازی",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    alt: "دکوراسیون ویلایی",
    category: "ویلا",
  },
]

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)
  
  const goToPrevious = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
  }
  
  const goToNext = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1)
  }

  return (
    <section id="gallery" className="py-24 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block glass-light px-4 py-1.5 rounded-full text-sm text-white/80 mb-4">
            گالری تصاویر
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            نمونه کارهای ما
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            مجموعه‌ای از زیباترین پروژه‌های اجرا شده توسط پدر چوب
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <GalleryItem
              key={image.id}
              image={image}
              index={index}
              isInView={isInView}
              onClick={() => openLightbox(index)}
              isLarge={index === 0 || index === 5}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <Lightbox
            images={galleryImages}
            currentIndex={selectedImage}
            onClose={closeLightbox}
            onPrevious={goToPrevious}
            onNext={goToNext}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function GalleryItem({
  image,
  index,
  isInView,
  onClick,
  isLarge,
}: {
  image: typeof galleryImages[0]
  index: number
  isInView: boolean
  onClick: () => void
  isLarge: boolean
}) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
        isLarge ? "md:col-span-2 md:row-span-2" : ""
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      <div className={`aspect-square ${isLarge ? "md:aspect-square" : ""}`}>
        <img
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="glass-light px-3 py-1 rounded-full text-xs text-white self-start mb-2">
          {image.category}
        </div>
        <p className="text-white text-sm font-medium">{image.alt}</p>
      </div>

      {/* Zoom Icon */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
      >
        <ZoomIn size={20} />
      </motion.div>
    </motion.div>
  )
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: {
  images: typeof galleryImages
  currentIndex: number
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}) {
  const currentImage = images[currentIndex]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        {/* Close Button */}
        <motion.button
          className="absolute -top-16 left-1/2 -translate-x-1/2 md:top-4 md:left-4 md:translate-x-0 w-12 h-12 glass rounded-full flex items-center justify-center text-white"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="بستن"
        >
          <X size={24} />
        </motion.button>

        {/* Navigation Buttons */}
        <motion.button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white z-20"
          onClick={onPrevious}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="تصویر قبلی"
        >
          <ChevronRight size={24} />
        </motion.button>

        <motion.button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white z-20"
          onClick={onNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="تصویر بعدی"
        >
          <ChevronLeft size={24} />
        </motion.button>

        {/* Image */}
        <motion.div
          key={currentIndex}
          className="relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <img
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.alt}
            className="w-full h-auto max-h-[80vh] object-contain mx-auto"
          />
        </motion.div>

        {/* Caption */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-block glass-light px-3 py-1 rounded-full text-xs text-white mb-2">
            {currentImage.category}
          </div>
          <p className="text-white font-medium">{currentImage.alt}</p>
          <p className="text-muted-foreground text-sm mt-1">
            {currentIndex + 1} از {images.length}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
