// File: apps/storefront/app/our-story/page.js
// This component tells the story and mission of the restaurant.
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Heart, UtensilsCrossed } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
  viewport: { once: true }
};

export default function OurStoryPage() {
  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-80 flex items-center justify-center">
        <Image
          src="/images/works.jpg" // Assume this image is in /public/images
          alt="The restaurant kitchen team"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-40"
        />
        <motion.div 
          className="relative z-10 text-center text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Our Story</h1>
          <p className="mt-4 text-lg md:text-xl">From Aburi with Love</p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Section 1: The Beginning */}
        <motion.div {...fadeIn} className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
             <Image
                src="/images/pub.jpg" // Assume this image is in /public/images
                alt="A grandmother teaching cooking"
                fill
                style={{ objectFit: 'cover' }}
             />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">A Tradition of Flavor</h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Ghana Jollof Hub started not in a restaurant, but in a family kitchen in the heart of Aburi. Our founder, Nana Serwaa, learned the art of cooking from her grandmother, whose recipes have been passed down through generations. Every dish we serve is a celebration of that heritage—a taste of home, tradition, and the love that goes into a shared meal.
            </p>
          </div>
        </motion.div>

        {/* Section 2: Our Philosophy */}
        <motion.div {...fadeIn} className="mt-20 md:mt-32 grid md:grid-cols-2 gap-12 items-center">
           <div className="md:order-2 relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
             <Image
                src="/images/CEO.jpg" // Assume this image is in /public/images
                alt="Fresh market ingredients"
                fill
                style={{ objectFit: 'cover' }}
             />
          </div>
          <div className="md:order-1">
            <h2 className="text-3xl font-bold text-gray-900">Fresh from the Earth</h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              We believe that great food starts with great ingredients. Thats why we partner with local farmers in the Eastern Region to source the freshest vegetables, spices, and proteins. Our commitment to quality means you can taste the difference in every bite.
            </p>
          </div>
        </motion.div>

        {/* Section 3: Our Mission */}
        <motion.div {...fadeIn} className="mt-20 md:mt-32 text-center max-w-3xl mx-auto">
            <UtensilsCrossed className="mx-auto h-12 w-12 text-yellow-500" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">More Than Just a Meal</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
             Our mission is simple: to share the joy of Ghanaian culture through our food. We want every order to be an experience—a moment of comfort, a burst of flavor, and a connection to the vibrant spirit of Ghana. Thank you for being a part of our story.
            </p>
        </motion.div>
      </div>
    </div>
  );
}

