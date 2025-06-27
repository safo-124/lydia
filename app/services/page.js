// File: apps/storefront/app/services/page.js
// This component details the additional services offered by the restaurant.
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PartyPopper, UtensilsCrossed, Send } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
  viewport: { once: true }
};

export default function ServicesPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-80 flex items-center justify-center text-center">
        <Image
          src="/images/event-table.jpg" // Assume this image is in /public/images
          alt="A beautifully set table for an event"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-40"
        />
        <motion.div 
          className="relative z-10 text-white px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Our Services</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">From intimate gatherings to large celebrations, we bring the taste of Ghana to you.</p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 space-y-20 md:space-y-28">
        {/* Service 1: Catering */}
        <motion.div {...fadeIn} className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-yellow-600 font-semibold mb-2">
                <PartyPopper className="h-5 w-5" />
                Event Catering
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Bring Ghana Jollof Hub to Your Event</h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Planning a party, corporate lunch, or a special family gathering? Let us handle the food! Our catering service offers a full range of our menu items, from delicious appetizers to our signature Jollof and Fufu, all prepared to make your event unforgettable. We can accommodate events of all sizes.
            </p>
             <Link href="/contact" className="mt-6 inline-block">
                <Button>Inquire About Catering</Button>
            </Link>
          </div>
           <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
             <Image
                src="/images/catering-spread.jpg" // Assume this image is in /public/images
                alt="A large spread of catered Ghanaian food"
                fill
                style={{ objectFit: 'cover' }}
             />
          </div>
        </motion.div>

        {/* Service 2: Private Dining */}
        <motion.div {...fadeIn} className="grid md:grid-cols-2 gap-12 items-center">
           <div className="md:order-2">
             <div className="inline-flex items-center gap-2 text-yellow-600 font-semibold mb-2">
                <UtensilsCrossed className="h-5 w-5" />
                Private Dining
            </div>
            <h2 className="text-3xl font-bold text-gray-900">An Exclusive Experience</h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              For those extra special occasions, book a private dining experience with us. Enjoy a curated menu in an intimate setting, perfect for anniversaries, business dinners, or a quiet night out. Our team will work with you to create a personalized menu and atmosphere that meets your needs.
            </p>
             <Link href="/reserve" className="mt-6 inline-block">
                <Button>Book a Private Table</Button>
            </Link>
          </div>
          <div className="md:order-1 relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
             <Image
                src="/images/private-dining.jpg" // Assume this image is in /public/images
                alt="An intimate private dining setup"
                fill
                style={{ objectFit: 'cover' }}
             />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
