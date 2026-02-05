import React from "react"
import type { Metadata, Viewport } from 'next'
import { Vazirmatn } from 'next/font/google'

import './globals.css'

const vazirmatn = Vazirmatn({ 
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'پدر چوب | مبلمان لوکس و سفارشی',
  description: 'شوروم دیجیتال پدر چوب - تجربه‌ای منحصربه‌فرد از مبلمان لوکس، طراحی سفارشی و کیفیت برتر',
  keywords: ['مبلمان لوکس', 'پدر چوب', 'مبل سفارشی', 'مبلمان چوبی', 'دکوراسیون داخلی'],
  authors: [{ name: 'پدر چوب' }],
  openGraph: {
    title: 'پدر چوب | مبلمان لوکس و سفارشی',
    description: 'شوروم دیجیتال پدر چوب - تجربه‌ای منحصربه‌فرد از مبلمان لوکس',
    locale: 'fa_IR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1A2B4C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
