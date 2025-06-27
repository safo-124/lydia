// File: apps/storefront/components/Footer.js
// A redesigned, responsive footer component.
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Facebook, MapPin, Phone } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="initial"
          whileInView="whileInView"
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {/* About Section */}
          <motion.div variants={fadeIn} className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Ghana Jollof Hub</h3>
            <p>
              Bringing the authentic taste of Ghanaian cuisine to your table. Made with love and the freshest local ingredients from Aburi, Eastern Region.
            </p>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div variants={fadeIn}>
            <h3 className="text-lg font-semibold text-white mb-4">Navigate</h3>
            <ul className="space-y-2">
              <li><Link href="/menu" className="hover:text-yellow-400 transition-colors">Menu</Link></li>
              <li><Link href="/services" className="hover:text-yellow-400 transition-colors">Services</Link></li>
              <li><Link href="/our-story" className="hover:text-yellow-400 transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact Us</Link></li>
            </ul>
          </motion.div>

          {/* Contact & Socials */}
          <motion.div variants={fadeIn}>
            <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
            <div className="space-y-3">
                <p className="flex items-start gap-2"><MapPin className="h-5 w-5 mt-1 flex-shrink-0" /> <span>123 Kom-Forster Road, Aburi</span></p>
                <p className="flex items-start gap-2"><Phone className="h-5 w-5 mt-1 flex-shrink-0" /> <span>+233 24 123 4567</span></p>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-yellow-400 transition-colors" aria-label="Twitter"><Twitter /></a>
              <a href="#" className="hover:text-yellow-400 transition-colors" aria-label="Instagram"><Instagram /></a>
              <a href="#" className="hover:text-yellow-400 transition-colors" aria-label="Facebook"><Facebook /></a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
            className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3}}
            viewport={{ once: true }}
        >
          <p>&copy; {currentYear} Ghana Jollof Hub. All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
