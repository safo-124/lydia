// File: apps/storefront/app/page.js
// A redesigned, modern landing page using local images with next/image.
'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChefHat, ShoppingCart, Smile, Star } from 'lucide-react';

// Animation variants for Framer Motion
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Assume images are placed in the `apps/storefront/public/images` directory.
const featuredDishes = [
  {
    name: 'Spicy Goat Jollof',
    description: 'Our signature dish, slow-cooked to perfection with a blend of secret spices.',
    image: '/images/groundnutsoup.jpg'
  },
  {
    name: 'Fufu & Light Soup',
    description: 'A comforting classic, perfect for any day of the week. Served with your choice of protein.',
    image: '/images/Fish_fresh.jpg'
  },
  {
    name: 'Waakye & Shito',
    description: 'A hearty and flavorful breakfast of champions that can be enjoyed any time of day.',
    image: '/images/abunabunsoup.jpg'
  }
];

export default function LandingPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* --- Hero Section --- */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-white">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 bg-black">
          {/* Using next/image for the background */}
          <Image 
            src="/images/konkonte.jpg" // Assumes the image you sent is saved here
            alt="A delicious bowl of Jollof rice" 
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-50"
            priority // Load this image first as it's above the fold
          />
        </div>
        
        {/* Content */}
        <motion.div 
          className="relative z-10 text-center px-4"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            The Perfect Jollof, Every Time.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
            Taste the authentic flavor of Ghana with our masterfully crafted dishes. Your next favorite meal is just a click away.
          </p>
          <div className="mt-10">
            <Link href="/menu">
              <Button size="lg" className="bg-yellow-500 text-gray-900 font-bold hover:bg-yellow-400 h-12 px-8 text-lg transform hover:scale-105 transition-transform">
                Explore The Menu
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* --- How It Works Section --- */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial="initial"
            whileInView="animate"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h2 className="text-base font-semibold leading-7 text-yellow-600">Simple & Fast</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Your Meal in 3 Easy Steps
            </p>
          </motion.div>

          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-500 text-white mx-auto"><ShoppingCart className="h-8 w-8"/></div>
              <h3 className="mt-6 text-xl font-semibold">Browse & Select</h3>
              <p className="mt-2 text-gray-600">Explore our menu of authentic Ghanaian dishes and add your favorites to the cart.</p>
            </motion.div>
            <motion.div variants={fadeIn}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-500 text-white mx-auto"><ChefHat className="h-8 w-8"/></div>
              <h3 className="mt-6 text-xl font-semibold">We Cook For You</h3>
              <p className="mt-2 text-gray-600">Our expert chefs prepare your meal with the freshest ingredients and a touch of love.</p>
            </motion.div>
            <motion.div variants={fadeIn}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-500 text-white mx-auto"><Smile className="h-8 w-8"/></div>
              <h3 className="mt-6 text-xl font-semibold">Enjoy at Home</h3>
              <p className="mt-2 text-gray-600">We deliver your hot, delicious meal straight to your doorstep. Its that easy!</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* --- Customer Favorites Section --- */}
      <section className="bg-white py-20 sm:py-28">
         <div className="container mx-auto px-4">
            <motion.div 
              className="text-center"
              initial="initial"
              whileInView="animate"
              variants={fadeIn}
              viewport={{ once: true }}
            >
              <h2 className="text-base font-semibold leading-7 text-yellow-600">Dont Miss Out</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Our Customer Favorites
              </p>
              <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-600">
                These are the dishes our customers cant get enough of. Give them a try!
              </p>
            </motion.div>
            <motion.div
              className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              variants={staggerContainer}
              viewport={{ once: true, amount: 0.2 }}
            >
              {featuredDishes.map((dish) => (
                <motion.div key={dish.name} variants={fadeIn} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                   <div className="relative w-full h-56">
                     <Image 
                        src={dish.image} 
                        alt={dish.name} 
                        fill
                        style={{objectFit: 'cover'}}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                   </div>
                   <div className="p-6">
                      <h3 className="text-xl font-semibold">{dish.name}</h3>
                      <p className="mt-2 text-gray-600">{dish.description}</p>
                      <div className="mt-4 flex items-center">
                          {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                      </div>
                   </div>
                </motion.div>
              ))}
            </motion.div>
         </div>
      </section>
    </div>
  );
}
